# MHCS Core Operator Module Specification

**Status:** Approved target foundation
**Last reviewed:** 28 July 2026

This document defines the Operator module in the approved `mhcs-core` modular
application. It distinguishes historical implementation evidence from the
approved target. The overall repository and runtime boundary is defined by the
[MHCS Core architecture](../mhcs-core/project.md).

## Purpose

Operator Core is the staff-facing module for examination-day operations. It
owns physical-site master data, operator accounts and assignments, arrivals,
identity-verification workflow, the operational queue, examination execution,
session-only NPZ drafts, submission to Image Gateway, read-only processed-image
viewing, operator earnings, and operator payouts.

Operator Core does not model a separate project entity. Sites, shifts,
bookings, queue items, and examinations provide the required business context.

## Users and authorization

Operator Core has two permissions:

- **Operator:** uses the front-desk and examination features. These are two
  stages in one application, not separate staff roles.
- **Global administrator:** manages every Operator Core site and operational
  configuration.

An administrator creates and activates every account; public self-registration
does not exist. One account may hold both permissions. Only an account with
Operator permission is represented as a FHIR `Practitioner`, with a
site-specific `PractitionerRole` for each authorized site. An
administrator-only account remains an ordinary application user.

An operator may be authorized for multiple sites but works in exactly one
active site context at a time. Switching sites requires confirmation, is
audited, and is blocked while the operator has an active examination, an
unfinished queue action, or an unclosed cash shift. The authenticated session
and assignment determine the active site; no module service credential exists.

Normal sign-in uses the approved account password and does not require MFA.
Rate limiting, secure session handling, and account lock controls still apply.
Financially sensitive payout-account changes require password
re-authentication and a one-time verification code.

## MHCS Core topology

Operator is a module in the single `mhcs-core` repository and runtime. It
shares authentication, database, queue, and deployment foundations with Member,
Doctor, and Image Gateway while retaining explicit business-rule and table
ownership.

Operator invokes Member and Image Gateway through local application contracts
and emits durable domain events for asynchronous work. It never uses internal
HTTP, Docker DNS, or service credentials to call another MHCS Core module.
Only the Image Gateway worker calls the separate private MPIPS API.

## Current verified foundation

The inspected application manages legacy projects, participants, arrivals,
queues, examinations, uploads, private S3-compatible storage, and completion
status. Its upload path accepts `.npz`, `.dcm`, and `.dicom` files up to 100 MB
using extension validation.

No verified end-to-end connection from the historical Operator repository to
Member, Image Gateway, or MPIPS was found. The current data model writes an NPZ key into both `npz_path` and
`original_dicom_path`. Operator and administrator preview paths then send the
stored object to a DICOM preview script, so NPZ preview is expected to fail.
These are current implementation findings, not approved target behavior.

## Site ownership and synchronization

Operator Core is the source authority for MHCS physical sites and the FHIR
`Organization` and `Location` records that identify them. A global
administrator creates and updates site identity, address, time zone,
operational status, and operator authorization.

The Member module references stable site identifiers and owns the booking catalogue,
shifts, quotas, prices, points, `Appointment`, and `ServiceRequest` associated
with each site. It cannot create a conflicting site master.

Disabling one site:

- immediately prevents new Member bookings for that site without
  affecting other sites;
- does not delete or silently cancel existing bookings; and
- sends existing bookings through the Member module's audited reschedule,
  cancellation, or refund handling.

Site changes and Member-owned booking availability commit through explicit
local module contracts. Versioned domain events handle asynchronous follow-up
without duplicating the site master.

## Shift eligibility and operator assignment

Member Core opens and owns bookable shifts. The initial advance-booking
eligibility threshold is five confirmed members, and the configured
advance-booking quota is between five and twenty. Member Core also owns the
global walk-in quota, initially five, making the current maximum accepted shift
capacity twenty-five. Walk-in-quota changes apply only to shifts that have not
started, while an active shift uses its snapshot.

Staffing is demand-triggered:

1. Members may book an open shift before an operator is assigned.
2. At five confirmed bookings, the Member module emits an idempotent
   `shift_eligible` domain event for the Operator module.
3. The global Operator Core administrator manually assigns exactly one
   operator to the shift.
