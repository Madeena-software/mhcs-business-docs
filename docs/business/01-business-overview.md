# MHCS Business Overview and Actor Journeys

MHCS is a teleradiology platform. It supports B2B and B2C service through one
member account, wallet, and clinical journey. B2B is the initial commercial
priority, while B2C registration and self-booking remain available.

## 1. How MHCS works

### End-to-end service flow

| Step | Owner | Action and outcome |
|---:|---|---|
| 1 | Business or member, and Member Core | For B2B, MHCS provisions the agreed members, services, locations, dates, shifts, and reserved Madeena Points. For B2C, the member registers, chooses, and pays independently. |
| 2 | Member module | The Member module makes authorised attendance and examination information available to the Operator module inside `mhcs-core`. |
| 3 | Front-desk operator | Confirm registration, payment or eligibility, identity, and signed paper consent. Record the consent version and signature metadata, then issue one site-and-shift ticket number and print a paper queue ticket slip. Ticket numbers are managed via paper slips and are not displayed in the Member Portal. |
| 4 | Basic examination & vital signs operator | Claim the next ready ticket, record the required basic measurements, point-of-care blood screening, and structured interview, then release the same ticket to the X-ray queue. |
| 5 | Grabber and X-ray operator | Claim the next ready ticket. Offline-capable Grabber software creates patient-free radiograph NPZ captures and the required gain NPZ input; the operator reviews the draft and may remove or retake captures. |
| 6 | Operator module | Submit the complete radiograph set with its matching gain input and a frozen member/examination snapshot. |
| 7 | Image Gateway | Persist each source component, manifest, and signature privately. Once the complete source set is durable, atomically accept it and queue processing. Durable source acceptance completes the X-ray stage while the ticket waits for AI without occupying an operator station. |
| 8 | Image Gateway worker and MPIPS | For every capture, convert one radiograph NPZ plus its matching gain NPZ and signed DICOM manifest into one DICOM file asynchronously. |
| 9 | Image Gateway | Preserve successful source components and returned DICOM files. Retry only failed or missing components, and make each successful returned DICOM available to an authorised Operator for the authorised examination. |
| 10 | Image Gateway and Member Core | When every capture has produced DICOM, make the complete image set available under the existing Member and Doctor publication rules. |
| 11 | AI service | Run the selected AI analysis asynchronously. When its result is available, publish it to the member and emit an AI completed event that automatically completes the ticket. |
| 12 | Member module | Always retain the result in the authenticated member portal and deliver any selected email copy. Desk staff may also view the result on the read-only AI Results Status Monitor and provide an optional printout on demand if requested onsite. |
| 13 | Member | If desired, independently purchase and request later doctor review through Member Core; Operator Core does not create the add-on. |
| 14 | Doctor Core and Doctor | For a selected doctor service, route, claim, review, and report under the existing doctor workflow. |

Each MHCS Core module has a distinct business responsibility. Image Gateway stores
each clinical file once and shares it through controlled references instead of
creating permanent copies in every module.

## 2. People, systems, and responsibilities

### Actors and supporting systems

| Actor or system | Business role |
|---|---|
| Business customer | Funds annual member entitlements and determines each B2B examination, service, location, date, and shift. |
| Member | Receives B2B bookings, may create additional B2C bookings, attends, views images, and receives selected results. |
| Operator or radiographer | Uses the same application for front-desk verification, basic examination and vital signs assessment, X-ray capture, queue management, and the read-only AI Results Status Monitor. Staff are interchangeable and select an operational station label for their current work. |
| Grabber | Produces patient-free radiograph and gain NPZ inputs while its software may remain offline. |
| Image Gateway | Stores clinical files and coordinates processing, access, routing, and publication. |
| MPIPS | Converts each radiograph NPZ, matching gain NPZ, and signed manifest into DICOM. |
| AI service | Produces an automatic result when selected. |
| Doctor | Claims a study, reviews it, and submits a separate clinical report. |
| MHCS administrator | Manages the relevant application, performs approved B2B booking changes and assisted account recovery, and receives final processing-failure notifications. |

### Module and repository responsibilities

