# MHCS Core context

## Purpose and delivery state

`Madeena-software/mhcs-business-docs` is the documentation repository for the
MHCS product. `mhcs-core` is intended to be one modular application for Member,
Operator, Doctor, and Image Gateway responsibilities. This folder is a
copy-ready orientation package for `mhcs-core/.agents/context/`; it is not a
business specification, source-code substitute, or proof of implementation.
The current technical architecture is candidate/target material unless an
authority source says otherwise.

### Prepared package state

Ready/candidate for adoption subject to review.

### Observed target implementation state

Must be refreshed and verified from `mhcs-core` source, configuration,
migrations, tests, and runtime evidence at adoption. This package does not
claim the target implementation currently conforms.

## Authority and evidence map

Business authority sources are:

- `Madeena-software/mhcs-business-docs/docs/business/01-business-overview.md`
- `Madeena-software/mhcs-business-docs/docs/business/02-user-stories.md`
- `Madeena-software/mhcs-business-docs/docs/business/03-system-responsibilities.md`

Honor each source's recorded lifecycle/status and applicable adopted revision;
do not reproduce those sources here or upgrade their status in this context.
The current implementation must be checked in the target `mhcs-core` source,
configuration, schema, tests, and runtime evidence. The contexts below route
that inspection but do not claim conformance.

## System context and boundaries

MHCS coordinates Members, Authorized B2B Representatives/Business Customers,
Site Staff, Doctors, and Global Admin/Super Admin. Member interaction is led by
Messaging; WhatsApp is the initial/reference channel. Assigned operational work
uses **Temporary Site Workspace** and **Temporary Clinical / DICOM Workspace**;
Global Admin uses the **Persistent Admin Web**. On-site / Physical interaction
may complement these surfaces where applicable.
External boundaries include payment and messaging providers, AI, email/SMS,
object storage, interoperability systems, and the separate private `mpips`
repository.

`mhcs-core` remains one deployable application with module-owned data and
explicit synchronous commands/queries and transactional versioned events.
The principal internal responsibilities are Member Core, Operator Core, Doctor
Core, and Image Gateway. They are modules, not independently deployed services.
Shared primitives must remain genuinely shared rather than becoming a business
rule dumping ground.

## Ownership and trust boundaries

- Member Core coordinates member identity/relationships, bookings, consent,
  messaging, and result-delivery authorization. A secure result surface is
  temporary and task-specific; there is no permanent conventional Member Portal
  requirement.
- Operator Core owns Site Staff operations, sites, assignments, queues, and
  operational earnings.
- Doctor Core owns scoped clinical review, quality decisions, reports, and
  publication handoffs.
- Image Gateway owns clinical binaries, integrity/manifest state, controlled
  access, processing orchestration, and the sole `mhcs-core` call to MPIPS.

MPIPS receives patient-free NPZ inputs plus a signed DICOM metadata manifest and
returns DICOM. It has no MHCS database, user-session, payment, or permanent
storage authority. Browser, Member, Operator, and Doctor clients never call it.
See [the MPIPS boundary](integrations/mpips/project.md).

## Scoped-context routing

Load the relevant package context before implementation:

- [Member](modules/member/project.md)
- [Operator](modules/operator/project.md)
- [Doctor](modules/doctor/project.md)
- [Image Gateway](modules/image-gateway/project.md)
- [MPIPS integration](integrations/mpips/project.md)
- [UI language](ui-language.md)
- [Design](design/DESIGN.md)

## Routing and constraints

Load [UI language](ui-language.md) for member-facing terminology and the
relevant module context before implementation. Use `design/DESIGN.md` and the
repository-owned logo for visual guidance; the historical HTML prototype is
reference material, not behavioral authority.

Retain the separation between identity and result-recipient authority defined by
the applicable business authority sources,
Site Staff eligibility/assignment/workspace scope, doctor specialty and case
scope, clinical-binary ownership, and HL7 FHIR R5 `5.0.0` interoperability.
Do not infer unresolved commercial, clinical, credential, retention, NPZ, FHIR,
or integration details from this package. Exact payment terms, temporary-result
authentication, specialty workflows, staff qualification, safe NPZ schema, and
FHIR conformance artifacts remain open where not resolved by the applicable
authority sources.