4. The assignment is final and cannot be changed.
5. Only that assigned operator may verify arrivals, manage the queue, start
   examinations, upload captures, or submit examinations for the shift.

After assignment, later booking cancellations do not remove the operator or
cancel the shift merely because the confirmed count falls below five. Member
Core applies the configured cancellation cutoff and point-forfeiture rules.

Member Core administrators configure the eligibility-evaluation cutoff and the
member response window. If a shift remains below five at the cutoff, Member
Core first recommends shifts that are already eligible or closest to becoming
eligible. A member must explicitly choose the replacement. If no replacement
is chosen before the response window ends, Member Core cancels the original
booking and refunds all of its points.

Member Core also supplies a configurable staffing deadline. If an eligible
shift has no assigned operator by that deadline, new bookings stop and affected
members receive the same alternative-shift or full-refund flow. If the assigned
operator later becomes unavailable, the immutable assignment is not replaced;
the shift is cancelled and Member Core handles alternatives or refunds.

The initial product deliberately supports one assigned operator per site shift.
Multi-operator queue coordination is outside scope. Site schedules do not
overlap and include an operational gap, so Operator Core does not merge queues
between shifts.

## Attendance and identity verification

Operator Core obtains the current site's eligible attendance list from Member
Core and may use Member Core's exact-NIK lookup. NIK is entered from the
physical KTP or KIA and is never placed in a URL or copied into Operator Core's
long-term data. Member Core's one-active-booking-per-NIK rule means the lookup
returns at most one eligible booking.

The same assigned operator performs the front-desk and examination stages:

1. Record the member's physical arrival using its actual occurrence time.
2. Compare the physical KTP/KIA and arriving face with protected Member Core
   identity views.
3. Show the latest profile photograph first. Previous profile photographs are
   available only when the latest photograph is insufficient for verification.
4. Mark the booking `checked_in` only after successful verification.

KTP/KIA and profile photographs are purpose-bound, temporary, non-downloadable,
and available to the operator only during the active verification flow. Global
administrators have no general identity-photo browser. They receive temporary,
case-specific access only while deciding an audited verification dispute.

An optional on-site comparison photograph may be captured only with the
member's consent. Refusal never blocks verification, check-in, or examination.

An operator cannot override an unresolved mismatch. Check-in remains blocked
until a global administrator approves or rejects the case with a mandatory
reason. Member Core remains the authority for identity files, member accounts,
guardians, medical-record identifiers, and verification evidence.

## Vital signs

Operator Core initially records:

- systolic and diastolic blood pressure;
- body temperature;
- height;
- weight; and
- BMI calculated from height and weight.

Heart rate and oxygen saturation are not part of the initial form. A single
global Operator Core setting controls whether the configured measurements are
optional or mandatory; the default is optional. When mandatory, examination
start is blocked until each measurement is present or an allowed
`dataAbsentReason` is recorded. Fake placeholder values are prohibited.

Member Core is the FHIR `Observation` authority. Operator Core records the
measurement, performer, method when relevant, and actual time, then sends an
idempotent R5-compatible payload to Member Core. If Member Core is temporarily
unavailable, Operator Core durably queues the outbound record, allows the local
workflow to continue, retries automatically, and removes its temporary copy
only after Member Core confirms receipt.

## Queue rules

The queue has two ordered classes within a shift:

1. Advance bookings, ordered by successful check-in time.
2. Walk-ins, ordered by successful check-in time.

Every advance booking remains ahead of every walk-in until it is examined or
resolved. This includes an advance-booked member who has not arrived yet; the
booking blocks walk-ins until Member Core marks it `no_show` exactly at shift
end. Operator Core does not add a grace period.

A checked-in advance-booked member who does not answer when called may be
marked `temporarily_unavailable`, allowing the next advance booking to proceed.
The skipped member still remains ahead of every walk-in. If the member does not
return by shift end, the booking closes as `left_without_examination` and its
paid points are forfeited.

Before asking Member Core to charge and create a walk-in booking, Operator Core
checks the snapshotted walk-in quota and remaining operational time. It may
reject a same-shift walk-in and offer a later shift, but it may never exceed
Member Core's quota. Once a member is paid, accepted, and checked in, Operator
Core must complete the examination even if work continues beyond the nominal
shift end.

