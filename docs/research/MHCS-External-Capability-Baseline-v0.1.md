# MHCS External Capability Baseline

**Version:** v0.1  
**Date:** 22 August 2026  
**Status:** Internal working baseline  
**Evidence base:** Six partner-supplied source files, referenced through anonymized source IDs

## 1. Purpose

This document is the canonical baseline of mature external capabilities that may be reusable by MHCS. It is intended to reduce repeated source review and to support later work on solution architecture, workflow design, product mockups, pilots, and partner evaluation.

This baseline is a capability inventory, not an MHCS product commitment. Inclusion of a capability does not mean that it:

- has been selected for MHCS;
- is already integrated with MHCS;
- is approved for clinical use in Indonesia;
- has completed Bahasa Indonesia localisation;
- has completed local regulatory, privacy, security, interoperability, or clinical validation; or
- should determine the results of independent Indonesia healthcare market research.

Market research should first establish the validated healthcare need. This baseline should then be used to determine whether a proven capability can meet that need after integration, localisation, and validation.

## 2. Core Product Principle

> **Reuse proven capabilities first. Integrate and localise second. Build from scratch only where a validated capability gap remains.**

MHCS should operate as an Indonesia-facing clinical operating, integration, localisation, and delivery layer. It should not reproduce a capability that is already mature, fit for purpose, legally usable, technically integrable, clinically valid, and commercially sustainable.

## 3. Evidence Classification

The classifications below must be preserved whenever this baseline is reused.

| Classification | Meaning | What it does not mean |
|---|---|---|
| **Proven / Deployed** | A product, workflow, or implementation is described in the supplied materials as existing and in operational use or deployment outside the proposed Indonesia implementation. | It is not proof of regulatory approval, clinical effectiveness, or production readiness in Indonesia. Unless independently verified, the underlying evidence remains partner-supplied. |
| **Partner-reported** | A scale, performance, adoption, outcome, or operating figure is stated by the capability provider in its own material. | It is not independently audited or suitable for external publication without reconfirmation. |
| **Proposed / Not Yet Validated in Indonesia** | A capability or use case is proposed for Indonesia, or is technically plausible based on existing products, but local implementation evidence is not supplied. | It is not an approved MHCS feature, a completed integration, or a validated clinical service. |

## 4. Capability Provider A — Medical Imaging AI

### 4.1 Capability role

Provider A is a productized medical-imaging AI capability layer. Its potential MHCS role is to analyse medical images, present findings inside the imaging workflow, support structured reporting, and connect those outputs to clinical review, referral, and follow-up workflows. [A-01][A-02][A-03]

### 4.2 Proven / Deployed capability base

The supplied materials describe the following existing capability base:

- **Multi-modality imaging AI portfolio:** digital radiography (DR), computed tomography (CT), mammography, ultrasound, and magnetic resonance imaging (MRI). [A-01]
- **Chest DR multi-disease analysis:** detection or assessment support for findings including pulmonary nodules or masses, pneumonia, pulmonary tuberculosis, rib fractures, pneumothorax, pleural effusion, and cardiac enlargement. [A-02]
- **Productized imaging workflow:** image receipt, automated AI processing, clinician entry into an AI reading interface, lesion or finding review, structured report support, and retrieval or review through a PACS-connected workflow. [A-02][A-03]
- **Workflow integration:** connection with PACS and related imaging workflows rather than operation solely as a stand-alone algorithm. [A-02][A-03]
- **Deployment options:** local-server or on-premises deployment is described, supporting environments where image data, latency, or institutional policy make local processing preferable. [A-02][A-03]
- **Operational maturity:** the portfolio breadth, user workflow, deployment model, and reported installed base indicate a capability beyond a laboratory-only algorithm, while the exact regulatory and clinical status of each module still requires product-level verification. [A-01][A-02][A-03]

### 4.3 Partner-reported scale and operating evidence

Provider A materials report:

- deployment across **5,000+ hospitals and other institutions**; [A-01][A-02]
- an earlier source-period figure of **290 million patient services**; [A-01]
- a later source-period figure of **360 million cumulative patient visits or services**; and [A-02]
- **60 million physician-hours saved**. [A-02]

The 290 million and 360 million figures must remain separate. They appear to be cumulative figures from different source periods, definitions, or reporting cutoffs and must not be combined, averaged, or presented as directly comparable without partner confirmation. All scale and time-saved figures are partner-reported and should be reverified, dated, and definition-checked before external use.

### 4.4 Proposed / Not Yet Validated in Indonesia

Potential MHCS applications include:

