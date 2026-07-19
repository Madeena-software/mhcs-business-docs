# SATUSEHAT and FHIR Readiness

## Status

**SATUSEHAT: Future possibility — Not implemented.**
**FHIR-compatible clinical structures: Approved target direction.**

Using a SATUSEHAT-aligned medical-record identifier and FHIR-compatible
clinical structures does not mean MHCS is integrated with SATUSEHAT.

MHCS must keep these statements separate:

- **FHIR-compatible** means clinical information is shaped for standard
  exchange and future interoperability.
- **SATUSEHAT-integrated** would require approved scope, current mappings,
  authentication, submissions, testing, evidence, and organisational
  approval.

Only the first is an approved MHCS target today.

## Approved FHIR boundary

FHIR-compatible structures apply to clinical information:

- patient identity;
- examinations;
- imaging studies; and
- clinical reports.

FHIR does not need to represent:

- operational queues;
- member, operator, or doctor payments;
- retry control;
- staff administration; or
- storage administration.

Those remain ordinary application workflows.

## Medical-record identifier

Member Core owns and generates a medical-record ID that is globally unique
across all MHCS organisations.

The identifier is intended to be compatible with future SATUSEHAT needs, but
its exact profile, system URI, mapping, validation, and acceptance have not
been externally verified.

No document should describe the identifier as SATUSEHAT-approved until that
evidence exists.

## What is currently available

The Member Core and Operator Core context folders contain:

- an internal readiness checklist;
- a proposed technical integration plan;
- an empty healthcare-facility list template;
- an unsigned variable and metadata declaration template;
- an unfilled security self-assessment; and
- a request for a system manual and sandbox evidence.

These are planning and submission templates, not completed evidence.

No verified SATUSEHAT authentication, clinical submission, or successful
sandbox test was found in the available MHCS repositories.

## Current readiness

| Area | Current status | What is missing |
|---|---|---|
| FHIR business boundary | Approved target direction | Exact profiles, mappings, validation, and implementation |
| Global medical-record ID | Approved target direction | Verified format, namespace, mapping, and implementation |
| SATUSEHAT business scope | Future possibility | Approval to include integration in the MHCS target |
| Owning integration application | Undecided | Approved clinical/RME owner |
| Authentication | Not implemented | Verified service authentication and credential governance |
| Clinical submission | Not implemented | Approved and tested resource mappings and submission flows |
| Sandbox evidence | Not available | Successful tests and sanitised evidence |
| Facility information | Template only | Completed facility list |
| Variable and metadata declaration | Template only | Completed and approved declaration |
| Security assessment | Template only | Scores, evidence, remediation, and approval |
| System manual | Not available | Reviewed documentation and required attachments |
| Compliance claim | Not established | Current external validation and formal approval |

## Application boundaries

If SATUSEHAT later enters approved scope:

- Member Core supplies authorised member identity and booking context.
- Operator Core supplies examination-day operational context.
- Doctor Core supplies doctor-authored clinical reports.
- Image Gateway supplies imaging-study and result-distribution context.
- MPIPS remains an image-processing engine and does not own SATUSEHAT.

The accountable clinical/RME integration owner remains undecided. FHIR
compatibility in individual applications does not settle that ownership.

## Decisions required before SATUSEHAT approval

1. Approve SATUSEHAT as an MHCS business scope.
2. Appoint the accountable clinical/RME application and business owner.
3. Revalidate current external requirements.
4. Approve patient, practitioner, organisation, location, encounter, imaging,
   and report mappings.
5. Implement and verify authentication and sandbox submissions.
6. Confirm privacy, security, logging, storage, backup, and incident-response
   evidence.
7. Complete the facility list, declaration, security assessment, system
   manual, and supporting evidence.
8. Obtain business, clinical, security, and compliance approval.

## What may be said today

MHCS may state:

- it is designing clinical structures to be FHIR-compatible;
- it intends to use a globally unique medical-record ID; and
- SATUSEHAT integration remains a future possibility.

MHCS must not state that it:

- is integrated with SATUSEHAT;
- has an identifier approved by SATUSEHAT;
- has completed successful SATUSEHAT sandbox testing;
- is SATUSEHAT-compliant or certified;
- can currently submit required clinical resources; or
- is ready for production SATUSEHAT use.

## Evidence boundary

This assessment reflects locally available repository evidence reviewed on
19 July 2026. SATUSEHAT requirements, profiles, links, submission procedures,
and compliance interpretations require a separate current external review
before implementation or submission work begins.