At shift end Operator Core:

- stops accepting new arrivals and walk-ins;
- allows every already checked-in member to finish; and
- enables cash closing only after the accepted queue is complete and every
  cash top-up has reached a final status.

## Walk-in boundary

Operator Core initiates the assisted walk-in flow, but Member Core owns the
member account, KTP/KIA and profile photographs, medical-record identifier,
guardian linkage, money-to-point conversion, immutable point ledger, booking,
and `ServiceRequest`.

An existing member uses the existing account and does not register again. A
new walk-in follows Member Core's registration requirements. Operator Core may
confirm cash received and may accept a top-up larger than the booking price,
but it never calculates points or mutates a wallet.

Operator Core appends the member to the end of its local walk-in queue only
after Member Core returns one successful idempotent response for registration,
top-up, charge, and booking as applicable. Member Core does not call back to
insert the queue item.

## Examination protocol configuration

The global Operator administrator maintains versioned X-ray protocol templates
and maps each Member service code to its required projections, such as PA, AP,
or lateral. The Member module continues to own the requested body
part, laterality, and service in `ServiceRequest`.

Operator Core snapshots the active protocol version when the examination
starts. Later protocol changes apply only to examinations that have not
started. Active and historical examinations retain their snapshot. An unmapped
service blocks examination start instead of asking an operator to guess the
required captures.

The operator may correct an incorrect requested body part or laterality before
submission without administrator approval. The correction requires a reason,
operator identity, and timestamp and must succeed through the Member module
before the examination continues. The Member module updates or replaces the
`ServiceRequest` with explicit lineage; the Operator module never keeps a
divergent order copy.

MHCS begins at the software handoff from Grabber. Activities and physical
exposure events inside the X-ray room are outside Operator Core's business
scope. Operator-error classification within MHCS is based on submitted digital
work and later doctor review, not on unobserved room activity.

## NPZ draft and submission flow

The target examination flow is:

1. The assigned operator calls the next member and starts the examination.
2. The Operator module creates the R5 `Encounter`, snapshots the protocol and
   earning rates, and updates the Member-owned booking in the same workflow.
3. Grabber produces patient-free radiograph NPZ captures and the required gain
   NPZ.
4. The operator drags one or more radiograph NPZ files and the matching gain
   NPZ into the active examination.
5. The Operator and Image Gateway modules validate actual content, required
   correlation, safe schema, fields, size, and compatibility. Renaming another
   file to `.npz` is insufficient.
6. The operator previews the image, confirms or corrects its actual projection,
   and explicitly confirms each required capture.
7. A required projection may be omitted only with a mandatory reason, such as
   a documented inability to position the member. The doctor later decides
   diagnostic sufficiency.
8. The operator clicks one Submit action for the complete confirmed set.
9. The Operator module invokes the Image Gateway module with the radiograph
   files, matching gain input, and immutable examination snapshot under one
   stable submission ID.
10. Durable acceptance by the Image Gateway module closes the active queue item
    and completes the Encounter. MPIPS, AI, and doctor processing continue
    asynchronously.

Only Grabber-produced radiograph and gain NPZ are accepted. Direct `.dcm` or
`.dicom` upload is prohibited. Patient identity is selected from the authorized
queue and is not inferred from filenames; both NPZ inputs remain patient-free.

Drafts deliberately do not survive navigation or restart. The browser warns
before refresh, navigation, close, or sign-out when a draft exists. Continuing
the action discards the draft, and the operator must drag the files again.
Removing an individual file requires no reason and deletes its temporary copy.
Orphaned temporary files from an abnormal browser or service exit are removed
by short-lived server cleanup and are never treated as submitted records.

The submitted capture metadata snapshot includes the member and order
references, site, Encounter, protocol version, body part, laterality, actual
projection per capture, gain identity, operator, timestamps, and
radiograph/gain checksums. It becomes immutable when submitted.

## Submission reliability and completion

The Image Gateway acceptance path treats queue execution, process restart, and
object-storage operations as fallible even though the module call is local.

- Transient queued or storage failures retry automatically in the background
  using the same submission ID.
