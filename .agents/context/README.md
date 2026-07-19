<!-- antigravity-code-agent-template:managed -->
# MHCS Business Documentation

**Status:** Updated review pack
**Business decisions reviewed:** 19 July 2026

This repository is the business documentation source for the MHCS
teleradiology service.

## Core documents

| Document | Purpose |
|---|---|
| [Business overview](../../docs/01-business-overview.md) | Approved flow, actors, and boundaries |
| [Member journey](../../docs/02-member-journey.md) | Current state and target journey |
| [System responsibilities](../../docs/03-system-responsibilities.md) | Ownership, readiness, access, and payment triggers |
| [SATUSEHAT and FHIR readiness](../../docs/04-satusehat-readiness.md) | FHIR direction and future SATUSEHAT scope |

## Repository foundations

| Repository | Foundation |
|---|---|
| `mhcs-member-core` | [Member Core](../../docs/mhcs-member-core/project.md) |
| `mhcs-operator-core` | [Operator Core](../../docs/mhcs-operator-core/project.md) |
| `mhcs-doctor-core` | [Doctor Core](../../docs/mhcs-doctor-core/project.md) |
| `mhcs-image-gateway` | [Image Gateway](../../docs/mhcs-image-gateway/project.md) |
| `mpips` | [MHCS additions only](../../docs/mpips/project.md) |

The MPIPS document is a delta for a later merge into MPIPS's existing project
context.

## Status labels

- **Current:** verified in available source.
- **Target:** approved business behavior not yet fully connected.
- **Unknown:** unavailable or unverified.
- **Future possibility:** outside current implementation scope.

## Boundary

This repository contains documentation only. It must not contain patient data,
clinical files, credentials, secrets, API implementation plans, or deployment
instructions.
