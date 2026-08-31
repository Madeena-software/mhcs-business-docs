# MHCS Business Overview and Actor Journeys

MHCS is a teleradiology and clinical examination platform. It supports B2B and B2C
services through WhatsApp-orchestrated member interactions and temporary specialized
staff workspaces. B2B is the initial commercial priority, while B2C registration and
booking coordination remain available through the WhatsApp channel.

## 1. How MHCS works

### End-to-end service flow

| Step | Owner | Action and outcome |
|---:|---|---|
| 1 | Business or member, and Member Core | For B2B, MHCS provisions agreed members, services, locations, dates, shifts, and funding allocations. For B2C, WhatsApp is the persistent Member interaction and orchestration channel for booking and payment coordination; Members may open a secure temporary result surface when required. |
| 2 | Member module | The Member module provides authorized attendance, booking locator, and examination information to Operator Core inside `mhcs-core`. |
| 3 | Site Staff — Reception / Registration | Site Staff holding the Reception / Registration role verifies the member's approved physical identity evidence, confirms registration, payment/eligibility, and signed paper consent, then issues one site-and-shift visit ticket. The booking code is a reservation locator, not proof of identity. |
| 4 | Site Staff — Basic Examination | Site Staff holding the Basic Examination role claims the next ready ticket, records required basic measurements, point-of-care blood screening, and structured interview, then releases the ticket to the X-ray queue. |
| 5 | Site Staff — Radiography | Site Staff holding the Radiography role claims the next ready ticket, captures and reviews the radiography image set, and submits the complete set for processing. |
| 6 | Image Gateway | Accept the submitted examination for processing, make authorized processed images available, and complete the radiography stage when the submission is accepted. |
| 7 | Image Gateway and processing services | Convert and process the submitted image set under the controlled Image Gateway and MPIPS boundary. |
| 8 | Image Gateway and Member Core | When processing is complete, make the result and complete image set available under Member and Doctor publication rules. |
| 9 | AI service | Run the selected AI analysis and publish its result for the applicable Member and operational status flows. |
| 10 | Member module | After a result is finalized, notify the member through WhatsApp and issue a secure temporary result link to a task-specific result web surface when required, or use another approved delivery path. This surface is not a Member Portal and does not create a persistent member login. |
| 11 | Member | If desired, independently request and fund later doctor review coordinated through the WhatsApp channel; Operator Core does not create the add-on. |
| 12 | Doctor Core and Doctor | For a selected doctor service, route, claim, review, and report under the appropriate clinical workflow (radiologist or authorized non-radiologist specialist). |

Each MHCS Core module has a distinct business responsibility. Image Gateway stores
each clinical file once and shares it through controlled references instead of
creating permanent copies in every module.

## 2. People, systems, and responsibilities

### Actors and supporting systems

| Actor or system | Business role |
|---|---|
| Business Customer | The organization that funds annual member entitlements and determines each B2B examination, service, location, date, and shift. An Authorized B2B Representative acts for the organization when authorized. |
| Member | Interacts primarily through WhatsApp for bookings and notifications; opens a secure temporary result surface when required. Member roles are conceptually separated into Requester/contact, Payer, Subject of care, Guardian, and Result recipient. |
| Site Staff | Receives WhatsApp offers and opens temporary Site Workspaces for Reception / Registration, Basic Examination, or Radiography work. Staff authorization is governed by independently assignable roles, eligibility evidence, and assignment scope. Station selection routes active work but cannot elevate a role. Existing MVP/beta accounts temporarily retain all three operational areas under transitional compatibility. |
| Doctor | Receives WhatsApp case offers and opens temporary Clinical / DICOM Workspaces to claim eligible cases, review studies, and submit clinical reports. Target population includes radiologists and authorized non-radiologist specialists within their specialty and modality eligibility. |
| Global Admin / Super Admin | Uses the persistent secure Admin Web to manage domain-owned configurations, approved B2B booking changes, Site Staff roles and eligibility, Doctor credentials, and system monitoring across Member, Operator, Doctor, and Image Gateway domains. |
| Grabber | Supports the Radiography role's image-capture activity. |
| Image Gateway | Stores clinical files and coordinates processing, access, routing, and publication. |
| MPIPS | Provides the separate image-processing capability used within the Image Gateway boundary. |
| AI service | Produces an automatic result when selected. |