- The operator sees `submission_pending`; duplicate retries return the original
  result and never create a second examination submission.
- The member remains in the active queue until durable acceptance.
- A permanent validation rejection returns the examination to an editable
  draft in the current session, identifies the invalid captures, and retains
  the failed attempt in the audit history.
- The Operator module deletes its temporary draft copies after the Image
  Gateway module confirms durable radiograph/gain storage. It keeps only the
  submission ID, checksums, status, frozen metadata reference, and audit data.
- The Image Gateway module is the sole durable owner of accepted NPZ and DICOM
  files.

Gateway acceptance means that the complete submitted byte set and metadata are
durably stored, authorized, checksum-verified, and recoverable by the stable
submission ID. Merely accepting the browser request or dispatching a local
command is not durable acceptance.

## Corrections and repeat examinations

A global administrator may correct an erroneous queue state. A correction
never deletes or silently overwrites history; it records the old value, new
value, reason, administrator, and timestamp.

An accepted submission attributed to the wrong member is never reassigned.
The original is invalidated through Image Gateway with preserved lineage, and
a new correctly identified submission is required. Operator Core does not
edit an accepted image set.

Only a doctor may declare an accepted study diagnostically insufficient and
request a clinical repeat. MPIPS and Operator Core cannot initiate that repeat.
The flow is:

1. Doctor Core records an immutable study-level `repeat_required` decision with
   one controlled preliminary reason and a clinical note.
2. Member Core creates one active linked, zero-point, doctor-only repeat
   entitlement and a replacement `ServiceRequest`.
3. If the member already has an active booking, the repeat remains unscheduled
   until that booking completes or is cancelled.
4. The member selects any compatible site and shift in Member Core.
5. The repeat consumes one advance-booking quota slot and follows normal
   advance-booking check-in priority.
6. Operator Core performs a new examination and submission. The original
   study and any original AI result remain unchanged; AI is not run again.

The controlled Doctor Core preliminary reasons are `operator_error`,
`equipment_failure`, `incorrect_order`, `medical_limitation`, and `other` with
a required explanation. They are clinical source evidence, not the final
operator-payment classification. A global Operator Core administrator records
the verified financial classification separately without editing the doctor's
decision.

Only one repeat entitlement may be active in a case chain at a time, but a
doctor may request another sequential repeat if the replacement study is also
unusable. Each study and quality decision remains distinct. A repeat
entitlement does not expire automatically and no repeat charges the member.

The repeat does not charge the member. It creates a new `ServiceRequest` and
Encounter linked to the original request and study rather than reopening or
overwriting completed records.

## Read-only image access

An ordinary operator may view only current-shift examinations at the active
site and explicitly reopened repeat or correction cases. A global administrator
may view operational cases across all sites. Neither permission may browse
identity photographs outside the separate verification rules.

The Operator Core DICOM viewer is read-only:

- it automatically applies DICOM Window Center/Width or VOI LUT information;
- zoom and pan are allowed;
- manual window/level, contrast, brightness, rotation, annotations,
  measurements, and saved presentation state are disabled; and
- raw DICOM and raw NPZ download are disabled for operators and administrators.

Image Gateway supplies short-lived, purpose-bound references. Operator Core
does not persist a second result-file copy. Operators may see processing and
image-availability status but never AI diagnoses or doctor reports.

## Operator earnings

Operator earnings are ordinary Operator Core financial records denominated in
Indonesian rupiah. They are not Madeena Points and are not FHIR resources.

The global administrator configures site-specific rates for each examination
service. A combined AI-and-doctor service has separate AI-stage and
doctor-stage rates. Operator Core snapshots the applicable rates when the
examination starts; later changes affect only examinations that have not
started and never revalue historical earnings.

Earning rules are:

- **AI stage:** becomes eligible when the AI result is delivered or when all
  AI retries and fallback processing reach terminal failure. A downstream AI
  failure does not penalize the operator.
- **Doctor stage:** becomes eligible only when the doctor records an explicit
  `usable` decision for that examination's `ImagingStudy`.
- **Combined service:** pays the AI and doctor stages independently, in that
  order. An already-paid AI stage is not clawed back if the doctor later
  requests a repeat.
