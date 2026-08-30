# System Responsibilities

This document defines ownership and collaboration in the candidate target
architecture: one `mhcs-core` application repository containing Member, Operator Core,
Doctor, and Image Gateway modules, plus the separate `mpips` black-box
conversion repository, served by temporary task-specific staff web workspaces, a
persistent unified administration panel, and a WhatsApp-led member channel.

## Responsibility map

| Module or component | Owns | Receives | Produces |
|---|---|---|---|
| Member module in `mhcs-core` | Member healthcare identity (MRN), demographics, requester/payer/subject-of-care/guardian/recipient relations, catalogue, B2B/B2C booking coordination, repeat entitlements, financial tracking, notifications, and WhatsApp result orchestration | Member WhatsApp activity, clinical repeat commands, and member-safe result references | Attendance, booking locator, examination snapshot, repeat status, and WhatsApp-delivered member information |
| Operator Core module in `mhcs-core` | Physical sites, Site Staff roles and assignments, consent confirmation, completed paper-questionnaire evidence, staged FIFO queues, basic examination & vital signs capture, multi-capture Submit, LCD calling, staff earnings, and payouts | Attendance query results, physical identity documents on-site, durable image acceptance, image and AI status | Site data, queue state, complete radiograph/gain NPZ submission, and staff status |
| Grabber | Offline-capable X-ray capture | X-ray equipment | Patient-free radiograph NPZ captures and matching gain NPZ input |
| Image Gateway module in `mhcs-core` | Private durable source and NPZ/DICOM storage, atomic source acceptance, queued MPIPS orchestration, routing, access, publication, and audit | Local complete-submission commands and external processing results | MPIPS conversion jobs, authorized references, completion, and publication events |
| `mpips` repository | Public GitHub repository containing the black-box radiograph NPZ plus gain NPZ conversion through a private MHCS processing service/API boundary | Patient-free NPZ inputs and a signed DICOM metadata manifest | DICOM and correlated technical status |
| Doctor module in `mhcs-core` | Shared doctor queues across specialties, specialty/modality eligibility, study-level quality decisions (for radiology services), repeat requests, reports, amendments, doctor earnings, and payouts | Eligible and replacement studies, supporting output, and repeat status | Quality events, repeat commands, reports, revisions, earnings, and payout status |
| Unified Administration Panel | Presentation and administrative routing surface over domain-owned capabilities | Global Admin / Super Admin interactions across domains | Domain-owned configuration, provisioning, and monitoring actions |

Detailed foundations:

- [MHCS Core architecture](../technical/mhcs-core/project.md)
- [Member module](../technical/mhcs-core/modules/member/project.md)
- [Operator module](../technical/mhcs-core/modules/operator/project.md)
- [Image Gateway module](../technical/mhcs-core/modules/image-gateway/project.md)
- [MPIPS additions required by MHCS](../technical/mpips/project.md)
- [Doctor module](../technical/mhcs-core/modules/doctor/project.md)

## Member Core

### Owns

- globally unique medical-record numbers (MRN);
- healthcare identity, member demographics, and relations;
- conceptual separation of Requester/contact, Payer, Subject of care, Guardian, and Result recipient;
- B2B and B2C booking coordination, cancellation rules, pricing snapshots, and payment tracking;
- walk-in registration and on-site payment tracking;
- service choices per examination type or body part;
- zero-cost, doctor-requested repeat entitlements and member-controlled repeat scheduling via WhatsApp;
- WhatsApp-based member notifications; and
- WhatsApp notification followed, where appropriate, by secure temporary result-link delivery to a task-specific web surface; this is not a persistent Member Portal.

Member Core does **not** own front-desk queues, image capture, raw NPZ, permanent
DICOM storage, AI execution, doctor work queues, or operator/doctor earnings.
It does **not** provide an authenticated member web portal, native mobile apps,
desktop apps, or member login credentials.

### Target handoffs

Member Core supplies authorized attendance, booking locator, and examination
information to Operator Core. It receives temporary image references, AI results,
doctor reports, and amendments through Image Gateway for WhatsApp notification and
secure temporary result-link delivery where appropriate.

A booking code received via WhatsApp serves as a reservation locator and is not
sufficient proof of patient identity. At front-desk check-in, Reception /
Registration Site Staff
holding `TU / Registration` permission verify official physical identity documents
(approved physical identity evidence and comparison) against Member Core records, and record the signed
paper consent and its required private scan once for the visit. Downstream stations
reuse this consent confirmation and do not re-request consent.

Sensitive identity documents are never requested or collected via
ordinary WhatsApp chat to preserve privacy.

