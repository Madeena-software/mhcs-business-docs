# System Responsibilities

This document defines ownership and collaboration in the approved target
architecture: one `mhcs-core` application repository containing Member, Operator,
Doctor, and Image Gateway modules, plus the separate `mpips` black-box
conversion repository.

## Responsibility map

| Module or component | Owns | Receives | Produces |
|---|---|---|---|
| Member module in `mhcs-core` | Member identity, medical-record ID, catalogue, B2B/B2C booking, doctor-requested repeat entitlements, source-restricted points, payment, notifications, and result presentation | Member activity, clinical repeat commands, and member-safe result references | Attendance, examination snapshot, repeat status, and member-facing information |
| Operator module in `mhcs-core` | Physical sites, multi-operator staffing, consent confirmation, completed paper-questionnaire evidence, staged queues, basic examination & vital signs capture, multi-capture Submit, LCD calling, operator earnings, and payouts | Attendance, longitudinal-data recording outcomes, durable image acceptance, image and AI status | Site data, queue state, complete radiograph/gain NPZ submission, and operator status |
| Grabber | Offline-capable X-ray capture | X-ray equipment | Patient-free radiograph NPZ captures and matching gain NPZ input |
| Image Gateway module in `mhcs-core` | Private durable source and NPZ/DICOM storage, atomic source acceptance, queued MPIPS orchestration, routing, access, publication, and audit | Local complete-submission commands and external processing results | MPIPS conversion jobs, authorised references, completion, and publication events |
| `mpips` repository | Public GitHub repository containing the black-box radiograph NPZ plus gain NPZ conversion through a private MHCS processing service/API boundary | Patient-free NPZ inputs and a signed DICOM metadata manifest | DICOM and correlated technical status |
| Doctor module in `mhcs-core` | Shared doctor queue, study-level quality decisions, repeat requests, reports, amendments, doctor earnings, and payouts | Eligible and replacement studies, supporting output, and repeat status | Quality events, repeat commands, reports, revisions, earnings, and payout status |

Detailed foundations:

- [MHCS Core architecture](../technical/mhcs-core/project.md)
- [Member module](../technical/mhcs-core/modules/member/project.md)
- [Operator module](../technical/mhcs-core/modules/operator/project.md)
- [Image Gateway module](../technical/mhcs-core/modules/image-gateway/project.md)
- [MPIPS additions required by MHCS](../technical/mpips/project.md)
- [Doctor module](../technical/mhcs-core/modules/doctor/project.md)

## Member Core

### Owns

- globally unique medical-record IDs;
- member accounts and profiles;
- B2B and B2C booking, cancellation rules, member charges, and payment;
- individual Madeena Points wallets with business-funded reservations kept
  separate from personal top-ups;
- walk-in registration and payment;
- service choices per examination type or body part;
- zero-point, doctor-only repeat entitlements and member-controlled repeat
  scheduling;
- member notifications; and
- member image and result experience.

### Target handoffs

Member Core supplies authorised attendance and examination information to
Operator Core. It receives temporary image references, AI results, doctor
reports, and amendments through Image Gateway.

At front-desk check-in, Operator Core records the signed paper consent and its
required private scan once for the visit. The Operator workflow also retains
private evidence that the approved paper questionnaire was completed before
basic examination completion. Downstream stations do not ask for consent
again, and neither paper artefact is exposed to the Member or public displays.

Member Core accepts authenticated, idempotent repeat requests only from Doctor
Core. It creates one active zero-point, doctor-only entitlement, notifies the
member, lets the member choose any compatible site and shift, and returns
entitlement or decline status to Doctor Core. A scheduled repeat consumes
ordinary booking capacity and does not request AI.

Members view completed images and export TIFF, JPG, or PDF. Member Core does
not store raw NPZ or permanent DICOM copies.

### B2B and B2C target rules

B2B is the initial commercial priority, but the same member account also
supports B2C. After an agreement and its data exist, an MHCS developer will use
a later manual script to import the business's members and complete bookings.
The business pays annual member fees centrally; their value becomes reserved
Madeena Points in each member's individual wallet. The business determines the
service, location, date, and shift, and the member cannot cancel or reschedule
that booking. Only an MHCS administrator acting on an official business request
may change it. A no-show remains paid and consumes the business quota.

