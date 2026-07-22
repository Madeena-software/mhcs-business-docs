# Image Gateway Business Project Foundation

**Status:** Approved target foundation; no current implementation verified
**Last reviewed:** 22 July 2026

This document defines the MHCS business foundation for
`mhcs-image-gateway`. The available repository contains no commits, so every
capability below is a target.

## Purpose

Image Gateway is the controlled backend between operational capture, permanent
image storage, MPIPS processing, optional AI, doctor review, and result
publication.

It is a Python backend with administrator-only internal access, not an
end-user application.

## Intended consumers

- Operator Core submits completed capture sets.
- MPIPS receives authorised processing work.
- Doctor Core receives eligible studies and returns reports.
- Member Core receives member-safe image and result references.
- Administrators receive final-failure notifications and manage exceptional
  compliance actions.

## Submission boundary

Image Gateway receives:

- one or more patient-free NPZ files for one examination;
- a frozen member/examination metadata snapshot;
- the globally unique medical-record ID;
- organisation and examination identity; and
- traceability information for the submitting operator.

Durable acceptance of the complete set is the event that allows Operator Core
to close the examination in its active queue.

The binary should be stored once. Downstream systems should exchange immutable
object references, checksums, identifiers, and status rather than repeatedly
copying the same clinical file between application servers.

## Processing coordination

- Every submitted NPZ must be processed.
- Image Gateway asks MPIPS to create DICOM for each capture.
- Successful capture results are preserved if a sibling capture fails.
- Only the failed capture is retried.
- A failed capture receives three total processing attempts.
- If it still fails, an administrator is notified.
- Email is the required initial notification channel.
- Telegram is a later enhancement.

The exact retry timing belongs to technical planning.

## Completion rules

The examination image set is complete only when every submitted capture has
successfully produced DICOM.

Only then does Image Gateway:

- make the complete image set available to Member Core, Operator Core, and
  Doctor Core as authorised references; and
- start each selected result workflow.

A partially successful image set remains hidden from the member until the
examination is resolved.

## Permanent storage

Image Gateway owns long-term storage for:

- original NPZ files;
- generated DICOM files;
- checksums and object identity;
- processing and publication history; and
- report versions needed for traceability.

The approved policy is indefinite retention for audit and future reprocessing,
with no routine user deletion. Each organisation is isolated in a separate
storage namespace.

Only an authorised compliance administrator may delete or anonymise a record
when legally required. The action must be fully audited.

## Access and distribution

- Raw NPZ is available only to Image Gateway and MPIPS.
- Member Core, Operator Core, and Doctor Core receive references rather than
  permanent file copies.
- Temporary authorised links protect image access.
- Members view images and export TIFF, JPG, or PDF; they do not download raw
  DICOM.
- Operators view images but cannot download raw DICOM.
- Authorised doctors may explicitly download raw DICOM when clinically
  necessary; the download is audit logged.

## AI and doctor routing

- Basic MPIPS processing applies to every examination.
- AI is requested only when selected by the booked service.
- Doctor review is requested only when selected.
- The AI provider is selected by application code, not by the member.
- A successful AI result becomes visible to the member automatically.
- If AI processing fails, Image Gateway invokes the configured fallback. AI
  report delivery to the member, or terminal failure after the fallback also fails, makes
  operator payment eligible.
- For a doctor-only service, placing the DICOM study in the Doctor Core
  dashboard queue makes operator payment eligible before claim.
- A submitted doctor report becomes visible automatically.
- AI and doctor outputs are independent and neither waits for the other.
- A doctor may see available AI output but may finish first.
- Corrected doctor reports preserve history and are redistributed as the new
  current version.

## FHIR boundary

FHIR-compatible structures apply to patient identity, examinations, imaging
studies, and clinical reports.

Processing status, retry control, storage operations, notifications, and
payment-eligibility events remain ordinary service operations.

SATUSEHAT integration is a future possibility. FHIR compatibility does not
prove SATUSEHAT integration, certification, or readiness.

## Does not own

Image Gateway does not own:

- member booking, service rules, or member payments;
- front-desk queues;
- operator earnings records;
- NPZ-to-DICOM algorithms;
- the doctor work queue;
- doctor earnings; or
- clinical approval of AI output.

## Readiness and gaps

**Target only:** The available checkout has no committed implementation.

Exact upload contracts, storage layout, idempotency, FHIR mappings,
authorisation, audit events, callbacks, retry timing, deployment, and tests
belong to a later technical plan.
