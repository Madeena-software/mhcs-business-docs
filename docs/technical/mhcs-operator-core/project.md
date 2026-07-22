# Operator Core Business Project Foundation

**Status:** Approved target foundation
**Last reviewed:** 23 July 2026

This document defines the MHCS-specific business responsibilities that belong
to `mhcs-operator-core`. It is not an implementation plan.

## Purpose

Operator Core is the staff-facing application for examination-day operations.
It owns front desk, arrivals, queues, capture-set preparation, the operator
Submit action, processed-image viewing, and operator earnings.

## Intended users

- Front-desk staff confirm eligible members and arrivals.
- Operators or radiographers manage the queue and examination.
- Operator administrators manage operational users, projects, and operator
  earnings.

One deployment serves multiple examination sites. Every operator account is
assigned to its authorized site context. Operator Core holds one revocable
Member Core service credential per site and selects it from the authenticated
operator's site; staff never view or choose a service credential.

## Initial deployment topology

Operator Core is one of five repositories initially deployed on the same
physical computer, each with its own Docker Compose file. Every Compose project
joins the pre-created external Docker network
`mhcs-internal`. Service-to-service URLs use the Docker DNS aliases
`member-core`, `operator-core`, `doctor-core`, `image-gateway`, and `mpips`,
supplied through environment variables; containers never use `localhost` to
reach another service.

Only required user-facing entry points are published through the host reverse
proxy. Internal API ports remain unpublished unless operations explicitly
require otherwise. The shared network does not replace service authentication,
site authorization, audit, or separate database and storage ownership.

## Current verified foundation

The available application manages projects, participants, arrivals, queues,
examinations, uploads, private S3-compatible storage, and completion status.
The current upload path accepts `.npz`, `.dcm`, and `.dicom` files up to
100 MB using extension validation.

No verified end-to-end connection to Member Core, Image Gateway, or MPIPS was
found. The current data model writes an NPZ key into both `npz_path` and
`original_dicom_path`. Operator and administrator preview paths then send the
stored object to a DICOM preview script, so NPZ preview is expected to fail.
Present behavior must not be confused with the approved target flow.

## Target examination flow

1. Operator Core receives the authorised attendance and examination list from
   Member Core using the current site's credential.
2. Front desk records physical arrival in Member Core, then verifies the
   physical KTP/KIA and arriving face against protected Member Core views.
3. Successful verification changes the booking to `checked_in` and Operator
   Core places the member in the operational queue. A mismatch blocks entry
   pending a Member Core administrator decision.
4. The operator calls one examination, creates the R5 `Encounter`, and notifies
   Member Core that examination has started so its Appointment becomes
   `fulfilled`.
5. Grabber captures X-ray images and writes patient-free NPZ files.
6. On the dedicated Grabber computer, which is restricted to authorised staff,
   an operator opens Operator Core and uploads one or more NPZ files into the
   selected examination.
7. The capture set remains a draft. Incorrect or poor-quality captures may be
   removed and retaken.
8. Every NPZ remaining in the draft set is included when the operator clicks
   Submit.
9. Operator Core sends the complete NPZ set and a frozen member/examination
   metadata snapshot to Image Gateway.
10. Durable acceptance of the complete submission by Image Gateway closes the
    examination in the active operator queue and Operator Core reports
    examination completion to Member Core.
11. Processing continues asynchronously; the operator does not wait for MPIPS.

## Capture rules

- An examination may contain multiple NPZ captures.
- Patient identity is selected from the active queue, not inferred from a
  filename.
- NPZ files contain no patient identity.
- Every submitted capture must be processed.
- Submit is a single action for the complete draft set.
- Operator Core is the controlled bridge because Grabber software may remain
  offline.

## Walk-in boundary

Operator Core may initiate a walk-in registration, but Member Core must create
the member and medical-record ID and complete payment before Operator Core
confirms the examination.

Operator Core may confirm cash received for a walk-in top-up. Member Core owns
the money-to-point conversion, immutable top-up and ledger records, point
charge, booking, and `ServiceRequest`. A member may buy more points than the
booking costs; Operator Core displays the returned receipt but never calculates
or mutates the wallet. After a successful idempotent response, Operator Core
appends the member to the end of its own site queue; Member Core does not call
back to change that queue.

