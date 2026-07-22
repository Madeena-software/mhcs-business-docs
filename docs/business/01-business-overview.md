# MHCS Business Overview and Actor Journeys

MHCS is a teleradiology platform. It supports B2B and B2C service through one
member account, wallet, and clinical journey. B2B is the initial commercial
priority, while B2C registration and self-booking remain available.

## 1. How MHCS works

### End-to-end service flow

| Step | Owner | Action and outcome |
|---:|---|---|
| 1 | Business or member, and Member Core | For B2B, MHCS provisions the agreed members, services, locations, dates, shifts, and reserved Madeena Points. For B2C, the member registers, chooses, and pays independently. |
| 2 | Member Core | Member Core supplies the authorised attendance and examination information to Operator Core. |
| 3 | Operator | The assigned operator uses the front-desk features to confirm that the member is registered, paid, and verified. A walk-in must first be registered and paid in Member Core. |
| 4 | Operator | The same operator confirms arrival, manages the queue, and selects one active examination. |
| 5 | Grabber and Operator | Offline-capable Grabber software creates one or more patient-free NPZ captures. The operator reviews the draft set and may remove or retake captures. |
| 6 | Operator Core | The operator submits the complete NPZ set once, together with a frozen member and examination snapshot. |
| 7 | Image Gateway | Durable acceptance closes the operator queue item. Image Gateway stores the submission and coordinates processing. |
| 8 | MPIPS | MPIPS creates one DICOM file for every submitted NPZ capture. |
| 9 | Image Gateway | Failed captures are retried independently while successful sibling results are preserved. |
| 10 | Image Gateway and Operator Core | When every capture has produced DICOM, the complete image set is ready. |
| 11 | Image Gateway | The selected AI and doctor services start independently. |
| 12 | AI service | A selected AI result is published automatically when it completes. Delivery makes the AI-stage operator earning eligible; if AI processing and fallback both fail, terminal fallback failure is the trigger instead. |
| 13 | Doctor Core | A doctor-selected study enters the shared dashboard queue. Queue entry does not yet make the doctor-stage operator earning eligible. |
| 14 | Doctor | A doctor claims the study, confirms whether the images are diagnostically usable, and submits a separate clinical report. Quality acceptance makes the doctor-stage operator earning eligible. |
| 15 | Member Core | Complete images and each selected result become visible according to their independent completion rules. |

Each application has a distinct business responsibility. Image Gateway stores
each clinical file once and shares it through controlled references instead of
creating permanent copies in every application.

## 2. People, systems, and responsibilities

### Actors and supporting systems

| Actor or system | Business role |
|---|---|
| Business customer | Funds annual member entitlements and determines each B2B examination, service, location, date, and shift. |
| Member | Receives B2B bookings, may create additional B2C bookings, attends, views images, and receives selected results. |
| Operator or radiographer | Uses the same application for front-desk verification, queue management, examination, capture submission, and processing status. |
| Grabber | Captures X-ray images as patient-free NPZ while its software may remain offline. |
| Image Gateway | Stores clinical files and coordinates processing, access, routing, and publication. |
| MPIPS | Converts each submitted NPZ capture into DICOM. |
| AI service | Produces an automatic result when selected. |
| Doctor | Claims a study, reviews it, and submits a separate clinical report. |
| MHCS administrator | Manages the relevant application, performs approved B2B booking changes and assisted account recovery, and receives final processing-failure notifications. |

### Application responsibilities

| Application | Business responsibility |
|---|---|
| Member Core | Member identity, B2B and B2C booking, Madeena Points, payment, choices, notifications, and results |
| Operator Core | Physical sites, operator staffing, front-desk features, queues, capture-set submission, image viewing, operator earnings, and payouts |
| Image Gateway | Permanent image storage, processing coordination, routing, and controlled distribution |
| MPIPS | NPZ-to-DICOM processing |
| Doctor Core | Shared doctor work queue, study review, reports, amendments, and doctor earnings |

### Member Core boundary

Member Core owns:

- the globally unique medical-record ID;
- member registration, accounts, and profiles;
- B2B and B2C booking, member charges, payment, and Madeena Points;
- the service catalogue and the choices available for an examination;
- AI-only, doctor-only, and combined choices;
- walk-in registration and payment;
- member notifications; and
- member-facing images and results.

Catalogue choices may vary by body part or examination type. Member Core owns
those rules.

A walk-in must receive a Member Core medical-record ID and complete payment
before Operator Core confirms the examination.

### B2B-first operating model

MHCS uses one account and one individual Madeena Points wallet per member:

- After a B2B agreement and its member data are available, an MHCS developer
  uses a later manual import script to create the agreed accounts, annual point
  allocations, entitlements, and complete bookings. That script is not part of
  the current scope.
- The business pays the annual member fee centrally. Member Core converts the
  agreed value into points in each member's individual wallet and reserves
  those points for the agreed B2B entitlements or bookings.
- Business-funded points cannot pay for personal B2C bookings. A B2B booking
  cannot draw any shortfall from personal points; the agreement must provision
  its full cost before the entitlement or booking is created.
- The business determines the examination, selected result service, location,
  date, and shift. If the schedule is agreed later, its reserved points remain
  unavailable for personal use until the booking is completed.
- Members cannot cancel or reschedule B2B bookings. An MHCS administrator may
  do so only following an official business request.
- A B2B no-show remains paid and consumes the agreed examination quota. The
  business, not MHCS, owns employee attendance consequences.
- Members may top up personal points and use the same account for additional
  B2C bookings. These personal bookings follow the ordinary member-controlled
  B2C flow.

