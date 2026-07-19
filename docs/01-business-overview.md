# Business Overview

## What MHCS is

MHCS is a teleradiology platform in development.

It connects member booking, examination-day operations, offline image capture,
automatic image processing, optional AI, doctor review, and member results
without forcing every user into one application.

## The approved business flow

1. A member books and pays for an examination.
2. Front desk confirms the member and manages the operator queue.
3. Offline Grabber software captures one or more X-ray images as patient-free
   NPZ files.
4. The operator selects the active examination, reviews the capture set, and
   clicks Submit.
5. Operator Core sends the complete NPZ set and a frozen member/examination
   snapshot to Image Gateway.
6. Image Gateway stores the submission and coordinates MPIPS.
7. MPIPS creates DICOM for every submitted NPZ.
8. Image Gateway routes selected AI and doctor work.
9. The complete image set and each selected result become available according
   to their independent completion rules.

The logical chain is appropriate because each application has a distinct
business responsibility. The clinical file should be stored once and shared
through controlled references rather than copied repeatedly between
applications.

The [member journey](02-member-journey.md) separates this target from current
verified behavior.

## People and systems

| Actor or system | Role |
|---|---|
| Member | Books, pays, attends, views images, and receives selected results |
| Front-desk staff | Confirms eligible members and manages arrival |
| Operator or radiographer | Manages the queue, capture set, and Submit action |
| Grabber | Captures X-ray images as patient-free NPZ while its software may remain offline |
| Image Gateway | Stores clinical files and coordinates processing, access, and publication |
| MPIPS | Converts NPZ captures to DICOM |
| AI service | Produces an automatic result when selected |
| Doctor | Claims a study, reviews it, and submits a separate clinical report |
| Administrator | Manages the relevant application and receives final processing-failure notifications |

## The five application repositories

| Application | Plain-language role | Foundation |
|---|---|---|
| `mhcs-member-core` | Member identity, booking, member payment, choices, notifications, and results | [Member Core foundation](mhcs-member-core/project.md) |
| `mhcs-operator-core` | Front desk, queues, capture-set submission, image viewing, and operator earnings | [Operator Core foundation](mhcs-operator-core/project.md) |
| `mhcs-image-gateway` | Permanent image storage, processing coordination, routing, and controlled distribution | [Image Gateway foundation](mhcs-image-gateway/project.md) |
| `mpips` | NPZ-to-DICOM processing for MHCS within a broader processing product | [MPIPS MHCS additions](mpips/project.md) |
| `mhcs-doctor-core` | Shared doctor work queue, study review, reports, amendments, and doctor earnings | [Doctor Core foundation](mhcs-doctor-core/project.md) |

Grabber is separate device software rather than an MHCS application
repository.

## Member Core boundary

Member Core owns:

- the globally unique medical-record ID;
- member registration and profiles;
- booking and member payments;
- the service catalogue and choices available for an examination;
- current AI-only, doctor-only, and combined choices;
- walk-in registration and payment;
- member notifications; and
- member-facing images and results.

Future choices may vary by body part or examination type. Member Core owns
those catalogue rules.

A walk-in must receive a Member Core medical-record ID and complete payment
before Operator Core confirms the examination.

## Operator Core boundary

Operator Core owns examination-day work:

- front desk, arrivals, and queues;
- selection of the active examination;
- upload of one or more NPZ captures from the Grabber computer;
- a draft capture set that allows removal and retake;
- one Submit action for the complete set;
- processing status and processed-image viewing; and
- operator earnings.

Gateway acceptance closes the operational queue item. Operator payment becomes
eligible later, only after every submitted capture has successfully produced
DICOM.

Operators see images, not AI diagnoses or doctor reports. They cannot access
raw NPZ or download raw DICOM.

## Grabber boundary

Grabber only captures images. It may remain offline and produces patient-free
NPZ.

The operator opens Operator Core from a dedicated Grabber computer restricted
to authorised staff. The user-described target NPZ contains TIFF image data
and capture gain data prepared by Grabber; the exact NPZ schema remains a
technical verification item.

The active examination selected in Operator Core supplies patient identity.
Patient identity is not taken from the NPZ filename or embedded in the NPZ.

