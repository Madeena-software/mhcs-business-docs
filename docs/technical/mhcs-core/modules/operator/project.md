# MHCS Core Operator Module Specification

**Status:** Candidate target foundation — pending human approval
**Last reviewed:** 29 August 2026

This document defines the Operator module in the approved `mhcs-core` modular
application. The overall repository and runtime boundary is defined by the
[MHCS Core architecture](../../project.md).

## Purpose

Operator Core is the staff-facing module for examination-day operations, opened
through WhatsApp-dispatched temporary Site Workspaces. It
owns physical-site master data, operator accounts and assignments, arrivals,
TU identity-verification and consent-confirmation workflows, the staged operational
queue, basic examination & vital signs capture, examination execution, session-only NPZ drafts, submission
to Image Gateway, the public queue display, read-only AI result monitoring, operator earnings,
and operator payouts.

Operator Core does not model a separate project entity. Sites, shifts,
bookings, queue items, and examinations provide the required business context.

## Users and authorization

Operator Core enforces a granular, permission-based authorization model with
three independent operational permissions:

1. **`TU / Registration`:** Front-desk check-in, on-site official identity verification
   using approved minimum evidence and comparison, booking locator lookup, paper consent
   confirmation, ticket issuance, and queue ticket thermal slip printing.
2. **`Nakes Pemeriksaan Dasar`:** Claiming basic examination tickets, recording
   vital signs, point-of-care blood screening, structured interview capture, and paper
   questionnaire confirmation.
3. **`Radiografi`:** Claiming X-ray tickets, reviewing Grabber radiograph/gain NPZ
   captures, managing retakes/omissions, and submitting the complete capture set.

In addition, **Global Admin / Super Admin** manages Operator Core sites, staff accounts,
shift assignments, protocol mappings, earning rates, and operational configuration.

### Multi-permission accounts and station rules

- **Multi-permission assignment:** A staff account may be assigned 1, 2, or all 3
  operational permissions by an administrator.
- **Station selection:** An operator working an assigned shift selects an operational
  station label (`TU`, `PEMERIKSAAN DASAR`, `SESI FOTO RADIOGRAFI`). This label routes
  active work and LCD calls but **cannot** grant or elevate permissions beyond what the
  account holds. An operator without `Radiografi` permission cannot claim X-ray tickets
  even if selecting the X-ray station.
- **MVP/beta transitional compatibility:** Existing MVP/beta operator accounts
  temporarily retain access to all three operational areas (`TU / Registration`,
  `Nakes Pemeriksaan Dasar`, `Radiografi`) as a transitional compatibility measure.
- **New staff provisioning:** Provisioning of new staff accounts requires an
  administrator to explicitly select the applicable operational permissions.

Staff holding operational permissions are represented as FHIR `Practitioner`,
with site-specific `PractitionerRole` for each authorized site.

An operator may be authorized for multiple sites but works in exactly one
active site context at a time. Switching sites requires confirmation, is audited,
and is blocked while the operator has a claimed ticket, an unfinished queue action,
or an unclosed cash shift.

## MHCS Core topology

Operator is a module in the single `mhcs-core` repository and runtime. It
shares authentication, database, queue, and deployment foundations with Member,
Doctor, and Image Gateway while retaining explicit business-rule and table
ownership.

Operator invokes Member and Image Gateway through local application contracts
and emits durable domain events for asynchronous work. It never uses network
calls or module credentials to invoke another MHCS Core module. Only the Image
Gateway worker crosses the separate private MPIPS boundary.

## Site ownership and synchronization

Operator Core is the source authority for MHCS physical sites and the FHIR
`Organization` and `Location` records that identify them. A global
administrator creates and updates site identity, address, time zone,
operational status, and operator authorization.

The Member module references stable site identifiers and owns the booking catalogue,
shifts, quotas, prices, and `ServiceRequest` associated with each site. It cannot
create a conflicting site master.

Disabling one site:

- immediately prevents new bookings for that site without affecting other sites;
- does not delete or silently cancel existing bookings; and
- sends existing bookings through the Member module's audited reschedule,
  cancellation, or refund handling.

## Shift eligibility and operator assignment