### Module and repository responsibilities

| Module or repository | Business responsibility |
|---|---|
| Member module in `mhcs-core` | Healthcare identity (MRN), demographics, B2B/B2C booking coordination, financial tracking, subject-of-care and guardian relationships, notifications, and temporary result-surface delivery orchestration. Does not provide a persistent member portal, mobile apps, or member login credentials. |
| Operator Core module in `mhcs-core` | Physical sites, Site Staff roles (Reception / Registration, Basic Examination, Radiography), front-desk check-in, paper consent confirmation, staged queues, capture submission, operational image access, staff earnings, and payouts. |
| Image Gateway module in `mhcs-core` | Controlled image processing, storage, routing, access, and publication. |
| Doctor module in `mhcs-core` | Shared doctor work queues across specialties, study-level quality decisions (for radiology services), repeat requests, reports, amendments, doctor earnings, and payouts. |
| Unified Administration Panel | Single Global Admin / Super Admin web interface acting as a presentation/role surface over domain-owned operations without creating a separate monolithic Admin business domain. |
| `mpips` repository | Separate public GitHub repository providing the private image-processing boundary used by MHCS. |

Member, Operator, Doctor, and Image Gateway run as modules in one `mhcs-core`
application. MPIPS is the only separate internal processing boundary.

### Member Core boundary

Member Core owns:

- the globally unique medical-record number (MRN);
- healthcare identity, member demographics, and subject-of-care relationships;
- conceptual separation of Requester/contact, Payer, Subject of care, Guardian, and Result recipient;
- B2B and B2C booking coordination, pricing, payment status tracking, and financial reconciliation;
- the service catalogue and the choices available for an examination;
- AI-only, doctor-only, and combined choices;
- walk-in registration and on-site payment tracking;
- WhatsApp-based member notifications; and
- member-safe result delivery orchestration: WhatsApp notification → secure temporary result link → temporary result web surface where appropriate.

Member Core does **not** provide a member web portal, native iOS/Android apps,
desktop applications, or member username/password credentials. Messaging is the
persistent Member interaction and orchestration layer; a secure temporary result
surface is available when richer viewing or downloading is needed.

A booking code received by a member via WhatsApp serves as a reservation locator
and is **not** sufficient proof of patient identity. Official identity verification
(using approved minimum identity evidence and comparison) is conducted on-site by
Site Staff holding the Reception / Registration role before clinical check-in. The permitted
evidence, comparison method, and minimum data capture remain open design decisions.

To protect member privacy, sensitive identity documents are never requested or
collected via ordinary WhatsApp chat.

### B2B operating model and payment reconciliation

MHCS supports B2B enterprise partnerships and direct B2C member services:

- After a B2B agreement is signed, an MHCS developer or Global Admin / Super Admin provisions
  the agreed members, entitlements, locations, dates, and shifts.
- B2B bookings are fully business-determined and business-funded. Members cannot
  cancel or reschedule B2B bookings. Global Admin / Super Admin may do so only following
  an official business request.
- A B2B no-show remains paid and consumes the agreed quota. The business, not MHCS,
  owns employee attendance consequences.
- For B2C services, members coordinate bookings directly through the WhatsApp channel.
- Financial transactions, pricing snapshots, and payment statuses are tracked with
  domain integrity in Member Core.

> [!NOTE]
> The legacy assumption that Madeena Points is the exclusive member payment instrument
> is subject to reconciliation. Commercial policies regarding Madeena Points retirement,
> conversion to internal loyalty credits, direct-rupiah pricing, payment provider adapters,
> deposit versus full-payment requirements, and refund workflows remain explicitly open
> design decisions.

Family members participate through B2C or family entitlements. KK groups family
members for administrative and guardian purposes but is never a login identifier.

### Operator Core boundary

Operator Core owns examination-day work:

