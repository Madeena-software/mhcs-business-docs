# H2 Capability Map

**Status:** Working Capability-Mapping Draft  
**Version:** v0.1  
**Date:** 2026-08-22  
**Basis:** H2 working hypothesis, H2 falsification research, current Government/market verification, and External Capability Baseline v0.1  
**Important:** This is a capability-mapping artifact, not a final product scope or proof of implementation.

---

## 1. Purpose

This document maps the capabilities potentially required by H2 against what already exists across:

- Government systems and programmes;
- the Indonesia market;
- Madeena / UGM;
- external partner capabilities;
- required integration;
- required localisation;
- genuinely missing capability.

Each component should end with one provisional decision:

- **USE**
- **INTEGRATE**
- **PARTNER**
- **LOCALIZE**
- **BUILD**
- **DEFER**

The objective is not to maximise new development.

> **The objective is to identify the smallest genuinely missing layer after existing capabilities have been accounted for.**

---

## 2. H2 Working Context

| Item | Working statement |
|---|---|
| **Original H2** | Last-mile utilisation of expanding primary-care X-ray capacity under workforce, workflow, and digital-operational constraints. |
| **Narrowed H2 after falsification** | Whether persistent operational barriers prevent expanding primary-care imaging capacity from being converted into timely and completed clinical action, despite existing imaging, AI, interoperability, and remote-reading capabilities. |
| **Capability-mapping question** | Which parts of the H2 workflow are already solved by Government, the Indonesia market, or external partners, and which parts remain genuinely unresolved? |
| **Development rule** | Do not build a component merely because it is important. Build only if no mature, usable, integrable and localisable capability already exists. |

---

## 3. Capability Decision Definitions

| Decision | Meaning |
|---|---|
| **USE** | Existing capability can be adopted substantially as-is. |
| **INTEGRATE** | Existing capability should be connected into the target workflow. |
| **PARTNER** | Capability should primarily be sourced through a Government, market, or external partner. |
| **LOCALIZE** | Existing capability requires Indonesia-specific language, workflow, guideline, regulatory, terminology, or operational adaptation. |
| **BUILD** | A validated capability gap remains after reuse/integration/localisation options have been exhausted. |
| **DEFER** | Evidence is insufficient, requirement is not yet validated, or the capability is outside the current H2 scope. |

---

## 4. Evidence Treatment

| Evidence class | Treatment |
|---|---|
| **Government capability** | Treat documented architecture/programmes as existing capability, but do not equate architecture with national operational adoption. |
| **Indonesia market capability** | Treat vendor capability as evidence that the capability exists; do not assume national coverage, performance, commercial suitability, or SATUSEHAT production integration without validation. DICOM/HL7/FHIR support does **not** by itself prove SATUSEHAT integration. |
| **Madeena / UGM** | **Internal validation pending. Intentionally left unassessed in v0.1.** |
| **External partner capability** | Use External Capability Baseline v0.1. Preserve the distinction between Proven/Deployed, Partner-reported, and Proposed/Not Yet Validated in Indonesia. |
| **Genuinely missing** | Mark as missing only after Government, market, internal, and external-partner options have been checked. |

---

## 4.1 Interoperability Evidence Rule

> **Interoperability capability does not equal SATUSEHAT integration.**

A vendor supporting DICOM, HL7, FHIR, PACS connectivity, or HIS/EMR integration must **not** be classified as SATUSEHAT-integrated unless production integration is independently verified.

For this v0.1 map:

| Statement | Treatment |
|---|---|
| Vendor supports DICOM / PACS / HL7 / FHIR | Evidence of interoperability capability only. |
| Vendor can technically send/receive data compatible with SATUSEHAT patterns | **Potential integration capability**, not proof of deployment. |
| Vendor is connected to SATUSEHAT in production | Only state when independently verified for the relevant product/deployment. |
| SATUSEHAT DICOM Router can receive from a modality or PACS | **Verified Government capability.** It does not prove a specific vendor is already configured to use it. |

This distinction must be preserved in the prototype and in any external presentation.

---

## 5. H2 End-to-End Capability Map