- chest DR triage and decision support in primary-care and referral workflows;
- tuberculosis and other chest-condition screening support;
- AI-assisted worklists and prioritisation for remote radiology review;
- structured imaging results passed into longitudinal patient records, referral, follow-up, and clinical-intelligence workflows;
- local or hybrid inference where connectivity, latency, or data-governance requirements justify it; and
- use across Madeena imaging, PACS, and teleradiology workflows, subject to technical and commercial compatibility.

None of these applications should be represented as locally deployed or clinically validated until the relevant Indonesia evidence gates in Section 7 have been completed.

### 4.5 Provider-specific boundaries

- One supplied user manual states a **research-use-only / not-for-clinical-use** boundary for the referenced product version. The applicable status must be checked for every proposed module, software version, and deployment configuration. [A-03]
- Portfolio-level deployment does not prove that every individual algorithm has the same installed base, regulatory status, or clinical evidence.
- Performance must be validated on Indonesia-relevant devices, acquisition protocols, disease prevalence, patient groups, and care settings.
- DICOM, PACS, worklist, reporting, identity, network, and cybersecurity compatibility have not yet been demonstrated in an MHCS production environment.

## 5. Capability Provider B — Medical LLM & Clinical Intelligence

### 5.1 Capability role

Provider B is a medical large-language-model and clinical-intelligence capability layer. Its potential MHCS role is to combine clinical data, medical knowledge, rules, and workflow orchestration to support clinicians, care coordination, longitudinal management, and regional operations. [B-01][B-02][B-03]

### 5.2 Proven / Deployed capability base

The supplied materials describe the following existing or productized capabilities:

- **Medical LLM and clinical copilot:** context-aware assistance embedded in clinical workflows. [B-01][B-03]
- **Clinical decision support:** synthesis of patient information and medical knowledge to support assessment and next-step decisions, with clinician oversight. [B-01][B-03]
- **Clinical documentation:** medical-record drafting, summarisation, structured generation, and quality-control support. [B-01][B-03]
- **Medication safety:** identification or review support for medication-related risks. [B-01]
- **Referral intelligence:** support for referral decisions, care routing, and coordination between levels of care. [B-01][B-02]
- **Chronic and continuous care:** longitudinal health management, follow-up, and patient-management workflows. [B-01][B-02][B-03]
- **Specialty and multidisciplinary agents:** configurable specialty, disease-specific, and multidisciplinary-team workflows. [B-01][B-03]
- **Regional clinical operations and governance:** tools intended to support multi-institution service coordination, quality oversight, and operational management. [B-02][B-03]
- **Enterprise-system integration:** connectivity with HIS, EMR, LIS, PACS, and clinical data repositories (CDR). [B-01][B-03]
- **Knowledge and orchestration stack:** local knowledge bases, retrieval-augmented generation (RAG), rules engines, model orchestration, and safety or workflow guardrails. [B-01][B-03]
- **Deployment flexibility:** private, cloud, and hybrid deployment patterns are described. [B-01][B-03]

### 5.3 Partner-reported deployment evidence

Provider B materials state that its capabilities have entered multiple medical institutions and report a primary-care rollout across **46 community health-service centres**. [B-01][B-03]

This is relevant operating evidence, but it remains partner-reported. Before external use or solution commitment, MHCS should confirm the rollout period, active-user base, production scope, covered modules, utilisation, clinical governance model, measured outcomes, and whether all 46 centres had equivalent functionality.

### 5.4 Proposed / Not Yet Validated in Indonesia

The supplied Indonesia proposal describes potential applications across:

- Puskesmas clinical support;
- health-check and screening workflows, including CKG-related use cases;
- tuberculosis pathways;
- maternal, child-health, and nutrition workflows;
- chronic-disease management and follow-up;
- referral decision support and care coordination;
- clinical-record assistance and quality control;
- connections to imaging, laboratory, medication, and longitudinal health data; and
- SATUSEHAT / FHIR-aligned exchange and national digital-health workflows. [B-02]

These items are proposal evidence, not market-validation conclusions and not proof of local production integration. Independent Indonesia market research must determine which problems are priorities before capabilities are selected.

### 5.5 Provider-specific boundaries

- Bahasa Indonesia medical-language performance, mixed-language use, terminology, abbreviations, and local clinical documentation styles have not been validated in the supplied evidence.
- Alignment with Indonesia clinical guidelines, formularies, referral policy, public-health programmes, and professional standards has not been established.
- LLM outputs require clinician oversight, traceability, source grounding, uncertainty handling, and safeguards against hallucination, omission, automation bias, and unsafe recommendations.
- Production integration with local HIS, EMR, LIS, PACS, CDR, identity, consent, and access-control environments remains to be demonstrated.
- A proposal for SATUSEHAT / FHIR alignment is not evidence of tested, accredited, or production-scale interoperability.
- The local clinical-governance, accountability, change-control, incident-response, and model-monitoring model remains to be defined.

## 6. Capability Evidence Register

