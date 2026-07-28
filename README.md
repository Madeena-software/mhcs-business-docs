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
| [System responsibilities](docs/business/03-system-responsibilities.md) | Ownership, collaboration, access, payment triggers, and the FHIR R5 boundary |

## Target repository foundations

| Repository | Foundation |
|---|---|
| `mhcs-core` | [Shared architecture](docs/technical/mhcs-core/project.md), with [Member](docs/technical/mhcs-core/modules/member/project.md), [Operator](docs/technical/mhcs-core/modules/operator/project.md), [Doctor](docs/technical/mhcs-core/modules/doctor/project.md), and [Image Gateway](docs/technical/mhcs-core/modules/image-gateway/project.md) module contexts |
| `mpips` | [Private black-box integration contract](docs/technical/mpips/project.md) |

The nested module contexts mirror the future `mhcs-core/.agents/context`
layout. They partition one application specification so an agent can load only
the module relevant to its task.

Modules inside `mhcs-core` communicate through local commands, queries,
transactions, and durable domain events. The MPIPS document is the only
transport-level contract in this design.

## Boundary

This repository contains documentation only. It must not contain patient data,
clinical files, credentials, secrets, application code, or live deployment
configuration.