| Required capability | Existing Government capability | Existing Indonesia market capability | Madeena / UGM | External partner capability | Integration required | Localization required | Genuinely missing? | Provisional decision |
|---|---|---|---|---|---|---|---|---|
| **Screening / patient workflow** | CKG and TB programme workflows exist; SITB is the national TB recording/reporting system. | HIS/EMR/clinic systems already support patient-registration and screening workflows. | **Internal validation pending** | **Provider B:** clinical copilot, workflow support, chronic/continuous care, specialty agents. | Patient identity, consent, programme workflow, event/data exchange. | Indonesian programme logic, terminology, facility workflow. | **Not proven** | **USE + INTEGRATE + LOCALIZE** |
| **Image acquisition** | Government is expanding X-ray availability in primary care and TB ACF. | X-ray equipment and imaging vendors already operate in Indonesia. | **Internal validation pending** | Provider A primarily operates downstream of acquisition. | Device/worklist/image handoff. | Device/protocol/site adaptation where required. | **No software white space established** | **USE / PARTNER** |
| **DICOM generation / ingestion** | SATUSEHAT DICOM architecture and DICOM Router exist. | PACS vendors already support DICOM modalities and gateways. **Direct production integration from those vendor platforms into SATUSEHAT is not publicly verified in this research.** | **Internal validation pending** | **Provider A:** PACS-connected imaging workflow. | DICOM conformance, SATUSEHAT identifiers, accession-number alignment, routing, network/security, error handling and production credential configuration. | Indonesia identifiers/workflow and operational configuration. | **National DICOM architecture is not missing. Vendor-to-SATUSEHAT implementation may still be required; current market coverage is unverified.** | **USE + INTEGRATE** |
| **Image storage / PACS** | SATUSEHAT national imaging architecture/NIDR-related workflow exists. | TCI, Telenasindo, HealthHub and other providers offer PACS/DICOM capability. **Their direct production integration with SATUSEHAT is not publicly verified here.** | **Internal validation pending** | **Provider A:** integrates with PACS; does not establish an Indonesia PACS deployment or SATUSEHAT production integration by itself. | PACS/DICOM routing, SATUSEHAT DICOM Router handoff where applicable, access control, image lifecycle and operational monitoring. | Local security, data governance, identifiers and site workflow. | **PACS capability exists; vendor-to-SATUSEHAT integration/orchestration may still require implementation.** | **PARTNER + INTEGRATE** |
| **AI-assisted chest X-ray analysis** | Kemenkes has used/partnered for AI-assisted TB CXR workflows. | TCI and other imaging-AI providers offer AI-assisted chest X-ray/TB capability. | **Internal validation pending** | **Provider A:** chest DR multi-disease analysis, including TB-related findings; partner-supplied evidence indicates productised capability. | Image routing, result return, worklist integration. | Indonesia clinical validation, intended-use alignment, language/reporting, regulatory review. | **Capability exists; local suitability not proven** | **PARTNER + INTEGRATE + LOCALIZE** |
| **AI prioritisation / worklist** | AI-assisted workflows are already part of Government/partner initiatives. | AI/teleradiology providers offer prioritisation and worklist functions. | **Internal validation pending** | **Provider A:** AI reading workflow and findings review. | Priority rules, worklist, identity, status updates. | Local clinical governance and escalation rules. | **Not proven** | **INTEGRATE / PARTNER** |
| **Radiologist / clinician review** | RSUD networks and Government/local operating models can provide specialist review; national referral networks exist. | TCI, Telenasindo and other teleradiology providers offer remote interpretation. | **Internal validation pending** | **Provider A:** clinician review interface; **Provider B:** clinician-support functions. | Credentialing, case assignment, result exchange, audit. | Indonesian professional roles, clinical accountability, workflow. | **Access-at-scale remains unknown** | **USE / PARTNER / INTEGRATE** |
| **Structured radiology result** | SATUSEHAT supports DiagnosticReport linked to imaging workflows. | RIS/PACS/teleradiology vendors support structured reporting. | **Internal validation pending** | **Provider A:** structured reporting support. | Mapping into DiagnosticReport/FHIR and programme workflow. | Indonesian terminology/templates and clinical conventions. | **Not proven** | **INTEGRATE + LOCALIZE** |
| **TB programme reporting** | SITB and SATUSEHAT TB interoperability workflows exist. | Market systems can integrate, but national reporting remains Government-defined. | **Internal validation pending** | **Provider B:** enterprise integration capability; SATUSEHAT/FHIR alignment remains proposed/unvalidated in Indonesia. | SITB/SATUSEHAT APIs, identifiers, terminology, reconciliation. | Indonesia TB programme requirements. | **National reporting platform not missing** | **USE + INTEGRATE** |
| **Referral to confirmatory testing** | SATUSEHAT Rujukan and national referral processes exist; TB workflows also operate through SITB/programme mechanisms. | Market systems can route tasks/referrals internally. | **Internal validation pending** | **Provider B:** referral intelligence and care-routing capability. | Referral-event handoff, status updates, facility routing, return of results. | Indonesian referral policy, TB pathway, facility rules. | **Generic referral system not missing; execution gap possible** | **USE + INTEGRATE + LOCALIZE** |
| **Confirmatory-test completion tracking** | Government systems support TB and referral records, but 2026 closed-loop completion at target workflow remains unverified. | General workflow/care-management capability exists. | **Internal validation pending** | **Provider B:** longitudinal care and referral intelligence may support tracking. | Cross-system status updates, patient matching, escalation. | TB programme logic, escalation responsibilities, local operations. | **POSSIBLE missing operational layer — not validated** | **DEFER pending field validation** |
| **Treatment initiation / longitudinal follow-up** | SITB and national TB programme systems are intended for longitudinal monitoring; Government is strengthening integration/follow-up. | Care-management and EMR systems already exist. | **Internal validation pending** | **Provider B:** continuous care, chronic-care and longitudinal-management workflows. | Programme/facility events, patient status, alerting. | Indonesian TB guidelines, care pathways, clinician governance. | **Execution gap possible; capability existence not missing** | **USE + INTEGRATE + LOCALIZE** |
| **SATUSEHAT imaging integration** | SATUSEHAT DICOM Router, ImagingStudy, Observation, DiagnosticReport and production endpoints exist. | Multiple vendors support DICOM/HL7/FHIR interoperability, but **SATUSEHAT production integration is not proven merely by supporting those standards and has not been publicly verified for the named vendors in this research.** | **Internal validation pending** | **Provider B:** SATUSEHAT/FHIR alignment is only proposed in baseline; **Provider A:** PACS-connected workflows do not by themselves establish SATUSEHAT integration. | DICOM/FHIR conformance, Organization/Client credentials, identifier/accession alignment, security, error handling, reconciliation, production routing and operational monitoring. | Indonesia SATUSEHAT profiles, terminologies, workflow and deployment procedures. | **SATUSEHAT platform capability is not missing. The integration layer between facility/vendor systems and SATUSEHAT may still require implementation and validation.** | **USE Government capability + INTEGRATE** |
| **SATUSEHAT Rujukan integration** | SATUSEHAT Rujukan supports national referral workflows, including facility routing and rujuk balik. | Market systems may integrate or provide internal routing. | **Internal validation pending** | **Provider B:** referral intelligence can potentially augment, not replace, national referral. | API/events, identity, facility mapping, status synchronisation. | Indonesia referral rules and user workflow. | **National referral platform not missing** | **USE + INTEGRATE** |
| **Operational dashboard / KPI monitoring** | SATUSEHAT Data and Government programme dashboards already exist. | Dashboard/analytics capability is common in market products. | **Internal validation pending** | **Provider B:** regional operations/governance and clinical intelligence capabilities. | Data feeds, KPI definitions, role-based views. | Indonesia programme/KPI definitions and permissions. | **Generic dashboard not missing** | **USE / INTEGRATE / LOCALIZE** |
| **Clinical decision support** | Government provides programme guidelines/rules; national systems include structured workflow logic. | Various digital-health/CDSS products exist. | **Internal validation pending** | **Provider B:** medical LLM, clinical copilot, RAG, rules, orchestration, medication/referral support. | Clinical data/context, knowledge sources, workflow events. | Bahasa Indonesia, local guidelines, formularies, referral policy, safety controls. | **Capability exists externally; need itself not yet validated for H2** | **PARTNER + LOCALIZE / DEFER** |
| **Offline / constrained-connectivity operation** | Government acknowledges connectivity constraints and provides multiple deployment/integration patterns. | Some market solutions support local/store-and-forward models. | **Internal validation pending** | **Provider A:** local/on-premises deployment; **Provider B:** private/cloud/hybrid deployment. | Queueing, sync, retry, conflict handling, local identity/cache. | Site infrastructure and operating procedures. | **Exact H2 requirement unknown** | **DEFER pending field evidence** |
| **Billing / service settlement** | JKN/programme payment policy is Government/BPJS controlled. | TCI/Telenasindo-style teleradiology workflows already include billing/settlement capability. | **Internal validation pending** | Baseline does not establish Indonesia payer integration. | Claims/service event linkage if required. | Indonesian payer rules, tariff logic, invoicing. | **Generic billing not missing** | **USE / PARTNER / DEFER** |
| **TB X-ray reimbursement / payer mechanism** | Historical Kemenkes policy and pilots include non-capitation/innovation-financing pathways, but current Aug 2026 national sufficiency remains unverified. | Market billing cannot substitute for BPJS/Kemenkes reimbursement policy. | **Internal validation pending** | External baseline does not solve Indonesian payer policy. | Potential claims/API integration only after payer rule is confirmed. | BPJS/Kemenkes tariff, eligibility, claim governance. | **Current policy gap UNKNOWN** | **DEFER — payer validation required** |
| **Equipment maintenance / lifecycle** | Kemenkes/BAPETEN frameworks require operational and safety readiness. | Equipment vendors/service organisations provide maintenance capability. | **Internal validation pending** | External baseline does not establish Indonesia X-ray maintenance capability. | Service status/asset data only if relevant to workflow. | Local licensing, service contracts, radiation-safety procedures. | **Not established as software white space** | **PARTNER / DEFER** |
| **Radiation-safety / regulatory operations** | BAPETEN/Kemenkes define licensing, radiation safety, PPR and facility-readiness requirements. | Compliance/service providers can support implementation. | **Internal validation pending** | External partner baseline requires Indonesia regulatory validation. | Compliance evidence, role/status tracking if needed. | Indonesia regulation, facility and professional requirements. | **Regulatory framework exists** | **USE + PARTNER** |
| **End-to-end orchestration across the H2 workflow** | Components are distributed across SATUSEHAT, SITB, referral systems and programme processes. | Components exist across PACS, teleradiology, AI and workflow vendors, but their end-to-end integration with SATUSEHAT and programme systems is not assumed. | **Internal validation pending** | Provider A + Provider B together cover many component capabilities, but not a validated Indonesia end-to-end implementation. | Cross-system identity, events, permissions, workflow state, vendor-to-SATUSEHAT handoff, audit, reconciliation and exception handling. | Indonesian clinical/programme workflow, terminology, governance, UX. | **CANDIDATE missing layer — NOT VALIDATED. Could be an integration/orchestration gap rather than a new standalone product capability.** | **DEFER; candidate INTEGRATE / LOCALIZE / BUILD only after validation** |

