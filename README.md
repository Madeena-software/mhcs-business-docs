<!-- antigravity-code-agent-template:managed -->
# MHCS Business Documentation

**Status:** Updated review pack
**Business decisions reviewed:** 22 July 2026

This repository is the business documentation source for the MHCS
teleradiology service.

## Core documents

| Document | Purpose |
|---|---|
| [Business overview and actor journeys](docs/business/01-business-overview.md) | End-to-end business flow, actor journeys, responsibilities, and rules |
| [System responsibilities](docs/business/03-system-responsibilities.md) | Ownership, readiness, access, payment triggers, and the FHIR R5 boundary |

## Repository foundations

| Repository | Foundation |
|---|---|
| `mhcs-member-core` | [Member Core](docs/technical/mhcs-member-core/project.md) |
| `mhcs-operator-core` | [Operator Core](docs/technical/mhcs-operator-core/project.md) |
| `mhcs-doctor-core` | [Doctor Core](docs/technical/mhcs-doctor-core/project.md) |
| `mhcs-image-gateway` | [Image Gateway](docs/technical/mhcs-image-gateway/project.md) |
| `mpips` | [MHCS additions only](docs/technical/mpips/project.md) |

The MPIPS document is a delta for a later merge into MPIPS's existing project
context.

## Status labels

- **Current:** verified in available source.
- **Target:** approved business behavior not yet fully connected.
- **Unknown:** unavailable or unverified.
- **Future possibility:** outside current implementation scope.

## Boundary

This repository contains documentation only. It must not contain patient data,
clinical files, credentials, secrets, application code, or live deployment
configuration.
