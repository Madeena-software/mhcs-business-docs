# MHCS Business Overview and Actor Journeys

MHCS is a teleradiology platform. It connects member booking, examination-day
operations, offline image capture, automatic image processing, optional AI,
doctor review, and member results without forcing every user into one
application.

## 1. How MHCS works

### End-to-end service flow

| Step | Owner | Action and outcome |
|---:|---|---|
| 1 | Member and Member Core | The member registers, chooses an examination and AI-only, doctor-only, or combined results, then completes payment. |
| 2 | Member Core | Member Core supplies the authorised attendance and examination information to Operator Core. |
| 3 | Front desk | Staff confirm that the member is registered and paid. A walk-in must first be registered and paid in Member Core. |
| 4 | Operator | Staff confirm arrival, manage the queue, and select one active examination. |
| 5 | Grabber and Operator | Offline-capable Grabber software creates one or more patient-free NPZ captures. The operator reviews the draft set and may remove or retake captures. |
| 6 | Operator Core | The operator submits the complete NPZ set once, together with a frozen member and examination snapshot. |
| 7 | Image Gateway | Durable acceptance closes the operator queue item. Image Gateway stores the submission and coordinates processing. |
| 8 | MPIPS | MPIPS creates one DICOM file for every submitted NPZ capture. |
| 9 | Image Gateway | Failed captures are retried independently while successful sibling results are preserved. |
| 10 | Image Gateway and Operator Core | When every capture has produced DICOM, the complete image set is ready. |
| 11 | Image Gateway | The selected AI and doctor services start independently. |
| 12 | AI service | A selected AI result is published automatically when it completes. Delivery to the member makes operator payment eligible; if AI processing and its fallback both fail, terminal fallback failure makes the payment eligible instead. |
| 13 | Doctor Core | For a doctor-only service, the DICOM study enters the shared doctor dashboard queue and makes operator payment eligible before any doctor claims it. |
| 14 | Doctor | A doctor claims the study, reviews it, and submits a separate clinical report. |
| 15 | Member Core | Complete images and each selected result become visible according to their independent completion rules. |

Each application has a distinct business responsibility. Image Gateway stores
each clinical file once and shares it through controlled references instead of
creating permanent copies in every application.

## 2. People, systems, and responsibilities

### Actors and supporting systems

| Actor or system | Business role |
|---|---|
| Member | Books, pays, attends, views images, and receives selected results. |
| Front-desk staff | Confirm eligible members and manage arrival and queue order. |
| Operator or radiographer | Selects the active examination, manages the capture set, submits it, and monitors image processing. |
| Grabber | Captures X-ray images as patient-free NPZ while its software may remain offline. |
| Image Gateway | Stores clinical files and coordinates processing, access, routing, and publication. |
| MPIPS | Converts each submitted NPZ capture into DICOM. |
| AI service | Produces an automatic result when selected. |
| Doctor | Claims a study, reviews it, and submits a separate clinical report. |
| Administrator | Manages the relevant application and receives final processing-failure notifications. |

### Application responsibilities

| Application | Business responsibility |
|---|---|
| Member Core | Member identity, booking, member payment, choices, notifications, and results |
| Operator Core | Front desk, queues, capture-set submission, image viewing, and operator earnings |
| Image Gateway | Permanent image storage, processing coordination, routing, and controlled distribution |
| MPIPS | NPZ-to-DICOM processing |
| Doctor Core | Shared doctor work queue, study review, reports, amendments, and doctor earnings |

### Member Core boundary

Member Core owns:

- the globally unique medical-record ID;
- member registration, accounts, and profiles;
- booking, member charges, and payment;
- the service catalogue and the choices available for an examination;
- AI-only, doctor-only, and combined choices;
- walk-in registration and payment;
- member notifications; and
- member-facing images and results.

Catalogue choices may vary by body part or examination type. Member Core owns
those rules.

A walk-in must receive a Member Core medical-record ID and complete payment
before Operator Core confirms the examination.

### Operator Core boundary

Operator Core owns examination-day work:

- front desk, arrivals, and queues;
- selection of the active examination;
- upload of one or more NPZ captures from the Grabber computer;
- a draft capture set that allows removal and retake;
- one Submit action for the complete set;
- processing status and processed-image viewing; and
- operator earnings.

Gateway acceptance closes the operational queue item. Operator payment becomes
eligible later according to the selected result service: AI delivery to the member (or
terminal failure after the AI fallback also fails) for any service that
includes AI, or entry into the Doctor Core dashboard queue for a doctor-only
service.

