# SATUSEHAT Readiness

## Status

**Future possibility — Not implemented.**

SATUSEHAT is not part of the current MHCS service and is not an approved target
commitment. Available repository material describes possible future work and
submission preparation; it does not prove integration, compliance,
certification, or successful sandbox testing.

## What is available

The Member Core and Operator Core context folders contain:

- an internal readiness checklist;
- a proposed technical integration plan;
- an empty healthcare-facility list template;
- an unsigned variable and metadata declaration template;
- an unfilled security self-assessment; and
- a request for a system manual and sandbox evidence.

These are planning and submission templates, not completed evidence.

## Current readiness

| Area | Current status | What is missing |
|---|---|---|
| Business scope | Future possibility | Approval to include SATUSEHAT in the MHCS target model |
| Owning application | Undecided | An approved clinical electronic medical-record owner |
| Technical integration | Not implemented | OAuth service authentication, FHIR-format health-data mappings, submission, status tracking, and retry handling |
| Clinical submissions | Not implemented | Verified `Encounter` and `Condition` flows |
| Sandbox evidence | Not available | Successful tests, screenshots, recording, and sanitised supporting evidence |
| Facility information | Template only | Completed list of healthcare facilities using the system |
| Variable and metadata declaration | Template only | Completed, signed, and approved declaration |
| Security assessment | Template only | Scores, supporting evidence, remediation, and approval |
| System manual | Not available | Reviewed feature documentation and required submission attachments |
| Compliance claim | Not established | Current external validation and formal organisational approval |

## Possible future ownership

No application currently owns SATUSEHAT integration.

If it enters approved scope:

- Member Core may supply authorised member and booking information, but should
  not own clinical diagnoses or clinical health-data submission.
- Operator Core or another designated clinical electronic medical-record (RME)
  application may become the owner of visits, practitioners, diagnoses,
  mappings, and submission status.
- Image Gateway should remain focused on radiology images and safe result
  publication.
- MPIPS should remain focused on scientific image processing.
- Doctor Core responsibilities cannot be assessed until its implementation is
  available.

These are candidate boundaries, not an approved architecture.

## Decisions required before approval

1. Confirm that SATUSEHAT belongs in the MHCS business scope.
2. Appoint the clinical or RME application and accountable business owner.
3. Approve the patient, practitioner, organisation, location, visit, and
   diagnosis data mappings.
4. Confirm deployment, data-location, privacy, security, logging, backup, and
   incident-response evidence.
5. Implement and verify sandbox authentication and clinical submission flows.
6. Complete the facility list, declaration, security assessment, system manual,
   and supporting evidence.
7. Obtain business, clinical, security, and compliance approval before making
   any external readiness claim.

## What may be said today

MHCS may state that SATUSEHAT reference material and preparation templates
exist, and that integration is a future possibility under consideration.

MHCS must not state that it:

- is integrated with SATUSEHAT;
- has completed successful sandbox testing;
- is SATUSEHAT-compliant or certified;
- can currently submit clinical visits or diagnoses; or
- is ready for production SATUSEHAT use.

## Evidence boundary

This assessment reflects locally available repository documentation reviewed on
19 July 2026. External requirements, links, templates, regulations, and
submission procedures were not revalidated. They require a separate current
review before any implementation or submission work begins.