Member Core opens and owns bookable shifts. The initial advance-booking
eligibility threshold is five confirmed members, and the configured
advance-booking quota is between five and twenty. Member Core also owns the
global walk-in quota, initially five, making the current maximum accepted shift
capacity twenty-five.

Staffing is demand-triggered:

1. Members may book an open shift before an operator is assigned.
2. At five confirmed bookings, the Member module emits an idempotent `shift_eligible`
   domain event for the Operator module.
3. The global Operator Core administrator assigns one or more operators to the
   shift manually or initiates the **Automated Sequential Operator Assignment** workflow.
4. When sequential assignment is active, invitation offers are dispatched one
   candidate at a time based on the configured sequence.
5. Candidates receive a minimal operational offer in WhatsApp with a response
   timeout (defaulting to 5 minutes) to accept or decline.
6. If accepted, the operator is assigned to the shift; if declined or timed out,
   the system advances to the next candidate.
7. If the sequence is exhausted without acceptance, an escalation alert is sent
   to the administrator.
8. Assigned operators receive a WhatsApp reminder and open the temporary Site
   Workspace for the task. Any assigned operator may perform operational tasks for which they hold the
   corresponding permission (`TU / Registration`, `Nakes Pemeriksaan Dasar`, or `Radiografi`).
   Atomic claims ensure that only one operator handles a ticket stage at a time.

Site schedules do not overlap and include an operational gap, so Operator Core
does not merge tickets between shifts. Multiple assigned operators may serve
different patients or stages concurrently.

## Attendance and TU identity verification

Operator Core obtains the current site's eligible attendance list from Member
Core. A booking code presented by an arriving member serves as a reservation
locator and is **not** sufficient proof of patient identity.

Staff holding `TU / Registration` permission perform front-desk verification:

1. Record the member's physical arrival using its actual occurrence time.
2. Look up the booking using the booking code and the minimum additional identifier
   permitted by the approved verification procedure.
3. Apply the approved minimum identity-evidence and comparison procedure using
   protected Member Core identity views.
4. Show the latest profile photograph first. Previous profile photographs are
   available only when the latest photograph is insufficient for verification.
5. Confirm that the member has read and signed the applicable paper informed
   consent (recorded strictly once at the start of the visit).
6. Record the consent form version, signer, signature-confirmation time,
   responsible operator, and required private scan through Member Core.
7. Mark the booking `checked_in` and issue one site-and-shift ticket only after
   successful verification and consent confirmation, then trigger paper ticket printing
   via the web print dialog (`window.print()`). The printed thermal slip contains only
   the site name, shift & date, and prominent ticket number (omitting patient name and MRN
   for paper privacy). A manual "Reprint Ticket" button is available in the Operator queue
   worklist. Issued ticket numbers are managed on-site via paper slips. Downstream
   examination stations reuse this visit consent confirmation and do not re-request
   consent.

Identity evidence and any profile photographs are purpose-bound, temporary,
non-downloadable, and available to the operator only during the active verification
flow, subject to the approved minimum-data procedure.

An operator cannot override an unresolved mismatch. Check-in remains blocked
until an administrator resolves the dispute with a mandatory reason.

## Operator interaction and work history

WhatsApp is the persistent operator interaction layer:

```text
operational need / shift → eligible staff → WhatsApp offer
→ ACCEPT / DECLINE → assignment → reminder → OPEN SITE WORKSPACE
→ temporary assignment-scoped Site Workspace → finish → return to WhatsApp
```

`PEKERJAAN SAYA / RIWAYAT SAYA` returns a concise summary of completed and
upcoming assignments, role, site, date/time, simple counts, and applicable
earnings or payment status. If detailed inspection is genuinely required,
`LIHAT RIWAYAT LENGKAP` opens a secure temporary Work History surface; it is not
a permanent Operator Portal. Exact authentication and temporary-session mechanics
remain open.

## Basic examination & vital signs assessment

Basic examination assessment is mandatory before X-ray and is performed by staff
holding `Nakes Pemeriksaan Dasar` permission:

- systolic and diastolic blood pressure;
- body temperature;
- height, weight, and BMI calculated from those two values;
- point-of-care glucose, total cholesterol, and uric-acid results; and
- a structured interview covering smoking, current cough, shortness of breath,
  chest pain, pulmonary disease, cardiac disease, tuberculosis, chest surgery,
  occupational dust or smoke exposure, and relevant family history.