Member Core accepts authenticated, idempotent repeat requests only from Doctor
Core. It creates one active zero-cost, doctor-only entitlement, notifies the
member via WhatsApp, lets the member choose any compatible site and shift, and
returns entitlement or decline status to Doctor Core. A scheduled repeat consumes
ordinary booking capacity and does not request AI.

Members receive a WhatsApp notification and, where appropriate, a secure temporary
result surface for viewing or download; on-site print remains an available operational
fallback. Member Core does not store raw NPZ or permanent DICOM copies.

### B2B and B2C target rules

B2B is the initial commercial priority, while direct B2C bookings are coordinated
via WhatsApp:

- B2B enterprise agreements provision members, entitlements, locations, dates,
  and shifts.
- The business funds B2B bookings centrally. The member cannot cancel or reschedule
  a B2B booking; only Global Admin / Super Admin acting on an official business request
  may do so. A B2B no-show remains paid and consumes the business quota.
- For B2C services, members initiate booking and payment coordination through
  the WhatsApp channel.
- Financial transactions, pricing snapshots, and payment statuses are tracked
  with domain integrity in Member Core.

> [!NOTE]
> The legacy rule that Madeena Points is the exclusive member payment instrument
> is undergoing reconciliation. Commercial decisions regarding Madeena Points
> retirement, internal credit conversion, direct rupiah pricing, payment gateways,
> deposit vs full-payment, and refunds remain explicitly open design decisions.

## Operator Core

### Owns

- physical-site master data and staff shift assignment;
- permission-based operator authorization:
  1. `TU / Registration`: front-desk check-in, approved physical identity verification, booking lookup, paper consent confirmation, ticket issuance, and thermal slip printing;
  2. `Nakes Pemeriksaan Dasar`: claiming basic examination tickets, recording vital signs, point-of-care blood screening, structured interview, and paper questionnaire confirmation;
  3. `Radiografi`: claiming X-ray tickets, Grabber NPZ capture review, retake/omission handling, and complete-set submission;
- multi-permission account support: staff accounts may hold 1, 2, or all 3 permissions;
- station selection rules: station selection (`TU`, `PEMERIKSAAN DASAR`, `SESI FOTO RADIOGRAFI`) routes work and LCD calls but cannot grant or elevate account permissions;
- MVP/beta transitional compatibility: existing beta operator accounts temporarily retain access to all three operational areas;
- new staff provisioning: Global Admin / Super Admin explicitly selects applicable operational permissions;
- one site-and-shift ticket across ready-time FIFO basic examination and X-ray queues;
- atomic stage claims, public number-to-station calls for `PEMERIKSAAN DASAR` and `SESI FOTO RADIOGRAFI`, and paired LCD displays;
- basic examination & vital signs measurements, point-of-care screening, and structured interview capture;
- multi-capture NPZ draft set and review;
- one Submit action for the complete capture set;
- processing status, image viewing, and read-only AI Results Status Monitor; and
- configured basic examination and X-ray earnings and automated rupiah payouts.

### Target handoffs

The Operator module hands patient-free radiograph NPZ captures, their matching
gain NPZ input, and a frozen member/examination snapshot to the Image Gateway
module.

Basic examination completion releases the same ticket to X-ray and makes the completing
worker's stage earning eligible. Gateway acceptance completes X-ray, releases
processing to Image Gateway, and makes the submitting worker's stage earning
eligible. Asynchronous AI completion automatically marks the ticket as completed.

## Grabber

Grabber captures images and calibration input only. It may remain offline and
produces patient-free radiograph NPZ captures plus the required gain NPZ. The
operator opens MHCS Core on the Grabber computer and uploads the inputs into the
active examination.

The Grabber computer is dedicated to authorized staff. Gain and calibration
details remain inside the Grabber/MPIPS boundary. Grabber does not fetch member
data, create DICOM, or publish results.

## Image Gateway

### Owns

- durable private persistence and atomic acceptance of a complete submission;
- indefinite NPZ and DICOM storage;
- non-public plain original bytes with opaque keys, integrity metadata,
  grant-controlled access, and TLS/private infrastructure; application-side
  object encryption is not part of the current policy;
- organization-isolated storage;
- MPIPS coordination;
- three total attempts for a failed capture;
- email notification after final failure;
- AI and doctor routing, including the AI-readiness event used for member WhatsApp notification, temporary result-link delivery, and automatic ticket completion;
- temporary authorized links;
- complete-image publication;
- report-version distribution; and
- the operator-payment eligibility event.

### Completion boundary

Each successful DICOM becomes available to an authenticated Operator whose
active site and current shift authorize the examination. The complete image
set is published to Member Core (for WhatsApp notification and temporary result-link delivery where appropriate) and Doctor Core only after
every submitted radiograph NPZ has produced DICOM. Successful source components
and sibling files are preserved during a partial failure, but the incomplete set
remains hidden from the Member and Doctor.

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