Operators see images, not AI diagnoses or doctor reports. They cannot access
raw NPZ or download raw DICOM.

### Grabber boundary

Grabber only captures images. It may remain offline and produces patient-free
NPZ files.

The operator opens Operator Core from a dedicated Grabber computer restricted
to authorised staff. The NPZ contains the image and capture gain data prepared
by Grabber.

Patient identity comes from the active examination selected in Operator Core,
not from the NPZ filename or content.

Gain, calibration, and capture internals remain a Grabber and MPIPS concern,
not an MHCS business responsibility.

### Image Gateway boundary

Image Gateway has administrator-only internal access. It owns:

- durable acceptance of the complete submission;
- permanent NPZ and DICOM storage;
- organisation-isolated storage namespaces;
- MPIPS coordination and failed-capture retries;
- AI and doctor routing;
- temporary authorised file links;
- complete-image publication and report-version traceability; and
- the event that makes operator payment eligible.

MHCS retains NPZ and DICOM with no routine user deletion. Only an authorised
compliance administrator may delete or anonymise a record when legally
required, and the action must be fully audited.

### MPIPS boundary

For MHCS, MPIPS turns each submitted NPZ into DICOM using the separately
supplied frozen member and examination metadata.

MPIPS does not own booking, queues, permanent storage policy, publication,
doctor workflow, or payments.

### Doctor Core boundary

Doctor Core owns:

- a shared queue from which doctors claim eligible studies;
- case release and administrator reassignment;
- study viewing and controlled clinical access;
- report drafting, submission, correction, and amendment;
- automatic member publication; and
- doctor earnings.

A submitted report is immutable. A necessary correction may be issued at any
time without overwriting the original and without creating another doctor
payment.

## 3. Actor journeys

These tables describe the business journey for each role.

### Member journey

| Phase | Member action or decision | System outcome |
|---|---|---|
| Account access | Register or sign in. Invalid credentials lead to retry or password recovery. | A new account begins pending; a valid active account opens the member area. |
| Activation and payment | Complete the required initial payment or top-up. | Successful payment activates an eligible account. A failed payment remains retryable; a suspended account cannot continue. |
| Booking | Choose the examination, available result option, date, and shift. Top up if the balance is insufficient. | Member Core confirms the booking and reserves the available service. |
| Attendance | Attend the examination. A walk-in registers and pays before operator confirmation. | Operator Core receives authorised attendance and examination information. |
| Image processing | Wait while every submitted capture is converted. | A partial multi-capture result remains hidden until the complete image set succeeds. |
| Images ready | View the complete processed image set and export TIFF, JPG, or PDF. | Raw NPZ remains inaccessible and raw DICOM is not offered for download. |
| Selected results | Receive AI and doctor results when each purchased service completes. | Each result publishes automatically and neither waits for the other. |
| Later correction | Open a corrected doctor report after notification. | The latest version is shown while the original remains traceable. |

### Operator journey

| Phase | Operator action or decision | System outcome |
|---|---|---|
| Staff access | Sign in and open the assigned operational project. | Valid active staff can load the relevant attendance list; inactive or unassigned staff cannot continue. |
| Eligibility and arrival | Confirm that the member is registered and paid. | An ineligible member returns to Member Core; an eligible member can be marked as arrived. |
| Queue | Assign a queue number and call one examination to the booth. | The selected examination becomes active and records the responsible operator. |
| Identity | Use the identity supplied by the active examination. | Patient identity is never inferred from an NPZ filename or embedded NPZ data. |
| Capture | Use Grabber to create one or more patient-free NPZ captures. | Each capture is added to the active examination's draft set. |
| Quality review | Review every capture. Remove and retake any unacceptable image. | Only accepted captures remain in the complete draft. |
| Submit | Submit the complete draft set once. | Operator Core sends every remaining NPZ and a frozen examination snapshot to Image Gateway. |
| Gateway acceptance | Wait for durable acceptance. | Acceptance closes the active queue item but does not yet make operator payment eligible. |
| Processing status | Monitor whether every capture produced DICOM. | Failed captures remain pending or failed while the platform retries them; successful sibling results are preserved. |
| Completion | View the complete processed image set. | When every submitted capture succeeds, the selected result workflow continues. |
| Payment | Wait for the selected result milestone. | A service that includes AI becomes eligible when the AI report is delivered to the member, or when both AI processing and its fallback have failed. A doctor-only service becomes eligible when its DICOM study enters the Doctor Core dashboard queue, before claim. |

