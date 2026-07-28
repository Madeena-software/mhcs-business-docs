# System Responsibilities and Readiness

This document records module ownership, target handoffs, and what could be
verified from the historical application repositories on 19 July 2026.

## Evidence scope and checkpoints

Current-state findings were inspected at these repository checkpoints:

- `mhcs-member-core`: `main` at
  `452b1264fa6a2ddf0f5d1d92224db09b33677d6f`;
- `mhcs-operator-core`: `main` at
  `e520a8bada30b3f527ddbc23ae07a087fa236379`;
- `mpips`: `adlan` at
  `a98ed1e6517fc181a1e44a5cd6e034d9eaf12848`;
- `mhcs-image-gateway`: empty `main` checkout with no commits; and
- `mhcs-doctor-core`: unavailable for inspection.

These separate repositories are historical implementation evidence, not the
approved target topology. The target has one `mhcs-core` repository containing
Member, Operator, Doctor, and Image Gateway modules, plus the separate `mpips`
black-box conversion repository.

The Grabber source was not inspected. Target behavior records explicit
business decisions approved through 28 July 2026 and must not be presented as
implemented behavior.

## Responsibility map

| Module or component | Owns | Receives | Produces | Readiness |
|---|---|---|---|---|
| Member module in `mhcs-core` | Member identity, medical-record ID, catalogue, B2B/B2C booking, doctor-requested repeat entitlements, source-restricted points, payment, notifications, and result presentation | Member activity, clinical repeat commands, and member-safe result references | Attendance, examination snapshot, repeat status, and member-facing information | **Historical foundation:** core member workflow exists; new-repository implementation and expanded target behavior remain unverified |
| Operator module in `mhcs-core` | Physical sites, operator staffing, front-desk features, queues, multi-capture Submit, image viewing, operator earnings, and payouts | Attendance, durable image acceptance, image status, quality decisions, and payment events | Site data, queue state, complete radiograph/gain NPZ submission, frozen metadata, and operator status | **Historical foundation:** operational workflow and uploads exist; new-repository implementation and target flow remain unverified |
| Grabber | Offline-capable X-ray capture | X-ray equipment | Patient-free radiograph NPZ captures and matching gain NPZ input | **Business direction:** source was not inspected |
| Image Gateway module in `mhcs-core` | Permanent NPZ/DICOM storage, MPIPS orchestration, routing, access, publication, and audit | Local complete-submission commands and external processing results | MPIPS conversion jobs, authorised references, completion, and publication events | **Target module:** historical checkout had no commits |
| `mpips` repository | Black-box radiograph NPZ plus gain NPZ conversion | Patient-free NPZ inputs and a signed DICOM metadata manifest | DICOM and correlated technical status | **Current capability:** NPZ workflow exists; private production API remains unverified |
| Doctor module in `mhcs-core` | Shared doctor queue, study-level quality decisions, repeat requests, reports, amendments, doctor earnings, and payouts | Eligible and replacement studies, supporting output, and repeat status | Quality events, repeat commands, reports, revisions, earnings, and payout status | **Unknown/target module:** historical repository was unavailable |

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

### Current evidence

Core member, booking, payment, notification, operator-integration, and
image-result receiving foundations exist. The approved target flow is not
verified end to end.

## Operator Core

### Owns

- physical-site master data and operator shift assignment;
- front-desk features, arrivals, identity verification, and queue order;
- selection of the active examination;
- multi-capture NPZ draft set;
- removal and retake before Submit;
- one Submit action for the complete set;
- processing status and image viewing; and
- operator earnings and automated rupiah payouts.

### Target handoffs

The Operator module hands patient-free radiograph NPZ captures, their matching
gain NPZ input, and a frozen member/examination snapshot to the Image Gateway
module.

Gateway acceptance closes the active queue item. An AI-stage earning becomes
eligible after AI delivery to the member or terminal failure after fallback. A
doctor-stage earning becomes eligible only after a doctor confirms diagnostic
usability. A combined service pays both configured stages independently.

### Current evidence

Front desk, queues, examination status, and private S3-compatible uploads
exist. The current upload path accepts `.npz`, `.dcm`, and `.dicom` files up
to 100 MB using extension validation. It writes an NPZ object key to both
`npz_path` and `original_dicom_path`, then the operator and administrator
preview paths send that object to a DICOM preview script. NPZ preview is
therefore expected to fail, and extension validation does not prove the NPZ
schema or content.

No verified gateway or MPIPS connection exists.

