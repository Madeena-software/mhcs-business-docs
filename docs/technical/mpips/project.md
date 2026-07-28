# MPIPS Black-Box Integration Contract

**Status:** Approved MHCS target contract
**Last reviewed:** 28 July 2026

This document defines only the MHCS integration boundary for the separate
`mpips` repository. MPIPS internal architecture, processors, commands, and
non-MHCS use cases remain outside this contract.

The overall two-repository decision is defined by the
[MHCS Core architecture](../mhcs-core/project.md).

## Repository role

MPIPS is the only separate internal processing service used by `mhcs-core`.
It is a black box with one MHCS responsibility:

```text
radiograph NPZ + matching gain NPZ + signed DICOM manifest
  -> DICOM
```

MPIPS owns the conversion algorithm and technical compatibility between
Grabber radiograph/gain inputs and its processing pipeline. It receives no
authority over MHCS members, bookings, queues, reports, payments, publication,
or permanent storage.

## Sole caller

Only the Image Gateway worker inside `mhcs-core` calls MPIPS. Member, Operator,
Doctor, browser clients, AI providers, and administrators do not call it
directly.

MPIPS is reachable only on a private container network. Its port is not
published through the user-facing reverse proxy. Private networking does not
replace request authentication, input limits, idempotency, or process
isolation.

## Conversion API

The preferred initial contract is a synchronous private endpoint invoked from
an asynchronous `mhcs-core` image job:

```http
POST /v1/conversions
Authorization: Bearer <mhcs-core-mpips-token>
Idempotency-Key: <conversion-job-id>
Content-Type: multipart/form-data
```

The multipart request contains:

- `radiograph_npz`: one patient-free radiograph capture;
- `gain_npz`: the exact gain/calibration input selected by the frozen gain
  identity; and
- `dicom_manifest`: a separately signed JSON manifest with the minimum frozen
  clinical, acquisition, and DICOM metadata.

The request also binds checksums and byte sizes for all three parts to the
conversion job identity. File names are correlation labels only and never an
identity source.

The response is one DICOM body, preferably `application/dicom`, with:

- output checksum and byte size;
- conversion job identity;
- MPIPS converter version;
- DICOM Study, Series, and SOP Instance UIDs; and
- sanitized conversion metadata required for Image Gateway validation.

MPIPS does not call back into `mhcs-core`. The Image Gateway worker receives the
response, validates it, stores it, and records status. If conversion time later
makes a synchronous private call impractical, an asynchronous MPIPS adapter may
be introduced without changing MPIPS business ownership.

## DICOM manifest

The radiograph and gain NPZ files remain patient-free. The signed manifest is
the only MHCS source for patient and workflow identity. It contains the approved
minimum required to create and validate the DICOM object, including:

- medical-record identifier and applicable DICOM patient attributes;
- order, accession, booking, and encounter identifiers;
- Study, Series, and SOP Instance UIDs allocated under the MHCS policy;
- organization, physical site, and acquisition device identifiers;
- modality, examination, anatomy, projection, and laterality;
- acquisition and occurrence times with explicit offset;
- source capture, submission, and conversion job identifiers;
- applicable character set and required controlled codes; and
- manifest version, checksum bindings, and signature metadata.

Exact DICOM tag paths, required/optional cardinality, terminology, UID root, and
signature format remain conformance work. MPIPS must not infer clinical
identity from file names or invent missing patient/order metadata.

## Success behavior

For a valid request, MPIPS:

1. authenticates the caller and binds the request to the idempotency key;
2. verifies manifest signature, checksums, sizes, and supported version;
3. safely loads the radiograph and matching gain inputs;
4. verifies gain identity, detector mode, dimensions, and required acquisition
   compatibility;
5. performs conversion;
6. applies the frozen manifest to the DICOM result;
7. validates the required output structure; and
8. streams the DICOM response with integrity and version metadata.

MPIPS reports success for one capture only. It does not decide whether a
multi-capture examination is complete.

## Error contract

Failures use stable technical codes and sanitized messages. At minimum, the
contract distinguishes:

| Error | Retry meaning |
|---|---|
| `UNAUTHENTICATED` | Permanent until caller configuration is corrected |
| `IDEMPOTENCY_CONFLICT` | Permanent; the same job ID was reused with different input |
| `UNSUPPORTED_MANIFEST_VERSION` | Permanent until compatible contract deployment |
| `INVALID_MANIFEST` | Permanent input or signature failure |
| `INVALID_RADIOGRAPH_NPZ` | Permanent malformed or unsupported capture |
| `INVALID_GAIN_NPZ` | Permanent malformed or unsupported gain input |
| `GAIN_MISMATCH` | Permanent correlation or calibration mismatch |
| `RESOURCE_LIMIT_EXCEEDED` | Permanent for that input unless limits are intentionally changed |
| `CONVERSION_FAILED` | Retry only when the detailed code marks it transient |
| `TEMPORARY_INTERNAL_FAILURE` | Safe to retry with the same job identity |

Errors never include NPZ contents, patient identifiers, manifest bodies,
tokens, internal paths, pickle payloads, or stack traces.

## Idempotency and retries

The Image Gateway module owns the approved three-total-attempt policy and retry
timing. MPIPS does not independently start business retries.

For the same conversion job ID and identical inputs, MPIPS returns the original
result or an idempotent equivalent with the same DICOM identifiers. Reusing the
ID with different bytes, checksums, or manifest fails as
`IDEMPOTENCY_CONFLICT`.

A successful output is never regenerated with new UIDs merely because the
caller did not receive the first response. The Image Gateway worker preserves
successful sibling captures while retrying only the failed capture.

## Storage boundary

Image Gateway owns permanent radiograph NPZ, gain NPZ, DICOM, checksum,
manifest, processing-history, and retention storage.

MPIPS receives request-scoped bytes and may use bounded temporary storage only.
Temporary inputs and outputs are deleted after the response or a narrowly
defined crash-recovery window. MPIPS does not receive general object-storage
credentials and does not publish files to a member, operator, doctor, or AI
provider.

## Security boundary

- MPIPS runs in an isolated process/container with bounded CPU, memory,
  execution time, file size, dimensions, decompression, and temporary storage.
- Only the configured `mhcs-core` Image Gateway worker identity may call the
  endpoint.
- Request and response logs contain correlation IDs and sanitized status only.
- Network egress is denied unless an explicit conversion dependency requires
  it.
- The manifest signature and all part checksums are verified before conversion.
- Returned DICOM is still treated as untrusted by Image Gateway until output
  validation succeeds.

NPZ parsing must not execute untrusted pickle payloads. Extension checking or
post-load validation is not a sufficient safety boundary because malicious
code may execute during load. Production must use a non-pickle input schema or
a hardened isolated conversion process with no MHCS database,
permanent-storage, user-session, or payment access.

## Open design decisions

- exact safe radiograph and gain NPZ schemas;
- DICOM tag mapping, cardinality, terminology, and UID policy;
- manifest signature algorithm, key rotation, and verification policy;
- resource, timeout, and temporary-storage limits;
- detailed DICOM validation and technical error mapping; and
- interoperability and security fixtures.

## Does not own

MPIPS does not own:

- MHCS authentication users or role authorization;
- member identity authority or FHIR resources;
- sites, schedules, bookings, queues, or examinations;
- permanent NPZ, gain, DICOM, or report storage;
- multi-capture completion or retry policy;
- AI selection or execution;
- doctor work or result publication;
- member, operator, or doctor earnings and payouts; or
- compliance deletion and retention policy.

## Completion criteria

The MPIPS integration is ready only when tests demonstrate that:

- a valid radiograph NPZ, matching gain NPZ, and signed manifest return one
  valid correlated DICOM;
- patient identity comes only from the manifest;
- mismatched gain, altered bytes, invalid signature, unsupported version, and
  resource-limit cases fail with stable sanitized errors;
- a same-input retry cannot create different DICOM identifiers or duplicate
  permanent output;
- a changed-input idempotency replay is rejected;
- temporary files are removed;
- MPIPS cannot access the MHCS database or permanent object storage; and
- Image Gateway validates and durably stores the successful response before
  marking the capture complete.
