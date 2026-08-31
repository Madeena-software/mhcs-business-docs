# MHCS Core Doctor Module Specification

**Status:** Candidate target foundation — pending human approval
**Last reviewed:** 29 August 2026

This document defines the Doctor module in the approved `mhcs-core` modular
application. The overall repository and runtime boundary is defined by the
[MHCS Core architecture](../../project.md).

## Business Traceability

This module is the technical authority for [Doctor stories](../../../../business/02-user-stories.md#doctor--shared), [Radiologist stories](../../../../business/02-user-stories.md#doctor--radiologist), and [Authorized Specialist stories](../../../../business/02-user-stories.md#doctor--authorized-specialist), plus Doctor Core responsibilities for scoped clinical access, repeat decisions, reports, amendments, and publication handoff.

## Purpose

Doctor Core is the doctor-facing module for claiming clinical cases, reviewing
studies, performing quality evaluations, requesting clinical repeats (for
radiology services), writing clinical reports, and managing doctor earnings and
payouts.

It provides a temporary, assignment-scoped Clinical / DICOM Workspace opened from
WhatsApp. It shares `mhcs-core`'s technical foundation and interface conventions
without copying Operator Core's front-desk or examination workflow.

## Intended users and authorization

Doctor Core serves a multi-specialty clinical population:

- **Radiologists:** Specialist physicians authorized to review radiological
  examinations, make study-level diagnostic quality decisions (`usable` / `repeat_required`),
  request clinical repeats, perform DICOM reviews, and author diagnostic radiology reports.
- **Authorized non-radiologist specialists:** Specialist physicians authorized to
  review examinations and clinical data within their specific specialty scope and
  modality eligibility. Non-radiologist specialists are **not** forced into
  radiology-specific quality decisions, raw DICOM reviews, or repeat-imaging workflows.
- **Global Admin / Super Admin:** Manages doctor records, credentials, specialty
  and service authorizations, modality eligibility, queue reassignment, earning
  rates, payout suspension, and operational monitoring through the unified Admin Web.

### Shared foundations vs. specialty authorizations

Doctor Core establishes shared technical foundations:

- shared staff identity, authentication, and credential management for temporary
  workspace access;
- shared assignment mechanisms, atomic case claims, and release/reassignment controls;
- shared clinical report drafting, versioning, signature, and amendment mechanisms;
- shared earnings tracking and automated daily rupiah payout infrastructure.

Within these shared foundations, Doctor Core enforces explicit specialty/service
authorizations:

- Each doctor is configured with authorized specialties (e.g. Radiology, Pulmonology, Cardiology), service scopes, and modality eligibility.
- A doctor sees and claims cases only within their active credentials and authorized specialty scope.
- Clinical workflows are differentiated: radiology-specific quality decisions and repeat requests remain scoped to radiology services and are not universalized to non-radiologists.

Administrators cannot alter a doctor's clinical decision, rewrite a draft, sign a
report on behalf of a doctor, or edit a doctor's bank destination.

## MHCS Core topology

Doctor is a module in the single `mhcs-core` repository and runtime. It shares
authentication, database, queue, and deployment foundations with Member,
Operator, and Image Gateway while retaining explicit clinical, earning, payout,
and table ownership.

Doctor invokes Member commands and consumes Image Gateway and Operator domain
events locally without network calls or module credentials. Only the Image
Gateway worker crosses the separate private MPIPS boundary.

## Target work queue

When a case becomes available, MHCS determines eligible Doctors and sends a
minimal-information WhatsApp offer. After acceptance, the Doctor opens the
temporary Clinical / DICOM Workspace. The underlying eligible-case queue remains
filtered by active specialty authorization and modality eligibility, ordered by:

1. highest clinical priority;
2. nearest configured reporting deadline; and
3. oldest eligible case.

A claim is atomic. When two doctors attempt to claim the same case, exactly one
succeeds and the other receives a conflict notification. A claimed case remains
assigned until the doctor releases or completes it, or an administrator reassigns
it with an audited reason. Claims do not expire automatically.

Releasing a case returns it to the eligible shared queue. Administrator
reassignment preserves prior claims, drafts, access, and reason history.

Queue, claim, assignment, deadline, and escalation states are ordinary Doctor
Core application records and workflows. They are not FHIR `Task` resources.

## Doctor interaction and work history

WhatsApp is the persistent Doctor interaction layer:

```text
case available → eligible Doctors → minimal-information WhatsApp offer
→ ACCEPT / DECLINE → assignment / claim → OPEN CASE
→ temporary Clinical / DICOM Workspace → complete → return to WhatsApp
```

`KASUS SAYA / RIWAYAT SAYA` returns a concise professional history including
completed cases, current assignment status, report status, simple counts,
amendment or repeat-request status where useful, and applicable earnings or
payout status. If detailed inspection is genuinely required, `LIHAT RIWAYAT
LENGKAP` opens a secure temporary Doctor History surface; it is not a permanent
Doctor Portal. Exact authentication and temporary-session mechanics remain open.

## Study access

Doctors view authorized studies inside the temporary Clinical / DICOM Workspace.

An authorized doctor may explicitly download raw DICOM when clinically
necessary for an external diagnostic application, referral, or offline work.
Each download uses a short-lived, purpose-bound link and is audit logged.

Doctors never access raw NPZ.

When both AI and doctor review were selected, the doctor may see available
AI output but does not wait for AI before completing the clinical report.

## Diagnostic-quality decisions (Radiology services)

For radiology services, the radiologist must explicitly record one decision for
every reviewed `ImagingStudy`:

- `usable`: the study is diagnostically usable; or
- `repeat_required`: a new examination is clinically required.

Submitting a report does not implicitly create the quality decision. A final
radiology report requires at least one explicitly usable study. The quality
decision does not change Operator stage earnings; report submission is the separate
trigger for the doctor's final-report earning.

Non-radiologist specialists reviewing non-radiology clinical services are not
subject to radiology-specific quality decision workflows.

## Doctor-requested repeat lifecycle (Radiology services)

Only an authorized radiologist may request a clinical repeat. MPIPS, Image Gateway,
Member Core, and Operator Core cannot independently make that clinical decision.

For `repeat_required`, the radiologist records one preliminary reason plus a
clinical note:

- `operator_error`;
- `equipment_failure`;
- `incorrect_order`;
- `medical_limitation`; and
- `other`, which requires an explanation.

The repeat flow is:

1. Doctor Core moves the case to `repeat_pending`, preserves its draft, and blocks
   final report submission.
2. Doctor module invokes the local idempotent `CreateRepeatEntitlement` command on
   Member Core.
3. Member Core creates one zero-cost, doctor-only repeat entitlement; that creation
   and the doctor's 25% repeat-assessment earning commit atomically.
4. Member Core coordinates member scheduling and notification via WhatsApp.
5. Operator Core determines eligible `Radiografi` workforce and sends a repeat-
   radiography WhatsApp offer; after acceptance, Radiography Site Staff opens the temporary
   Site Workspace and performs a new examination and submission. AI is not rerun.
6. Image Gateway emits a `ReplacementStudyReady` domain event when the replacement
   study is ready.
7. The case returns directly to the requesting doctor (or to the eligible queue
   if the doctor is no longer authorized).

The repeat entitlement has no automatic expiry. It remains pending until booked,
declined via WhatsApp, or clinically cancelled.

## Report lifecycle

1. A report remains freely editable while it is a draft.
2. For radiology services, a final report requires an explicit usable quality decision.
3. Submit finalizes the report and triggers the final-report doctor earning (100%).
4. The submitted report becomes visible to Member Core for WhatsApp notification and secure temporary result-link delivery where appropriate.
5. A submitted report is immutable and cannot be silently overwritten.
6. A clinically necessary correction may be issued at any later time as a signed amendment.
7. Each correction preserves the original, records reason, doctor, timestamp, and signature, and identifies the superseded version.
8. The corrected report is redistributed to Member Core for WhatsApp notification.

## Doctor earnings

Doctor earnings are ordinary Doctor Core financial records denominated in
Indonesian rupiah. They are not Madeena Points and are not FHIR resources.

Earning rules:

- **Repeat assessment:** each valid repeat request becomes 25% eligible after
  Member Core confirms creation of the repeat entitlement.
- **Sequential repeats:** each separately accepted repeat request creates
  another 25% earning.
- **Final report:** the doctor who signs and submits the final report receives
  100% of the snapshotted final-report rate.
- **Reassignment:** a doctor keeps earnings whose triggers they completed.
- **Draft only:** an unfinished draft creates no earning.
- **Correction or amendment:** correcting an already submitted report creates no
  additional earning.
- **Member decline:** declining a recommended repeat does not cancel the eligible
  25% repeat-assessment earning.

## Automated doctor payouts

Doctor Core owns its payment-gateway adapter. Eligible earnings are combined
into one automatic daily payout per doctor with no minimum positive balance.

Doctors enter and manage their own verified bank destination. MHCS absorbs transfer
fees by default so the doctor receives the full configured earning.

## Information received and produced

- **Received:** authorized study references, examination/order/member clinical context
  from Image Gateway, available AI output, replacement-study events, repeat entitlement
  status from Member Core, payment gateway confirmations.
- **Produced:** claim/release status, quality decisions, repeat commands, final reports,
  amendments, earnings, payout records.

## FHIR R5 boundary

- **FHIR release:** R5 `5.0.0` only.
- Consumes references to `Patient`, `Encounter`, `ServiceRequest`, `ImagingStudy`, `Observation`.
- Produces versioned `DiagnosticReport`, `Provenance`, and `AuditEvent` resources.
- Does not use FHIR `Task` for internal queue management.

## Security and audit requirements

- Clinical reads are case-, doctor-, purpose-, and authorization-scoped.
- Queue eligibility is filtered by active specialty authorizations and modality eligibility.
- DICOM links are short-lived, purpose-bound, and single-case authorized.
- Quality decisions, corrections, repeat requests, claims, reassignment, report
  signatures, and payout actions are immutable audit events.

## Acceptance criteria

Doctor Core satisfies this specification when:

- [ ] Doctor authorization covers radiologists and authorized non-radiologist specialists based on configured specialty and modality eligibility.
- [ ] Shared technical foundations (auth, case queue, claim/release, report drafting, amendments, earnings, payouts) are utilized across doctor specialties.
- [ ] Radiology-specific imaging workflows (quality decisions `usable` / `repeat_required`, raw DICOM review, repeat requests) are preserved for radiology services.
- [ ] Non-radiologist specialists review clinical services within their authorized scope without being forced into radiology quality decisions, DICOM reviews, or repeat-imaging workflows.
- [ ] Doctor Core does not duplicate or copy Operator examination workflows.
- [ ] Shared work queues filter cases based on doctor specialty authorization and modality eligibility.
- [ ] Atomic claims prevent concurrent assignment of the same case.
- [ ] Final report submission makes the report immutable, triggers 100% final-report earning, and initiates Member Core WhatsApp notification plus appropriate secure temporary result-link delivery.
- [ ] Traceable report amendments preserve original versions with explicit lineage.
- [ ] Repeat requests create zero-cost entitlements in Member Core and trigger 25% repeat-assessment earnings.
- [ ] Automated IDR payouts process doctor earnings on a daily schedule.

## Open design decisions

The following decisions are intentionally unresolved by current human authority:

1. **Specialty-Specific Doctor Workflows:** Specific clinical sub-specialty workflows, modality eligibility matrices, and reporting templates for non-radiologist specialists.
2. **Staff Credential & Regulatory Qualification Rules:** Formal regulatory qualification, certification evidence, and credential verification criteria for radiologists and non-radiologist specialists.
3. **Payment Gateway Integration:** Payment provider adapter, account verification, transfer schemas, and fee contracts for doctor payouts.
4. **FHIR R5 Conformance Artifacts:** Canonical URLs, package IDs, profiles, and validator fixtures for `DiagnosticReport`.
