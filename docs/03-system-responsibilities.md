# System Responsibilities and Readiness

This document records application ownership, target handoffs, and what could be
verified on 19 July 2026.

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

- [Member Core](mhcs-member-core/project.md)
- [Operator Core](mhcs-operator-core/project.md)
- [Image Gateway](mhcs-image-gateway/project.md)
- [MPIPS additions required by MHCS](mpips/project.md)
- [Doctor Core](mhcs-doctor-core/project.md)

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

Gateway acceptance closes the active queue item. All DICOM files succeeding
later makes operator payment eligible.

### Current evidence

Front desk, queues, examination status, and private uploads exist. The current
upload path accepts NPZ and DICOM extensions but still uses DICOM-oriented
record and preview paths. No verified gateway or MPIPS connection exists.

## Grabber

Grabber captures images only. It may remain offline and produces patient-free
NPZ. The operator opens Operator Core on the Grabber computer and uploads the
captures into the active examination.

Gain and calibration details remain inside the Grabber/MPIPS boundary.

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

MPIPS contains an implemented service foundation and NPZ workflow code. The
generic API path was not verified as the required production NPZ contract.
The current NPZ reader also requires trusted pickle-enabled files, which is a
technical security boundary to resolve.

The [MPIPS document](mpips/project.md) contains only the additions required by
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
| Operator earning | Operator Core | Every submitted NPZ has successfully produced DICOM |
| Doctor earning | Doctor Core | Doctor submits the completed report |

Gateway acceptance closes operator work but does not yet make operator payment
eligible.

## Access map

| User | Raw NPZ | View image | Raw DICOM download | AI result | Doctor report |
|---|---:|---:|---:|---:|---:|
| Member | No | Yes | No | When selected | When selected |
| Operator | No | Yes | No | No | No |
| Doctor | No | Yes | Explicit, audited clinical need | If available | Own workflow |
| Image Gateway administrator | Controlled backend access | As required for administration | Controlled backend access | Routing context | Version/audit context |

Members may export TIFF, JPG, or PDF.

## FHIR boundary

FHIR-compatible clinical structures apply to:

- patient identity;
- examinations;
- imaging studies; and
- clinical reports.

Queues, payments, retries, storage administration, and other non-clinical
operations use ordinary application contracts.

This direction prepares MHCS for future interoperability. It does not make
SATUSEHAT a current integration.

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
| FHIR-compatible clinical exchange | Approved direction | Exact profiles and mappings are deferred |
| SATUSEHAT | Future possibility; not implemented | Scope, mappings, implementation, evidence, and approval remain absent |

## Remaining technical decisions

The following are intentionally deferred to repository-specific technical
plans:

- exact FHIR profiles and field mappings;
- API authentication and authorisation;
- upload, object-reference, checksum, and idempotency contracts;
- retry intervals;
- notification configuration;
- temporary-link expiry;
- DICOM metadata construction;
- deployment and storage infrastructure; and
- automated verification.

The business ownership and triggers above are approved and should not be
reopened merely because technical work has not started.
