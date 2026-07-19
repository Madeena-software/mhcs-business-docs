<!-- antigravity-code-agent-template:managed -->
# Project Context

**Status:** Verified documentation context
**Last verified:** 2026-07-19
**Repository checkpoint:** `main` working tree based on
`ff2f1dde0a8a1002e51283361c71a7e905cf22e2`

## Purpose

`mhcs-business-docs` records the approved MHCS teleradiology business flow and
routes later technical planning to the correct application repository.

Detailed business decisions live under `docs/`; this file remains a concise
agent orientation and must not duplicate them.

## Entry points

- `.agents/context/README.md`: human reading guide
- `docs/01-business-overview.md`: approved business flow
- `docs/02-member-journey.md`: current and target journey
- `docs/03-system-responsibilities.md`: ownership and readiness
- `docs/04-satusehat-readiness.md`: FHIR and SATUSEHAT boundary
- `docs/<repository>/project.md`: repository-specific business foundation

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

The repository contains four cross-system documents and five application
foundations:

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
- Describe business ownership and observable handoffs, not API schemas.
- Keep detailed decisions in `docs/`, not `.agents/context/`.
- Support diagrams with prose.
- Do not store patient data, clinical files, credentials, or secrets.
- Do not create repository implementation plans until the user separately
  approves the technical phase.

## Key constraints

- Source repositories change independently; retain evidence checkpoints.
- Image Gateway has no verified implementation.
- Doctor Core and Grabber source were unavailable.
- Operator Core accepts NPZ but its current paths remain DICOM-oriented.
- MPIPS contains NPZ workflow code, but the exact MHCS production contract is
  unverified.
- The inspected NPZ reader enables pickle for trusted metadata, so production
  input trust is a mandatory later security concern.
- FHIR compatibility is an approved direction; SATUSEHAT integration remains
  future scope and is not a compliance claim.

## Commands

| Check | Command | Current-change status |
|---|---|---|
| Whitespace | `git diff --check` | Passed on 2026-07-19 |
| Relative links | Validate each relative Markdown link target | Passed on 2026-07-19 |
| Superseded terms | Search for obsolete Grabber/DICOM and payment rules | Passed on 2026-07-19 |

## Technical gaps

Technical planning remains deferred. Known areas include:

- Image Gateway and Doctor Core implementation;
- exact Grabber/MPIPS NPZ compatibility;
- FHIR and DICOM mappings;
- service authentication, authorisation, idempotency, and callbacks;
- retry intervals and temporary-link expiry;
- storage, audit, monitoring, deployment, and tests.

## Authority boundary

The detailed approved business rules are in `docs/`. Current implementation
claims must still be reverified in the relevant sibling repository before
technical work begins.