Every configured field requires either a value or an explicit `unavailable`,
`refused`, or `not_applicable` reason. Member Core is the longitudinal authority.
Operator Core records the assessment and responsible worker through a local
idempotent command. Valid basic examination completion releases the ticket to the
X-ray queue and makes the worker's stage earning eligible.

## Queue rules

One human-readable ticket number is unique within its site and shift and
remains unchanged through two physical sequential stages plus background AI completion:

```text
Basic Examination & Vital Signs -> X-ray -> awaiting AI -> completed
```

The ticket records its current stage and state, stage-ready time, claimed
operator, station label, and append-only transition history. Supported states
cover `waiting`, `called`, `in_service`, `awaiting_ai`, `deferred`, and
`completed`. A stage becomes visible in its private worklist only when its
prerequisite is complete. `awaiting_ai` consumes no operator station.

Each stage uses FIFO by its own ready time. Claiming a waiting ticket is atomic;
a competing claim fails and refreshes the worklist. An operator may have only
one claimed clinical-stage ticket at a time. A skip requires a reason and
returns the patient to the same stage with a new ready time. Recall repeats the
public call without changing order.

The initial ticket issue order retains two classes within a shift:

1. Advance bookings, ordered by successful check-in time.
2. Walk-ins, ordered by successful check-in time.

Every advance booking remains ahead of every walk-in until it is examined or
resolved. Once a member is accepted and checked in, Operator Core must complete
the examination even if work continues beyond nominal shift end.

### Public LCD display

Operator Core owns a number-only fullscreen display. An authenticated operator
pairs a TV browser using a single-use short code. The resulting session is
read-only, restricted to one site and shift, revocable, and expires
automatically at shift end.

The display refreshes periodically and shows active calls for exactly two
public destinations: `PEMERIKSAAN DASAR` and `SESI FOTO RADIOGRAFI`. Each
destination may call a different ticket at the same time. The five most recent
calls show only ticket number, destination, and call time.

The display exposes zero member names, NIK, medical-record identifiers, booking
details, assessments, images, results, or waiting-list positions.

## Walk-in boundary

Staff holding `TU / Registration` permission initiate the assisted walk-in flow.
Member Core owns the member record, verification assets, MRN, booking, and
`ServiceRequest`.

Operator Core appends the member to the end of its local walk-in queue only
after one idempotent Member command atomically completes registration, payment
tracking, and booking. No member login credentials or passwords are created.

## Examination protocol configuration

The global Operator administrator maintains versioned X-ray protocol templates
and maps each Member service code to its required projections (e.g. PA, AP, lateral).
Operator Core snapshots the active protocol version when the examination starts.

The operator may correct an incorrect requested body part or laterality before
submission without administrator approval. The correction requires a reason,
operator identity, and timestamp and must succeed through the Member module
before the examination continues.

## NPZ draft and submission flow

The target examination flow is performed by staff holding `Radiografi` permission:

1. After basic examination completion, an assigned operator holding `Radiografi`
   permission atomically claims and calls the next ready X-ray ticket and starts
   the examination.
2. The Operator module creates the R5 `Encounter`, snapshots the protocol, and
   updates the Member-owned booking. Stage earning rates were already frozen when
   the ticket was issued.
3. Grabber produces patient-free radiograph NPZ captures and the required gain NPZ.
4. The operator drags one or more radiograph NPZ files and matching gain NPZ into
   the active examination on the Grabber computer.
5. The Operator and Image Gateway modules validate content, schema, fields, size,
   and compatibility.
6. The operator previews the image, confirms or corrects its actual projection,
   and explicitly confirms each required capture.
7. A required projection may be omitted only with a mandatory reason.
8. The operator clicks one Submit action for the complete confirmed set.
9. The Operator module invokes the Image Gateway module with the radiograph
   files, matching gain input, and immutable examination snapshot under one
   stable submission ID.
10. Durable acceptance by the Image Gateway module completes the X-ray stage,
    marks the Encounter complete, triggers the X-ray stage earning, and moves the
    ticket to `awaiting_ai`. MPIPS, AI, and doctor processing continue asynchronously.