## Member Core integration

Operator Core consumes the versioned contracts defined by Member Core for:

- attendance and exact-NIK lookup;
- private KTP/KIA and profile-photo upload references for new walk-ins;
- idempotent walk-in creation and cash top-up;
- `arrived`, examination-started, and examination-completed status events;
- protected identity-verification sessions and decisions;
- vital-sign recording and correction; and
- end-of-shift cash closing.

Operator Core persists outbound status events until Member Core accepts them.
An event carries its actual occurrence timestamp and one stable idempotency key.
If a pre-shift-end arrival is delivered after Member Core automatically marks
the booking `no_show`, Member Core may correct that status while preserving both
audit events.

Member Core automatically marks a still-confirmed booking `no_show` exactly at
the shift end; Operator Core does not extend the shift or apply a grace period.
One member identity may have only one active booking across every site, shift,
and service, so an exact-NIK lookup returns at most one eligible booking.

At shift close, Operator Core submits the operator-counted cash. A matching
Member Core total closes as `reconciled`; a difference closes as
`reconciliation_required` without blocking the operator or altering points and
bookings. Administrator resolution preserves both original totals and the
reason.

## Completion and payment

Gateway acceptance closes the operational queue item.

Operator payment has a separate trigger based on the member's selected result
service:

- If the service includes an AI report, payment becomes eligible after that AI
  report is delivered to the member. If AI processing fails, its fallback must run; payment
  becomes eligible only after delivery or after the fallback also reaches
  terminal failure.
- If the service is doctor-only, payment becomes eligible when the DICOM study
  enters the Doctor Core dashboard queue, before any doctor claims it.

Operator Core owns the operator earning record. Gateway acceptance alone never
makes it eligible.

## Operator result access

Operators may:

- see processing status; and
- view the completed processed image set.

Operators may not:

- view AI diagnoses;
- view doctor reports;
- access raw NPZ; or
- download raw DICOM.

## Information sent and received

Operator Core sends:

- the submitted NPZ capture set;
- the examination identifier;
- the frozen member/examination metadata snapshot; and
- the submitting operator and organisation context needed for traceability.

Operator Core receives:

- durable gateway acceptance;
- processing status;
- completed-image references; and
- the event that makes operator payment eligible.

## FHIR R5 boundary

The target interoperability contract uses HL7 FHIR R5 `5.0.0`. Operator Core
consumes Member Core references for `Patient`, `Appointment`, and
`ServiceRequest`. It owns the operational mapping for `Organization`,
`Location`, `Practitioner`, `PractitionerRole`, `Encounter`, `Task`, and
`Procedure`, and sends captured vital-sign measurements to Member Core's
`Observation` authority.

Physical arrival maps the Member Core Appointment to `arrived`; successful
identity and administrative verification maps it to `checked-in`. Operator Core
creates the `Encounter` when the examination starts, not merely when the member
arrives, links it to the Appointment, and reports the start so Member Core maps
the Appointment to `fulfilled`. Clinical execution then follows Encounter
statuses while the Appointment remains fulfilled.

Queues, draft captures, processing status, staff administration, and operator
earnings remain ordinary operational workflows and must not be forced into
FHIR resources. The verified implementation has no complete R5 interface;
profiles, mappings, validation, and tests are target work.

## Does not own

Operator Core does not own:

- member accounts or member payments;
- permanent NPZ or DICOM storage;
- NPZ-to-DICOM conversion;
- AI-provider orchestration;
- doctor work queues or reports; or
- member publication.

## Readiness and gaps

**Current:** Front desk, queues, examination flow, and file upload exist.

**Target:** Multi-capture drafts, a single all-files Submit action, Member Core
attendance, durable gateway submission, payment events, and completed-image
viewing require verification or implementation.

Extension validation does not prove the internal NPZ schema or content. A
production upload boundary requires HTTPS, authenticated operator sessions,
examination-scoped authorisation, an explicit upload limit, and server-side
content/schema validation.

Member Core owns the canonical operator API schemas and errors. Operator Core
still requires implementation and tests for per-site credential selection,
idempotent retries, protected verification views, cash closing, and status-event
persistence. Image Gateway upload mechanics and their authorization contract
remain later technical work.