## Grabber

Grabber captures images and calibration input only. It may remain offline and
produces patient-free radiograph NPZ captures plus the required gain NPZ. The
operator opens MHCS Core on the Grabber computer and uploads the inputs into the
active examination.

The Grabber computer is dedicated to authorised staff. The target uses separate
radiograph and gain NPZ inputs, but the Grabber source and exact schemas were
not verified.

Gain and calibration details remain inside the Grabber/MPIPS boundary. Grabber
supplies the matching gain NPZ and the MPIPS technical team validates it
without making those internals an MHCS responsibility.

Grabber does not fetch member data, create DICOM, or publish results.

## Image Gateway

### Owns

- durable acceptance of a complete submission;
- indefinite NPZ and DICOM storage;
- organisation-isolated storage;
- MPIPS coordination;
- three total attempts for a failed capture;
- email notification after final failure;
- AI and doctor routing;
- temporary authorised links;
- complete-image publication;
- report-version distribution; and
- the operator-payment eligibility event.

### Completion boundary

The complete image set is published only after every submitted radiograph NPZ has
produced DICOM. Successful sibling files are preserved during a partial
failure, but the incomplete set remains hidden from the member.

### Current evidence

The available repository has no commits. Every responsibility is target
behavior.

## MPIPS

### MHCS responsibility

MPIPS receives an authorised NPZ reference and frozen clinical metadata from
Image Gateway and creates a DICOM result for each capture.

Image Gateway owns retries, permanent storage policy, whole-examination
completion, publication, and payment meaning.

### Current evidence

MPIPS contains an implemented service foundation, an importable/CLI
radiography NPZ workflow, and batch-processing tests. The generic HTTP DAG
path handles standard image formats and was not verified as exposing the
Madeena radiography NPZ workflow required by MHCS.

The inspected reader expects fields such as `rawimage`, `gainid`,
`xrayparams`, and `cameraparams`; processing also checks gain ID, detector
mode, dimensions, and camera serial. Exact compatibility with the
user-described Grabber NPZ remains unverified.

The reader calls `numpy.load(..., allow_pickle=True)` for object-array
metadata and explicitly requires trusted files. A malicious pickle may execute
before later schema validation, so extension or post-load validation is not a
sufficient production trust boundary. Technical planning must either adopt a
non-pickle schema or define an isolated trusted conversion boundary.

The [MPIPS document](../technical/mpips/project.md) contains only the additions required by
MHCS and is intended for a later merge into MPIPS's existing project context.

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

An explicit usable decision makes the doctor-stage operator earning eligible.
A repeat request preserves the draft, blocks final submission, and becomes a
25% doctor earning only after Member Core confirms creation of the repeat
entitlement. Each separately accepted sequential repeat creates another 25%
earning.

Submit finalises a report, creates a 100% final-report earning for the signing
doctor, and starts automatic member publication. An unfinished draft creates no
earning. Reassignment preserves earnings already triggered by completed work.

A submitted report is immutable. A necessary correction may be issued at any
time, preserves the original, and does not create another payment.

Eligible doctor earnings are combined into one automatic daily payout with no
minimum positive balance. MHCS absorbs transfer fees by default. Doctors manage
their own verified bank destination; administrators may suspend payouts but
cannot edit that destination.

### Current evidence

Unknown. Doctor Core source was unavailable.

## Payment ownership and triggers

| Payment area | Owning module | Eligibility trigger |
|---|---|---|
| Business-funded member charge | Member Core | Central annual payment becomes member-specific reserved points allocated to the agreed B2B entitlement or booking |
| Personal member charge | Member Core | Personal Madeena Points fund B2C bookings; walk-in payment completes before operator confirmation |
| Operator earning and payout | Operator Core | AI stage: AI delivery or terminal fallback failure. Doctor stage: doctor confirmation of diagnostic usability. Combined service: both configured stages independently |
| Doctor repeat-assessment earning | Doctor Core | Member Core confirms one doctor-requested repeat entitlement: 25% of the snapshotted final-report rate |
| Doctor final-report earning | Doctor Core | The signing doctor submits the completed report: 100% of the snapshotted final-report rate |

Gateway acceptance closes operator work but does not make an earning eligible.
DICOM completion and doctor-queue entry alone are also insufficient.

## Access map

