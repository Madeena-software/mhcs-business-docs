# Doctor Core Business Project Foundation

**Status:** Approved target foundation; current implementation unknown
**Last reviewed:** 28 July 2026

This document defines the intended MHCS business foundation for
`mhcs-doctor-core`. The repository was not available for verification, so no
capability in this document should be described as currently implemented.

## Purpose

Doctor Core is the doctor-facing application for claiming imaging cases,
reviewing studies, deciding whether each study is diagnostically usable,
requesting clinical repeats, writing reports, and managing doctor earnings and
payouts.

It may share Operator Core's technical foundation and interface conventions,
but it does not copy Operator Core's front-desk or examination workflow.

## Intended users and authorization

- Doctors claim and review cases for which their active credentials and
  configured service or modality permissions are valid.
- Doctor administrators manage doctors, eligibility, queue reassignment,
  earning rates, payout suspension, and operational monitoring.

An expired, suspended, or out-of-scope doctor cannot see or claim an
ineligible case. If authorization ends after claim, Doctor Core preserves the
draft but blocks final submission and requires reassignment. The replacement
doctor may read the prior draft as reference, must review the study
independently, and signs the final report under their own identity. Both
contributions remain auditable.

Administrators cannot alter a doctor's clinical decision, silently rewrite a
draft, sign a report for a doctor, or create or edit a doctor's bank
destination.

## Initial deployment topology

Doctor Core is one of five repositories initially deployed on the same physical
computer, each with its own Docker Compose file. Every Compose project joins the
pre-created external Docker network
`mhcs-internal`. Service-to-service URLs use the Docker DNS aliases
`member-core`, `operator-core`, `doctor-core`, `image-gateway`, and `mpips`,
supplied through environment variables; containers never use `localhost` to
reach another service.

Only required user-facing entry points are published through the host reverse
proxy. Internal API ports remain unpublished unless operations explicitly
require otherwise. The shared network does not replace service authentication,
authorization, audit, or separate database and storage ownership.

## Target work queue

Eligible, unclaimed cases appear in a shared queue ordered by:

1. highest clinical priority;
2. nearest configured reporting deadline; and
3. oldest eligible case.

Priorities and reporting deadlines are versioned service configuration rather
than one hard-coded value for every case.

A claim is atomic. When two doctors attempt to claim the same case, exactly one
succeeds and the other receives a conflict response without acquiring clinical
access. A claimed case remains assigned until the doctor releases or completes
it, or an administrator reassigns it with an audited reason. Claims do not
expire automatically. Reminders and administrator escalation handle overdue
work without unexpectedly removing an active clinical case.

Releasing a case returns it to the eligible shared queue. Administrator
reassignment preserves the prior claim, draft, access, and reason history. A
doctor cannot claim a case outside their current credentials or configured
scope. Doctor Core has no front desk.

Queue, claim, assignment, deadline, and escalation state are ordinary Doctor
Core application records and APIs. They are not FHIR `Task` resources.

## Study access

Doctors view an authorized study inside Doctor Core by default.

An authorized doctor may explicitly download raw DICOM when clinically
necessary for an external diagnostic application, referral, or offline work.
Each download uses a short-lived purpose-bound link and is audit logged.

Doctors never access raw NPZ.

When both AI and doctor review were selected, the doctor may see an available
AI result but does not wait for AI before making the quality decision or
completing the report.

## Diagnostic-quality decision

The doctor must explicitly record one decision for every reviewed
`ImagingStudy`:

- `usable`: the study is diagnostically usable; or
- `repeat_required`: a new examination is clinically required.

Submitting a report does not implicitly create the quality decision. A final
report requires at least one explicitly usable study. A usable decision
immediately emits the study-level doctor-stage earning event to Operator Core;
the later report submission is the separate trigger for the doctor's own final
report earning.

Each quality decision records the case, study, examination, doctor, occurrence
time, source version, and stable event ID. A decision is immutable. A mistake
is corrected through a new linked correction with a mandatory reason rather
than editing or deleting the original. The doctor requests the correction, and
an administrator resolves any repeat booking or payment consequence that has
already started.

## Doctor-requested repeat lifecycle

Only a doctor may request a clinical repeat. MPIPS, Image Gateway, Member Core,
and Operator Core cannot independently make that clinical decision.

