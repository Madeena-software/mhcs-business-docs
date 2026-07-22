# MPIPS Additions Required by MHCS

**Status:** Approved MHCS delta; not a standalone MPIPS project context
**Last reviewed:** 23 July 2026

This document contains only the additions and integration boundaries MPIPS
needs for MHCS. It deliberately does not repeat MPIPS's existing purpose,
architecture, processors, commands, or non-MHCS use cases.

Its contents may later be merged into MPIPS's verified
`.agents/context/project.md` through separately approved work.

## MHCS purpose

For MHCS, MPIPS converts patient-free NPZ captures produced by Grabber into
DICOM files using separately supplied member and examination metadata.

MHCS treats NPZ-to-DICOM conversion as a ready MPIPS capability. Gain,
calibration, and conversion details remain an internal Grabber/MPIPS concern,
not an MHCS business responsibility.

The target NPZ is described as containing TIFF image data and gain data
prepared by Grabber. Grabber may also supply calibration data, while the MPIPS
technical team owns compatibility validation. The exact on-disk schema remains
to be verified against both products.

## MHCS caller

Only Image Gateway coordinates MHCS processing with MPIPS.

Operator Core, Member Core, and Doctor Core do not call MPIPS directly.

## Initial deployment topology

MPIPS is one of five repositories initially deployed on the same physical
computer, each with its own Docker Compose file. Every Compose project joins the
pre-created external Docker network `mhcs-internal`.
Service-to-service URLs use the Docker DNS aliases `member-core`,
`operator-core`, `doctor-core`, `image-gateway`, and `mpips`, supplied through
environment variables; containers never use `localhost` to reach another
service.

Only required user-facing entry points are published through the host reverse
proxy. Internal API ports remain unpublished unless operations explicitly
require otherwise. The shared network does not replace service authentication,
site authorization, audit, or separate database and storage ownership. This
topology does not change the rule that only Image Gateway calls MPIPS for MHCS.

## Input required from Image Gateway

For each submitted capture, MPIPS receives:

- an authorised reference to the patient-free NPZ;
- the organisation and examination context;
- the globally unique medical-record ID;
- the frozen clinical metadata needed to create DICOM; and
- an external execution identity that allows safe status correlation.

The clinical metadata contract uses the MHCS HL7 FHIR R5 `5.0.0` profiles.
Queue, payment, retry, and administrative data do not need to be represented
as FHIR resources.

## Output required by Image Gateway

For each capture, MPIPS produces:

- the generated DICOM object in authorised storage;
- processing status;
- output identity and integrity information; and
- failure information sufficient for Image Gateway to decide whether to retry.

Image Gateway, not MPIPS, decides when the whole multi-capture examination is
complete. Operator Core decides earning eligibility from authenticated AI and
doctor-stage events; MPIPS has no payment responsibility.

## Multi-capture and failure boundary

- Every submitted NPZ is processed.
- A capture succeeds or fails independently.
- Successful outputs remain available when another capture fails.
- Image Gateway requests up to three total attempts for a failed capture.
- MPIPS must make repeated execution safely correlatable with the original
  capture.

Exact retry timing and technical idempotency are deferred.

## Storage boundary

Image Gateway owns permanent NPZ and DICOM storage and retention policy.
MPIPS reads and writes only authorised objects within the submitting
organisation's isolated namespace.

MPIPS does not publish files directly to members, operators, or doctors.

## Current evidence and integration gap

The available MPIPS repository contains an NPZ radiography workflow and tests,
along with service, worker, callback, and S3-compatible storage foundations.

The current generic HTTP DAG input path was not verified as exposing the
Madeena radiograph NPZ workflow required by MHCS. Therefore:

- NPZ-to-DICOM processing capability is treated as available business
  capability; but
- the exact Image Gateway-to-MPIPS production contract remains a technical
  integration gap.

The current NPZ reader uses NumPy object arrays with pickle enabled and
explicitly requires trusted files. A safe production trust boundary must be
verified before the MHCS integration is considered ready. This security
requirement is not optional, but its solution belongs to technical planning.

The inspected workflow expects fields including `rawimage`, `gainid`,
`xrayparams`, and `cameraparams`, and checks gain ID, detector mode, image
dimensions, and camera serial. It remains unknown whether the Grabber NPZ
contains TIFF bytes, a raw numeric image array, or both, and whether its schema
matches these expectations.

Because a malicious pickle may execute while loading, before post-load schema
validation, technical planning must choose either a non-pickle NPZ schema or
an isolated trusted conversion boundary. Extension checking alone is
insufficient.

## Does not become MPIPS ownership

The MHCS addition does not make MPIPS responsible for:

- member identity ownership;
- booking or service choices;
- front-desk or examination queues;
- permanent clinical-record retention;
- AI-provider selection;
- doctor work queues;
- result publication;
- member, operator, or doctor payments.

## Completion condition for this delta

The MHCS addition is ready only when Image Gateway can submit an authorised NPZ
and frozen clinical snapshot, receive a correlated DICOM result and status,
and safely retry a failed capture without duplicating a successful result.

API schemas, authentication, object-key rules, FHIR R5 mapping, deployment, and
tests belong to a later technical plan.
