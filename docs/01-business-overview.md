# Business Overview

## What MHCS is

MHCS is a teleradiology platform in development.

In simple terms, teleradiology allows radiology work to be handled across
different locations. A member can book a service, an operator can carry out
the examination, image-processing systems can prepare the image, and a doctor
can review the study without every person using the same application.

MHCS is not one large application. It is a group of focused applications that
are intended to work together.

## The business goal

The intended service should make the radiology journey easier to follow from
beginning to end:

1. A member books a service.
2. Staff manage the member's arrival and examination.
3. Grabber software connected to the X-ray equipment creates a DICOM image.
4. The captured image is sent safely for automatic image processing.
5. AI diagnosis and doctor review run when selected by the member.
6. Each completed output is published without waiting for the other.

This target journey is only partially connected today. The
[member journey](02-member-journey.md) shows the difference between the
current and target states.

## Who is involved

| Actor | What they need from MHCS |
|---|---|
| Member | Book a service, attend the examination, and receive published information |
| Operator or radiographer | Manage arrivals, queues, examinations, and image capture |
| Doctor | Review a study through a dedicated clinical workflow |
| Grabber | Obtain authorised member data, control image capture, create DICOM, and upload it |
| Business administrator | Manage services, schedules, projects, participants, and staff |
| Business and support team | See where each case is in its journey and understand failures |
| Technology partner | Exchange the correct information with the correct MHCS application |

## The five applications

| Application | Plain-language role |
|---|---|
| `mhcs-member-core` | The member's application for accounts, booking, and published results |
| `mhcs-operator-core` | The staff application for examination-day operations |
| `mhcs-image-gateway` | The intended traffic controller for radiology images and results |
| `mpips` | The image-processing engine |
| `mhcs-doctor-core` | The intended doctor application for a separate review workflow |

The detailed ownership and readiness map is available in
[System responsibilities](03-system-responsibilities.md).

## Important business boundaries

### Member application

The member application should own member-facing activities. It should not
become the storage or processing location for raw clinical images.

At booking, the member chooses one of three result services:

- AI diagnosis only;
- doctor review only; or
- both AI diagnosis and doctor review.

Automatic image processing is part of every option. The member receives the
processed image and each selected result as soon as that result is ready.

### Operator application

The operator application should own the work performed on examination day. It
should not become the long-term image-processing or AI orchestration system.

It obtains the expected attendance list from member-core, records arrivals,
creates a first-arrival-first-served queue, moves the member into the
examination room, and receives a completion notification. Operators may see
the processed X-ray image but not AI diagnosis or doctor-report details.

Front desk may register a new walk-in member. Walk-ins share one configurable
daily limit across every operator, location, and device, and consume normal
booking capacity.

### Grabber

Grabber is separate software associated with the X-ray equipment; it is not
part of operator-core. It obtains the authorised member data needed to create
the DICOM image, captures the image, and uploads the DICOM to image-gateway.

### Image gateway

The image gateway is intended to coordinate image movement and processing
requests. It should be the controlled connection between operational systems,
processing systems, doctor review, and published result information.

Every accepted DICOM is processed automatically. AI diagnosis is requested
only when the member selected an AI option. Doctor review is requested only
when selected.

### MPIPS

MPIPS processes images. It does not own booking, queues, member communication,
or doctor workflow.

### Doctor application

Doctor review and AI output are separate target products. The current business
direction does not require a doctor's approval before AI output can be
published. When both are selected, the doctor may see available AI output but
may also finish before AI completes.

Each successful output is delivered immediately. A failure in one selected
service does not block a successful output from the other.

## What this pack does not decide

This pack does not decide:

- how many times a failed third-party AI request is retried;
- how a doctor is assigned;
- how walk-in payment is collected;
- whether SATUSEHAT becomes an approved integration or which application owns it;
- medical or regulatory rules;
- detailed integration contracts;
- staff operating procedures; or
- deployment and security architecture.

Those decisions require their own owners and approval.

## SATUSEHAT status

SATUSEHAT is a **Future possibility**, not a current capability or approved
target commitment. No SATUSEHAT authentication, clinical data mapping,
`Encounter` submission, or `Condition` submission is implemented in the
available MHCS repositories.

The available SATUSEHAT material consists of planning documents and uncompleted
submission templates. It must not be treated as proof of integration,
compliance, certification, or successful sandbox testing. See
[SATUSEHAT readiness](04-satusehat-readiness.md).

## Glossary

| Term | Meaning in this documentation |
|---|---|
| AI | Software that may assist with image analysis; it is described separately from doctor review |
| Current | Behavior verified in the available source code |
| Doctor review | A clinical review performed through the intended doctor application |
| DICOM | The standard image file created by Grabber for the examination |
| Future possibility | An option under consideration that is not an approved target commitment |
| Grabber | Software connected to the X-ray equipment that creates and uploads DICOM images |
| Image gateway | The intended coordinator between image capture, processing, review, and publication |
| Image processing | Preparing or analysing an image so it can be used by another system or person |
| Member | The person receiving the service |
| MPIPS | Madeena's image-processing service |
| Operator | Staff who manage the examination-day workflow |
| Published result | Information deliberately made available to the member application |
| SATUSEHAT | A possible future integration referenced by readiness material but not implemented in MHCS |
| Study | The images and related information from an examination |
| Target | Intended behavior that is not yet fully available |
| Teleradiology | Radiology work performed across locations using digital systems |
| Unknown | A capability or rule that could not be verified |