Members may add personal points and create additional B2C bookings in the same
account. Business-funded points cannot pay for B2C bookings, and personal points
never cover a B2B funding mismatch. Family accounts are B2C accounts grouped by
protected KK data; email and phone remain optional.

Imported members receive unique random temporary passwords and must change
them on first login. MHCS distributes a credentials document to the designated
business contact outside Member Core. Members without email or phone use NIK
to log in and contact an MHCS administrator for recovery with NIK/KK
verification.

## Operator Core

### Owns

- physical-site master data and operator shift assignment;
- audited assignment of multiple interchangeable operators per shift;
- front-desk registration, paper-consent confirmation, arrivals, and identity
  verification;
- one site-and-shift ticket across ready-time FIFO basic examination & vital signs and X-ray queues;
- atomic stage claims, public number-to-station calls for PEMERIKSAAN DASAR and SESI FOTO RADIOGRAFI, and paired LCD sessions;
- basic examination & vital signs measurements, point-of-care screening, and structured interview capture;
- multi-capture NPZ draft set;
- removal and retake before Submit;
- one Submit action for the complete set;
- processing status, image viewing, and read-only AI Results Status Monitor; and
- configured basic examination & vital signs and X-ray earnings and automated rupiah payouts.

### Target handoffs

The Operator module hands patient-free radiograph NPZ captures, their matching
gain NPZ input, and a frozen member/examination snapshot to the Image Gateway
module.

Basic examination & vital signs completion releases the same ticket to X-ray and makes the completing
worker's basic examination & vital signs earning eligible. Gateway acceptance completes X-ray, releases
processing to Image Gateway, and makes the submitting worker's X-ray earning
eligible. Asynchronous AI completion automatically marks the ticket as completed.

## Grabber

Grabber captures images and calibration input only. It may remain offline and
produces patient-free radiograph NPZ captures plus the required gain NPZ. The
operator opens MHCS Core on the Grabber computer and uploads the inputs into the
active examination.

The Grabber computer is dedicated to authorised staff. The exact radiograph
and gain NPZ schemas are open design decisions.

Gain and calibration details remain inside the Grabber/MPIPS boundary. Grabber
supplies the matching gain NPZ and the MPIPS technical team validates it
without making those internals an MHCS responsibility.

Grabber does not fetch member data, create DICOM, or publish results.

## Image Gateway

### Owns

- durable private persistence and atomic acceptance of a complete submission;
- indefinite NPZ and DICOM storage;
- non-public plain original bytes with opaque keys, integrity metadata,
  grant-controlled access, and TLS/private infrastructure; application-side
  object encryption is not part of the current policy;
- organisation-isolated storage;
- MPIPS coordination;
- three total attempts for a failed capture;
- email notification after final failure;
- AI and doctor routing, including the AI-readiness event used for member publication and automatic ticket completion;
- temporary authorised links;
- complete-image publication;
- report-version distribution; and
- the operator-payment eligibility event.

### Completion boundary

Each successful DICOM becomes available to an authenticated Operator whose
active site and current shift authorise the examination. The complete image
set is published to Member and Doctor only after every submitted radiograph NPZ
has produced DICOM. Successful source components and sibling files are
preserved during a partial failure, but the incomplete set remains hidden from
the Member and Doctor.

## MPIPS

### MHCS responsibility

MPIPS receives one patient-free radiograph NPZ, its matching patient-free gain
NPZ, and a separately signed DICOM metadata manifest from Image Gateway, then
returns one DICOM result.

Image Gateway owns retries, permanent storage policy, whole-examination
completion, publication, and payment meaning.

The [MPIPS document](../technical/mpips/project.md) is the authoritative
transport and security contract for this boundary.

## Doctor Core

### Owns

- a shared work queue that doctors claim from;
- case release and administrator reassignment;
- study viewing;
- explicit, audited DICOM download when clinically necessary;
- immutable study-level `usable` or `repeat_required` decisions;
- controlled repeat reasons and the clinical repeat handoff to Member Core;
- draft, final, corrected, and amended reports; and
- doctor earnings and daily automated payouts.

### Report and payment boundary

An explicit usable decision remains part of the clinical workflow and does not
change completed Operator stage earnings. A repeat request preserves the draft,
blocks final submission, and becomes a 25% doctor earning only after Member
Core confirms creation of the repeat entitlement. Each separately accepted
sequential repeat creates another 25% earning.

