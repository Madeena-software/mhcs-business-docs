# System Responsibilities

This document defines ownership and collaboration in the candidate target
architecture: one `mhcs-core` application repository containing Member, Operator Core,
Doctor, and Image Gateway modules, plus the separate `mpips` black-box
conversion repository, served by temporary task-specific staff web workspaces, a
persistent unified administration panel, and a WhatsApp-led member channel.

In the B2B model, the **Business Customer** is the organization that funds and
defines the agreed service scope. The **Authorized B2B Representative** is the
human actor authorized to provide, confirm, monitor, reconcile, or request a
change to that scope; the representative does not gain authority beyond the
Business Customer's agreement.

## Responsibility map

| Module or component | Owns | Receives | Produces |
|---|---|---|---|
| Member module in `mhcs-core` | Member healthcare identity (MRN), demographics, requester/payer/subject-of-care/guardian/recipient relations, catalogue, B2B/B2C booking coordination, repeat entitlements, financial tracking, notifications, and WhatsApp result orchestration | Member WhatsApp activity, clinical repeat commands, and member-safe result references | Attendance, booking locator, examination snapshot, repeat status, and WhatsApp-delivered member information |
| Operator Core module in `mhcs-core` | Physical sites, Site Staff roles and assignments, consent confirmation, completed paper-questionnaire evidence, staged queues, examination capture, LCD calling, staff earnings, and payouts | Attendance query results, physical identity evidence on-site, image acceptance, and processing status | Site data, queue state, complete image submission, and staff status |
| Grabber | Offline-capable radiography capture | Radiography equipment | Image-capture input |
| Image Gateway module in `mhcs-core` | Private image storage, processing coordination, routing, access, publication, and audit | Complete-submission commands and processing results | Processing jobs, authorized references, completion, and publication status |
| `mpips` repository | Public GitHub repository providing the separate private image-processing boundary | Image-processing input | Processed imaging result and technical status |
| Doctor module in `mhcs-core` | Shared doctor queues across specialties, specialty/modality eligibility, study-level quality decisions (for radiology services), repeat requests, reports, amendments, doctor earnings, and payouts | Eligible and replacement studies, supporting output, and repeat status | Quality events, repeat commands, reports, revisions, earnings, and payout status |
| Unified Administration Panel | Presentation and administrative routing surface over domain-owned capabilities | Global Admin / Super Admin interactions across domains | Domain-owned configuration, provisioning, and monitoring actions |

Detailed foundations:

- [MHCS Core architecture](../technical/mhcs-core/project.md)
- [Member module](../technical/mhcs-core/modules/member/project.md)
- [Operator module](../technical/mhcs-core/modules/operator/project.md)
- [Image Gateway module](../technical/mhcs-core/modules/image-gateway/project.md)
- [MPIPS additions required by MHCS](../technical/mpips/project.md)
- [Doctor module](../technical/mhcs-core/modules/doctor/project.md)

## Business-to-technical traceability

The business story remains the authority for human intent. This map records
the corresponding system responsibility and the technical specification that
defines its implementation boundary.