Operators may view processing status and completed images. They do not see AI
diagnoses or doctor reports and cannot access raw NPZ or download raw DICOM.

### Doctor journey

| Phase | Doctor action or decision | System outcome |
|---|---|---|
| Authorised access | Sign in as an authorised doctor. | Authorised access opens the shared work queue. |
| Shared queue | View eligible studies and claim one. | A successful claim prevents a simultaneous claim. If another doctor claimed it first, the doctor refreshes and selects another study. |
| Queue control | Release a case when review cannot continue. | The case returns to the shared queue; an administrator may also reassign it. |
| Study review | Open the study and relevant member and examination context in Doctor Core. | The doctor reviews images inside the authorised application and never accesses raw NPZ. |
| Optional DICOM | Decide whether raw DICOM is clinically necessary. | When necessary, the doctor uses a short-lived, authorised, and audited download link. |
| Independent AI | Review available AI output when useful. | AI may support review, but the doctor does not wait for it. |
| Draft | Write and edit the report until it is clinically complete. | The draft remains editable until Submit. |
| Submit | Submit the final report. | The report becomes immutable, doctor payment becomes eligible, and automatic member publication begins. |
| Correction | Create a traceable amendment when clinically necessary. | The reason, doctor, timestamp, signature, and original version are preserved; the member is notified. |
| Amendment payment | Complete the correction as part of the original review. | No additional doctor payment is created. |

## 4. Processing, publication, access, and payment

### Multi-capture failure behavior

Every submitted capture remains part of the examination. If one capture
fails:

- successful sibling DICOM files are preserved;
- only the failed capture is retried, for up to three total attempts;
- the member does not see an incomplete image set;
- operator payment is not yet eligible; and
- after the third failed attempt, an administrator receives an email.

### Publication rules

- The processed image set becomes member-visible only after every submitted
  capture has successfully produced DICOM.
- Once complete, images become visible without waiting for AI or doctor work.
- Completed AI and doctor results publish automatically.
- When both result types are selected, neither waits for the other.
- Failure in one selected result branch does not block a successful result
  from the other branch.
- A successful AI result is final and is not rerun. Automatic retry applies
  to failed execution, not to successful AI output.

“Published” means available inside the authenticated member application, not
publicly available on the internet.

### Access rules

| User | Raw NPZ | Processed images | Raw DICOM download | AI result | Doctor report |
|---|---:|---:|---:|---:|---:|
| Member | No | Yes, when complete | No | When selected and complete | When selected and complete |
| Operator | No | Yes, when complete | No | No | No |
| Doctor | No | Yes, for an authorised study | Explicit, audited clinical need | If available | Own workflow |
| Image Gateway administrator | Controlled backend access | As required for administration | Controlled backend access | Routing context | Version and audit context |

Members may export TIFF, JPG, or PDF.

### Payment ownership and triggers

| Payment area | Owning application | Business trigger |
|---|---|---|
| Member charge and payment | Member Core | According to booking; walk-in payment completes before operator confirmation. |
| Operator earning | Operator Core | If the selected service includes AI: the AI report is delivered to the member, or both AI processing and its fallback reach terminal failure. If doctor-only: the DICOM study enters the Doctor Core dashboard queue, before claim. |
| Doctor earning | Doctor Core | The doctor submits the completed report. |

Gateway acceptance and DICOM completion alone do not make operator payment
eligible, except that DICOM queueing is the trigger for a doctor-only service.

## 5. Service completion and glossary

### End-to-end completion

The service journey is complete when an authorised multi-capture examination
moves from booking to image and selected-result publication without:

- staff re-entering or inferring patient identity from filenames;
- uncontrolled file transfer;
- duplicate permanent clinical-file copies;
- lost processing or report-version status;
- exposure of raw NPZ to end users; or
- payment becoming eligible before its business trigger.

### Glossary

| Term | Meaning in this documentation |
|---|---|
| AI | Software that produces an automatic analysis separately from doctor review |
| Amendment | A traceable new version of a submitted doctor report |
| DICOM | The clinical imaging file MPIPS creates from a submitted NPZ |
| Grabber | Offline-capable software that captures X-ray images as patient-free NPZ |
| Image Gateway | The backend that stores, coordinates, routes, and distributes clinical imaging |
| Member | The person receiving the service |
| MPIPS | Madeena's image-processing product; MHCS uses its NPZ-to-DICOM capability |
| NPZ | The patient-free capture file produced by Grabber |
| Operator | Staff who manage examination-day work |
| Published | Deliberately available inside an authorised application |
| Study | The complete set of images and context for one examination |