- **Doctor-only service:** has only the doctor stage.
- **Repeat caused by operator error:** the original doctor stage is cancelled.
  Ordinary patient movement is classified as operator error within this
  payment rule.
- **Verified cause outside operator control:** equipment failure, an incorrect
  order, or documented medical inability despite proper guidance does not
  cancel the original doctor-stage earning. A global administrator verifies
  the reason, and that verified decision makes the original doctor stage
  eligible even though a repeat is required.
- **Successful repeat:** the repeat operator receives one doctor-stage earning.
  The repeat is doctor-only and creates no second AI-stage earning.
- **Sequential repeats:** every examination is evaluated independently. An
  unusable replacement follows the same cause and eligibility rules, while the
  operator of the eventual usable replacement receives its own doctor-stage
  earning.

Each earning transition uses a stable event ID, preserves its source event and
rate snapshot, and is idempotent. Gateway acceptance alone never makes an
earning eligible.

## Automated operator payouts

Operator Core owns its payment-gateway adapter and automatically initiates an
IDR transfer as soon as an earning becomes eligible. Administrator approval is
not required.

Operators enter and manage their own bank-account destination. A new or changed
destination must:

- be confirmed through password re-authentication and a one-time code;
- be verified through the payment gateway before use; and
- apply only to payouts that have not started.

Administrators cannot create or edit an operator's bank destination. They may
suspend or resume payouts for a suspected fraud or account problem with a
mandatory audited reason. Earnings remain intact while suspended or while no
verified destination exists and are paid automatically after the block is
resolved.

Each payout snapshots its verified destination, earning IDs, gross amount, fee
policy, and idempotency key when processing starts. Changing bank details never
redirects an in-flight payout.

Payout behavior is:

```text
eligible -> queued -> processing -> paid
                         |          ^
                         +-> retry -+
                         +-> failed_permanent -> queued_after_account_fix
```

- Temporary gateway failures retry automatically with the same payout ID.
- Operator Core marks a payout `paid` only after verifying the gateway's signed
  success callback; an initial API response is not final proof.
- Callback signature, timestamp, event identity, and replay protection are
  verified before any state change.
- Permanent rejection pauses that operator's future payouts and notifies the
  operator and administrator to verify or replace the destination.
- Reconciliation checks recover a successful gateway transfer whose callback
  was delayed or lost without issuing a duplicate transfer.

One global setting controls payment-gateway transfer-fee treatment. The current
default makes MHCS absorb the fee so the operator receives the full configured
earning. An administrator may change the global policy; the new value applies
only to payouts that have not started.

## Cash closing

Operator Core submits the operator-counted cash total to Member Core only after
the accepted queue is complete and every cash top-up is final. Member Core
compares it with its authoritative cash ledger.

A match closes as `reconciled`. A difference closes as
`reconciliation_required` without changing member points or completed
bookings. Global administrator resolution preserves the original Operator Core
count, Member Core count, difference, reason, actor, and timestamps.

An unclosed cash shift blocks site switching for the responsible operator.

## Administrator capabilities

The global Operator Core administrator may:

- create, activate, suspend, and authorize operator accounts;
- create, update, disable, and synchronize sites;
- assign exactly one operator after a shift becomes eligible;
- configure versioned service-to-projection protocol mappings;
- configure the global vital-sign requirement;
- configure site-and-service earning rates and combined-service stages;
- configure the global payout-fee policy;
- suspend and resume payouts without editing bank destinations;
- verify the operator-payment classification for doctor-requested repeats
  without changing the doctor's source quality decision;
- resolve identity disputes and cash reconciliation;
- perform audited queue-state corrections; and
- monitor submissions, processing, earnings, and payout status.

The administrator does not own Member Core shifts, quotas, service prices,
points, bookings, member accounts, or KTP/KIA/profile-photo storage. The
administrator cannot download raw NPZ or DICOM, alter accepted images, browse
identity photographs, reassign an already assigned shift, or delete audit
history.

## Application API surface

The browser-facing API uses authenticated operator sessions, CSRF protection
for state changes, active-site and assigned-shift authorization, and no-store
responses for identity or clinical data. Representative target routes are:

| Method and route | Purpose |
|---|---|
| `GET /api/v1/shifts/{shift_id}/queue` | Read the assigned shift queue |
| `POST /api/v1/shifts/{shift_id}/arrivals` | Record an arrival and begin verification |
| `POST /api/v1/verification/{id}/decision` | Submit operator verification or global-admin dispute decision |
| `POST /api/v1/examinations` | Start one authorized queue examination |
| `POST /api/v1/examinations/{id}/vital-signs` | Record the configured vital signs |
| `POST /api/v1/examinations/{id}/captures` | Upload and validate one session-only NPZ draft capture |
| `DELETE /api/v1/examinations/{id}/captures/{capture_id}` | Remove one temporary draft capture |
| `POST /api/v1/examinations/{id}/captures/{capture_id}/confirm` | Confirm actual projection and image review |
| `POST /api/v1/examinations/{id}/submit` | Freeze and submit the confirmed capture set |
| `GET /api/v1/examinations/{id}/submission` | Read durable-acceptance or processing status |
| `POST /api/v1/cash-shifts/{id}/close` | Submit the counted cash after queue completion |
| `PUT /api/v1/me/payout-account` | Step-up authenticate and verify a payout destination |
| `GET /api/v1/me/earnings` | Read the operator's earnings and payout status |

Every state-changing request uses one client-generated idempotency key where a
retry is possible. A route never trusts an operator ID, site ID, shift ID, or
member ID from the body without reconciling it to the authenticated session and
authorized server-side record.

## Member module contract

The Operator module uses explicit local Member module commands and queries for:

- attendance and exact-NIK lookup;
- protected KTP/KIA and profile-photo upload references for new walk-ins;
- idempotent walk-in creation, cash top-up, point charge, and booking;
- `arrived`, examination-started, and examination-completed events;
- identity-verification views and decisions;
- body-part/laterality order correction;
- vital-sign recording and correction;
- repeat scheduling through the member application; and
- end-of-shift cash closing.

State changes preserve actual occurrence time, stable event ID, authenticated
actor, site, and authoritative version. A transition that changes both modules'
records commits in one database transaction where practical. If a
pre-shift-end arrival is handled after the Member module automatically marks a
booking `no_show`, the trusted occurrence time may correct the status while
preserving both audit events.

The versioned `shift_eligible` domain event identifies the Member-owned shift,
site, start/end, booking count,
eligibility threshold, booking quota, walk-in quota snapshot, staffing
deadline, event type, and source version. Repeating an event returns the
original result. An older version cannot overwrite a newer shift snapshot.

The Member module reads Operator-owned site identity through a local query that
returns stable site identifiers, FHIR references, name, address, time zone,
operational status, version, and update time. The query exposes no operator
accounts, earnings, or payout data.

## Image Gateway module contract

After the authenticated browser submits the complete set to `mhcs-core`, the
Operator module invokes one local, idempotent `AcceptCompleteCaptureSet`
command on the Image Gateway module.

The command contains one immutable metadata manifest, every confirmed
radiograph NPZ, and the required matching gain NPZ input. The manifest includes
file names used only for correlation, byte sizes, radiograph/gain checksums,
gain identity, capture IDs, projections, protocol and order snapshots, FHIR
references, site, operator, and occurrence times.

The Image Gateway module returns one of these semantic outcomes:

- `durably_accepted`: all bytes and metadata are stored and checksum-verified;
- `pending`: the same submission is still being resolved and may be polled or
  retried with the same ID;
- `rejected`: a permanent validation or authorization error identifies the
  rejected fields or capture IDs without exposing secrets; or
- a transient service error that is safe to retry with the same ID.

The Operator module closes the queue only for `durably_accepted`. The module
command and durable storage record commit without an internal HTTP hop. A
repeated command with the same ID and payload returns the original submission;
reusing the ID with different bytes or metadata fails as an idempotency
conflict.

## Earnings and payment event contracts

Versioned domain events create Operator earnings inside `mhcs-core`. Allowed
event types include AI delivery, AI terminal failure, `quality_accepted`, and
`repeat_required`. Only the Doctor module emits the study-level doctor quality
events. The source module, doctor decision,
`ImagingStudy`, examination, submission, service stage, occurrence time,
source version, and original event identifier are mandatory.

