<!-- antigravity-code-agent-template:managed -->
# MHCS Business Documentation

**Status:** Updated review pack
**Business decisions reviewed:** 21 August 2026

This repository is the business documentation source for the MHCS
teleradiology service and the design authority for approved business behavior
and target technical specifications consumed by `mhcs-core`.

## Core documents

| Document | Purpose |
|---|---|
| [Business overview and actor journeys](../../docs/business/01-business-overview.md) | End-to-end business flow, actor journeys, responsibilities, and rules |
| [System responsibilities](../../docs/business/03-system-responsibilities.md) | Ownership, collaboration, access, payment triggers, and the FHIR R5 boundary |

## Target repository foundations

| Repository | Foundation |
|---|---|
| `mhcs-core` application repository | [Shared architecture](../../docs/technical/mhcs-core/project.md) |
| Member module | [Selective context](../../docs/technical/mhcs-core/modules/member/project.md) |
| Operator module | [Selective context](../../docs/technical/mhcs-core/modules/operator/project.md) |
| Doctor module | [Selective context](../../docs/technical/mhcs-core/modules/doctor/project.md) |
| Image Gateway module | [Selective context](../../docs/technical/mhcs-core/modules/image-gateway/project.md) |
| `mpips` | [Black-box contract for the private processing service/API boundary](../../docs/technical/mpips/project.md) |

The MHCS Core structure mirrors the `mhcs-core` repository's `.agents/context`:
read the root architecture first, then load only the module context relevant to
the task. Nested module contexts do not represent separate repositories.

The `mhcs-core` application repository consumes these specifications and owns
implementation. This repository contains the approved business and target
technical authority, not application code. The `mpips` repository is public on
GitHub; its MHCS processing service/API boundary is private.

## Verification

- `git diff --check`
- `python3 website/test_site.py`
- `python3 website/bpmn/test_bpmn.py`
- validate relative Markdown links after moving documentation

## Boundary

This repository contains documentation only. It must not contain patient data,
clinical files, credentials, secrets, application code, or live deployment
configuration.