| User Story / Business Rule | System Responsibility | Owner | Technical Authority |
|---|---|---|---|
| [US-MEMBER-001](02-user-stories.md#member) booking and coordination | Maintain B2B/B2C booking, requester/payer/subject relationships, and Messaging coordination | Member Core | [Member specification](../technical/mhcs-core/modules/member/project.md#business-traceability) |
| [US-MEMBER-002](02-user-stories.md#member) approved attendance and identity verification | Supply authorized attendance lookup; perform approved on-site verification before check-in | Member Core + Operator Core | [Member specification](../technical/mhcs-core/modules/member/project.md#business-traceability) |
| [US-STAFF-SHARED-001](02-user-stories.md#site-staff--shared) eligible work dispatch | Determine role/eligibility/assignment scope and dispatch work offers | Operator Core | [Operator specification](../technical/mhcs-core/modules/operator/project.md#business-traceability) |
| [US-STAFF-REG-002](02-user-stories.md#site-staff--reception--registration) consent and ticket handoff | Record one consent confirmation and issue the visit ticket | Operator Core | [Operator specification](../technical/mhcs-core/modules/operator/project.md#business-traceability) |
| [US-STAFF-EXAM-001](02-user-stories.md#site-staff--basic-examination) basic examination | Own the basic-examination stage, queue claim, capture, and release | Operator Core | [Operator specification](../technical/mhcs-core/modules/operator/project.md#business-traceability) |
| [US-STAFF-RAD-002](02-user-stories.md#site-staff--radiography) complete image submission | Accept the complete patient-free capture set and hand it to Image Gateway | Operator Core → Image Gateway | [Image Gateway specification](../technical/mhcs-core/modules/image-gateway/project.md#business-traceability) |
| [US-MEMBER-003](02-user-stories.md#member) result publication | Notify through Messaging and offer a temporary secure result surface when needed | Member Core + Image Gateway | [Member specification](../technical/mhcs-core/modules/member/project.md#business-traceability); [Image Gateway specification](../technical/mhcs-core/modules/image-gateway/project.md#business-traceability) |
| [US-DOCTOR-RAD-002](02-user-stories.md#doctor--radiologist) controlled repeat | Record the radiologist's clinical decision and create a linked repeat handoff | Doctor Core + Member Core | [Doctor specification](../technical/mhcs-core/modules/doctor/project.md#business-traceability) |
| [US-DOCTOR-RAD-003](02-user-stories.md#doctor--radiologist) report lifecycle | Own clinical authorship, finalization, correction/amendment, and publication handoff | Doctor Core | [Doctor specification](../technical/mhcs-core/modules/doctor/project.md#business-traceability) |
| [US-DOCTOR-SPECIALIST-001](02-user-stories.md#doctor--authorized-specialist) scoped specialist output | Enforce specialty/service/modality eligibility and differentiated clinical workflow | Doctor Core | [Doctor specification](../technical/mhcs-core/modules/doctor/project.md#business-traceability) |
| [US-MEMBER-006](02-user-stories.md#member) price and fee awareness | Provide service choices, pricing snapshots, and applicable payment requirements before commitment | Member Core | [Member specification](../technical/mhcs-core/modules/member/project.md#business-traceability) |
| [US-MEMBER-007](02-user-stories.md#member) payment status | Track payment coordination, success, failure, expiry, and booking eligibility | Member Core | [Member specification](../technical/mhcs-core/modules/member/project.md#business-traceability) |
| [US-MEMBER-008](02-user-stories.md#member) booking change and refund outcome | Apply the authorized B2B/B2C cancellation, reschedule, and refund outcome without inventing open commercial policy | Member Core | [Member specification](../technical/mhcs-core/modules/member/project.md#business-traceability) |
| [US-MEMBER-009](02-user-stories.md#member) doctor report access and [US-MEMBER-010](02-user-stories.md#member) repeat entitlement | Deliver authorized doctor reports and linked zero-cost doctor-requested repeat entitlements | Member Core + Doctor Core | [Member specification](../technical/mhcs-core/modules/member/project.md#business-traceability); [Doctor specification](../technical/mhcs-core/modules/doctor/project.md#business-traceability) |
| [US-MEMBER-011](02-user-stories.md#member) family and relationship roles | Preserve requester, payer, subject-of-care, guardian, and result-recipient relationships and authority | Member Core | [Member specification](../technical/mhcs-core/modules/member/project.md#business-traceability) |
| [US-B2B-001](02-user-stories.md#authorized-b2b-representative), [US-B2B-002](02-user-stories.md#authorized-b2b-representative), and [US-B2B-003](02-user-stories.md#authorized-b2b-representative) B2B scope and booking confirmation | Provision and confirm business-funded members, entitlements, services, locations, dates, and shifts | Member Core | [Member specification](../technical/mhcs-core/modules/member/project.md#business-traceability) |
| [US-B2B-004](02-user-stories.md#authorized-b2b-representative), [US-B2B-005](02-user-stories.md#authorized-b2b-representative), [US-B2B-006](02-user-stories.md#authorized-b2b-representative), and [US-B2B-007](02-user-stories.md#authorized-b2b-representative) B2B changes, quota, no-show, and reconciliation | Route official B2B changes and expose applicable entitlement, quota, attendance, and financial records | Member Core + Unified Administration | [Member specification](../technical/mhcs-core/modules/member/project.md#business-traceability); [MHCS Core architecture](../technical/mhcs-core/project.md#business-traceability) |
| [US-STAFF-SHARED-004](02-user-stories.md#site-staff--shared) and [US-STAFF-SHARED-005](02-user-stories.md#site-staff--shared) staff payout handling | Track Site Staff earnings, payout status/history, destinations, failures, and suspension/resumption | Operator Core | [Operator specification](../technical/mhcs-core/modules/operator/project.md#business-traceability) |
| [US-STAFF-REG-003](02-user-stories.md#site-staff--reception--registration), [US-STAFF-REG-004](02-user-stories.md#site-staff--reception--registration), and [US-STAFF-REG-005](02-user-stories.md#site-staff--reception--registration) identity exceptions, walk-in, payment, and cash closing | Resolve authorized front-desk exceptions, assisted walk-ins, on-site payment tracking, and cash reconciliation | Member Core + Operator Core | [Member specification](../technical/mhcs-core/modules/member/project.md#business-traceability); [Operator specification](../technical/mhcs-core/modules/operator/project.md#business-traceability) |
| [US-STAFF-EXAM-003](02-user-stories.md#site-staff--basic-examination) required-item exceptions | Record allowed unavailable, refused, or not-applicable reasons for required basic examination evidence | Operator Core | [Operator specification](../technical/mhcs-core/modules/operator/project.md#business-traceability) |
| [US-STAFF-RAD-004](02-user-stories.md#site-staff--radiography) and [US-STAFF-RAD-005](02-user-stories.md#site-staff--radiography) submission outcome and role-scoped DICOM | Report the Image Gateway submission outcome and enforce Radiography-only operational raw-DICOM access | Operator Core + Image Gateway | [Image Gateway specification](../technical/mhcs-core/modules/image-gateway/project.md#business-traceability); [Operator specification](../technical/mhcs-core/modules/operator/project.md#business-traceability) |
| [US-DOCTOR-SHARED-003](02-user-stories.md#doctor--shared) doctor payout handling | Track Doctor earnings, payout status/history, destination, and authorized exceptions | Doctor Core | [Doctor specification](../technical/mhcs-core/modules/doctor/project.md#business-traceability) |
| [US-DOCTOR-RAD-004](02-user-stories.md#doctor--radiologist) and [US-DOCTOR-RAD-005](02-user-stories.md#doctor--radiologist) replacement review and earning events | Return replacement studies to the Radiologist workflow and expose controlled repeat/final-report earning triggers | Doctor Core + Member Core | [Doctor specification](../technical/mhcs-core/modules/doctor/project.md#business-traceability); [Member specification](../technical/mhcs-core/modules/member/project.md#business-traceability) |
| [US-DOCTOR-SPECIALIST-003](02-user-stories.md#doctor--authorized-specialist) specialist output lifecycle | Support authorized specialty output finalization and amendment while preserving authorship | Doctor Core | [Doctor specification](../technical/mhcs-core/modules/doctor/project.md#business-traceability) |
| [US-ADMIN-005](02-user-stories.md#global-admin--super-admin), [US-ADMIN-006](02-user-stories.md#global-admin--super-admin), [US-ADMIN-007](02-user-stories.md#global-admin--super-admin), [US-ADMIN-008](02-user-stories.md#global-admin--super-admin), and [US-ADMIN-009](02-user-stories.md#global-admin--super-admin) administrative change, rate, financial, payout, identity, and access actions | Provide one audited administration surface over domain-owned configuration, exceptions, and authorization | Unified Administration | [MHCS Core architecture](../technical/mhcs-core/project.md#business-traceability) |
| [US-ADMIN-001](02-user-stories.md#global-admin--super-admin) and [US-ADMIN-004](02-user-stories.md#global-admin--super-admin) administration | Provide one presentation surface over domain-owned provisioning, configuration, audit, and exceptions | Unified Administration | [MHCS Core architecture](../technical/mhcs-core/project.md#business-traceability) |
| [US-MEMBER-012](02-user-stories.md#member), [US-MEMBER-013](02-user-stories.md#member), [US-MEMBER-014](02-user-stories.md#member), [US-MEMBER-015](02-user-stories.md#member), and [US-MEMBER-020](02-user-stories.md#member) confirmation, Doctor Review payment, booking changes, refunds, and payment status | Coordinate member-facing confirmation, payment, booking-change outcomes, and status through Member Core | Member Core | [Member specification](../technical/mhcs-core/modules/member/project.md#business-traceability) |
| [US-MEMBER-016](02-user-stories.md#member), [US-MEMBER-017](02-user-stories.md#member), [US-MEMBER-018](02-user-stories.md#member), and [US-MEMBER-019](02-user-stories.md#member) relationship roles and secure result access | Preserve relationship authority and deliver authorized member-safe results | Member Core | [Member specification](../technical/mhcs-core/modules/member/project.md#business-traceability) |
| [US-STAFF-SHARED-006](02-user-stories.md#site-staff--shared) and [US-STAFF-SHARED-007](02-user-stories.md#site-staff--shared) earnings and payout exceptions | Expose Site Staff earning status and payout resolution outcomes | Operator Core | [Operator specification](../technical/mhcs-core/modules/operator/project.md#business-traceability) |
| [US-STAFF-REG-006](02-user-stories.md#site-staff--reception--registration), [US-STAFF-REG-007](02-user-stories.md#site-staff--reception--registration), [US-STAFF-REG-008](02-user-stories.md#site-staff--reception--registration), and [US-STAFF-REG-009](02-user-stories.md#site-staff--reception--registration) identity, ticket, walk-in, and payment actions | Own authorized Reception / Registration workflows and their Member Core handoffs | Operator Core + Member Core | [Operator specification](../technical/mhcs-core/modules/operator/project.md#business-traceability); [Member specification](../technical/mhcs-core/modules/member/project.md#business-traceability) |
| [US-STAFF-RAD-006](02-user-stories.md#site-staff--radiography) capture review and [US-STAFF-RAD-004](02-user-stories.md#site-staff--radiography) submission outcome | Support Radiography capture decisions and report accepted or action-needed submission outcomes | Operator Core + Image Gateway | [Operator specification](../technical/mhcs-core/modules/operator/project.md#business-traceability); [Image Gateway specification](../technical/mhcs-core/modules/image-gateway/project.md#business-traceability) |
| [US-DOCTOR-SHARED-004](02-user-stories.md#doctor--shared), [US-DOCTOR-SHARED-005](02-user-stories.md#doctor--shared), [US-DOCTOR-SHARED-006](02-user-stories.md#doctor--shared), and [US-DOCTOR-SHARED-007](02-user-stories.md#doctor--shared) claim, workspace history, earnings, and payout actions | Manage eligible Doctor case ownership, professional history, earnings, and payout status | Doctor Core | [Doctor specification](../technical/mhcs-core/modules/doctor/project.md#business-traceability) |
| [US-DOCTOR-RAD-006](02-user-stories.md#doctor--radiologist), [US-DOCTOR-RAD-007](02-user-stories.md#doctor--radiologist), and [US-DOCTOR-RAD-008](02-user-stories.md#doctor--radiologist) quality decision, drafting, finalization, and amendment | Own radiology quality decisions and report lifecycle under Doctor Core | Doctor Core | [Doctor specification](../technical/mhcs-core/modules/doctor/project.md#business-traceability) |
| [US-DOCTOR-SPECIALIST-004](02-user-stories.md#doctor--authorized-specialist) specialist amendment | Preserve authorized specialist output history and authorship | Doctor Core | [Doctor specification](../technical/mhcs-core/modules/doctor/project.md#business-traceability) |
| [US-ADMIN-010](02-user-stories.md#global-admin--super-admin), [US-ADMIN-011](02-user-stories.md#global-admin--super-admin), [US-ADMIN-012](02-user-stories.md#global-admin--super-admin), [US-ADMIN-014](02-user-stories.md#global-admin--super-admin), [US-ADMIN-015](02-user-stories.md#global-admin--super-admin), and [US-ADMIN-016](02-user-stories.md#global-admin--super-admin) assignment, configuration, audit, and financial-exception actions | Route domain-owned administration, authorization, audit, and exception handling through one unified surface | Unified Administration | [MHCS Core architecture](../technical/mhcs-core/project.md#business-traceability) |
| [US-MEMBER-012](02-user-stories.md#member), [US-MEMBER-013](02-user-stories.md#member), [US-MEMBER-014](02-user-stories.md#member), [US-MEMBER-015](02-user-stories.md#member), [US-MEMBER-016](02-user-stories.md#member), [US-MEMBER-017](02-user-stories.md#member), [US-MEMBER-018](02-user-stories.md#member), [US-MEMBER-019](02-user-stories.md#member), and [US-MEMBER-020](02-user-stories.md#member) decomposed Member actions | Coordinate Member confirmation, optional Doctor Review payment, booking changes, refunds/status, relationship authority, and secure result delivery | Member Core | [Member specification](../technical/mhcs-core/modules/member/project.md#business-traceability) |
| [US-STAFF-SHARED-006](02-user-stories.md#site-staff--shared) and [US-STAFF-SHARED-007](02-user-stories.md#site-staff--shared) decomposed Site Staff financial actions | Expose Site Staff earnings and payout status, destination, and exception outcomes | Operator Core | [Operator specification](../technical/mhcs-core/modules/operator/project.md#business-traceability) |
| [US-STAFF-REG-006](02-user-stories.md#site-staff--reception--registration), [US-STAFF-REG-007](02-user-stories.md#site-staff--reception--registration), [US-STAFF-REG-008](02-user-stories.md#site-staff--reception--registration), and [US-STAFF-REG-009](02-user-stories.md#site-staff--reception--registration) decomposed Reception / Registration actions | Coordinate identity verification, consent, ticket issuance, check-in, walk-in, and on-site payment | Operator Core + Member Core | [Operator specification](../technical/mhcs-core/modules/operator/project.md#business-traceability); [Member specification](../technical/mhcs-core/modules/member/project.md#business-traceability) |
| [US-STAFF-RAD-006](02-user-stories.md#site-staff--radiography) decomposed Radiography actions | Support capture review, retake, omission, and complete-set submission | Operator Core | [Operator specification](../technical/mhcs-core/modules/operator/project.md#business-traceability) |
| [US-DOCTOR-SHARED-004](02-user-stories.md#doctor--shared), [US-DOCTOR-SHARED-005](02-user-stories.md#doctor--shared), [US-DOCTOR-SHARED-006](02-user-stories.md#doctor--shared), and [US-DOCTOR-SHARED-007](02-user-stories.md#doctor--shared) decomposed Doctor shared actions | Manage eligible case claim, workspace history, earnings, and payout actions | Doctor Core | [Doctor specification](../technical/mhcs-core/modules/doctor/project.md#business-traceability) |
| [US-DOCTOR-RAD-006](02-user-stories.md#doctor--radiologist), [US-DOCTOR-RAD-007](02-user-stories.md#doctor--radiologist), and [US-DOCTOR-RAD-008](02-user-stories.md#doctor--radiologist) decomposed Radiologist actions | Own DICOM review, diagnostic-quality decision, report drafting, finalization, and amendment | Doctor Core | [Doctor specification](../technical/mhcs-core/modules/doctor/project.md#business-traceability) |
| [US-DOCTOR-SPECIALIST-004](02-user-stories.md#doctor--authorized-specialist) decomposed specialist action | Preserve authorized specialist amendment history and authorship | Doctor Core | [Doctor specification](../technical/mhcs-core/modules/doctor/project.md#business-traceability) |
| [US-ADMIN-010](02-user-stories.md#global-admin--super-admin), [US-ADMIN-011](02-user-stories.md#global-admin--super-admin), [US-ADMIN-012](02-user-stories.md#global-admin--super-admin), [US-ADMIN-014](02-user-stories.md#global-admin--super-admin), [US-ADMIN-015](02-user-stories.md#global-admin--super-admin), and [US-ADMIN-016](02-user-stories.md#global-admin--super-admin) decomposed administration actions | Route Site Staff assignment, service/business configuration, audit, and distinct financial exceptions through the unified surface | Unified Administration | [MHCS Core architecture](../technical/mhcs-core/project.md#business-traceability) |

This bridge prevents technical module specifications from becoming an
independent source of human requirements. Detailed mechanics remain in those
technical authorities; unresolved commercial, identity, credential, and
workspace-mechanism decisions remain open below.

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
holding the Reception / Registration role verify official physical identity documents
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
- Site Staff role eligibility and assignment:
  1. Reception / Registration: front-desk check-in, approved physical identity verification, booking lookup, paper consent confirmation, ticket issuance, and thermal slip printing;
  2. Basic Examination: claiming basic examination tickets, recording vital signs, point-of-care blood screening, structured interview, and paper questionnaire confirmation;
  3. Radiography: claiming X-ray tickets, image capture review, retake/omission handling, and complete-set submission;
- multi-role support: a person may hold multiple roles when eligible; technical enforcement remains in the application layer;
- station selection rules: station selection (`TU`, `PEMERIKSAAN DASAR`, `SESI FOTO RADIOGRAFI`) routes work and LCD calls but cannot grant or elevate a role;
- MVP/beta transitional compatibility: existing beta accounts may temporarily map to all three operational roles;
- new staff provisioning: Global Admin / Super Admin explicitly selects applicable operational roles;
- one site-and-shift ticket across ready-time FIFO basic examination and X-ray queues;
- atomic stage claims, public number-to-station calls for `PEMERIKSAAN DASAR` and `SESI FOTO RADIOGRAFI`, and paired LCD displays;
- basic examination & vital signs measurements, point-of-care screening, and structured interview capture;
- image-set draft and review;
- one Submit action for the complete capture set;
- processing status, role-scoped image viewing, and read-only AI readiness/status monitoring; and
- configured basic examination and X-ray earnings and automated rupiah payouts.

### Target handoffs

The Operator module hands the completed radiography submission and its active
examination context to the Image Gateway module.

Basic examination completion releases the same ticket to X-ray and makes the completing
worker's stage earning eligible. Gateway acceptance completes X-ray, releases
processing to Image Gateway, and makes the submitting worker's stage earning
eligible. Asynchronous AI completion automatically marks the ticket as completed.

## Grabber

Grabber supports Radiography Site Staff in capturing the image set, including
offline operation where applicable. It does not fetch member data or publish
clinical results. Capture-file and processing details remain in the technical
specifications.

## Image Gateway

### Owns

- controlled acceptance and private storage of submitted image studies;
- MPIPS and AI processing coordination;
- authorized image/result access and publication;
- processing and completion status; and
- the image-submission payment eligibility handoff.

### Completion boundary

Processed images become available only to the authorized Radiography Site Staff
assignment and are published to Member Core and Doctor Core when the complete
study is ready. Incomplete or failed processing remains outside Member and
Doctor publication until the applicable recovery or exception outcome is reached.

## MPIPS

### MHCS responsibility

MPIPS provides the separate image-processing capability used by Image Gateway.
Image Gateway owns processing coordination, storage, completion, publication,
and payment meaning.

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
- Operator Core domain: site master data, shift schedules, Site Staff roles (Reception / Registration, Basic Examination, Radiography), protocol templates, earning rates;
- Doctor domain: doctor specialty/modality authorizations, queue reassignment, reporting rates;
- Image Gateway domain: submission monitoring, processing errors, storage compliance.

Unified Administration does **not** create a separate monolithic "Admin" business
domain or database schema; domain ownership remains strictly with the respective
modules.

## Payment ownership and triggers

| Payment area | Owning module | Eligibility trigger |
|---|---|---|
| B2B member entitlement | Member Core | Central annual agreement provisions member entitlements; tracked in Member Core financial records |
| B2C member charge | Member Core | Member booking coordination completed via WhatsApp; payment tracked before visit confirmation |
| Operator basic exam earning | Operator Core | Basic examination completion triggers configured stage rate for performing worker |
| Operator X-ray earning | Operator Core | Durable X-ray submission acceptance triggers configured stage rate for submitting worker |
| Doctor repeat-assessment earning | Doctor Core | Member Core confirms one doctor-requested repeat entitlement: 25% of snapshotted final-report rate |
| Doctor final-report earning | Doctor Core | The signing doctor submits the completed report: 100% of snapshotted final-report rate |

Gateway acceptance is the X-ray-stage earning trigger. DICOM completion and
doctor-queue entry do not create additional operator earnings.

## Business-policy classification

Technical specifications may describe enforcement, but these policies are not
silent technical inventions:

| Policy | Classification | Business authority / status |
|---|---|---|
| Advance-booking threshold, booking quota, and walk-in quota | Configurable operating policy | Candidate defaults are documented in Operator Core; Product Authority may revise them. |
| Sequential work-offer response timeout | Configurable operating policy | Candidate default is five minutes; exact operational setting remains configurable. |
| B2B cancellation, reschedule, and no-show treatment | Business authority | Candidate B2B rule is business-funded, non-member-cancellable, and paid on no-show; exceptions require an official business request. |
| B2C cancellation, deposit/full payment, and refunds | Open business decision | Provider, timing, fees, settlement, and refund policy remain unresolved. |
| Stage and Doctor earning triggers/rates | Business authority with configured rates | Completion/acceptance/report events define eligibility; exact rates and payout mechanics remain configured/open where listed. |
| Guardian and Result Recipient authority | Business authority with unresolved evidence mechanics | Relationships and member-safe access are distinct; evidence, legal-status transition, and delivery mechanics remain open. |
| DICOM access | Business/security rule | Least-privilege access is role and assignment scoped; implementation/session mechanics remain technical authority. |

This classification is the required bridge for technical-only operational rules:
implementation specifications may enforce these decisions, but may not create
new commercial, clinical, identity, or authorization policy without authority.

## Access map

| User | Raw NPZ | View image | Raw DICOM download | AI result | Doctor report |
|---|---:|---:|---:|---:|---:|
| Member (WhatsApp channel) | No | Member-safe delivery | No | WhatsApp notification plus secure temporary result surface where appropriate | WhatsApp notification plus secure temporary result surface where appropriate |
| Reception / Registration Site Staff | No | Only the minimum member/booking information needed for check-in | No raw DICOM | No | No doctor report |
| Basic Examination Site Staff | No | Only information needed for the assigned basic examination | No raw DICOM | No | No doctor report |
| Radiography Site Staff | No | Authorized image view for the active assigned examination | Only where operationally required for the active assigned examination; authenticated attachment | No | No doctor report |
| Doctor (Radiologist / Specialist) | No | Yes, for authorized study | Explicit, audited clinical need | If available | Own workflow |
| Global Admin / Super Admin | Controlled backend access | As required for administration | Controlled backend access | Routing context | Version/audit context |

Radiography Site Staff raw-DICOM downloads are authenticated, non-public attachments
with no permanent public URL and are limited to an active authorized examination.
Members receive member-safe result notifications via WhatsApp and may open a secure
temporary result surface; they do not receive raw DICOM. Site Staff never receive
raw NPZ.

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
9. **Staff Credential & Regulatory Qualification Rules:** Formal regulatory qualification, certification evidence, and credential verification criteria for Reception / Registration Site Staff, Basic Examination Site Staff, Radiography Site Staff, radiologists, and non-radiologist specialists.
10. **Specialty-Specific Doctor Workflows:** Specific clinical sub-specialty workflows, modality eligibility matrices, and reporting templates for non-radiologist specialists.
11. **Staff Authorization Implementation Mechanism:** Technical implementation details in Laravel/Filament (e.g. Spatie Permission vs custom bitmask/boolean flags) for enforcing the three Site Staff roles.
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