| Module or repository | Business responsibility |
|---|---|
| Member module in `mhcs-core` | Member identity, B2B and B2C booking, Madeena Points, payment, choices, notifications, and results |
| Operator module in `mhcs-core` | Physical sites, operator staffing, front-desk features, queues, capture-set submission, image viewing, operator earnings, and payouts |
| Image Gateway module in `mhcs-core` | Permanent image storage, MPIPS orchestration, routing, and controlled distribution |
| Doctor module in `mhcs-core` | Shared doctor work queue, study-level quality decisions, repeat requests, reports, amendments, doctor earnings, and payouts |
| `mpips` repository | Separate public GitHub repository whose private MHCS processing service/API boundary converts radiograph NPZ plus gain NPZ and a signed DICOM manifest into DICOM |

Member, Operator, Doctor, and Image Gateway run as modules in one
`mhcs-core` application. They use local commands, shared transactions where
appropriate, and durable domain events instead of calling one another through
internal network calls. MPIPS is the only separate internal service.

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
- audited assignment of multiple operators to one shift;
- front-desk registration, paper-consent confirmation, arrivals, identity
  verification, and one ticket across the basic examination & vital signs and X-ray queues;
- ready-time FIFO calling, atomic work claims, station labels, and a
  privacy-safe LCD queue display;
- basic examination & vital signs assessment capture and durable X-ray submission;
- upload of one or more radiograph NPZ captures and their required gain NPZ
  input from the Grabber computer;
- a draft capture set that allows removal and retake;
- one Submit action for the complete set;
- processing status and processed-image viewing; and
- configured basic examination & vital signs and X-ray earnings and automated rupiah payouts.

Basic examination & vital signs completion makes the recorded basic examination & vital signs worker's snapshotted stage earning
eligible. Gateway acceptance completes X-ray and makes the submitting worker's
X-ray earning eligible. When AI completes asynchronously, the ticket automatically marks as completed.

Operators see images and processing status. As each capture produces a valid DICOM,
an authenticated Operator whose active site and current shift authorise that
examination may view and explicitly download that raw DICOM as a standard
authenticated `.dcm` attachment. The download is not public, has no permanent
public URL, and does not require the old temporary-link, declared-purpose, or
mandatory application-audit workflow for this specific Operator action. Operators
cannot browse unassigned patient records, see doctor reports, or access raw NPZ.

### Grabber boundary

Grabber only captures images and calibration input. It may remain offline and
produces patient-free radiograph NPZ captures plus the gain NPZ required by
MPIPS.

The operator opens MHCS Core from a dedicated Grabber computer restricted to
authorised staff. Radiograph and gain remain separate NPZ inputs correlated by
the frozen gain identity.

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
- durable-acceptance and AI-readiness events consumed by Operator Core.

MHCS retains NPZ and DICOM with no routine user deletion. Only an authorised
compliance administrator may delete or anonymise a record when legally
required, and the action must be fully audited.

### MPIPS boundary

For MHCS, MPIPS turns each radiograph NPZ plus its matching gain NPZ and
separately signed DICOM metadata manifest into DICOM.

MPIPS does not own booking, queues, permanent storage policy, publication,
doctor workflow, or payments.

### Doctor Core boundary

Doctor Core owns:

- a shared queue from which doctors claim eligible studies;
- case release and administrator reassignment;
- study viewing and controlled clinical access;
- study-level diagnostic-quality decisions and clinical repeat requests;
- report drafting, submission, correction, and amendment;
- report handoff that starts automatic member publication; and
- doctor earnings and daily automated payouts.

A submitted report is immutable. A necessary correction may be issued at any
time without overwriting the original and without creating another doctor
payment.

The clinical repeat is a new linked entitlement, not a cancellation or
reschedule of the completed original booking. Its member-controlled site and
shift choice applies whether the original service was B2B or B2C.

Queue and repeat state are ordinary Doctor Core application workflows, not FHIR
`Task` resources. Clinical FHIR resources remain linked across the original and
replacement examinations.

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
| Image processing | Wait while every submitted capture is converted. | A partial multi-capture result remains hidden from the Member until the complete image set succeeds, while each successful DICOM may be available to an authorised Operator for the authorised examination. |
| Images ready | View the complete processed image set and export TIFF, JPG, or PDF. | Raw NPZ remains inaccessible and raw DICOM is not offered for download. |
| Selected results | Receive AI and doctor results when each purchased service completes. | Each result publishes automatically and neither waits for the other. |
| Repeat request | Receive a doctor-requested zero-point, doctor-only repeat entitlement. | The member chooses any compatible site and shift; the booking consumes ordinary capacity and does not rerun AI. |
| Repeat decline | Formally decline a recommended repeat. | The case closes without a final doctor report, while the reason and decline remain traceable. |
| Later correction | Open a corrected doctor report after notification. | The latest version is shown while the original remains traceable. |

