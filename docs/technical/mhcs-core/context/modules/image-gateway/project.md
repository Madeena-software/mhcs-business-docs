# Image Gateway context

## Purpose and ownership

Image Gateway is the durable clinical-binary and processing boundary. It owns
controlled acceptance and private storage of radiograph/gain NPZ and DICOM,
object keys/checksums/manifests, integrity validation, processing orchestration,
authorized image access, completion state, and handoffs to AI, Doctor, and
Member result publication.

## Trust and access boundaries

Storage is non-public and grant-controlled. Patient/business authority is kept
in the signed manifest and MHCS application boundary; MPIPS is a processor, not
an identity or business authority. Input and output are untrusted until their
integrity and required structure are validated. NPZ processing must not execute
untrusted pickle payloads; isolation and resource limits are required.

The Image Gateway worker is the sole `mhcs-core` caller of MPIPS. Browser,
Member, Operator, Doctor, and AI clients do not call MPIPS directly. See the
[MHCS-side MPIPS context](../../integrations/mpips/project.md).

## Does not own

Member identity, booking, Site Staff authorization, clinical decisions, report
signing, payment policy, or MPIPS permanent storage and business retries.

## Interaction surfaces and dependencies

Operator submits a complete capture set; Image Gateway persists it durably,
queues processing, validates returned DICOM, and publishes only complete,
authorized studies. It depends on Operator Core, Doctor Core, Member Core,
private object storage, MPIPS, AI, and messaging/result adapters.

## Authority and observed evidence

Intended authority is the accepted business sources in `context/project.md` plus
the approved boundary they reference. Observed evidence must be checked in the
target Image Gateway code, workers/jobs, storage policies, manifests, and tests.
Low-level algorithm, controller, retry-count, and queue details belong in
implementation evidence or dedicated authority, not this orientation file.

## Open decisions

Safe NPZ schema, DICOM mapping/validation, manifest signature/key policy,
resource limits, error mapping, retention, and interoperability fixtures remain
open where unapproved.