---

## 6. What Is Already Clearly Not a New-Build White Space

| Capability | Current conclusion | Provisional disposition |
|---|---|---|
| **PACS** | Mature market capability exists; direct SATUSEHAT production integration is not assumed. | **PARTNER / INTEGRATE** |
| **DICOM infrastructure** | SATUSEHAT national architecture exists; facility/vendor production integration still requires verification. | **USE / INTEGRATE** |
| **AI-assisted chest X-ray** | Government, market and external-partner capability exists. | **PARTNER / INTEGRATE / LOCALIZE** |
| **Teleradiology** | Mature Indonesia market capability exists. | **PARTNER / INTEGRATE** |
| **Generic structured reporting** | Government standards and market tools exist. | **INTEGRATE / LOCALIZE** |
| **Generic referral platform** | SATUSEHAT Rujukan exists. | **USE / INTEGRATE** |
| **Generic operational dashboard** | Government and market dashboard capability exists. | **USE / INTEGRATE / LOCALIZE** |
| **Generic billing engine** | Market capability exists. | **USE / PARTNER** |

---

## 7. Candidate Layers That Still Require Validation

| Candidate layer | Why it may still matter | Why it is not yet BUILD |
|---|---|---|
| **Cross-system orchestration** | The workflow spans screening, imaging, AI, interpretation, TB confirmation, referral, follow-up and national reporting. | Existing Government and partner systems may already cover more of this than currently known. |
| **Closed-loop confirmatory testing** | Historical evidence shows failure between suspected TB/referral and TCM completion. | Current 2026 Government integration may have materially improved the pathway. |
| **Closed-loop treatment initiation / follow-up** | Historical evidence shows diagnosis does not always convert to treatment. | Problem is broader than imaging and existing SITB/programme workflows may already address much of it. |
| **Facility-level workflow adaptation** | National capabilities may not match real Puskesmas operational constraints. | Requires field evidence before deciding whether this is configuration, localisation, integration or new development. |
| **Interpretation coverage/TAT orchestration** | Shortage exists, but market teleradiology may already close the reading gap. | National/target-site TAT and coverage are still unknown. |
| **Payer/financial workflow** | Payment can block service completion even when technology exists. | Current policy—not software capability—may be the dominant issue. |
| **Offline/low-connectivity execution** | Connectivity constraints are documented. | Exact imaging-workflow failure and required technical pattern remain unverified. |

