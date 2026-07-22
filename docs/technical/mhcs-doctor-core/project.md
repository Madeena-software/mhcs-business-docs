# Doctor Core Business Project Foundation

**Status:** Approved target foundation; current implementation unknown
**Last reviewed:** 23 July 2026

This document defines the intended MHCS business foundation for
`mhcs-doctor-core`. The repository was not available for verification, so no
capability in this document should be described as currently implemented.

## Purpose

Doctor Core is the doctor-facing application for claiming imaging cases,
reviewing studies, writing clinical reports, and managing doctor earnings.

It may share Operator Core's technical foundation and interface conventions,
but it does not copy Operator Core's front-desk or examination workflow.

## Intended users

- Doctors claim and review eligible cases.
- Doctor administrators manage doctors, queue eligibility, reassignment, and
  doctor earnings.

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
site authorization, audit, or separate database and storage ownership.

## Target work queue

- Eligible studies appear in a shared queue.
- A doctor claims a case before reviewing it.
- A claimed case is unavailable for simultaneous claim by another doctor.
- A doctor may release a case back to the shared queue.
- An administrator may reassign a case.
- Doctor Core has no front desk.

## Study access

Doctors view the study inside Doctor Core by default.

An authorised doctor may explicitly download raw DICOM when clinically
necessary for an external diagnostic application, referral, or offline work.
Each download uses a short-lived authorised link and is audit logged.

Doctors never access raw NPZ.

When both AI and doctor review were selected, the doctor may see an available
AI result but does not wait for AI before completing the report.

## Report lifecycle

1. A report remains freely editable while it is a draft.
2. Submit finalises the report and makes doctor payment eligible.
3. The submitted report becomes visible to the member automatically after
   Image Gateway delivers it to Member Core.
4. A submitted report is immutable and cannot be silently overwritten.
5. A clinically necessary correction may be issued at any later time.
6. Each correction preserves the original, records the reason, doctor,
   timestamp, and signature, and identifies the superseded version.
7. The corrected report becomes the current member-visible version and the
   member is notified.
8. A clinically significant correction must be communicated as soon as
   possible.

There is no arbitrary time limit that prevents a necessary correction.

These access and lifecycle rules were approved after review of DICOMweb
rendered/native retrieval, HL7 FHIR `DiagnosticReport` revision states,
Indonesian electronic-medical-record requirements, and the ACR communication
practice parameter. The source links are retained in
[System Responsibilities and Readiness](../../business/03-system-responsibilities.md#evidence-sources).

## Payment boundary

Doctor Core owns doctor earnings.

Doctor payment becomes eligible when the doctor submits the completed report.
It does not wait for member publication.

Correcting or amending an already-paid report is part of the original review
and does not create another payment.

## Information received

Doctor Core receives authorised references and clinical context from Image
Gateway:

- the imaging study;
- the examination and member context needed for review;
- selected service information; and
- available AI output when applicable.

## Information produced

Doctor Core produces:

- claim, release, and completion status;
- the final doctor report;
- corrected or amended report versions; and
- the event that makes doctor payment eligible.

## FHIR R5 boundary

The target interoperability contract uses HL7 FHIR R5 `5.0.0`. Doctor Core
consumes authorised references to `Patient`, `Encounter`, `ServiceRequest`,
`ImagingStudy`, `Observation`, and any available AI result. It uses `Task` for
claim and assignment state, produces versioned `DiagnosticReport` resources,
and records applicable `Provenance` and `AuditEvent` resources.

A final report is never silently overwritten. Corrections use the applicable
R5 corrected or amended status and preserve version lineage. Queue mechanics,
user administration, and doctor earnings remain ordinary application
workflows. Because the source is unavailable, every R5 mapping, profile,
validator, and test remains target work.

## Does not own

Doctor Core does not own:

- member booking or payments;
- front-desk or capture operations;
- permanent image storage;
- NPZ-to-DICOM processing;
- AI execution; or
- the decision to publish an AI result.

## Readiness and gaps

**Unknown:** Doctor Core source was unavailable for inspection.

Every capability above is an approved target. Exact report structure, FHIR R5
mapping, authorisation, signatures, queue concurrency, notifications,
deployment, and tests belong to a later technical plan.