| User | Raw NPZ | View image | Raw DICOM download | AI result | Doctor report |
|---|---:|---:|---:|---:|---:|
| Member | No | Yes | No | When selected | When selected |
| Operator | No | Yes | No | No | No |
| Doctor | No | Yes | Explicit, audited clinical need | If available | Own workflow |
| Image Gateway administrator | Controlled backend access | As required for administration | Controlled backend access | Routing context | Version/audit context |

Members may export TIFF, JPG, or PDF.

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

## Readiness summary

| Area | Readiness | Main gap |
|---|---|---|
| Member booking and payment | Available foundation | B2B imports, point-source restrictions, locked bookings, target catalogue, identifier, walk-in, and result handoffs require verification |
| Front desk and queue | Available foundation | Member attendance connection is unverified |
| Multi-capture NPZ submission | Partial current upload foundation | Draft set, complete Submit, and gateway acceptance are target |
| Image Gateway | Not implemented in available checkout | Entire target backend remains to be built or provided |
| NPZ-to-DICOM capability | Available MPIPS workflow foundation | Production gateway contract and safe trust boundary are unverified |
| AI routing | Target | Provider contract and routing implementation are unverified |
| Doctor review | Unknown/target | Repository and implementation are unavailable |
| Member images and results | Receiving foundation exists | Complete image/reference and independent-result delivery are missing |
| Payment events | Approved target rules | Cross-system implementation is missing |
| FHIR R5 clinical exchange | Approved target | Exact R5 profiles, mappings, conformance artifacts, validation, and implementation remain incomplete |

## Superseded assumptions

- Grabber no longer creates DICOM or uploads directly to Image Gateway;
  Grabber creates patient-free radiograph and gain NPZ inputs, the Operator
  module owns the examination-scoped Submit action, and MPIPS creates DICOM.
- Gateway acceptance closes operator work but does not make operator payment
  eligible. The selected result service determines the later trigger: AI
  delivery or terminal AI fallback failure for the AI stage, and doctor
  confirmation of diagnostic usability for the doctor stage.
- One image path is insufficient; an examination supports multiple draft
  captures and every submitted capture is processed.
- Doctors are not assigned by an unspecified process; they claim cases from a
  shared queue, may release them, and administrators may reassign them.
- Doctor Core's internal queue does not use FHIR `Task`; its FHIR boundary is
  limited to the applicable clinical and audit resources.
- A doctor-requested repeat is not an informal rescan. It is one linked,
  zero-point, doctor-only entitlement at a time, scheduled by the member and
  returned to the requesting doctor when still authorised.
- Retry count is not unknown; each failed capture receives three total
  attempts.
- Walk-in payment is not optional or pending at operator confirmation; it must
  complete in Member Core first.

## Remaining technical decisions

The following are intentionally deferred to module-specific technical plans:

- whether the Grabber NPZ contains TIFF bytes, a raw numeric image array, or
  both, and whether it matches MPIPS's required fields;
- exact FHIR R5 profiles, field mappings, conformance artifacts, and validation;
- exact DICOM metadata mapping and validation;
- API authentication and authorisation;
- upload, object-reference, checksum, and idempotency contracts;
- retry intervals;
- notification configuration;
- short-lived-link authorisation, expiry, and audit details;
- exact AI provider and body-part routing definitions in code;
- Doctor Core's current behavior when its repository becomes available;
- deployment and storage infrastructure; and
- automated verification.

The business ownership and triggers above are approved and should not be
reopened merely because technical work has not started.

## Evidence sources

The current findings came from Member Core routes, services, models,
migrations, tests, and project context; Operator Core upload, photo-booth,
screening-record, migration, and preview paths; and MPIPS NPZ workflow, tests,
API, DAG executor, worker, storage, and project context.

The approved doctor-access and report-amendment rules were informed by:

- [DICOM WADO-RS rendered retrieval](https://dicom.nema.org/medical/Dicom/2016d/output/chtml/part18/sect_6.5.8.html);
- [DICOM WADO-RS study retrieval](https://dicom.nema.org/medical/dicom/2017b/output/chtml/part18/sect_6.5.html);
- [HL7 FHIR DiagnosticReport](https://hl7.org/fhir/diagnosticreport.html);
- [Indonesian Ministry of Health Regulation No. 24 of 2022](https://jdih.kemkes.go.id/common/dokumen/2022permenkes024.pdf); and
- [ACR Practice Parameter for Communication of Diagnostic Imaging Findings](https://www.acr.org/-/media/acr/files/practice-parameters/communicationdiag.pdf).

Those sources informed business decisions; external requirements must be
revalidated before technical implementation or a compliance claim.
