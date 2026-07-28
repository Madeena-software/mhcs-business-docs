<!-- antigravity-code-agent-template:managed -->
# Project Context

**Status:** Verified documentation context
**Last verified:** 2026-07-28
**Repository checkpoint:** working tree; reverify the current Git commit before
copying a specification into an implementation repository

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
- `docs/business/03-system-responsibilities.md`: ownership, readiness, and the
  FHIR R5 boundary
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

## Available application evidence

Historical current-state evidence was derived from:

- `/var/www/mhcs-member-core` at `main` /
  `452b1264fa6a2ddf0f5d1d92224db09b33677d6f`
- `/var/www/mhcs-operator-core` at `main` /
  `e520a8bada30b3f527ddbc23ae07a087fa236379`
- `/var/www/mpips` at `adlan` /
  `a98ed1e6517fc181a1e44a5cd6e034d9eaf12848`
- `/var/www/mhcs-image-gateway`, an empty checkout with no commits

`/var/www/mhcs-doctor-core` was unavailable.

These checkpoints are evidence inputs, not the approved target repository
topology.

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
- Clearly separate **Current**, **Target**, **Unknown**, and **Future
  possibility**.
- Put cross-system business ownership in `docs/business/` and detailed data,
  module operations, security, and FHIR R5 mappings in `docs/technical/`.
- Treat `docs/technical/mhcs-core/project.md` as the authority for target
  topology and cross-module interaction rules.
- Use local commands, queries, transactions, and durable domain events between
  `mhcs-core` modules. Define the exact transport contract only for MPIPS.
- Keep detailed decisions in `docs/`, not `.agents/context/`.
- Support diagrams with prose.
- Do not store patient data, clinical files, credentials, or secrets.
- Never describe a **Target** contract as currently implemented.

## Key constraints

- The target topology has exactly two repositories: `mhcs-core` and `mpips`.
- `mhcs-core` will be created as a new Laravel repository in a later explicit
  implementation phase. This repository currently designs it but does not
  implement or scaffold it.
- Historical source repositories change independently; retain their evidence
  checkpoints until migration evidence supersedes them.
- Image Gateway and Doctor have no verified historical implementations.
- Grabber source was unavailable.
- MPIPS is specified as a private black-box API accepting a radiograph NPZ, its
  matching gain NPZ, and a separately signed DICOM metadata manifest, then
  returning one DICOM object. The target contract is not yet verified as
  implemented.
- The inspected NPZ reader enables pickle for trusted metadata, so production
  input trust is a mandatory later security concern.
- HL7 FHIR R5 `5.0.0` is the sole active MHCS interoperability target.

## Commands

| Check | Command | Current-change status |
|---|---|---|
| Whitespace | `git diff --check` | Reverify after each documentation change |
| Relative links | Validate each relative Markdown link target | Reverify after moving or renaming documents |
| Static website | `python3 website/test_site.py` | Reverify after website or business-flow changes |
| BPMN assets | `python3 website/bpmn/test_bpmn.py` | Reverify after BPMN or workflow changes |
| Interoperability target | Search for external-program-specific assumptions and non-R5 FHIR contracts | Must remain absent from the active specification |
| Topology | Search for obsolete five-application and internal module network contracts | Must remain absent from the target specification |
| Transport scope | Search MHCS Core contexts for route and transport contracts | Exact transport details must exist only in the MPIPS specification |

## Technical gaps

Known implementation gaps include:

- creation of the new `mhcs-core` repository and implementation of its approved
  module contexts;
- module-owned tables, local contracts, migration sequencing, and removal of
  obsolete internal network adapters;
- Image Gateway and Doctor module implementation;
- exact Grabber radiograph/gain NPZ compatibility;
- MPIPS contract implementation, manifest schema and signature validation,
  safe NPZ parsing, and interoperability fixtures;
- FHIR R5 profiles, resource mappings, `CapabilityStatement`, validation, and
  DICOM mappings;
- boundary authentication, authorisation, idempotency, and provider
  confirmations;
- retry intervals and temporary-link expiry;
- storage, audit, monitoring, deployment, and tests.

## Authority boundary

The detailed approved business rules are in `docs/`. Current implementation
claims must still be reverified against implementation evidence. The
architecture and nested module contexts define the future `mhcs-core` target,
not proof that its repository or the MPIPS contract has already been
implemented.