Initial B2B accounts use unique random temporary passwords and require a
password change on first login. Credential delivery is outside Member Core:
MHCS sends a credential document to the designated business contact for secure
distribution. The temporary password must be generated with a cryptographically
secure source and must not be logged or retained in plaintext after handoff.

Family members participate through B2C. MHCS may create their accounts from
submitted NIK and KK data, or they may self-register and link to the protected
family record. Email and phone remain optional. A member without either may
log in with NIK and password; password recovery is assisted by an MHCS
administrator after NIK and KK verification. KK groups a family but is not a
login identifier.

### Operator Core boundary

Operator Core owns examination-day work:

- physical-site master data and operator shift assignment;
- front-desk features, arrivals, identity verification, and queues;
- selection of the active examination;
- upload of one or more NPZ captures from the Grabber computer;
- a draft capture set that allows removal and retake;
- one Submit action for the complete set;
- processing status and processed-image viewing; and
- operator earnings and automated rupiah payouts.

Gateway acceptance closes the operational queue item. AI-stage operator
earnings become eligible after AI delivery to the member or terminal failure
after fallback. Doctor-stage earnings become eligible only after a doctor
confirms that the images are diagnostically usable. A combined service pays the
two configured stages independently.

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
| Account access | Use an imported B2B account or self-register for B2C, then sign in. An imported member changes the temporary password immediately. | A valid active account opens one member area for both B2B and B2C. A member without email or phone uses NIK; assisted recovery verifies NIK and KK. |
| Funding | Receive reserved business-funded points and optionally add personal points. | The individual wallet preserves each point source. Reserved business points and personal points cannot fund the other booking type. |
| B2B booking | View the examination, result option, location, date, and shift assigned by the business. | The fully funded booking is confirmed. Only an MHCS administrator acting on an official business request may change it. |
| B2C booking | Choose an additional examination, result option, date, and shift, then top up if necessary. | Member Core charges personal points and confirms the member-controlled booking. |
| Attendance | Attend the examination. A walk-in registers and pays before operator confirmation. | Operator Core receives authorised attendance and examination information. |
| B2B no-show | Miss an assigned examination. | The booking remains paid and consumes the business quota; the business owns any attendance consequence. |
| Image processing | Wait while every submitted capture is converted. | A partial multi-capture result remains hidden until the complete image set succeeds. |
| Images ready | View the complete processed image set and export TIFF, JPG, or PDF. | Raw NPZ remains inaccessible and raw DICOM is not offered for download. |
| Selected results | Receive AI and doctor results when each purchased service completes. | Each result publishes automatically and neither waits for the other. |
| Later correction | Open a corrected doctor report after notification. | The latest version is shown while the original remains traceable. |

### Operator journey

| Phase | Operator action or decision | System outcome |
|---|---|---|
| Staff access | Sign in and open the assigned site and shift. | Valid active staff can load the relevant attendance list; inactive or unassigned staff cannot continue. |
| Eligibility and arrival | Confirm that the member is registered and paid. | An ineligible member returns to Member Core; an eligible member can be marked as arrived. |
| Queue | Assign a queue number and call one examination to the booth. | The selected examination becomes active and records the responsible operator. |
| Identity | Use the identity supplied by the active examination. | Patient identity is never inferred from an NPZ filename or embedded NPZ data. |
| Capture | Use Grabber to create one or more patient-free NPZ captures. | Each capture is added to the active examination's draft set. |
| Quality review | Review every capture. Remove and retake any unacceptable image. | Only accepted captures remain in the complete draft. |
| Submit | Submit the complete draft set once. | Operator Core sends every remaining NPZ and a frozen examination snapshot to Image Gateway. |
| Gateway acceptance | Wait for durable acceptance. | Acceptance closes the active queue item but does not yet make operator payment eligible. |
| Processing status | Monitor whether every capture produced DICOM. | Failed captures remain pending or failed while the platform retries them; successful sibling results are preserved. |
| Completion | View the complete processed image set. | When every submitted capture succeeds, the selected result workflow continues. |
| Payment | Wait for the selected result milestone. | The AI stage becomes eligible after AI delivery or terminal fallback failure. The doctor stage becomes eligible only after the doctor confirms diagnostic usability. Automatic rupiah payouts are handled by Operator Core. |

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
| Business-funded member charge | Member Core | Central annual payment becomes reserved points in each member wallet and is allocated in full to the agreed B2B entitlement or booking. |
| Personal member charge | Member Core | Personal points fund B2C bookings; walk-in payment completes before operator confirmation. |
| Operator earning and payout | Operator Core | AI stage: AI delivery or terminal fallback failure. Doctor stage: doctor confirmation of diagnostic usability. A combined service pays both configured stages independently. |
| Doctor earning | Doctor Core | The doctor submits the completed report. |

Gateway acceptance, DICOM completion, and doctor-queue entry alone do not make
operator earnings eligible.

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
| B2B booking | A fully business-determined and business-funded booking that the member cannot change |
| B2C booking | A member-selected booking paid from personal Madeena Points |
| Business customer | The organisation that funds annual member entitlements and determines B2B bookings |
| DICOM | The clinical imaging file MPIPS creates from a submitted NPZ |
| Grabber | Offline-capable software that captures X-ray images as patient-free NPZ |
| Image Gateway | The backend that stores, coordinates, routes, and distributes clinical imaging |
| Member | The person receiving the service |
| Reserved points | Business-funded Madeena Points restricted to an agreed B2B entitlement or booking |
| MPIPS | Madeena's image-processing product; MHCS uses its NPZ-to-DICOM capability |
| NPZ | The patient-free capture file produced by Grabber |
| Operator | Staff who manage examination-day work |
| Published | Deliberately available inside an authorised application |
| Study | The complete set of images and context for one examination |