| Evidence ID | Capability / claim | Classification | Source ID(s) | Required treatment |
|---|---|---|---|---|
| A-E01 | DR, CT, mammography, ultrasound, and MRI AI portfolio | Proven / Deployed | A-01 | Confirm module-by-module product and regulatory status before selection. |
| A-E02 | Chest DR multi-disease analysis | Proven / Deployed | A-02 | Validate intended indications and local clinical performance. |
| A-E03 | AI reading, lesion review, structured reporting, and PACS-connected workflow | Proven / Deployed | A-02, A-03 | Complete technical integration and human-factors validation. |
| A-E04 | Local-server / on-premises deployment | Proven / Deployed | A-02, A-03 | Confirm sizing, security, update, support, and lifecycle requirements. |
| A-E05 | 5,000+ hospitals and institutions | Partner-reported | A-01, A-02 | Reconfirm date, definition, active status, and scope before external use. |
| A-E06 | 290M patient services in an earlier source period | Partner-reported | A-01 | Keep distinct from the later 360M figure. |
| A-E07 | 360M cumulative patient visits or services in a later source period | Partner-reported | A-02 | Reconfirm date, denominator, and definition. |
| A-E08 | 60M physician-hours saved | Partner-reported | A-02 | Obtain methodology, baseline, time period, and independent support. |
| A-E09 | Indonesia chest-imaging, TB, triage, and teleradiology use cases | Proposed / Not Yet Validated in Indonesia | A-01, A-02, A-03 | Validate need, regulation, workflow, performance, and integration locally. |
| B-E01 | Medical LLM, clinical copilot, documentation, quality control, medication-risk, referral, and chronic-care capabilities | Proven / Deployed | B-01, B-03 | Confirm production scope, user roles, controls, and outcome evidence. |
| B-E02 | HIS, EMR, LIS, PACS, and CDR integration capability | Proven / Deployed | B-01, B-03 | Demonstrate against the actual MHCS and Indonesia target environment. |
| B-E03 | Knowledge base, RAG, rules, orchestration, and guardrails | Proven / Deployed | B-01, B-03 | Review architecture, source governance, evaluation, and change control. |
| B-E04 | Private, cloud, and hybrid deployment patterns | Proven / Deployed | B-01, B-03 | Select only after data, security, latency, cost, and operations review. |
| B-E05 | Rollout across 46 community health-service centres | Partner-reported | B-01, B-03 | Reconfirm active sites, functions, adoption, outcomes, and reporting period. |
| B-E06 | Puskesmas, CKG, TB, maternal-child nutrition, chronic care, and referral applications | Proposed / Not Yet Validated in Indonesia | B-02 | Treat as partner hypotheses until market need and local workflow are validated. |
| B-E07 | SATUSEHAT / FHIR-aligned interoperability | Proposed / Not Yet Validated in Indonesia | B-02 | Require conformance, security, terminology, sandbox, and production testing. |

## 7. Known Cross-Cutting Boundaries and Validation Gates

### 7.1 Regulatory and intended use

- Determine the applicable Indonesia medical-device, Software as a Medical Device (SaMD), clinical decision-support, and AI regulatory pathways for each module and intended use.
- Verify product-version-specific approvals, research-use limitations, labelling, claims, and post-market obligations.
- Define whether each capability informs, recommends, prioritises, drafts, or autonomously acts; the intended-use statement must match the implemented workflow.

### 7.2 Clinical validation and safety

- Complete retrospective and, where appropriate, prospective validation in representative Indonesia settings.
- Evaluate sensitivity, specificity, calibration, false-negative and false-positive risks, subgroup performance, generalisability, and workflow impact for the intended use.
- Establish human oversight, escalation, override, audit, adverse-event handling, and clinical accountability.
- Validate combined workflows end to end; separate validation of an imaging model and an LLM does not validate the safety of the integrated pathway.

### 7.3 Localisation

- Validate Bahasa Indonesia medical language, local terminology, mixed-language documentation, patient-facing communication, and accessibility.
- Localise clinical guidelines, referral rules, formularies, care pathways, public-health programme logic, coding, units, and documentation requirements.
- Test usability with target users across primary care, hospitals, imaging services, and remote-support settings.

### 7.4 Data governance, privacy, and cybersecurity

- Confirm lawful basis, consent, data minimisation, retention, residency, cross-border transfer, secondary use, de-identification, and patient-rights requirements.
- Define role-based access, identity, audit logs, encryption, key management, incident response, vulnerability management, supplier access, and business continuity.
- Agree whether partner data may be used for model training, evaluation, support, or improvement; default assumptions must not substitute for contract terms and patient protections.

### 7.5 Integration and interoperability

