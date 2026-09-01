# Member Core context

## Purpose

Coordinate member identity and relationships, booking, consent, attendance
handoff, Messaging notifications, optional doctor-review coordination, repeat
entitlements, and authorized result delivery.

## Owns

Member records and identity authority, booking/relationship roles, member-facing
coordination, and the handoff of authorized results. Messaging is the persistent
member interaction channel. A richer result view/download may use a secure,
temporary Result Surface; it is not a permanent conventional Member Portal.

## Does not own

Site Staff work and earnings, doctor clinical decisions, DICOM/NPZ storage or
conversion, AI execution, or payment-provider mechanics.

## Important boundaries

Guardian is not automatically the Result Recipient. Identity authority and
result-recipient authority are separate and must be explicitly authorized.
Minimize Site Staff access to identity data; verification and lookups are
purpose-bound and auditable. Internal `Member` maps to external FHIR `Patient`
only at the interoperability boundary. HL7 FHIR R5 `5.0.0` is the active
standard.

## Dependencies and surfaces

Member interacts with Messaging, Operator Core attendance/cash handoff, Doctor
Core review/publication, Image Gateway result publication, payment adapters, and
FHIR adapters through explicit module contracts. Member-facing terminology is in
the package [UI language context](../../ui-language.md).

## Authority and observed evidence

Intended authority: the Business authority sources listed in `context/project.md`.
Honor their recorded lifecycle/status and applicable adopted revision. Observed
implementation evidence: inspect the target
`mhcs-core` Member module, auth/policy code, schema, adapters, and tests. Neither
source proves the other.

## Open decisions

Temporary-result authentication/disclosure/retention, on-site verification
mechanics, payment and refund policy, Madeena Points commercial treatment, and
FHIR conformance artifacts remain open where not resolved by the applicable
authority sources.