Gain, calibration, and capture internals remain a Grabber/MPIPS concern, not an
MHCS business responsibility.

## Image Gateway boundary

Image Gateway is a Python backend with administrator-only internal access.

It owns:

- durable acceptance of the complete submission;
- permanent NPZ and DICOM storage;
- organisation-isolated storage namespaces;
- MPIPS coordination;
- retrying only failed captures, up to three total attempts;
- initial final-failure notification by email;
- AI and doctor routing;
- temporary authorised file links;
- publication and report-version traceability; and
- the event that makes operator payment eligible.

Telegram failure notification is a later enhancement.

The approved policy retains NPZ and DICOM indefinitely with no routine user
deletion. Only an authorised compliance administrator may delete or anonymise
a record when legally required, and the action must be fully audited.

## MPIPS boundary

For MHCS, MPIPS turns every submitted NPZ into DICOM using the separately
supplied frozen member/examination metadata.

MHCS treats that conversion as a ready MPIPS capability. The production
contract between Image Gateway and MPIPS remains to be verified technically.

MPIPS does not own booking, queues, permanent storage policy, publication,
doctor workflow, or payments.

## Doctor Core boundary

Doctor Core shares Operator Core's technical foundation and visual conventions
but not its front-desk workflow.

- Eligible studies appear in a shared queue.
- A doctor claims a study and may release it.
- Administrators may reassign studies.
- The doctor may see available AI output but does not wait for it.
- Submit finalises the report and makes doctor payment eligible.
- A submitted report becomes visible to the member automatically.
- A necessary correction may be issued at any time without overwriting the
  original.
- Corrections do not create an additional doctor payment.

Doctors view studies inside Doctor Core. An authorised doctor may explicitly
download raw DICOM for clinical use through a short-lived, audited link.

## Publication rules

- The processed image set becomes member-visible only after every submitted
  capture has successfully produced DICOM.
- A partially successful multi-capture examination remains hidden until
  resolved.
- Once complete, images become visible without waiting for AI or doctor work.
- Completed AI and doctor results are published automatically.
- When both are selected, neither waits for the other.
- Members view images and may export TIFF, JPG, or PDF; they do not download
  raw DICOM.

“Published” means available inside the authenticated member application, not
publicly available on the internet.

## FHIR and SATUSEHAT

MHCS should use FHIR-compatible structures for clinical information:

- patient identity;
- examinations;
- imaging studies; and
- clinical reports.

Queues, payments, retries, and administration remain ordinary application
workflows and do not need FHIR.

SATUSEHAT remains a **Future possibility**. FHIR-compatible data and a
SATUSEHAT-aligned identifier are preparation for future interoperability, not
proof of integration, compliance, certification, or sandbox success. See
[SATUSEHAT readiness](04-satusehat-readiness.md).

## What remains outside this pack

This pack does not define:

- API schemas or transport protocols;
- exact FHIR resource mappings;
- retry intervals;
- authentication or short-lived-link expiry;
- storage object-key design;
- deployment or infrastructure;
- detailed staff procedures; or
- technical implementation plans.

## Glossary

| Term | Meaning in this documentation |
|---|---|
| AI | Software that produces an automatic analysis separately from doctor review |
| Amendment | A traceable new version of a submitted doctor report |
| Current | Behavior verified in available source code |
| DICOM | The clinical imaging file MPIPS creates from a submitted NPZ |
| FHIR | A standard structure for exchanging clinical information |
| Future possibility | An option not included in current implementation scope |
| Grabber | Offline-capable software that captures X-ray images as patient-free NPZ |
| Image Gateway | The backend that stores, coordinates, routes, and distributes clinical imaging |
| Member | The person receiving the service |
| MPIPS | Madeena's image-processing product; MHCS uses its NPZ-to-DICOM capability |
| NPZ | The patient-free capture file produced by Grabber |
| Operator | Staff who manage examination-day work |
| Published | Deliberately available inside an authorised application |
| Study | The complete set of images and context for one examination |
| Target | Approved behavior not yet fully implemented or connected |
| Unknown | A fact that could not be verified |