- shared doctor work queues filtered by specialty authorization and modality eligibility;
- multi-specialty clinical review (radiologists and authorized non-radiologist specialists);
- case claim, release, and Global Admin / Super Admin reassignment;
- study viewing and controlled clinical access;
- explicit, audited DICOM download when clinically necessary;
- radiology-specific workflows: immutable study-level `usable` or `repeat_required` decisions;
- controlled repeat reasons and clinical repeat handoff to Member Core;
- draft, final, corrected, and amended reports; and
- doctor earnings and automated rupiah payouts.

### Report and payment boundary

Non-radiologist specialists review clinical services within their authorized scope
and are not forced into radiology quality decisions, DICOM reviews, or repeat-imaging
workflows. Doctor Core does not copy Operator examination workflows.

An explicit usable decision remains part of the radiology clinical workflow and does not
change completed Operator stage earnings. A repeat request preserves the draft,
blocks final submission, and becomes a 25% doctor earning only after Member
Core confirms creation of the repeat entitlement. Each separately accepted
sequential repeat creates another 25% earning.

Submit finalizes a report, creates a 100% final-report earning for the signing
doctor, and starts automatic member publication via WhatsApp. An unfinished draft
creates no earning. Reassignment preserves earnings already triggered by completed work.

A submitted report is immutable. A necessary correction may be issued at any
time, preserves the original, and does not create another payment.

Eligible doctor earnings enter automated daily payouts with no minimum positive
balance. MHCS absorbs transfer fees by default.

## Unified Administration

### Presentation surface

Unified Administration provides a single Global Admin / Super Admin web panel spanning
domain-owned operations. It acts as a role and presentation surface over:

- Member domain: agreement tracking, booking reconciliation, payment monitoring;
- Operator domain: site master data, shift schedules, staff permissions (`TU / Registration`, `Nakes Pemeriksaan Dasar`, `Radiografi`), protocol templates, earning rates;
- Doctor domain: doctor specialty/modality authorizations, queue reassignment, reporting rates;
- Image Gateway domain: submission monitoring, processing errors, storage compliance.

Unified Administration does **not** create a separate monolithic "Admin" business
domain or database schema; domain ownership remains strictly with the respective
modules.

## Payment ownership and triggers

| Payment area | Owning module | Eligibility trigger |
|---|---|---|
| B2B member entitlement | Member Core | Central annual agreement provisions member entitlements; tracked in Member Core financial records |
| B2C member charge | Member Core | Member booking coordination completed via WhatsApp; payment tracked before operator confirmation |
| Operator basic exam earning | Operator Core | Basic examination completion triggers configured stage rate for performing worker |
| Operator X-ray earning | Operator Core | Durable X-ray submission acceptance triggers configured stage rate for submitting worker |
| Doctor repeat-assessment earning | Doctor Core | Member Core confirms one doctor-requested repeat entitlement: 25% of snapshotted final-report rate |
| Doctor final-report earning | Doctor Core | The signing doctor submits the completed report: 100% of snapshotted final-report rate |

Gateway acceptance is the X-ray-stage earning trigger. DICOM completion and
doctor-queue entry do not create additional operator earnings.

## Access map

| User | Raw NPZ | View image | Raw DICOM download | AI result | Doctor report |
|---|---:|---:|---:|---:|---:|
| Member (WhatsApp channel) | No | Member-safe delivery | No | WhatsApp notification plus secure temporary result surface where appropriate | WhatsApp notification plus secure temporary result surface where appropriate |
| Operator (`TU`, `Pemeriksaan Dasar`, `Radiografi`) | No | Yes, as each authorized DICOM is available | Yes, authenticated `.dcm` attachment when active site/shift authorizes examination | Read-only view via AI Results Status Monitor | No |
| Doctor (Radiologist / Specialist) | No | Yes, for authorized study | Explicit, audited clinical need | If available | Own workflow |
| Global Admin / Super Admin | Controlled backend access | As required for administration | Controlled backend access | Routing context | Version/audit context |

Operator raw-DICOM downloads are authenticated, non-public attachments with no
permanent public URL. Members receive member-safe result notifications via WhatsApp
and may open a secure temporary result surface; they do not receive raw DICOM.
Operators never receive raw NPZ.

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

The following are intentionally unresolved by current human authority and
remain open design decisions:

1. **WhatsApp Business Platform Provider:** Exact WhatsApp Business Platform provider, API gateway, integration contract, and hosting model.
2. **WhatsApp Bot / LLM Architecture:** Exact conversation flow design, NLP/LLM orchestration layer, automated triage logic, and human-handoff escalation boundaries.
3. **Payment Provider Integration:** Exact payment gateway adapter, payment methods (QRIS, VA, e-wallet), webhook schemas, and timeout/settlement contracts.
4. **Madeena Points Commercial Policy:** Final commercial determination whether Madeena Points are retired, converted to internal loyalty/subsidy credits, or replaced by direct rupiah pricing.
5. **Deposit vs. Full-Payment Policy:** Commercial rules regarding whether WhatsApp bookings require full advance payment, a deposit, or pay-at-site options.
6. **Cancellation & Refund Commercial Terms:** Specific cancellation cutoffs, refund fee policies, and automated refund settlement workflows for WhatsApp-originated bookings.
7. **Clinical Result Delivery Channel Mechanics:** Exact secure temporary result-link, session/authentication, disclosure, retention, and fallback mechanics; the result surface must remain task-specific and must not become a persistent Member Portal.
8. **On-Site Identity Verification Procedure:** Exact permitted evidence, comparison method, data minimization, retention, and storage mechanics at the TU station.
9. **Staff Credential & Regulatory Qualification Rules:** Formal regulatory qualification, certification evidence, and credential verification criteria for TU staff, basic examination nakes, radiographers, radiologists, and non-radiologist specialists.
10. **Specialty-Specific Doctor Workflows:** Specific clinical sub-specialty workflows, modality eligibility matrices, and reporting templates for non-radiologist specialists.
11. **Staff Permission Implementation Mechanism:** Technical implementation details in Laravel/Filament (e.g. Spatie Permission vs custom bitmask/boolean flags) for the three operator permissions.
12. **Beta Account Migration Mechanism:** Exact database migration and transition schedule for upgrading existing MVP/beta operator accounts to the granular permission model.
13. **Grabber NPZ Schema:** Whether Grabber NPZ contains TIFF bytes, raw numeric array, or both, and required MPIPS compatibility fields.
14. **FHIR R5 Conformance Artifacts:** Exact canonical URLs, package IDs, profiles, and validator fixtures.

## External references

Doctor-access and report-amendment rules use:

- [DICOM WADO-RS rendered retrieval](https://dicom.nema.org/medical/Dicom/2016d/output/chtml/part18/sect_6.5.8.html);
- [DICOM WADO-RS study retrieval](https://dicom.nema.org/medical/dicom/2017b/output/chtml/part18/sect_6.5.html);
- [HL7 FHIR DiagnosticReport](https://hl7.org/fhir/diagnosticreport.html);
- [Indonesian Ministry of Health Regulation No. 24 of 2022](https://jdih.kemkes.go.id/common/dokumen/2022permenkes024.pdf); and
- [Indonesian Personal Data Protection Law No. 27 of 2022](https://peraturan.bpk.go.id/Details/229798/uu-no-27-); and
- [ACR Practice Parameter for Communication of Diagnostic Imaging Findings](https://www.acr.org/-/media/acr/files/practice-parameters/communicationdiag.pdf).

External requirements must be revalidated before a compliance claim.

## External interaction-model evidence

The following evidence challenges the assumption that messaging should contain
the complete clinical workflow:

| External observation | Implication / trade-off | MHCS working decision |
|---|---|---|
| [Telegram Mini Apps](https://core.telegram.org/bots/webapps) and [LINE MINI Apps](https://developers.line.biz/en/docs/line-mini-app/quickstart/) embed web applications inside messaging products and can support richer task interactions. | A message can be a durable entry point into a richer task surface without requiring a permanent standalone consumer portal; platform policy, authentication, and lifecycle constraints still apply. | Keep WhatsApp as the persistent interaction/orchestration layer and use secure temporary web surfaces for tasks requiring richer UI. Telegram/LINE behavior is a benchmark, not an MHCS platform decision. |
| The [Henan province-wide telepathology evaluation](https://pmc.ncbi.nlm.nih.gov/articles/PMC13010077/) used mobile access alongside a secured platform; clinical records/images remained in protected infrastructure, while case review and reporting remained in the controlled clinical platform. | Mobile messaging/access can improve reach, but diagnostic review and reporting require controlled clinical storage, authorization, audit, and appropriate viewing conditions. | Operators and Doctors receive WhatsApp dispatch, then work in assignment-scoped temporary workspaces; MHCS remains the system of record and Image Gateway retains clinical binary ownership. |
| [WhatsApp Business Policy](https://whatsappbusiness.com/policy/) requires consent and restricts sharing sensitive identifiers; health-information use may require heightened safeguards depending on applicable regulation. | WhatsApp is suitable for notification, coordination, and minimal-information offers only when policy and applicable safeguards permit; it should not be assumed to be the DICOM viewer or clinical record. | Do not send identity documents or unnecessary clinical detail through ordinary WhatsApp. Notify members and provide a secure temporary result link when a richer result surface is required. |
