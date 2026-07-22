<!-- antigravity-code-agent-template:managed -->
# Project Context

**Status:** Verified documentation context
**Last verified:** 2026-07-22
**Repository checkpoint:** working tree; reverify the current Git commit before
copying a specification into an application repository

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
- `docs/technical/<repository>/project.md`: repository-specific central
  specification

## Repository facts

- Source format: Markdown
- Diagrams: Mermaid
- Runtime or build system: none
- Dependency installation: none
- Stored patient or clinical data: none
- Website, PDF generator, or deployment: none

## Available application evidence

Current-state documentation was derived from:

- `/var/www/mhcs-member-core` at `main` /
  `452b1264fa6a2ddf0f5d1d92224db09b33677d6f`
- `/var/www/mhcs-operator-core` at `main` /
  `e520a8bada30b3f527ddbc23ae07a087fa236379`
- `/var/www/mpips` at `adlan` /
  `a98ed1e6517fc181a1e44a5cd6e034d9eaf12848`
- `/var/www/mhcs-image-gateway`, an empty checkout with no commits

`/var/www/mhcs-doctor-core` was unavailable.

## Documentation structure

The repository contains cross-system business documents and five application
specifications:

- Member Core
- Operator Core
- Doctor Core
- Image Gateway
- MPIPS additions required by MHCS

The MPIPS document is intentionally a delta and must not duplicate MPIPS's
existing project context.

## Conventions

- Use plain English.
- Clearly separate **Current**, **Target**, **Unknown**, and **Future
  possibility**.
- Put cross-system business ownership in `docs/business/` and detailed data,
  API, security, and FHIR R5 contracts in `docs/technical/`.
- Keep detailed decisions in `docs/`, not `.agents/context/`.
- Support diagrams with prose.
- Do not store patient data, clinical files, credentials, or secrets.
- Never describe a **Target** contract as currently implemented.

## Key constraints

- Source repositories change independently; retain evidence checkpoints.
- Image Gateway has no verified implementation.
- Doctor Core and Grabber source were unavailable.
- Operator Core accepts NPZ but its current paths remain DICOM-oriented.
- MPIPS contains NPZ workflow code, but the exact MHCS production contract is
  unverified.
- The inspected NPZ reader enables pickle for trusted metadata, so production
  input trust is a mandatory later security concern.
- HL7 FHIR R5 `5.0.0` is the sole active MHCS interoperability target.

## Commands

| Check | Command | Current-change status |
|---|---|---|
| Whitespace | `git diff --check` | Reverify after each documentation change |
| Relative links | Validate each relative Markdown link target | Reverify after moving or renaming documents |
| Interoperability target | Search for external-program-specific assumptions and non-R5 FHIR contracts | Must remain absent from the active specification |

## Technical gaps

Known implementation gaps include:

- Image Gateway and Doctor Core implementation;
- exact Grabber/MPIPS NPZ compatibility;
- FHIR R5 profiles, resource mappings, `CapabilityStatement`, validation, and
  DICOM mappings;
- service authentication, authorisation, idempotency, and callbacks;
- retry intervals and temporary-link expiry;
- storage, audit, monitoring, deployment, and tests.

## Authority boundary

The detailed approved business rules are in `docs/`. Current implementation
claims must still be reverified in the relevant sibling repository before
technical work begins.