### Operator journey

| Phase | Operator action or decision | System outcome |
|---|---|---|
| Staff access | Sign in and open an assigned site and shift, then select the current front-desk, basic examination & vital signs, or X-ray station label. | Multiple assigned operators may work concurrently. The label routes work and public calls but grants no additional permission. |
| Eligibility and consent | Confirm registration, payment or eligibility, identity, and signed paper consent once at front-desk check-in. | MHCS records the consent form version, signer, time, responsible staff, and required private scan. Informed consent is recorded once at the start of the visit and covers all examination stages for that ticket. Missing consent evidence blocks ticket issue. |
| Ticket | Issue one site-and-shift ticket number and print a paper queue ticket slip. | The number remains unchanged through basic examination & vital signs, X-ray, and background AI processing. Ticket numbers are managed via paper slips and are not displayed in the Member Portal. |
| Stage queue | Claim and call the next ready-time FIFO ticket for the selected station. | An atomic claim prevents duplicate handling. A reasoned skip requeues the ticket with a new ready time; recall does not reorder it. |
| Basic examination & vital signs | Record required temperature, height, weight, calculated BMI, blood pressure, glucose, total cholesterol, uric acid, and structured interview responses, and retain evidence that the approved paper questionnaire is complete. | Every item has a value or an explicit unavailable/refused reason. The completed paper questionnaire evidence remains private; missing evidence blocks basic examination completion. Completion releases the ticket to X-ray and makes the basic examination & vital signs earning eligible. |
| Identity | Use the identity supplied by the active examination. | Patient identity is never inferred from an NPZ filename or embedded NPZ data. |
| Capture | Use Grabber to create patient-free radiograph NPZ captures and the required gain NPZ. | Each radiograph is added to the active examination draft and correlated to its gain input. |
| Quality review | Review every capture. Remove and retake any unacceptable image. | Only accepted captures remain in the complete draft. |
| Submit | Submit the complete draft set once. | The Operator module hands every remaining radiograph, its matching gain input, and a frozen examination snapshot to the Image Gateway module. |
| Gateway acceptance | Wait for durable source acceptance. | Once the complete source set is durable, Image Gateway atomically accepts it and queues MPIPS. Acceptance completes X-ray, makes its submitting worker's stage earning eligible, and moves the ticket to asynchronous background processing. A later retry retransmits only a missing component. |
| Background AI waiting | AI processes asynchronously; patient is free to leave or wait. | A completed AI result publishes to Member Core and automatically completes the ticket. If a patient asks onsite, desk staff can check the read-only AI Results Status Monitor and print the result on demand. |
| LCD calling | Pair a read-only site-and-shift display and call tickets for PEMERIKSAAN DASAR and SESI FOTO RADIOGRAFI. | The screen shows active and five recent calls for PEMERIKSAAN DASAR and SESI FOTO RADIOGRAFI, never patient or clinical data. |

Operators may view processing status, completed images, and published AI results on the read-only monitor. They do not see doctor reports or access raw NPZ. An authorised Operator may view and download each returned raw DICOM only when the active site and current shift authorise that examination, using an authenticated `.dcm` attachment rather than a public or permanent link.

### Doctor journey