- physical-site master data and staff shift assignment;
- Site Staff roles and eligibility:
  1. Reception / Registration: front-desk check-in, approved identity verification, booking lookup, paper consent confirmation, ticket issuance, and thermal slip printing;
  2. Basic Examination: claiming basic examination tickets, recording vital signs, point-of-care blood screening, structured interview, and paper questionnaire confirmation;
  3. Radiography: claiming X-ray tickets, capturing and reviewing radiographs, handling inadequate captures, and submitting the completed image set;
- multi-role account support: a person may hold one or more eligible Site Staff roles;
- station selection rules: Site Staff select an active station label (`TU`, `PEMERIKSAAN DASAR`, `SESI FOTO RADIOGRAFI`) to route active work and LCD calls, but station selection **cannot** grant or elevate a role;
- MVP/beta transitional compatibility: existing accounts may temporarily map to all three operational roles, while new staff provisioning requires Global Admin / Super Admin selection of eligible roles;
- staged queues, work claims, and privacy-safe LCD displays (`PEMERIKSAAN DASAR` and `SESI FOTO RADIOGRAFI`);
- radiography capture review and completed image-set submission;
- processing status and processed-image viewing; and
- configured basic examination and X-ray stage earnings and automated rupiah payouts.

Basic examination completion makes the recorded worker's stage earning eligible.
Gateway acceptance completes X-ray and makes the submitting worker's stage earning
eligible. When AI completes asynchronously, the ticket automatically marks as completed.

Radiography Site Staff see images and processing status only for an active
authorized assignment. Raw DICOM access is limited to Radiography Site Staff
where operationally required; Reception / Registration and Basic Examination
Site Staff have no raw-DICOM access. Site Staff cannot browse unassigned records,
see doctor reports, or access raw NPZ.

### Image processing boundary

Radiography Site Staff submit the completed image set through Operator Core. Image
Gateway controls processing, authorized access, publication, and the separate MPIPS
processing boundary. Detailed implementation rules remain in the System
Responsibilities and technical specifications.

### Doctor Core boundary

Doctor Core owns:

- shared doctor work queues from which doctors claim eligible studies;
- multi-specialty support covering radiologists and authorized non-radiologist specialists;
- specialty and service authorizations, modality eligibility, and reporting deadlines;
- study viewing and controlled clinical access;
- radiology-specific imaging workflows (study-level diagnostic quality decisions `usable` / `repeat_required` and clinical repeat requests);
- clinical report drafting, submission, correction, and amendment;
- report handoff for member publication; and
- doctor earnings and automated rupiah payouts.

Non-radiologist specialists review clinical services within their authorized scope
and are not forced into radiology quality decisions, DICOM reviews, or repeat-imaging
workflows. Doctor Core does not copy Operator examination workflows.

A submitted report is immutable. A necessary correction may be issued at any
time without overwriting the original and without creating another doctor payment.

The clinical repeat is a new linked entitlement, not a cancellation or reschedule
of the completed original booking.

### Administration boundary

Administration is delivered via one unified web panel spanning domain-owned
operations. Global Admin / Super Admin manages Site Staff roles, eligibility, assignments, and site configurations,
B2B bookings, and system health across Member, Operator, Doctor, and Image Gateway
domains without introducing an artificial "Admin" business domain.

## 3. Actor journeys

### Member journey