---

## 8. External Partner Mapping Summary

The External Capability Baseline v0.1 should be treated as a reusable capability inventory, not as proof of Indonesia readiness.

| External capability | Baseline status | Potential H2 relevance | Required validation before use |
|---|---|---|---|
| **Provider A — multi-modality medical imaging AI** | Proven/Deployed capability base in partner materials. | AI-assisted CXR analysis, prioritisation, image-review workflow. | Module-specific regulatory status, intended use, Indonesia performance, integration, security. |
| **Provider A — chest DR multi-disease analysis** | Proven/Deployed in partner materials. | TB/chest screening and prioritisation. | Indonesia clinical validation, device/protocol generalisability, product-version status. |
| **Provider A — PACS-connected workflow / structured reporting** | Proven/Deployed in partner materials. | Integration into image-review/reporting workflow. | DICOM/PACS compatibility with target architecture and local workflow. |
| **Provider A — local/on-premises deployment** | Proven/Deployed in partner materials. | Potential support for constrained-connectivity/data-governance settings. | Sizing, cybersecurity, updates, lifecycle/support. |
| **Provider B — medical LLM / clinical copilot** | Proven/Deployed capability base in partner materials. | Clinical workflow support, summarisation, decision support. | Bahasa Indonesia, local guideline alignment, safety, hallucination controls, clinician oversight. |
| **Provider B — referral intelligence** | Proven/Deployed capability base in partner materials. | May augment referral decision/routing around national systems. | Must not duplicate/override SATUSEHAT Rujukan; local policy and workflow validation required. |
| **Provider B — chronic/continuous care** | Proven/Deployed capability base in partner materials. | Follow-up and longitudinal care support. | Indonesia care pathways, accountability, integration with national programme systems. |
| **Provider B — HIS/EMR/LIS/PACS/CDR integration** | Proven/Deployed capability base in partner materials. | Cross-system data integration. | Demonstrate against actual Indonesian target systems. |
| **Provider B — SATUSEHAT/FHIR alignment** | **Proposed / Not Yet Validated in Indonesia** | Potential national-system integration support. | Conformance, terminology, security, sandbox and production testing. |

