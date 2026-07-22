# Operator Core Business Project Foundation

**Status:** Approved target foundation
**Last reviewed:** 22 July 2026

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
   Member Core.
2. Front desk confirms arrival and places the member in the operational queue.
3. The operator calls one examination and selects that active examination.
4. Grabber captures X-ray images and writes patient-free NPZ files.
5. On the dedicated Grabber computer, which is restricted to authorised staff,
   an operator opens Operator Core and uploads one or more NPZ files into the
   selected examination.
6. The capture set remains a draft. Incorrect or poor-quality captures may be
   removed and retaken.
7. Every NPZ remaining in the draft set is included when the operator clicks
   Submit.
8. Operator Core sends the complete NPZ set and a frozen member/examination
   metadata snapshot to Image Gateway.
9. Durable acceptance of the complete submission by Image Gateway closes the
   examination in the active operator queue.
10. Processing continues asynchronously; the operator does not wait for MPIPS.

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

Exact APIs, upload mechanics, idempotency, validation, authorisation, and tests
belong to a later technical plan.
