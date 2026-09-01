# MHCS Core → MPIPS context

## Boundary

The Image Gateway worker is the sole `mhcs-core` caller of the separate private
`mpips` repository. MPIPS is a black-box radiograph conversion processor:

```text
patient-free radiograph NPZ + matching gain NPZ + signed DICOM manifest → DICOM
```

Image Gateway owns the job identity, patient/business authority, permanent
storage, validation, retries, multi-capture completion, and publication. MPIPS
owns only conversion and bounded request-scoped processing.

## Trust and responsibility split

Only the authenticated Image Gateway worker may call the private endpoint.
MPIPS must not access the MHCS database, user sessions, payment credentials,
permanent object storage, or member/result channels. The NPZ inputs remain
patient-free; the signed manifest is the MHCS source for the minimum patient,
workflow, acquisition, and DICOM metadata. Returned DICOM remains untrusted
until Image Gateway validates it before durable acceptance.

The exact transport, authentication, idempotency, error, schema, signature,
resource-limit, and DICOM-conformance contract is detailed authority under
`Madeena-software/mhcs-business-docs/docs/technical/mpips/project.md` and the
target repositories' implementation evidence. This file intentionally does not
duplicate MPIPS architecture.

## Observed evidence

Inspect the target Image Gateway worker/adapter and the separate MPIPS contract
for current behavior. This context describes intended ownership and the
mhcs-core-side boundary, not conformance.