| Phase | Member action or decision | System outcome |
|---|---|---|
| Booking initiation | Receive a B2B booking notification via WhatsApp or initiate a B2C booking conversation via WhatsApp. | Member Core coordinates booking details, confirms quota availability, and issues a booking code (reservation locator). |
| Booking confirmation | Confirm appointment details and complete required payment coordination via WhatsApp. | The booking is confirmed. The member receives date, time, site, and preparation instructions via WhatsApp. No web portal login or password is created. |
| Attendance | Arrive on-site at the scheduled examination site and present the booking code and the approved identity evidence required by the current verification procedure. | Reception / Registration staff look up the booking using the code and perform mandatory physical identity verification before clinical check-in. |
| Consent confirmation | Review and sign the paper informed consent form once at the Reception / Registration desk. | Reception / Registration Site Staff records consent confirmation and the required private evidence. |
| Basic examination | Undergo vital signs, basic measurements, and structured interview. | Site Staff holding the Basic Examination role records the assessment and advances the ticket to X-ray. |
| Radiography session | Undergo radiograph capture in the X-ray room. | Site Staff holding the Radiography role captures, reviews, and submits the image set. The Member is free to leave after capture. |
| Image processing | Wait while submitted captures are converted to DICOM and processed by AI asynchronously. | Image Gateway orchestrates MPIPS conversion and AI analysis. |
| Result receipt | Receive a WhatsApp notification and open the secure temporary result link when a richer result surface is required. | Member Core authorizes a task-specific result surface for view/download; it is not a persistent Member Portal. |
| Doctor review (if selected) | Receive a doctor-review completion notification via WhatsApp. | Member Core notifies through Messaging and, when richer or sensitive content is needed, opens a secure temporary result surface for the authorized report; ordinary WhatsApp chat is not the full clinical report store. |
| Repeat recommendation | If a radiologist recommends a clinical repeat, receive a zero-cost repeat booking offer via WhatsApp. | Member coordinates the replacement site and shift via WhatsApp. |

### Site Staff journey

| Phase | Site Staff action or decision | System outcome |
|---|---|---|
| Staff access | Receive an operational offer in WhatsApp, accept or decline, and open the assigned temporary Site Workspace. Backend staff identity, authentication, and authorization remain mandatory. | Access is scoped by staff identity, held role, eligibility evidence, assignment, site, shift/time window, and operational scope. Station selection cannot elevate a role. |
| Work history | Select `PEKERJAAN SAYA / RIWAYAT SAYA` in WhatsApp. | Return a concise summary of completed/upcoming assignments, role, site, date/time, counts, and applicable earnings status. A detailed view, if justified, opens as a secure temporary Work History surface. |
| TU Check-in (Reception / Registration role) | Receive arriving patient, look up booking by booking code, verify approved identity evidence against Member Core records, and perform the approved comparison. | Official identity is verified. Booking is marked `checked_in`. |
| Consent confirmation (Reception / Registration role) | Confirm signed paper consent, record consent version, signer, timestamp, and upload private scan. | Single consent is recorded for the visit. Ticket number is issued and thermal slip is printed. |
| Basic examination (Basic Examination role) | Claim next ready ticket from PEMERIKSAAN DASAR FIFO queue, record vital signs, blood screening, and interview responses. | Completion releases ticket to X-ray queue and makes basic examination stage earning eligible. |
| Radiography capture (Radiography role) | Claim the next ready ticket from the SESI FOTO RADIOGRAFI queue, capture and review the image set, and retake or omit an inadequate capture when justified. | The reviewed set is ready for submission. |
| Set submission (Radiography role) | Submit the complete image set for processing. | Operator Core hands the set to Image Gateway. |
| Gateway acceptance | Receive the submission outcome. | Accepted submission completes the radiography stage and begins processing; an action-needed outcome remains with the assigned staff member. |
| Background AI waiting | AI processes asynchronously; ticket completes automatically when AI result publishes. | Site Staff can view operational processing/readiness status on the read-only AI Results Status Monitor; non-clinical Site Staff do not view clinical AI-result content. |
| LCD calling | Pair a read-only site-and-shift display and call tickets for PEMERIKSAAN DASAR and SESI FOTO RADIOGRAFI. | Display shows active and recent ticket calls with zero patient clinical data. |

### Doctor journey