| Phase | Doctor action or decision | System outcome |
|---|---|---|
| Authorised access | Sign in as an authorised doctor. | Authorised access opens the shared work queue. |
| Shared queue | View eligible studies and claim one. | A successful claim prevents a simultaneous claim. If another doctor claimed it first, the doctor refreshes and selects another study. |
| Queue control | Release a case when review cannot continue. | The case returns to the shared queue; an administrator may also reassign it. |
| Study review | Open the study and relevant member and examination context in Doctor Core. | The doctor reviews images inside the authorised application and never accesses raw NPZ. |
| Optional DICOM | Decide whether raw DICOM is clinically necessary. | When necessary, the doctor uses a short-lived, authorised, and audited download link. |
| Independent AI | Review available AI output when useful. | AI may support review, but the doctor does not wait for it. |
| Quality decision | Explicitly mark the study `usable` or `repeat_required`. | The decision controls clinical quality and repeat handling; completed Operator stage earnings remain unchanged. |
| Repeat required | Select a controlled preliminary reason and enter a clinical note. | The draft is preserved, final submission is blocked, and Member Core creates one zero-point, doctor-only repeat entitlement. |
| Repeat assessment | Wait for Member Core to confirm the repeat entitlement. | Confirmation makes a doctor earning equal to 25% of the snapshotted final-report rate eligible. |
| Replacement study | Resume the same case after Image Gateway returns the replacement study. | The case returns to the requesting doctor when still authorised; original and replacement studies remain visible and linked. |
| Draft | Write and edit the report until it is clinically complete. | The draft remains editable until Submit. |
| Submit | After confirming at least one usable study, submit the final report. | The report becomes immutable, a doctor earning equal to 100% of the snapshotted final-report rate becomes eligible, and automatic member publication begins. |
| Correction | Create a traceable amendment when clinically necessary. | The reason, doctor, timestamp, signature, and original version are preserved; the member is notified. |
| Amendment payment | Complete the correction as part of the original review. | No additional doctor payment is created. |

## 4. Processing, publication, access, and payment

### Multi-capture failure behavior

Every submitted capture remains part of the examination. If one capture
fails:

- successful source components and sibling DICOM files are preserved;
- only the failed capture is retried, for up to three total attempts;
- a component that is already durably persisted is not retransmitted solely
  because a sibling component failed;
- each successful DICOM may be viewed and downloaded by the authorised Operator
  for that examination;
- the member does not see an incomplete image set;
- the already eligible X-ray-stage earning remains unchanged; and
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
| Operator | No | Yes, as each authorised DICOM is available | Yes, authenticated `.dcm` attachment when the active site and current shift authorise the examination | Read-only view via AI Results Status Monitor | No |
| Doctor | No | Yes, for an authorised study | Explicit, audited clinical need | If available | Own workflow |
| Image Gateway administrator | Controlled backend access | As required for administration | Controlled backend access | Routing context | Version and audit context |

Members may export TIFF, JPG, or PDF.

Operator raw-DICOM downloads are authenticated, non-public attachments with no
permanent public URL. They do not use the Doctor workflow's short-lived,
declared-purpose, mandatory application-audit download process. Members still
do not receive raw DICOM.

### Payment ownership and triggers

| Payment area | Owning module | Business trigger |
|---|---|---|
| Business-funded member charge | Member Core | Central annual payment becomes reserved points in each member wallet and is allocated in full to the agreed B2B entitlement or booking. |
| Personal member charge | Member Core | Personal points fund B2C bookings; walk-in payment completes before operator confirmation. |
| Operator earning and payout | Operator Core | Configured basic examination & vital signs rate at basic examination & vital signs completion; configured X-ray rate at durable Image Gateway acceptance. |
| Doctor repeat-assessment earning | Doctor Core | Member Core confirms creation of the doctor-requested repeat entitlement: 25% of the snapshotted final-report rate for each accepted repeat request |
| Doctor final-report earning | Doctor Core | The signing doctor submits the completed report: 100% of the snapshotted final-report rate |

Each operator stage is independently eligible. Doctor-queue entry does not affect operator earnings.

Doctor earnings are visible immediately and enter one automatic daily payout
per doctor with no minimum positive balance. MHCS absorbs the transfer fee by
default. The same default applies to Operator Core.

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
| DICOM | The clinical imaging file MPIPS creates from radiograph NPZ, gain NPZ, and a signed manifest |
| Grabber | Offline-capable software that produces patient-free radiograph and gain NPZ inputs |
| Image Gateway | The backend that stores, coordinates, routes, and distributes clinical imaging |
| Member | The person receiving the service |
| Reserved points | Business-funded Madeena Points restricted to an agreed B2B entitlement or booking |
| MPIPS | Madeena's image-processing product; MHCS uses its NPZ-to-DICOM capability |
| NPZ | The patient-free capture file produced by Grabber |
| Operator | Staff who manage examination-day work |
| Published | Deliberately available inside an authorised application |
| Repeat entitlement | A zero-point, doctor-only right to schedule a clinically required replacement examination |
| Study | The complete set of images and context for one examination |