---

## 9. Current Decision Register

| Capability area | Current decision |
|---|---|
| Screening workflow | **USE + INTEGRATE + LOCALIZE** |
| Image acquisition | **USE / PARTNER** |
| DICOM | **USE + INTEGRATE** |
| PACS | **PARTNER + INTEGRATE** |
| AI CXR | **PARTNER + INTEGRATE + LOCALIZE** |
| AI prioritisation | **INTEGRATE / PARTNER** |
| Radiologist review | **USE / PARTNER / INTEGRATE** |
| Structured result | **INTEGRATE + LOCALIZE** |
| TB reporting | **USE + INTEGRATE** |
| Referral | **USE + INTEGRATE + LOCALIZE** |
| Confirmatory-test completion tracking | **DEFER pending field validation** |
| Follow-up / longitudinal care | **USE + INTEGRATE + LOCALIZE** |
| SATUSEHAT imaging | **USE + INTEGRATE** |
| SATUSEHAT Rujukan | **USE + INTEGRATE** |
| Dashboard/KPI | **USE / INTEGRATE / LOCALIZE** |
| Clinical decision support | **PARTNER + LOCALIZE / DEFER** |
| Offline operation | **DEFER** |
| Billing | **USE / PARTNER / DEFER** |
| Payer / reimbursement | **DEFER — validate policy first** |
| Maintenance | **PARTNER / DEFER** |
| Regulatory operations | **USE + PARTNER** |
| End-to-end orchestration | **DEFER — candidate missing layer, not yet BUILD** |