| Phase | Doctor action or decision | System outcome |
|---|---|---|
| Authorised access | Receive a minimal-information case offer in WhatsApp, accept or decline, and select `OPEN CASE`. | MHCS checks professional identity, credentials, specialty, service authorization, modality eligibility, and assignment before opening a temporary Clinical / DICOM Workspace. |
| Work history | Select `KASUS SAYA / RIWAYAT SAYA` in WhatsApp. | Return a concise professional history. Detailed inspection, if justified, opens as a secure temporary Doctor History surface. |
| Shared queue claim | Claim an eligible case from the shared queue. | The case is assigned to one eligible doctor at a time. |
| Study review | Review imaging study and clinical context inside Doctor Core. | Images and clinical data are reviewed within authorized scope. Raw NPZ is never accessible. |
| Optional DICOM download | If clinically necessary for external diagnostic tools, request raw DICOM download. | Short-lived, authorized, and audited download link is provided. |
| Quality decision (Radiology) | For radiology services, explicitly mark study `usable` or `repeat_required`. | For `usable`, report drafting proceeds. For `repeat_required`, the doctor records a controlled reason and clinical note, triggering a repeat entitlement in Member Core. Non-radiologist specialists are not forced into radiology quality decisions. |
| Report drafting & submission | Draft clinical findings, conclusion, and recommendations, then submit final report. | Report becomes immutable, final-report earning (100%) becomes eligible, and Member Core begins WhatsApp notification plus appropriate temporary result-link delivery. |
| Traceable amendment | If clinically necessary later, issue a signed amendment. | New version is created with preserved lineage; original remains traceable and member is notified via WhatsApp. No additional doctor payment is created. |

## 4. Processing, publication, access, and payment

### Processing exceptions

Processing exceptions remain within the controlled image-processing boundary.
Members and Doctors do not receive incomplete studies, and Radiography Site Staff
receive the applicable action-needed status. Recovery and retry mechanics belong
to the technical specifications.

### Publication rules

- The processed image set becomes eligible for result generation only after every submitted capture has successfully produced DICOM.
- Completed AI and doctor results become available to Member Core for WhatsApp notification and secure temporary result-link delivery where appropriate.
- When both result types are selected, neither waits for the other.
- Failure in one selected result branch does not block a successful result from the other branch.

### Access rules

| User | Raw NPZ | Processed images | Raw DICOM download | AI result | Doctor report |
|---|---:|---:|---:|---:|---:|
| Member (WhatsApp channel) | No | Member-safe delivery | No | When selected and complete (WhatsApp) | When selected and complete (WhatsApp) |
| Radiography Site Staff | No | Yes, as each authorized DICOM is available | Yes, authenticated `.dcm` attachment when active site/shift authorizes examination and operational need requires it | Processing/readiness status only via AI Results Status Monitor | No |
| Doctor (Radiologist / Specialist) | No | Yes, for authorized study | Explicit, audited clinical need | If available | Own workflow |
| Global Admin / Super Admin | Controlled backend access | As required for administration | Controlled backend access | Routing context | Version and audit context |

### Payment ownership and triggers

| Payment area | Owning module | Business trigger |
|---|---|---|
| B2B member entitlement | Member Core | Central agreement provisions member entitlements; tracked in Member Core financial records. |
| B2C member charge | Member Core | Member booking coordination completed via WhatsApp; payment tracked before visit confirmation. |
| Site Staff basic-examination earning | Operator Core | Basic examination completion triggers the configured stage rate for the performing Site Staff member. |
| Site Staff radiography earning | Operator Core | Image Gateway acceptance triggers the configured stage rate for the submitting Site Staff member. |
| Doctor repeat-assessment earning | Doctor Core | Member Core confirms creation of doctor-requested repeat entitlement: 25% of snapshotted final-report rate. |
| Doctor final-report earning | Doctor Core | Signing doctor submits completed report: 100% of snapshotted final-report rate. |

Each Site Staff stage is independently eligible. Doctor queue entry does not affect Site Staff earnings.
Doctor earnings enter automated daily payouts with no minimum positive balance.

## 5. Service completion and glossary

### End-to-end completion

The service journey is complete when an authorized examination moves from booking
coordination to image processing and secure temporary result delivery without:

- staff re-entering or inferring patient identity from filenames;
- uncontrolled file transfer;
- duplicate permanent clinical-file copies;
- lost processing or report-version status;
- exposure of raw NPZ to end users;
- member exposure to web portal login or credential requirements;
- unverified identity check-in; or
- payment becoming eligible before its business trigger.

### Glossary