For `repeat_required`, the doctor records one preliminary reason plus a
clinical note. The controlled preliminary reasons are:

- `operator_error`;
- `equipment_failure`;
- `incorrect_order`;
- `medical_limitation`; and
- `other`, which requires an explanation.

The doctor's original reason and note remain immutable. Operator Core's global
administrator separately verifies or corrects the financial classification for
operator earnings without changing the clinical record.

The repeat flow is:

1. Doctor Core moves the case to `repeat_pending`, preserves its draft, and
   blocks final report submission.
2. Doctor Core sends one authenticated, idempotent repeat-entitlement request
   to Member Core.
3. Member Core creates one zero-point, doctor-only entitlement and acknowledges
   it to Doctor Core. The acknowledgment makes the doctor's repeat-assessment
   earning eligible.
4. Member Core notifies the member and owns site and shift selection. The
   member may choose any compatible site and shift; the booking consumes normal
   advance-booking capacity.
5. Operator Core performs a new examination and submission. AI is not run
   again, including when the original service included AI.
6. Image Gateway sends one authenticated, idempotent replacement-study event
   to the existing Doctor Core case after the new study is ready.
7. The case returns directly to the requesting doctor. If that doctor is no
   longer authorized, it enters the shared eligible queue and an administrator
   is notified.

One case may have only one active repeat request at a time. There is no hard
clinical limit on sequential repeats: if a replacement study is also unusable,
the doctor may request another repeat after recording a separate study-level
decision. Every request, entitlement, booking, examination, and study remains
linked and separately audited. Unusual repeat patterns are flagged for review
without automatically blocking a clinically necessary request or withholding
an eligible earning.

The repeat entitlement has no automatic expiry. It remains pending until the
member books it, formally declines it, or a doctor cancels it for a documented
clinical reason. A pending entitlement consumes no booking capacity; its
scheduled booking does. Member Core reminders and administrator follow-up
handle long-pending cases.

The repeat normally copies the original requested examination. When the reason
is `incorrect_order`, the doctor may specify the corrected examination,
anatomy, or laterality. Member Core creates a linked replacement
`ServiceRequest` and preserves the original order.

Every repeat creates a new linked `ServiceRequest`, `Appointment`, `Encounter`,
and `ImagingStudy`; it never reopens or overwrites the completed original
records. Doctor Core presents the original and replacement studies together as
read-only clinical history. The newest usable study is the primary diagnostic
basis, while the final report records all studies reviewed and identifies the
primary study explicitly.

If the member declines, the case closes as `repeat_declined`, keeps the
eligible repeat-assessment earning, and produces no final report. Member Core
shows that the recommended repeat was declined and the report could not be
completed.

## Report lifecycle

1. A report remains freely editable while it is a draft.
2. A final report requires an explicit usable quality decision.
3. Submit finalizes the report and makes the final-report doctor earning
   eligible.
4. The submitted report becomes visible to the member automatically after
   Image Gateway delivers it to Member Core.
5. A submitted report is immutable and cannot be silently overwritten.
6. A clinically necessary correction may be issued at any later time.
7. Each correction preserves the original, records the reason, doctor,
   timestamp, and signature, and identifies the superseded version.
8. The corrected report becomes the current member-visible version and the
   member is notified.
9. A clinically significant correction must be communicated as soon as
   possible.

There is no arbitrary time limit that prevents a necessary correction.