---

## 10. What Must Be Resolved Before Any BUILD Decision

| Validation question | Why it matters |
|---|---|
| Is facility-level X-ray utilisation actually poor? | If not, utilisation orchestration is not a meaningful problem. |
| Is interpretation coverage/TAT actually inadequate? | If existing radiologist networks/teleradiology already solve it, do not build a reading platform. |
| Is suspicious-CXR → TCM completion still materially broken in 2026? | Determines whether closed-loop diagnostic completion is a genuine gap. |
| Is treatment initiation/follow-up still operationally incomplete despite SITB integration? | Determines whether additional orchestration adds value. |
| What is the current 2026 payer/reimbursement mechanism? | Software cannot solve a missing tariff or reimbursement policy. |
| How widely is SATUSEHAT imaging actually deployed at target facilities? | Separates integration work from platform invention. |
| Are the relevant PACS/teleradiology vendors already integrated with SATUSEHAT in production? | Distinguishes existing vendor interoperability from a genuine vendor-to-SATUSEHAT integration requirement. |
| Which external-partner modules are legally/clinically usable in Indonesia? | Prevents prototype assumptions from becoming false product commitments. |
| What capability exists internally? | **Internal validation pending; intentionally outside this v0.1 assessment.** |

---

## 11. Prototype Implication

The capability map supports a **Hypothesis-Driven Prototype**, not a final architecture.

A provisional clickable workflow may visualise:

> **screening → image acquisition → DICOM → AI prioritisation → radiologist / clinician review → structured result → TCM / confirmatory testing → referral → treatment / follow-up → SATUSEHAT / programme reporting → operational dashboard**

The prototype should visibly distinguish:

- **existing Government capability**;
- **existing market capability**;
- **external partner capability**;
- **integration/localisation layer**;
- **unknown / unvalidated layer**.

It should **not** imply that all visualised integrations are already implemented.

---

## 12. Current Capability-Mapping Verdict

> **Most of the obvious technical components of H2 already exist somewhere.**

The current evidence does **not** support building from scratch:

- PACS;
- DICOM infrastructure;
- generic teleradiology;
- generic chest-X-ray AI;
- generic referral;
- generic dashboards;
- generic billing.

The main unresolved question is therefore:

> **After existing Government, market and external-partner capabilities are integrated and localised, what operational layer—if any—still remains genuinely missing in the Indonesian H2 workflow?**

At v0.1, the strongest candidate is **cross-system / cross-workflow orchestration toward completed clinical action**, but this remains **unvalidated** and must not yet be labelled **BUILD**.

---

## 13. Validation Backlog

| Priority | Validation item | Current status |
|---|---|---|
| **P1** | Actual X-ray utilisation at target facilities | **Unknown** |
| **P1** | Interpretation coverage and turnaround time | **Unknown** |
| **P1** | Current 2026 payer/reimbursement mechanism | **Unknown** |
| **P1** | Confirmatory-test completion after suspicious imaging | **Current 2026 status unknown** |
| **P2** | SATUSEHAT imaging production adoption | **Unknown at target-site scale** |
| **P2** | Named vendor → SATUSEHAT production integration | **Not publicly verified in this research** |
| **P2** | Follow-up/treatment closure after diagnosis | **Current 2026 status requires validation** |
| **P2** | Offline/low-connectivity requirements | **Need not yet quantified** |
| **P2** | External-partner Indonesia regulatory/clinical readiness | **Not yet validated** |
| **Internal** | Madeena / UGM capability | **Internal validation pending** |

