# System Responsibilities and Readiness

This document records application ownership, target handoffs, and what could be
verified on 19 July 2026.

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

The Grabber source was not inspected. Target behavior records explicit
business decisions approved through 22 July 2026 and must not be presented as
implemented behavior.

## Responsibility map

| Application or component | Owns | Receives | Produces | Readiness |
|---|---|---|---|---|
| `mhcs-member-core` | Member identity, medical-record ID, catalogue, booking, member payment, notifications, and result presentation | Member activity and member-safe result references | Attendance, examination snapshot, and member-facing information | **Current foundation:** core member workflow exists; expanded target handoffs remain unverified |
| `mhcs-operator-core` | Front desk, queues, multi-capture draft and Submit, image viewing, and operator earnings | Attendance, gateway acceptance, image status, and payment-eligibility event | Queue state, complete NPZ submission, frozen metadata, and operator status | **Current foundation:** operational workflow and uploads exist; target cross-system flow is not verified |
| Grabber | Offline-capable X-ray capture | X-ray equipment | Patient-free NPZ captures | **Business direction:** source was not inspected |
| `mhcs-image-gateway` | Permanent NPZ/DICOM storage, processing coordination, routing, access, publication, and audit | Complete submissions and downstream statuses/results | MPIPS work, authorised references, completion, and publication events | **Target only:** available checkout has no commits |
| `mpips` | NPZ-to-DICOM processing execution for MHCS | Authorised NPZ reference and frozen clinical metadata | DICOM and correlated processing status | **Current capability:** NPZ workflow exists; MHCS production contract is unverified |
| `mhcs-doctor-core` | Shared doctor queue, study review, reports, amendments, and doctor earnings | Eligible studies and supporting output | Doctor report, revisions, and status | **Unknown/target:** repository was unavailable |

Detailed foundations:

- [Member Core](../technical/mhcs-member-core/project.md)
- [Operator Core](../technical/mhcs-operator-core/project.md)
- [Image Gateway](../technical/mhcs-image-gateway/project.md)
- [MPIPS additions required by MHCS](../technical/mpips/project.md)
- [Doctor Core](../technical/mhcs-doctor-core/project.md)

## Member Core

### Owns

- globally unique medical-record IDs;
- member accounts and profiles;
- booking, cancellation, member charges, and payment;
- walk-in registration and payment;
- service choices per examination type or body part;
- member notifications; and
- member image and result experience.

### Target handoffs

Member Core supplies authorised attendance and examination information to
Operator Core. It receives temporary image references, AI results, doctor
reports, and amendments through Image Gateway.

Members view completed images and export TIFF, JPG, or PDF. Member Core does
not store raw NPZ or permanent DICOM copies.

### Current evidence

Core member, booking, payment, notification, operator-integration, and
image-result receiving foundations exist. The approved target flow is not
verified end to end.

## Operator Core

### Owns

- front desk, arrivals, and queue order;
- selection of the active examination;
- multi-capture NPZ draft set;
- removal and retake before Submit;
- one Submit action for the complete set;
- processing status and image viewing; and
- operator earnings.

### Target handoffs

Operator Core sends patient-free NPZ files plus a frozen member/examination
snapshot to Image Gateway.

Gateway acceptance closes the active queue item. Operator payment becomes
eligible later: after AI report delivery to the member (or terminal failure of both AI
processing and its fallback) when AI was selected, or after the DICOM study
enters the Doctor Core dashboard queue when the service is doctor-only.

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

Grabber captures images only. It may remain offline and produces patient-free
NPZ. The operator opens Operator Core on the Grabber computer and uploads the
captures into the active examination.

The Grabber computer is dedicated to authorised staff. The target NPZ is
described as containing TIFF image data and gain data prepared by Grabber, but
the Grabber source and exact NPZ schema were not verified.

Gain and calibration details remain inside the Grabber/MPIPS boundary. Grabber
may supply calibration data and the MPIPS technical team may validate it
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

The complete image set is published only after every submitted NPZ has
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
- draft, final, corrected, and amended reports; and
- doctor earnings.

### Report and payment boundary

Submit finalises a report, makes doctor payment eligible, and starts automatic
member publication.

A submitted report is immutable. A necessary correction may be issued at any
time, preserves the original, and does not create another payment.

### Current evidence

Unknown. Doctor Core source was unavailable.

## Payment ownership and triggers

| Payment area | Owning application | Eligibility trigger |
|---|---|---|
| Member charge and payment | Member Core | According to booking; walk-in payment completes before operator confirmation |
| Operator earning | Operator Core | AI selected: AI report delivery to the member, or terminal failure after both AI processing and fallback fail. Doctor-only: DICOM study enters the Doctor Core dashboard queue before claim |
| Doctor earning | Doctor Core | Doctor submits the completed report |

Gateway acceptance closes operator work but does not make operator payment
eligible. DICOM completion alone is also insufficient unless it results in a
doctor-only study entering the Doctor Core dashboard queue.

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
operations use ordinary application contracts.

## Readiness summary

| Area | Readiness | Main gap |
|---|---|---|
| Member booking and payment | Available foundation | Target catalogue, identifier, walk-in, and result handoffs require verification |
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
  Grabber creates patient-free NPZ, Operator Core owns the examination-scoped
  Submit action, and MPIPS creates DICOM.
- Gateway acceptance closes operator work but does not make operator payment
  eligible. The selected result service determines the later trigger: AI
  delivery to the member or terminal AI fallback failure, or doctor-queue entry for a
  doctor-only service.
- One image path is insufficient; an examination supports multiple draft
  captures and every submitted capture is processed.
- Doctors are not assigned by an unspecified process; they claim cases from a
  shared queue, may release them, and administrators may reassign them.
- Retry count is not unknown; each failed capture receives three total
  attempts.
- Walk-in payment is not optional or pending at operator confirmation; it must
  complete in Member Core first.

## Remaining technical decisions

The following are intentionally deferred to repository-specific technical
plans:

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
