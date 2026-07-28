<!-- antigravity-code-agent-template:managed -->
# Project Context

**Status:** Verified documentation context
**Last verified:** 2026-07-28

## Purpose

`mhcs-business-docs` records the approved MHCS teleradiology business flow and
the central technical specifications that application repositories must
follow.

Detailed business decisions live under `docs/`; this file remains a concise
agent orientation and must not duplicate them.

## Entry points

- `.agents/context/README.md`: human reading guide
- `docs/business/01-business-overview.md`: end-to-end business flow, actor journeys,
  responsibilities, and rules
- `docs/business/03-system-responsibilities.md`: ownership, collaboration,
  access, payment triggers, and the FHIR R5 boundary
- `docs/technical/mhcs-core/project.md`: authoritative target architecture for
  the future application and router to its module contexts
- `docs/technical/mhcs-core/modules/<module>/project.md`: Member, Operator,
  Doctor, and Image Gateway module contexts, partitioned for selective loading
- `docs/technical/mpips/project.md`: private black-box integration contract

## Repository facts

- Primary source format: Markdown
- Diagrams: Mermaid
- Supporting presentation: static HTML/CSS actor-journey website and BPMN XML
  with a static viewer under `website/`
- Production runtime or build system: none
- Dependency installation: none
- Validation runtime: Python standard library
- Stored patient or clinical data: none
- Deployment: none

## Documentation structure

The repository contains cross-system business documents and technical
specifications for exactly two target repositories:

- future `mhcs-core`: one new modular Laravel application containing Member,
  Operator, Doctor, and Image Gateway modules; and
- `mpips`: a separate private black-box conversion API.

The `mhcs-core` context mirrors its future `.agents/context` layout: one root
`project.md` routes agents to nested Member, Operator, Doctor, or Image Gateway
`project.md` files. These nested files are context partitions, not separate
applications or repositories.

## Conventions

- Use plain English.
- State approved architecture directly and isolate unresolved choices under
  **Open design decisions**.
- Put cross-system business ownership in `docs/business/` and detailed data,
  module operations, security, and FHIR R5 mappings in `docs/technical/`.
- Treat `docs/technical/mhcs-core/project.md` as the authority for target
  topology and cross-module interaction rules.
- Use local commands, queries, transactions, and durable domain events between
  `mhcs-core` modules. Define the exact transport contract only for MPIPS.
- Keep detailed decisions in `docs/`, not `.agents/context/`.
- Support diagrams with prose.
- Do not store patient data, clinical files, credentials, or secrets.

## Key constraints

- The target topology has exactly two repositories: `mhcs-core` and `mpips`.
- `mhcs-core` will be created as a new Laravel repository in a later explicit
  implementation phase. This repository currently designs it but does not
  implement or scaffold it.
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

- Exact radiograph and gain NPZ schemas and compatibility fixtures.
- DICOM tag mapping, manifest signature format, and UID policy.
- FHIR R5 profiles, canonical identifiers, terminology bindings, and
  validation fixtures.
- Payment, AI, notification, and other external-provider contracts.
- Retry intervals, temporary-link expiry, deployment, storage, monitoring, and
  audit policy details.

## Authority boundary

The approved architecture and business rules are in `docs/`. This repository
designs the future `mhcs-core` and MPIPS boundary; application implementation
and source-repository history are outside its authority.