---

## 14. Source Register

### Government / Official

| ID | Source | Capability supported |
|---|---|---|
| **GOV-01** | SATUSEHAT DICOM Router — https://satusehat.kemkes.go.id/platform/docs/id/dicom-system/dicom-router/ | DICOM ingestion/routing and national imaging architecture. |
| **GOV-02** | SATUSEHAT DICOM Setup — https://satusehat.kemkes.go.id/platform/docs/id/dicom-system/setup-dicom/ | Production/sandbox endpoint and deployment mechanism. |
| **GOV-03** | SATUSEHAT ImagingStudy — https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/imaging-study/ | ImagingStudy workflow. |
| **GOV-04** | SATUSEHAT DiagnosticReport — https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/diagnostic-report/ | Structured diagnostic reporting linked to imaging. |
| **GOV-05** | SATUSEHAT TB Interoperability — https://satusehat.kemkes.go.id/platform/docs/id/interoperability/tuberkulosis/ | TB/SITB interoperability workflow. |
| **GOV-06** | SATUSEHAT Rujukan — https://satusehat.kemkes.go.id/platform/docs/id/interoperability/rujukan/ | National referral and rujuk-balik workflow. |
| **GOV-07** | SITB Training/About — https://sitbtraining.kemkes.go.id/sitb_predev/about | National TB recording/reporting capability. |
| **GOV-08** | Kemenkes–Qure.ai collaboration — https://www.kemkes.go.id/id/kemenkes-dan-qure-ai-jalin-kerja-sama-pemanfaatan-kecerdasan-buatan-dalam-deteksi-tb | Government AI-assisted CXR/TB capability direction. |
| **GOV-09** | BAPETEN/Kemenkes Mobile X-Ray readiness — https://bapeten.go.id/berita/bapeten-dan-kementerian-kesehatan-perkuat-kesiapan-operasional-mobile-xray-di-puskesmas-untuk-eliminasi-tbc-nasional-131054?lang=id | Regulatory and operational-readiness capability/requirements. |
| **GOV-10** | Kemenkes Laporan Kinerja 2024 — https://ppid.kemkes.go.id/wp-content/uploads/2025/03/Lakip-2024_compressed_compressed.pdf | Historical payer/referral/treatment bottlenecks. |
| **GOV-11** | BKPK TB financing — https://www.badankebijakan.kemkes.go.id/inovasi-pembiayaan-tuberkulosis-dan-tantangannya/ | Financing mechanisms/pilot. |

### Indonesia Market

> **Scope note:** The sources below support capability existence (e.g. PACS, DICOM, teleradiology, AI, HIS/EMR interoperability). They do **not** by themselves establish production integration with SATUSEHAT.

| ID | Source | Capability supported |
|---|---|---|
| **MKT-01** | TCI — https://tcihealth.co.id/ | Teleradiology / AI / PACS capability existence. |
| **MKT-02** | TCI Services — https://tcihealth.co.id/id/service.html | PACS SaaS, AI TB, teleradiology, integration. |
| **MKT-03** | Telenasindo ThenaPACS — https://www.telenasindo.co.id/product/thenapacs-picture-archiving-and-comunication-system | PACS, DICOM and HIS/EMR integration. |
| **MKT-04** | Telenasindo ThetraRIS — https://telenasindo.co.id/product/thetraris-radiology-information-system | Teleradiology request/report/settlement workflow. |
| **MKT-05** | HealthHub — https://healthhub.kr/ | PACS/teleradiology/AI capability; deployment claims remain vendor-reported. |

### External Partner Baseline

**Source:** `MHCS External Capability Baseline v0.1`, 22 August 2026.

Used for:
- Provider A medical-imaging AI capabilities;
- Provider A PACS-connected workflow and local/on-premises deployment;
- Provider B medical LLM / clinical-intelligence capabilities;
- Provider B referral, continuous-care, enterprise-integration, RAG/rules/orchestration capabilities;
- validation boundaries and evidence classifications.

All partner-reported scale/performance claims remain subject to reconfirmation.

---

## 15. Working Rule

> **Identify the gap → match the capability → integrate → localize → demonstrate.**

> **BUILD only what remains genuinely missing after that process.**
