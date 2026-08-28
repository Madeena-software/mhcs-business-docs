# MHCS Core Architecture Specification

**Status:** Approved target architecture
**Last reviewed:** 29 August 2026

This document is the architecture authority for the MHCS application. Detailed
business rules remain in the module specifications linked below.

## Repository decision

MHCS uses exactly two product repositories:

1. `mhcs-core`: one modular application containing Member, Operator, Doctor,
   and Image Gateway modules, served by staff web interfaces, a unified
   administration panel, and a WhatsApp-only member channel; and
2. `mpips`: one private black-box NPZ-to-DICOM conversion service.

Member, Operator, Doctor, and Image Gateway are modules, not independently
deployed microservices. Their context is partitioned so an agent can load only
the module relevant to its task:

- [Member module](modules/member/project.md)
- [Operator module](modules/operator/project.md)
- [Doctor module](modules/doctor/project.md)
- [Image Gateway module](modules/image-gateway/project.md)
- [UI/UX Design System Export](design/mhcs-core-design.html) (Google Stitch Project: [2877959425967925287](https://stitch.withgoogle.com/projects/2877959425967925287))

The old five-repository deployment model is superseded.

## Human-facing surfaces

The four distinct human-facing interaction surfaces are:

1. **Member:** WhatsApp-only interaction channel. Members receive notifications,
   coordinate bookings, and receive member-safe results exclusively via WhatsApp.
   No authenticated member web portal, native iOS/Android apps, desktop apps, or
   member username/password credentials exist.
2. **Operator:** Staff web application supporting examination-day operations.
   Governed by three independent operational permissions (`TU / Registration`,
   `Nakes Pemeriksaan Dasar`, `Radiografi`). Staff accounts may hold any combination
   of permissions. Station selection routes active work and calls but cannot elevate
   permissions. MVP/beta operator accounts temporarily retain access to all three
   areas under transitional compatibility.
3. **Doctor:** Doctor web application for clinical review and reporting, covering
   radiologists (who perform radiology quality decisions and DICOM reviews) and
   authorized non-radiologist specialists (who review services within their
   authorized specialty and modality eligibility).
4. **Admin:** One unified administration web panel providing administrative
   interfaces across domain-owned operations (Member, Operator, Doctor, Image
   Gateway) without creating a separate monolithic Admin business domain.

## Why this boundary

Member, Operator, Doctor, and Image Gateway participate in one tightly coupled
clinical and financial workflow. Keeping them in one application allows local
authorization, database transactions, module calls, and domain events instead
of duplicated identities, network retries, and distributed state
reconciliation.

MPIPS remains separate because it has a different processing runtime and trust
boundary. It parses radiography inputs, performs conversion, and can require
independent CPU, memory, file, timeout, and process isolation. It receives no
MHCS business authority.

## Technology stack

The initial Composer constraints are PHP `^8.4`, Laravel `^13.8`, and
Filament `^5.0`.

## Target repository layout

The exact framework paths may follow the selected Laravel version, but the
logical structure is:

```text
mhcs-core/
  .agents/
    context/
      README.md
      project.md
      modules/
        member/project.md
        operator/project.md
        doctor/project.md
        image-gateway/project.md
  app/
    Modules/
      Member/
      Operator/
      Doctor/
      ImageGateway/
    Shared/
  database/
  tests/
    Member/
    Operator/
    Doctor/
    ImageGateway/
    Integration/
```

`Shared` contains only genuinely shared primitives such as identifiers, money,
clock abstractions, audit support, and domain-event infrastructure. Business
rules remain in their owning module; `Shared` must not become a miscellaneous
cross-module service layer.

## Runtime topology

`mhcs-core` is one deployable application that may run several processes from
the same source:

- web processes for operator, doctor, and unified administrator interfaces, plus
  WhatsApp webhook/integration endpoints;
- queue workers for WhatsApp message delivery, image orchestration, AI routing,
  and payouts; and
- a scheduler for retries, reconciliation, reminders, and daily doctor payout
  batches.

All processes use one staff authentication and authorization foundation, one
application database, one cache/queue foundation, and the Image Gateway
module's controlled object storage. Tables remain module-owned even when the
database enforces foreign keys across stable identifiers.

The private MPIPS conversion contract is the only internal network service
boundary. The `mhcs-core` image worker and MPIPS may join a private container
network, but MPIPS is not published through the user-facing reverse proxy.
Browser clients, Member, Operator, and Doctor modules never call MPIPS directly.

## Module interaction rules

- A module changes only the records it owns.
- Cross-module synchronous work uses explicit application commands or queries,
  without network calls or module credentials.
- Cross-module asynchronous work uses versioned domain events persisted in the
  same database transaction as the source change.
- A queued handler is idempotent because delivery may repeat.
- Staff user identity, session, role, site, and case authorization come from the
  shared authenticated application context.
- Module boundaries do not require duplicated user, site, booking, clinical,
  or payout records.
- External identifiers remain distinct from local primary keys even though the
  modules share one database.
- Payment gateways, WhatsApp Business Platform providers, AI providers, email
  providers, object storage, and MPIPS remain explicit external adapters.

The application may use one transaction for an approved cross-module invariant,
such as creating a repeat entitlement and its doctor earning event. Long-running
image conversion, AI work, notifications, and payouts remain asynchronous and
must never hold a database transaction open.

## Image Gateway module boundary

The Image Gateway module owns:

- durable plain-byte NPZ and DICOM object storage in a non-public,
  opaque-keyed store with grant-controlled access, integrity metadata, and
  TLS/private infrastructure; MHCS application-side object encryption is not
  part of the current policy;
- object keys, checksums, immutable submission manifests, and retention;
- image-processing jobs, attempt counts, and final-failure status;
- construction and validation of the DICOM metadata manifest;
- the private MPIPS adapter;
- whole-examination completion;
- authorized image access and temporary links;
- AI and doctor routing; and
- publication and report-version distribution state.

Operator submits a capture through the staff `mhcs-core` application. The
request durably persists the radiograph, gain, manifest, and signature to the
configured private store, then atomically accepts the complete source set and
queues MPIPS. Each successful component is immutable; a later same-admission
attempt uploads only a missing component. The Image Gateway queue worker is the
only MPIPS caller, and no application-server-to-application-server file copy or
internal network submission exists inside `mhcs-core`.

Local and production environments use the same business and processing
sequence. The storage provider may differ by environment, but durable state,
privacy, authorization, integrity, and queue boundaries do not.

## MPIPS black-box contract

MPIPS has one MHCS responsibility: convert one radiograph capture into DICOM.
The Image Gateway worker supplies a patient-free radiograph NPZ, its matching
patient-free gain NPZ, and a separately signed DICOM metadata manifest. MPIPS
returns one DICOM result. The exact transport, authentication, idempotency,
success, and failure contract is owned by the separate `mpips` repository. This
context defines only the `mhcs-core` side of that boundary.

MPIPS is stateless from the MHCS business perspective. Temporary files are
removed after the response or bounded recovery window. MPIPS does not own
permanent storage, retries, member identity, FHIR authority, queues, AI,
publication, or payments.

## Conversion flow

```text
Operator module
  -> local complete-submission command
Image Gateway module
  -> capture intent
  -> durable private NPZ, manifest, and signature persistence
  -> atomic source acceptance and queued MPIPS job
MPIPS
  -> DICOM response
Image Gateway module
  -> validate checksum, DICOM identifiers, and frozen manifest
  -> store DICOM durably
  -> mark capture complete or retry up to the approved limit
  -> when the full set is complete, dispatch images, AI, and doctor work
```

Image Gateway owns retries and must reuse the same conversion job identity.
MPIPS must return the original result or an idempotent equivalent for the same
identity and input. Reusing an identity with different bytes or metadata fails
as a conflict.

## Constraints and hazards

- Direct SSH access to production and staging is prohibited. Do not attempt or
  recommend SSH-based troubleshooting.
- Represent infrastructure and server changes in version-controlled
  configuration, then apply them through the approved CI/CD pipeline.

## Deployment

The
[Madeena deployment-template repository](https://github.com/Madeena-software/deploy-templates)
is the external authority for environment-template implementation. Copy and
specialize the applicable templates in `mhcs-core`; do not duplicate their
implementation details in this context.

## Security boundary

- MPIPS accepts calls only from the `mhcs-core` image worker.
- MPIPS has no access to the MHCS application database, payment credentials, or
  user sessions.
- Input size, dimensions, file count, CPU, memory, execution time, and temporary
  storage are bounded.
- NPZ parsing occurs in an isolated process/container and must not execute
  untrusted pickle payloads.
- The manifest is signed and its checksum is bound to the conversion job.
- Logs contain correlation IDs and sanitized technical status, not NPZ
  contents, clinical payloads, tokens, or patient identifiers.
- The Image Gateway module validates the returned DICOM before permanent
  acceptance.

## Open design decisions

The following decisions are intentionally unresolved by current human authority and
remain open design decisions:

1. **WhatsApp Business Platform Provider:** Exact WhatsApp Business Platform provider, API gateway, integration contract, and hosting model.
2. **WhatsApp Bot / LLM Architecture:** Exact conversation flow design, NLP/LLM orchestration layer, automated triage logic, and human-handoff escalation boundaries.
3. **Payment Provider Integration:** Exact payment gateway adapter, payment methods (QRIS, VA, e-wallet), webhook schemas, and timeout/settlement contracts.
4. **Madeena Points Commercial Policy:** Final commercial determination whether Madeena Points are retired, converted to internal loyalty/subsidy credits, or replaced by direct rupiah pricing.
5. **Deposit vs. Full-Payment Policy:** Commercial rules regarding whether WhatsApp bookings require full advance payment, a deposit, or pay-at-site options.
6. **Cancellation & Refund Commercial Terms:** Specific cancellation cutoffs, refund fee policies, and automated refund settlement workflows for WhatsApp-originated bookings.
7. **Clinical Result Delivery Channel Mechanics:** Specific delivery pattern for member results via WhatsApp strictly conforming to the no-web member model (e.g. WhatsApp-delivered member-safe result content or attachment where legally, clinically, technically, and platform-policy appropriate; on-site printout on demand; human-mediated delivery through the WhatsApp channel; or another non-web delivery mechanism approved later).
8. **On-Site Identity Verification Storage Procedure:** Exact data capture and storage mechanics for physical KTP/KIA/KK verification and photo comparison at the TU station.
9. **Staff Credential & Regulatory Qualification Rules:** Formal regulatory qualification, certification evidence, and credential verification criteria for TU staff, basic examination nakes, radiographers, radiologists, and non-radiologist specialists.
10. **Specialty-Specific Doctor Workflows:** Specific clinical sub-specialty workflows, modality eligibility matrices, and reporting templates for non-radiologist specialists.
11. **Staff Permission Implementation Mechanism:** Technical implementation details in Laravel/Filament (e.g. Spatie Permission vs custom bitmask/boolean flags) for the three operator permissions.
12. **Beta Account Migration Mechanism:** Exact database migration and transition schedule for upgrading existing MVP/beta operator accounts to the granular permission model.
13. **Grabber NPZ Schema:** Whether Grabber NPZ contains TIFF bytes, raw numeric array, or both, and required MPIPS compatibility fields.
14. **FHIR R5 Conformance Artifacts:** Exact canonical URLs, package IDs, profiles, and validator fixtures.

## Extraction rule

A module may become a network service later only when measured operational
needs require independent deployment, scaling, failure isolation,
regulatory isolation, or team ownership. Repository size, role-specific user
interfaces, or speculative future growth alone are not sufficient reasons.