- Demonstrate production integration with the actual DICOM, PACS, RIS, HIS, EMR, LIS, CDR, identity, terminology, billing, referral, and notification environments in scope.
- Validate SATUSEHAT / FHIR profiles, identifiers, terminologies, consent, security, error handling, reconciliation, and operational monitoring.
- Account for bandwidth, intermittent connectivity, device variation, local infrastructure, latency, data quality, and offline or store-and-forward requirements.

### 7.6 Operations and lifecycle

- Define service levels, support coverage, deployment ownership, update cadence, rollback, disaster recovery, monitoring, drift detection, revalidation, and end-of-life procedures.
- Confirm licensing, intellectual-property rights, data rights, integration rights, subcontractors, costs, and exit provisions.
- Establish measurable pilot success criteria and a controlled path from sandbox to pilot to limited production to scale.

## 8. MHCS Reuse Map

The reuse decision should follow this sequence:

```text
Validated Indonesia healthcare need
                |
                v
Required clinical and operational capability
                |
                v
Does a suitable capability already exist?
       |                         |
      Yes                        No
       |                         |
       v                         v
Assess Provider A,          Confirm a validated
Provider B, Madeena,        capability gap
or another proven module          |
       |                         v
       v                    Build only the
Technical, clinical,        missing capability
regulatory, commercial,          |
and evidence due diligence       |
       |                         |
       +------------+------------+
                    |
                    v
             Integrate into MHCS
                    |
                    v
          Localise for Indonesia
                    |
                    v
       Validate safety, performance,
       compliance, workflow, and value
                    |
                    v
        Controlled deployment and scale
```

### Reuse rules

1. **Need before capability:** independent market and clinical research determines the problem; partner capability does not define the problem.
2. **Evidence before reuse:** a capability is reused only after product, clinical, technical, regulatory, security, commercial, and operational due diligence.
3. **Integrate before rebuilding:** where a fit-for-purpose capability exists, MHCS should connect and orchestrate it rather than reproduce it.
4. **Localise before deployment:** integration alone is insufficient; local language, guidelines, workflow, infrastructure, governance, and user experience must be addressed.
5. **Validate the combined pathway:** MHCS must validate the end-to-end clinical and operational workflow, not only each component in isolation.
6. **Build only the validated gap:** new development is justified only when no existing capability can reliably, safely, legally, and economically meet the confirmed requirement.

## 9. Anonymized Source Register

The source IDs below refer to the six partner-supplied files used to establish this baseline. Real organization names, identifying geographic labels, and original filenames are intentionally omitted from this artifact.

| Source ID | Anonymized source description | Source period / version | Primary evidence used |
|---|---|---|---|
| **A-01** | Medical Imaging AI - Corporate Capability Introduction | January 2026 | Portfolio breadth; operating footprint; earlier patient-service figure |
| **A-02** | Medical Imaging AI - Chest DR Multi-Disease Product Presentation | January 2026 | Chest DR indications; workflow; deployment model; later cumulative scale and physician-time figures |
| **A-03** | Medical Imaging AI - Chest DR System User Manual | Version 2.0 | Operational workflow; PACS interaction; research-use boundary |
| **B-01** | Medical LLM & Clinical Intelligence - Capability Overview | Source date not stated in the approved source map | Medical LLM, copilot, documentation, safety, referral, chronic-care, integration, and deployment capabilities |
| **B-02** | Medical LLM & Clinical Intelligence - Indonesia Digital Health Proposal | August 2026 | Proposed Indonesia use cases; Puskesmas, CKG, TB, maternal-child nutrition, referral, and SATUSEHAT / FHIR concepts |
| **B-03** | Medical LLM & Clinical Intelligence - Regional Healthcare AI Project Presentation | June 2026 | Institutional and primary-care deployment evidence; regional operations; enterprise integration and workflow capabilities |

## 10. Maintenance Rules

- Update this baseline by version: v0.1, v0.2, v0.3, and so on.
- Preserve the distinction between proven or deployed capability, partner-reported evidence, and Indonesia-unvalidated proposals.
- Date every new quantitative disclosure and retain earlier figures when they reflect different source periods.
- Do not convert a proposal into a proven capability without implementation evidence.
- Do not publish partner-reported figures externally without source-owner reconfirmation and an agreed definition.
- Keep partner identities and identifying geographic labels outside this artifact; maintain any restricted source-to-file mapping separately with appropriate access control.
- Record evidence gaps explicitly rather than filling them with assumptions.

---

**MHCS reuse principle:** Reuse proven capabilities first; integrate and localise second; build from scratch only where a validated capability gap remains.

[A-01]: #9-anonymized-source-register
[A-02]: #9-anonymized-source-register
[A-03]: #9-anonymized-source-register
[B-01]: #9-anonymized-source-register
[B-02]: #9-anonymized-source-register
[B-03]: #9-anonymized-source-register