Submit finalises a report, creates a 100% final-report earning for the signing
doctor, and starts automatic member publication. An unfinished draft creates no
earning. Reassignment preserves earnings already triggered by completed work.

A submitted report is immutable. A necessary correction may be issued at any
time, preserves the original, and does not create another payment.

Eligible doctor earnings are combined into one automatic daily payout with no
minimum positive balance. MHCS absorbs transfer fees by default. Doctors manage
their own verified bank destination; administrators may suspend payouts but
cannot edit that destination.

## Payment ownership and triggers

| Payment area | Owning module | Eligibility trigger |
|---|---|---|
| Business-funded member charge | Member Core | Central annual payment becomes member-specific reserved points allocated to the agreed B2B entitlement or booking |
| Personal member charge | Member Core | Personal Madeena Points fund B2C bookings; walk-in payment completes before operator confirmation |
| Operator earning and payout | Operator Core | Basic examination & vital signs completion and durable X-ray submission acceptance each trigger their configured stage rate |
| Doctor repeat-assessment earning | Doctor Core | Member Core confirms one doctor-requested repeat entitlement: 25% of the snapshotted final-report rate |
| Doctor final-report earning | Doctor Core | The signing doctor submits the completed report: 100% of the snapshotted final-report rate |

Gateway acceptance is the X-ray-stage earning trigger. DICOM completion and
doctor-queue entry do not create additional operator earnings.

## Access map

| User | Raw NPZ | View image | Raw DICOM download | AI result | Doctor report |
|---|---:|---:|---:|---:|---:|
| Member | No | Yes | No | When selected | When selected |
| Operator | No | Yes, as each authorised DICOM is available | Yes, authenticated `.dcm` attachment when the active site and current shift authorise the examination | Read-only view via AI Results Status Monitor | No |
| Doctor | No | Yes | Explicit, audited clinical need | If available | Own workflow |
| Image Gateway administrator | Controlled backend access | As required for administration | Controlled backend access | Routing context | Version/audit context |

Members may export TIFF, JPG, or PDF.

Operator raw-DICOM downloads are authenticated, non-public attachments with no
permanent public URL. They do not require the Doctor workflow's short-lived,
declared-purpose, mandatory application-audit process. Members still do not
receive raw DICOM, and Operators never receive raw NPZ.

## FHIR R5 boundary

HL7 FHIR R5 `5.0.0` clinical structures apply to:

- patient identity;
- examinations;
- imaging studies; and
- clinical reports.

Queues, payments, retries, storage administration, and other non-clinical
operations use ordinary module contracts and domain events.

Doctor Core does not represent its queue, claims, assignments, deadlines, or
repeat-entitlement state as FHIR `Task`. A repeat creates new linked
`ServiceRequest`, `Appointment`, `Encounter`, and `ImagingStudy` resources while
preserving the original chain.

## Open design decisions

The following are intentionally deferred to module-specific technical plans:

- whether the Grabber NPZ contains TIFF bytes, a raw numeric image array, or
  both, and whether it matches MPIPS's required fields;
- exact FHIR R5 profiles, field mappings, conformance artifacts, and validation;
- exact DICOM metadata mapping and validation;
- external-boundary authentication and authorisation;
- upload, object-reference, checksum, and idempotency contracts;
- retry intervals;
- notification configuration;
- short-lived-link authorisation, expiry, and audit details;
- exact AI provider and body-part routing definitions in code;
- deployment and storage infrastructure; and
- automated verification.

The business ownership and triggers above are approved architectural
constraints.

## External references

Doctor-access and report-amendment rules use:

- [DICOM WADO-RS rendered retrieval](https://dicom.nema.org/medical/Dicom/2016d/output/chtml/part18/sect_6.5.8.html);
- [DICOM WADO-RS study retrieval](https://dicom.nema.org/medical/dicom/2017b/output/chtml/part18/sect_6.5.html);
- [HL7 FHIR DiagnosticReport](https://hl7.org/fhir/diagnosticreport.html);
- [Indonesian Ministry of Health Regulation No. 24 of 2022](https://jdih.kemkes.go.id/common/dokumen/2022permenkes024.pdf); and
- [ACR Practice Parameter for Communication of Diagnostic Imaging Findings](https://www.acr.org/-/media/acr/files/practice-parameters/communicationdiag.pdf).

External requirements must be revalidated before a compliance claim.