| Term | Meaning in this documentation |
|---|---|
| AI | Software that produces an automatic analysis separately from doctor review |
| Amendment | A traceable new version of a submitted doctor report |
| B2B booking | A fully business-determined and business-funded booking |
| B2C booking | A member-initiated booking coordinated via WhatsApp |
| Booking locator | A booking code received via WhatsApp used to locate reservations on-site (not proof of identity) |
| Business Customer | The organization that funds member entitlements and determines B2B bookings; an Authorized B2B Representative is the human actor authorized to act for it. |
| DICOM | The clinical imaging result used for authorized clinical review |
| Doctor Core | The module serving radiologists and authorized non-radiologist specialists |
| Grabber | Software that supports the Radiography role's image-capture activity |
| Image Gateway | The backend that stores, coordinates, routes, and distributes clinical imaging |
| Member | The person receiving the healthcare service (primarily interacts via WhatsApp and may open a secure temporary result surface) |
| MPIPS | Madeena's separate image-processing boundary used by MHCS |
| Basic Examination | Site Staff role authorizing basic measurements, vital signs, and screening |
| NPZ | An internal patient-free capture format that is not exposed to end users |
| Site Staff | Human staff assigned one or more eligible examination-site roles |
| Radiografi | Site Staff role authorizing radiograph capture review and submission |
| Repeat entitlement | A zero-cost, doctor-requested right to schedule a clinically required replacement examination |
| Requester | The individual communicating via WhatsApp to coordinate a booking |
| Subject of Care | The individual who physically attends and receives the clinical examination |
| TU / Registration | Reception / Registration role authorizing front-desk check-in, identity verification, consent, and ticket issuance |
| Unified Administration Panel | Single web panel for system administration spanning domain-owned operations |
| Messaging ecosystem | Persistent Member interaction and orchestration layer; richer results may use a secure temporary web surface |

## 6. Open design decisions

The following decisions are intentionally unresolved by current human authority and
remain open design decisions:

1. **WhatsApp Business Platform Provider:** Exact WhatsApp Business Platform provider, API gateway, integration contract, and hosting model.
2. **WhatsApp Bot / LLM Architecture:** Exact conversation flow design, NLP/LLM orchestration layer, automated triage logic, and human-handoff escalation boundaries.
3. **Payment Provider Integration:** Exact payment gateway adapter, payment methods (QRIS, VA, e-wallet), webhook schemas, and timeout/settlement contracts.
4. **Madeena Points Commercial Policy:** Final commercial determination whether Madeena Points are retired, converted to internal loyalty/subsidy credits, or replaced by direct rupiah pricing.
5. **Deposit vs. Full-Payment Policy:** Commercial rules regarding whether WhatsApp bookings require full advance payment, a deposit, or pay-at-site options.
6. **Cancellation & Refund Commercial Terms:** Specific cancellation cutoffs, refund fee policies, and automated refund settlement workflows for WhatsApp-originated bookings.
7. **Clinical Result Delivery Channel Mechanics:** Exact secure temporary result-link, session/authentication, disclosure, retention, and fallback mechanics; the result surface must remain task-specific and must not become a persistent Member Portal.
8. **On-Site Identity Verification Procedure:** Exact permitted evidence, comparison method, data minimization, retention, and storage mechanics at the Reception / Registration station (`TU` compatibility label).
9. **Staff Credential & Regulatory Qualification Rules:** Formal regulatory qualification, certification evidence, and credential verification criteria for Reception / Registration Site Staff, Basic Examination Site Staff, Radiography Site Staff, radiologists, and non-radiologist specialists.
10. **Specialty-Specific Doctor Workflows:** Specific clinical sub-specialty workflows, modality eligibility matrices, and reporting templates for non-radiologist specialists.
11. **Staff Authorization Implementation Mechanism:** Technical implementation details in Laravel/Filament (e.g. Spatie Permission vs custom bitmask/boolean flags) for enforcing the three Site Staff roles.
12. **Beta Account Migration Mechanism:** Exact database migration and transition schedule for upgrading existing MVP/beta operator accounts to the granular permission model.