These access and lifecycle rules were approved after review of DICOMweb
rendered/native retrieval, HL7 FHIR `DiagnosticReport` revision states,
Indonesian electronic-medical-record requirements, and the ACR communication
practice parameter. The source links are retained in
[System Responsibilities and Readiness](../../business/03-system-responsibilities.md#evidence-sources).

## Doctor earnings

Doctor earnings are ordinary Doctor Core financial records denominated in
Indonesian rupiah. They are not Madeena Points and are not FHIR resources.

The administrator configures a final-report rate per service and a
repeat-assessment percentage. Doctor Core snapshots the applicable values when
the original case enters its queue; later configuration changes do not revalue
historical work.

The approved initial MHCS repeat-assessment percentage is 25% of the snapshotted
normal final-report rate. This is an internal configurable MHCS policy, not an
external professional reimbursement standard.

Earning rules are:

- **Repeat assessment:** each valid repeat request becomes 25% eligible only
  after Member Core confirms creation of exactly one repeat entitlement.
- **Sequential repeats:** each separately accepted repeat request creates
  another 25% earning because it represents another study review and clinical
  decision.
- **Final report:** the doctor who signs and submits the final report receives
  100% of the snapshotted final-report rate.
- **Reassignment:** a doctor keeps earnings whose triggers they completed. The
  final-report earning belongs only to the doctor who signs and submits it.
- **Draft only:** an unfinished draft creates no earning.
- **Correction or amendment:** correcting an already submitted report remains
  part of the original review and creates no additional earning.
- **Member decline:** declining a recommended repeat does not cancel the
  eligible 25% repeat-assessment earning.

If a mistaken repeat request is corrected before Member Core creates the
entitlement, no 25% earning is created. If the earning exists but has not
entered a payout, it is cancelled through a linked audited correction. Money
already transferred is never automatically withdrawn from the doctor's bank
account; it requires audited administrator reconciliation.

Each earning has a stable event ID, case, trigger, percentage, rate snapshot,
gross amount, status, source version, and payout reference. The doctor-facing
ledger displays repeat-assessment and final-report events separately.

## Automated doctor payouts

Doctor Core owns its payment-gateway adapter. Eligible earnings are visible
immediately and are combined into one automatic payout per doctor per day.
There is no minimum positive balance and no per-payout administrator approval.

Doctors enter and manage their own bank destination. A new or changed
destination requires password reauthentication, a one-time code, and successful
payment-gateway verification. It applies only to payouts that have not started.
Administrators cannot create or edit the destination. They may suspend or
resume payouts for a suspected fraud or account problem with a mandatory
audited reason.

Earnings remain intact while no verified destination exists or while payouts
are suspended. They enter the next automatic daily payout after the block is
resolved.

Each payout snapshots its verified destination, earning IDs, gross amount, fee
policy, and idempotency key when processing starts. The payout state is:

```text
eligible -> queued -> processing -> paid
                         |          ^
                         +-> retry -+
                         +-> failed_permanent -> queued_after_account_fix
```

Temporary failures retry with the same payout ID. A payout becomes `paid` only
after Doctor Core verifies the gateway's signed success callback.
Reconciliation recovers a successful transfer whose callback was delayed or
lost without issuing a duplicate transfer.

The default fee policy makes MHCS absorb the transfer fee so the doctor
receives the full configured earning. An administrator may change that policy
only for payouts that have not started. This matches Operator Core's default
fee treatment.

## Information received

Doctor Core receives authorized references and clinical context from Image
Gateway:

- the imaging study and its immutable identifiers;
- the examination, order, and member context needed for review;
- selected service, priority, deadline, and credential requirements;
- available AI output when applicable; and
- replacement-study events linked to the original case and repeat chain.

Doctor Core receives entitlement and decline status from Member Core and
payment-gateway account, transfer, and callback results through its own
provider adapter.

## Information produced

Doctor Core produces:

- claim, release, reassignment, repeat-pending, and completion status;
- immutable study-level quality decisions and audited corrections;
- authenticated operator-earning events for quality acceptance or repeat
  requirement;
- idempotent repeat-entitlement requests;
- the final doctor report and corrected or amended versions;
- repeat-assessment and final-report doctor earnings; and
- daily doctor payout and reconciliation records.

## Application and service contracts

Representative doctor-facing routes are:

| Method and route | Purpose |
|---|---|
| `GET /api/v1/cases` | Read only cases eligible for the authenticated doctor |
| `POST /api/v1/cases/{id}/claim` | Atomically claim one eligible case |
| `POST /api/v1/cases/{id}/release` | Return a claimed case to the eligible queue |
| `POST /api/v1/cases/{id}/quality-decisions` | Record `usable` or `repeat_required` for one study |
| `POST /api/v1/quality-decisions/{id}/corrections` | Request an append-only correction |
| `PUT /api/v1/cases/{id}/draft` | Save the authenticated doctor's report draft |
| `POST /api/v1/cases/{id}/reports` | Sign and submit the final report |
| `POST /api/v1/reports/{id}/corrections` | Create a traceable report correction or amendment |
| `PUT /api/v1/me/payout-account` | Step-up authenticate and verify a payout destination |
| `GET /api/v1/me/earnings` | Read itemized earnings and payout status |

Every state-changing route uses a stable idempotency key where a retry is
possible and reconciles identifiers to the authenticated doctor and authorized
case.

Doctor Core asks Member Core to create a repeat entitlement:

```http
POST /api/v1/internal/repeat-entitlements
Authorization: Bearer <doctor-core-service-token>
Idempotency-Key: <repeat-request-id>
Content-Type: application/json
```

The request identifies the original case, booking, order, examination, study,
requesting doctor, controlled reason, occurrence time, source version, and any
doctor-authorized corrected order details. The clinical note remains protected
and is shared only when Member Core needs it for the member-safe explanation.
The same ID and payload return the original entitlement; a changed payload
with the same ID fails as a conflict. Doctor Core does not make the 25% earning
eligible until Member Core confirms the entitlement ID.

Image Gateway returns a ready replacement study through:

```http
POST /api/v1/internal/repeat-study-events
Authorization: Bearer <image-gateway-service-token>
Idempotency-Key: <replacement-study-event-id>
Content-Type: application/json
```

The event identifies the Doctor Core case, repeat entitlement, order,
appointment, encounter, new study, original study, occurrence time, and source
version. Unknown lineage or a conflicting replay fails closed.

Doctor Core sends study-level quality events to Operator Core's authenticated
earning-event endpoint. `quality_accepted` identifies the usable study;
`repeat_required` identifies the unusable study, controlled preliminary reason,
and original decision event. Operator Core owns the separate administrator
classification that determines the affected operator earning.

Payment-gateway callbacks use a provider-adapter route and are verified from
the raw request before parsing or mutation. Provider event IDs are unique;
callbacks, payout creation, and reconciliation are idempotent.

## FHIR R5 boundary

The target interoperability contract uses HL7 FHIR R5 `5.0.0`. Doctor Core
consumes authorized references to `Patient`, `Encounter`, `ServiceRequest`,
`ImagingStudy`, `Observation`, and any available AI result. It produces
versioned `DiagnosticReport` resources and records applicable `Provenance` and
`AuditEvent` resources.

A final report identifies every reviewed `ImagingStudy`, the primary usable
study, the applicable encounter and service request lineage, result
observations, interpreter, effective and issued times, conclusion, status, and
any presented report form. Each repeat retains its new linked
`ServiceRequest`, `Encounter`, and `ImagingStudy`; the original resources remain
unchanged.

A final report is never silently overwritten. Corrections use the applicable
R5 corrected or amended status and preserve version lineage. Quality decisions,
queue mechanics, deadlines, repeat-entitlement state, user administration,
earnings, and payouts remain ordinary application workflows. Doctor Core does
not create FHIR `Task` for its internal queue.

Because the source is unavailable, every R5 mapping, profile, validator, and
test remains target work.

## Security and audit requirements

- Every clinical read is case-, doctor-, purpose-, and authorization-scoped.
- Queue eligibility is recalculated when credentials or permissions change.
- DICOM links are short lived, purpose bound, and single-case authorized.
- Quality decisions, corrections, repeat requests, claims, reassignment,
  report signatures, earning transitions, bank verification, payout actions,
  and administrator decisions are immutable audit events.
- Clinical notes, identifiers, bank details, gateway payloads, and credentials
  never enter ordinary application logs.
- Service calls authenticate the sending service, validate the expected
  audience, reject stale or conflicting versions, and fail closed on unknown
  cross-service identifiers.
- Report signing, payout-account changes, and sensitive administrator actions
  require recent or step-up authentication.

## Does not own

Doctor Core does not own:

- member identity, booking charges, repeat scheduling, or notifications;
- front-desk or capture operations;
- permanent image storage;
- NPZ-to-DICOM processing;
- AI execution or AI publication;
- operator earnings or the final operator financial classification; or
- FHIR resources owned by another MHCS service.

## Readiness and gaps

**Unknown:** Doctor Core source was unavailable for inspection.

Every capability above is an approved target. Exact report structure, FHIR R5
profiles and mappings, credential sources, signature mechanism, notification
templates, service authentication, payment gateway, bank-account verification,
daily payout schedule, deployment, and tests remain implementation work.