`repeat_required` also carries the doctor's controlled preliminary reason.
The Operator module stores it unchanged and requires a separate audited
administrator classification before resolving whether operator error cancels
the original doctor-stage earning or a verified external cause makes it
eligible. Replayed, corrected, and sequential decisions preserve event lineage.
The Operator module rejects an event that does not match its immutable examination,
study, service-stage, and rate snapshots.

Payment gateway callbacks use a provider-adapter route such as:

```http
POST /api/v1/payment-gateway/webhooks
```

The raw request body is verified before parsing or state mutation. Provider
event IDs are unique, callbacks are idempotent, secrets never enter logs, and
unknown payout references fail closed. Exact provider paths and fields remain
pending selection of the payment gateway.

## Common API errors

Operator Core APIs use stable application error codes. FHIR endpoints use R5
`OperationOutcome` instead.

| HTTP | Example code | Meaning |
|---:|---|---|
| `400` | `INVALID_REQUEST` | Malformed field or unsupported transition |
| `401` | `UNAUTHENTICATED` | Missing or invalid user session |
| `403` | `SITE_FORBIDDEN` | Account is not authorized for the site |
| `403` | `SHIFT_NOT_ASSIGNED` | Operator is not the shift's immutable assignee |
| `404` | `NOT_FOUND` | Authorized record does not exist; identity lookup does not reveal existence |
| `409` | `STATE_CONFLICT` | Current state no longer permits the action |
| `409` | `IDEMPOTENCY_CONFLICT` | Same key was reused with different input |
| `409` | `DRAFT_INCOMPLETE` | Required capture confirmation or omission reason is missing |
| `422` | `INVALID_NPZ` | File content or schema is incompatible or unsafe |
| `422` | `PROTOCOL_UNMAPPED` | Service has no active protocol mapping |
| `423` | `PAYOUT_SUSPENDED` | Earnings are preserved but transfer is paused |
| `429` | `RATE_LIMITED` | Login, identity, or financial endpoint limit exceeded |
| `503` | `DEPENDENCY_UNAVAILABLE` | Required service cannot currently complete the action |

Errors never include credentials, raw identity documents, full NIK, NPZ
content, bank-account details, clinical payloads, or provider secrets.

## FHIR R5 boundary

The sole interoperability target is HL7 FHIR R5 `5.0.0`. FHIR is used at the
clinical and organizational boundary; local queues, drafts, shift assignment,
earnings, payouts, retries, and cash reconciliation remain ordinary application
models.

Operator Core is the source authority for:

| Resource | Operator Core responsibility |
|---|---|
| `Organization` | MHCS operational organization identity used by its sites |
| `Location` | Physical examination site master and operational status |
| `Practitioner` | Operator staff with operational permission |
| `PractitionerRole` | Operator authorization at a site |
| `Encounter` | The performed examination visit from start to completion |

The Operator module reads Member-owned references to `Patient`, `Appointment`,
and `ServiceRequest`. It records vital signs through the Member module, which
owns the resulting `Observation`. The Image Gateway module owns
`ImagingStudy`; the Doctor module owns the doctor `DiagnosticReport`.

The required radiology chain is:

```text
Patient + booked Appointment + ServiceRequest
  -> arrival and verified check-in on Appointment
  -> examination Encounter
  -> ImagingStudy basedOn ServiceRequest and linked to Encounter
  -> optional AI Observation and/or doctor DiagnosticReport
```

Operator Core does not create a FHIR `Task` for its internal queue and does not
create a FHIR `Procedure` for the X-ray. Neither resource adds information to
the approved workflow: queue coordination is local, while `ServiceRequest`,
`Encounter`, and `ImagingStudy` represent the requested, performed, and imaged
clinical context.

### Appointment and Encounter states

- The Member module maps physical arrival to `Appointment.status = arrived`.
- Successful identity and administrative verification maps it to
  `Appointment.status = checked-in`.
- Operator Core creates `Encounter.status = in-progress` only when the
  examination starts and links it to the Appointment and ServiceRequest.
- The Member module then maps the Appointment to `fulfilled`; its planning lifecycle
  remains fulfilled while Encounter tracks clinical execution.
