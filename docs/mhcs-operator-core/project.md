# Operator Core Business Project Foundation

**Status:** Approved target foundation
**Last reviewed:** 19 July 2026

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
The current upload path accepts NPZ and DICOM extensions.

No verified end-to-end connection to Member Core, Image Gateway, or MPIPS was
found. The current data model also treats uploaded NPZ files through
DICOM-named paths, so present behavior must not be confused with the approved
target flow.

## Target examination flow

1. Operator Core receives the authorised attendance and examination list from
   Member Core.
2. Front desk confirms arrival and places the member in the operational queue.
3. The operator calls one examination and selects that active examination.
4. Grabber captures X-ray images and writes patient-free NPZ files.
5. On the Grabber computer, an authorised operator opens Operator Core and
   uploads one or more NPZ files into the selected examination.
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

Operator payment has a separate trigger: it becomes eligible only after MPIPS
successfully creates DICOM for every submitted capture. Operator Core owns the
operator earning record.

If any capture remains failed after all retries, the operator earning is not
yet eligible.

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

## FHIR boundary

Patient, examination, and imaging-study information should use
FHIR-compatible clinical structures. Queues, staff operations, and operator
earnings remain ordinary operational workflows.

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

Exact APIs, upload mechanics, idempotency, validation, authorisation, and tests
belong to a later technical plan.
