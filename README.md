<!-- antigravity-code-agent-template:managed -->
# MHCS Business Documentation

**Status:** Updated review pack
**Business decisions reviewed:** 28 July 2026

This repository is the business documentation source for the MHCS
teleradiology service.

## Core documents

| Document | Purpose |
|---|---|
| [Business overview and actor journeys](docs/business/01-business-overview.md) | End-to-end business flow, actor journeys, responsibilities, and rules |
| [System responsibilities](docs/business/03-system-responsibilities.md) | Ownership, readiness, access, payment triggers, and the FHIR R5 boundary |

## Target repository foundations

| Repository | Foundation |
|---|---|
| `mhcs-core` | [Shared architecture](docs/technical/mhcs-core/project.md), with [Member](docs/technical/mhcs-member-core/project.md), [Operator](docs/technical/mhcs-operator-core/project.md), [Doctor](docs/technical/mhcs-doctor-core/project.md), and [Image Gateway](docs/technical/mhcs-image-gateway/project.md) module specifications |
| `mpips` | [Private black-box integration contract](docs/technical/mpips/project.md) |

The four module documents retain their historical paths so existing links and
decision history remain valid. They do not define separate target repositories.

HTTP remains valid at system boundaries, including client-to-`mhcs-core` and
Image Gateway-to-MPIPS communication. Modules inside `mhcs-core` communicate
through local commands, queries, and durable domain events rather than internal
REST APIs.

## Status labels

- **Current:** verified in available source.
- **Target:** approved business behavior not yet fully connected.
- **Unknown:** unavailable or unverified.
- **Future possibility:** outside current implementation scope.

## Boundary

This repository contains documentation only. It must not contain patient data,
clinical files, credentials, secrets, application code, or live deployment
configuration.