- Image Gateway module durable acceptance maps the Encounter to `completed`.
- An examination started but unable to finish maps to `discontinued` with an
  appropriate reason.
- `left_without_examination` before examination start creates no Encounter.
- A mistakenly created encounter is retained as `entered-in-error` with
  provenance; it is never deleted.

A doctor-requested repeat uses a new linked ServiceRequest, Appointment, and
Encounter. It does not reopen the original completed Encounter.

### Clinical metadata

Every capture freezes the actual projection and applicable anatomy and
laterality. Image Gateway maps the frozen data to the DICOM study and R5
`ImagingStudy`. Requested and performed identifiers, local UUIDs, FHIR logical
IDs, accession numbers, and DICOM UIDs remain distinct.

Vital signs use the R5 Vital Signs profiles, LOINC measurement codes, numeric
UCUM units, subject, effective time, performer, status, and an allowed absence
reason where applicable. Operator Core never invents clinical terminology from
a display label.

### Conformance

Operator Core must not claim profile conformance until the MHCS R5
Implementation Guide package, canonical URLs, profile versions,
`CapabilityStatement`, terminology bindings, examples, validator fixtures, and
negative tests exist. When enabled, `GET /fhir/r5/metadata` declares only the
implemented R5 resources, interactions, searches, formats, and profiles.

FHIR-aware errors return `OperationOutcome`. Exchanged profiled resources
declare the applicable canonical URL in `meta.profile`. Unsupported resources,
profiles, interactions, or search parameters fail explicitly rather than being
accepted as arbitrary JSON.

## Security and audit requirements

- Enforce operator permission, active site, immutable shift assignment, and
  examination scope on every request.
- Derive operator, role, site, shift, and examination scope from the shared
  authenticated application context; caller-supplied identifiers never grant
  access.
- Keep identity and clinical responses private with `Cache-Control: no-store`
  and never expose permanent object URLs.
- Validate NPZ as untrusted input before processing. Extension checks are
  insufficient; production validation must not execute pickle payloads at the
  upload boundary.
- Bound multipart count, per-file and total size, decompression, dimensions,
  fields, and processing time after real Grabber files establish safe limits.
- Verify checksums before durable acceptance and use immutable submission
  manifests.
- Verify payment callbacks cryptographically and protect against replay,
  duplicate transfers, destination substitution, and log leakage.
- Audit identity views, exact-NIK lookups, administrator decisions, site and
  protocol changes, order corrections, queue corrections, submissions,
  earning changes, bank verification, payout actions, and cash reconciliation.
- Audit records include actor, permission, site, target, action, previous and
  new state where applicable, reason, occurrence time, recording time, request
  ID, and source module or external adapter. They are append-only and contain no raw secrets or
  clinical binaries.

## Does not own

Operator Core does not own:

- Member module shifts, booking quota, walk-in quota, service prices, points,
  member charges, bookings, member accounts, guardians, or notifications;
- permanent KTP/KIA/profile-photo, NPZ, or DICOM storage;
- X-ray-room activity or physical exposure-incident tracking;
- NPZ-to-DICOM algorithms;
- AI execution, fallback selection, or AI clinical output;
- doctor queue, report, or doctor earnings;
- member-facing result publication; or
- payment-gateway integrations belonging to the Member or Doctor modules.

## Readiness and external gates

**Historical current evidence:** Legacy project/participant workflow, arrivals, queues,
examinations, extension-based upload, private object storage, and completion
status exist.

**Target:** The role model, site authority, demand-triggered staffing, queue
rules, protected identity flow, local vital-sign contract, protocol versioning,
session-only multi-capture drafts, safe NPZ validation, idempotent gateway
submission, read-only viewer, earning stages, payout gateway, FHIR R5 mapping,
and all cross-module contracts require verification or implementation.

The following external artifacts are still required before implementation can
be considered ready:

- representative Grabber NPZ files and the authoritative safe schema;
- measured NPZ size and dimension limits;
- the selected payment gateway's account-verification, transfer, webhook,
  idempotency, reconciliation, fee, and sandbox contracts; and
- the MHCS FHIR R5 Implementation Guide canonical URL, package ID, version,
  profiles, terminology, and validation fixtures.

No current-state claim in this document proves that the target exists in the
application repository.