Drafts deliberately do not survive navigation or restart. Discarding a draft
deletes temporary local copies.

## Submission reliability and completion

- Transient queued or storage failures retry automatically with the same submission ID.
- The operator sees `submission_pending`; duplicate retries return the original result.
- The ticket remains in X-ray service until durable acceptance.
- A permanent validation rejection returns the examination to an editable draft.
- The Operator module deletes temporary draft copies after Image Gateway confirms
  durable storage.

Gateway acceptance means complete submitted bytes and metadata are durably stored,
authorized, checksum-verified, and recoverable.

## AI waiting and result status monitoring

AI processing is asynchronous and never reserves an operator station. Image Gateway
publishes the selected AI result to Member Core and emits an idempotent readiness
event that automatically completes the matching Operator ticket.

Patient presence onsite is optional during AI processing; patients may leave
immediately after X-ray capture or choose to wait.

The temporary Site Workspace provides a read-only **AI Results Status Monitor**.
Desk staff may search and view published AI results to answer patient inquiries or
generate an optional physical printout on demand if requested onsite.

Operator Core records only:

- the AI result version printed or checked;
- the responsible operator and desk station;
- occurrence times; and
- WhatsApp notification, secure temporary result-link, and/or print delivery status.

It does not sell or create doctor review. A fixed notice informs patients that
paid doctor review can be requested later via WhatsApp.

## Corrections and repeat examinations

A doctor may declare an accepted study diagnostically insufficient and request
a clinical repeat. The repeat flow is:

1. Doctor Core records an immutable study-level `repeat_required` decision with
   controlled preliminary reason and clinical note.
2. Member Core creates one active linked, zero-cost, doctor-only repeat entitlement
   and a replacement `ServiceRequest`.
3. The member selects any compatible site and shift via WhatsApp.
4. The repeat consumes one advance-booking quota slot and follows normal advance-booking
   check-in priority.
5. Operator Core determines eligible `Radiografi` workforce and sends a repeat-radiography
   offer through WhatsApp. After acceptance, the operator opens the temporary Site
   Workspace and performs a new examination and submission. AI is not rerun.

Controlled Doctor Core preliminary reasons (`operator_error`, `equipment_failure`,
`incorrect_order`, `medical_limitation`, `other`) remain clinical source evidence
and do not change already completed Operator stage earnings.

## Read-only image access

An ordinary operator may view only current-shift examinations at the active site.
Global Admin / Super Admin may view operational cases across all sites.

The Operator Core DICOM viewer is read-only:

- automatic DICOM Window Center/Width or VOI LUT;
- zoom and pan are allowed;
- manual window/level, annotations, measurements, and saved presentation states are disabled;
- raw NPZ download remains disabled;
- any authenticated Operator whose active site and current shift authorise an
  examination may view and download each returned raw DICOM as a standard
  authenticated `.dcm` attachment.

## Operator earnings

Operator earnings are ordinary Operator Core financial records denominated in
Indonesian rupiah. They are not Madeena Points and are not FHIR resources.

Stage earning rules:

- **Basic examination & vital signs:** becomes eligible when the required assessment completes
  and belongs to the worker holding `Nakes Pemeriksaan Dasar` recorded on that completion.
- **X-ray:** becomes eligible when Image Gateway durably accepts the complete capture
  set and belongs to the submitting worker holding `Radiografi`.
- **Same worker:** one operator holding multiple permissions who completes multiple
  stages receives each applicable stage earning independently.
- **Later repeat or doctor decision:** never cancels or revalues an already
  completed stage earning.

## Automated operator payouts

Operator Core automatically initiates an IDR transfer as soon as an earning
becomes eligible via its payment-gateway adapter. Operators enter and manage
their own bank-account destination through an approved secure authentication flow;
the exact re-authentication mechanism remains open.

MHCS absorbs transfer fees by default so the operator receives the full configured
earning.

## Cash closing

Operator Core submits the operator-counted cash total to Member Core after the
accepted queue is complete and all cash collections are final. Member Core
compares it with its cash ledger, closing as `reconciled` or `reconciliation_required`.

## Administrator capabilities

Global Admin / Super Admin manages:

- staff accounts, activation, suspension, and permission assignment (`TU / Registration`,
  `Nakes Pemeriksaan Dasar`, `Radiografi`);
- physical sites and operational status;
- multi-operator shift assignments;
- protocol templates and service-to-projection mappings;
- site-and-service basic examination and X-ray stage earning rates;
- display pairing revocation;
- payout-fee policy and payout suspension/resumption;
- identity dispute resolution and cash reconciliation; and
- queue-state corrections and monitoring.

## Member and Image Gateway contracts

- Operator module interacts with Member module locally for attendance queries,
  booking locator lookups, walk-in creation, arrival/check-in events, consent
  recording, and cash closing.
- Operator module interacts with Image Gateway module locally via `AcceptCompleteCaptureSet`
  command for durable source persistence and MPIPS orchestration.

## FHIR R5 boundary

- **FHIR release:** R5 `5.0.0` only.
- Resources: `Organization`, `Location`, `Practitioner`, `PractitionerRole`, `Encounter`.
- Operator Core does not create FHIR `Task` for internal queues or FHIR `Procedure`
  for X-ray.

## Security and audit requirements

- Enforce granular operational permissions (`TU / Registration`, `Nakes Pemeriksaan Dasar`,
  `Radiografi`), active site, and current shift assignment on every operation.
- Keep identity and clinical views private without permanent public links.
- Validate NPZ schema, bounds, dimensions, and checksums securely.
- Cryptographically verify payment confirmations.
- Audit all operational actions with actor, permission, site, target, action,
  reason, and timestamps.

## Acceptance criteria

Operator Core satisfies this specification when:

- [ ] Operational authorization enforces three independent permissions: `TU / Registration`, `Nakes Pemeriksaan Dasar`, and `Radiografi`.
- [ ] A staff account can be assigned one, two, or all three operational permissions.
- [ ] Existing MVP/beta operator accounts temporarily retain access to all three operational areas under transitional compatibility.
- [ ] New staff accounts require explicit administrator selection of operational permissions.
- [ ] Station selection routes work and calls but cannot grant or elevate permissions.
- [ ] Front-desk TU check-in verifies approved identity evidence and required comparison against stored Member Core records before check-in.
- [ ] Booking code functions as a reservation locator and does not bypass official identity verification.
- [ ] Paper informed consent is confirmed once for the visit before ticket issuance.
- [ ] Queue ticket thermal slip prints without displaying patient name or MRN.
- [ ] Basic examination completion releases ticket to X-ray and triggers basic exam stage earning.
- [ ] X-ray capture set submission requires Grabber NPZ review and triggers X-ray stage earning upon durable Image Gateway acceptance.
- [ ] A worker holding multiple permissions who completes both basic examination and X-ray receives both stage earnings independently.
- [ ] Public LCD displays show only ticket numbers and destinations (`PEMERIKSAAN DASAR`, `SESI FOTO RADIOGRAFI`) with zero clinical data.
- [ ] Read-only AI Results Status Monitor displays published AI results and supports on-demand printing.
- [ ] Authorized operators can download raw DICOM as authenticated `.dcm` attachments for current-shift examinations at their active site.
- [ ] Automated IDR payouts process eligible stage earnings.

## Open design decisions

The following decisions are intentionally unresolved by current human authority:

1. **Staff Permission Implementation Mechanism:** Technical implementation details in Laravel/Filament (e.g. Spatie Permission vs custom bitmask/boolean flags) for the three operator permissions.
2. **Beta Account Migration Mechanism:** Exact database migration and transition schedule for upgrading existing MVP/beta operator accounts to the granular permission model.
3. **Grabber NPZ Schema:** Representative NPZ schema, dimensions, and safe parsing limits.
4. **Payment Gateway Integration:** Payment provider adapter, account verification, transfer schemas, and fee contracts for operator payouts.
5. **Staff Credential & Regulatory Qualification Rules:** Formal regulatory qualification, certification evidence, and credential verification criteria for TU staff, basic examination nakes, and radiographers.
6. **On-Site Identity Verification Procedure:** Exact permitted evidence, comparison method, data minimization, retention, and storage mechanics at the TU station.
7. **FHIR R5 Conformance Artifacts:** Canonical URLs, package IDs, profiles, and validator fixtures.
