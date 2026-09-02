<!-- antigravity-code-agent-template:managed -->
# Project Context

**Status:** Verified documentation context
**Last verified:** 2026-08-29

## Purpose

`mhcs-business-docs` records the approved MHCS teleradiology business flow and
candidate next-authority specifications that application repositories must follow
after human approval. `main` is the currently approved authority; the
`docs/mhcs-product-model-reset` branch is the candidate next authority and its
committed documentation remains provisional until explicitly approved and merged.

Detailed business decisions live under `docs/`; this file remains a concise
agent orientation and must not duplicate them.

## Entry points

- `docs/project.md`: canonical product context entry point for MHCS Core
- `docs/business/01-business-overview.md`: end-to-end business flow, actor journeys,
  responsibilities, and rules
- `docs/business/02-user-stories.md`: human-centric user stories and acceptance criteria
- `docs/business/03-system-responsibilities.md`: ownership, collaboration,
  access, payment triggers, and the FHIR R5 boundary

## Repository facts

- Primary source format: Markdown
- Diagrams: Mermaid
- Supporting presentation: static HTML/CSS actor-journey website and BPMN XML
  with a static viewer under `website/` (used as downstream consistency-audit surfaces)
- Production runtime or build system: none
- Dependency installation: none
- Validation runtime: Python standard library
- Stored patient or clinical data: none
- Deployment: none

## Documentation structure

The repository serves as the MHCS Product Authority:

- `docs/project.md`: MHCS Core product context entry point (purpose, actors, workflows, and authority boundaries), copied into `mhcs-core/.agents/context/project.md`.
- `docs/business/`: detailed business definitions, actor journeys, user stories, and system responsibilities.
- `docs/research/`: background and market research.
- `website/`: static actor-journey and BPMN demonstrator.

Technical implementation details remain owned by `Madeena-software/mhcs-core`.

## Conventions

- Use plain English.
- State approved architecture directly and isolate unresolved choices under
  **Open design decisions**.
- Put cross-system business ownership in `docs/business/`.
- Treat `docs/project.md` as the MHCS Core product context entry point.
- Use local commands, queries, transactions, and durable domain events between
  `mhcs-core` modules. Define the exact transport contract only for MPIPS.
- Keep detailed decisions in `docs/`, not `.agents/context/`.
- Support diagrams with prose.
- Do not store patient data, clinical files, credentials, or secrets.

## Key constraints

- The target topology has exactly two repositories: `mhcs-core` and `mpips`.
- `mhcs-core` is the application implementation repository and consumes this
  repository's approved specifications. This repository does not contain or
  define that implementation.
- The member interaction is WhatsApp-led; finalized results may open in a secure
  temporary result web surface. No permanent member portal, mobile apps, desktop
  apps, or member login credentials exist.
- Site Staff authorization uses three independently assignable roles (Reception /
  Registration, Basic Examination, Radiography) with MVP/beta transitional compatibility;
  `Operator Core` remains the internal module name.
- Doctor authorization covers radiologists and authorized non-radiologist specialists
  with distinct clinical workflows.
- Administration is provided via one unified web panel over domain-owned operations.
- MPIPS is specified as a private black-box API accepting a radiograph NPZ, its
  matching gain NPZ, and a separately signed DICOM metadata manifest, then
  returning one DICOM object.
- Production NPZ parsing must not execute untrusted pickle payloads.
- HL7 FHIR R5 `5.0.0` is the sole active MHCS interoperability target.

## Commands

| Check | Command | Expectation |
|---|---|---|
| Whitespace | `git diff --check` | Reverify after each documentation change |
| Relative links | Validate each relative Markdown link target | Reverify after moving or renaming documents |
| Static website | `python3 website/test_site.py` | Reverify after website or business-flow changes |
| BPMN assets | `python3 website/bpmn/test_bpmn.py` | Reverify after BPMN or workflow changes |
| Interoperability target | Search for external-program-specific assumptions and non-R5 FHIR contracts | Must remain absent from the active specification |
| Topology | Search for obsolete five-application and internal module network contracts | Must remain absent from the target specification |
| Transport scope | Search MHCS Core contexts for route and transport contracts | Exact transport details must exist only in the MPIPS specification |

## Open design decisions

- WhatsApp Business Platform provider, API gateway, and hosting model.
- WhatsApp Bot / LLM architecture and conversational triage design.
- Payment gateway provider, methods (QRIS, VA, e-wallet), and webhook contracts.
- Madeena Points commercial policy (retirement, loyalty conversion, direct rupiah pricing).
- Deposit vs. full-payment policies for WhatsApp bookings.
- Cancellation cutoffs and automated refund settlement workflows.
- Clinical result delivery via WhatsApp notification followed, where required, by a secure temporary result web surface.
- On-site identity verification data capture and storage mechanics at TU station.
- Staff credential and regulatory qualification criteria for all roles.
- Specialty-specific doctor workflows, modality matrices, and reporting templates.
- Staff permission implementation mechanism (Spatie vs custom bitmask/flags).
- Beta account migration mechanism and schedule.
- Exact radiograph and gain NPZ schemas and compatibility limits.
- FHIR R5 profiles, canonical identifiers, terminology bindings, and validation fixtures.

## Authority boundary

The approved architecture and business rules are in `docs/`. This repository
defines the approved `mhcs-core` and MPIPS boundary; application implementation
and source-repository history are outside its authority.
