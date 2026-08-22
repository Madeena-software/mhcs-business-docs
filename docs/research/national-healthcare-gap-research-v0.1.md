# National Healthcare Gap Research

**Status:** Working Research Draft  
**Version:** v0.1  
**Date:** 2026-08-22  
**Purpose:** Identify the strongest national healthcare gap hypotheses in Indonesia that are relevant to current Government priorities, measurably unresolved, commercially plausible, and suitable for a rapid solution-design and POC sprint.

---

## 1. Executive Decision Summary

This research does **not** assume that a new PACS, teleradiology platform, AI model, radiography device, screening facility, or replacement digital-health system is the answer.

The immediate objective is to identify the **Top 3 National Healthcare Gap Hypotheses** and determine which one is strongest enough to become a decision-grade problem statement for further solution design.

### Current Top 3 Gap Hypotheses

1. **H1 — Private / primary-care TB participation, reporting, and continuity gap**  
   Existing TB mechanisms and national systems exist, but evidence indicates that participation, reporting, and continuity of care through private primary-care facilities remain incomplete.

2. **H2 — Last-mile utilisation of expanding primary-care X-ray capacity under workforce, workflow, and digital-operational constraints**  
   Indonesia is expanding X-ray capacity in primary care while radiologist and radiographer capacity remains constrained. AI, PACS, teleradiology, and national DICOM infrastructure already exist, but last-mile operational constraints may still prevent imaging capacity from producing timely clinical value.

3. **H3 — Operational completion gap in screening-to-care pathways despite expanding national digital integration**  
   Government systems are increasingly connecting screening, TB surveillance, referral, and follow-up, but implementation gaps may remain between detection, confirmation, referral, treatment initiation, and completion.

### Current Leading Hypothesis

**H2 is currently the strongest hypothesis.**

Why:
- it is directly aligned with current Government expansion of X-ray capacity;
- the workforce constraint is quantitatively documented;
- the Government itself is studying primary-care X-ray utilisation;
- existing AI, PACS, teleradiology, and DICOM capabilities mean the unresolved question is no longer simply “how to add technology,” but how to operationalise the full workflow at the last mile.

However, H2 is **not yet a validated gap**. Important facility-level evidence remains unavailable.

---

## 2. Evidence Classification

This report uses the following labels:

- **VERIFIED FACT** — directly supported by an authoritative or primary source.
- **GOVERNMENT PLAN / TARGET** — formally announced or documented, but not necessarily deployed.
- **PROJECTION** — forecast or planned need, not current measured supply.
- **VENDOR CLAIM** — statement from a commercial provider.
- **INFERENCE** — reasoned interpretation based on multiple verified facts.
- **UNKNOWN** — no sufficiently reliable public evidence found.
- **HYPOTHESIS** — candidate explanation requiring further validation.

---

## 3. Current Indonesia National Healthcare Checkpoint

### 3.1 TB remains a national priority

Indonesia continues to prioritise TB elimination, earlier case detection, active case finding, contact tracing, treatment linkage, and treatment completion.

Recent Government direction includes:
- expansion of active case finding;
- chest X-ray use for TB screening;
- AI-assisted interpretation;
- broader screening through primary care;
- stronger linkage from screening results to follow-up and treatment.

**Status:** VERIFIED FACT / GOVERNMENT PRIORITY

### 3.2 Primary-care imaging capacity is being expanded

On 13 August 2026, the Ministry of Health stated that approximately **10,000 X-ray units** were being prepared for phased distribution to Puskesmas.

The same policy direction also discusses:
- wider use of chest X-ray for TB screening;
- portable radiography;
- AI-assisted interpretation.

Important distinction:

> The official source supports a plan to distribute approximately 10,000 X-ray units. It does **not** establish that all 10,000 units are already deployed, portable, or AI-enabled.

**Status:** GOVERNMENT PLAN

### 3.3 Radiology workforce remains constrained

For radiographers, the Ministry of Health DREAMS dashboard for 2026 shows:

- **Need:** 36,821
- **Existing:** 20,553
- **Gap:** 16,268
- **Fulfilment:** 55.82%

For radiology specialists, official workforce projections for 2026 show:

- **Need:** 4,336
- **Projected availability:** 2,445
- **Projected gap:** 1,891

These figures indicate that workforce capacity is materially below projected need.

**Status:** VERIFIED FACT for current radiographer dashboard / PROJECTION for radiologist workforce need-availability series

### 3.4 Government already has national imaging interoperability architecture

SATUSEHAT already provides a radiology interoperability architecture including:

- `ServiceRequest`
- `ImagingStudy`
- `Observation`
- `DiagnosticReport`
- DICOM Router
- DICOM Store / National Imaging Data Repository
- modality/PACS integration pathways

SATUSEHAT documentation also accounts for facilities that may not have full PACS or modality worklist infrastructure.

Therefore:

> National DICOM exchange architecture itself cannot automatically be considered an unresolved white space.

**Status:** VERIFIED FACT

### 3.5 AI-assisted TB screening already exists

The Ministry of Health has already collaborated with AI providers, including Qure.ai, for AI-assisted chest X-ray TB screening.

Government communications also emphasise that AI should support clinical decision-making rather than replace authorised clinical responsibility.

Therefore:

> “AI for TB screening” alone is not a sufficient differentiated gap.

**Status:** VERIFIED FACT

### 3.6 PACS and teleradiology already exist commercially in Indonesia

Commercial providers operating in Indonesia already offer mature capability in areas such as:

- cloud PACS;
- DICOM workflow;
- teleradiology;
- radiologist networks;
- AI-assisted radiology;
- third-party AI integration;
- HIS / EMR integration.

Examples include TCI, Telenasindo, and HealthHub-related solutions.

Therefore:

> “Indonesia does not have PACS/teleradiology” is not a defensible problem statement.

**Status:** VERIFIED MARKET CAPABILITY, with deployment-scale claims treated cautiously when vendor-reported.

### 3.7 Last-mile digital implementation remains uneven

Official reporting from the Ministry of Health indicates that not all health-screening results were successfully entered into SATUSEHAT because of operational constraints such as:

- limited human resources;
- limited laptops;
- internet limitations.

This is important because it demonstrates that:

> architecture and national platforms may exist while operational implementation remains incomplete.

**Status:** VERIFIED OPERATIONAL EVIDENCE

---

# 4. Top 3 National Healthcare Gap Hypotheses

## H1 — Private / Primary-Care TB Participation, Reporting, and Continuity Gap

### National Problem

Private and primary-care facilities play an important role in finding and treating TB cases, but their participation in screening, notification, reporting, and longitudinal care appears incomplete.

### Evidence

Government and WHO sources have identified issues including:
- under-reporting;
- incomplete private-sector notification;
- inconsistent data submission;
- limitations in digital integration;
- human-resource constraints;
- limited use of TB information systems in some facilities;
- incomplete active case-finding participation.

BKPK has specifically studied strengthening TB services in private primary-care facilities across:
- prevention;
- screening;
- diagnosis;
- treatment;
- recording;
- reporting.

### Government Relevance

High.

The issue is directly connected to:
- TB elimination;
- active case finding;
- case notification;
- private-sector participation;
- treatment continuity.

### Existing Solutions

Already available:
- SITB;
- SATUSEHAT integration initiatives;
- TB programme reporting mechanisms;
- financing / incentive mechanisms for some primary-care TB services;
- public and private healthcare referral systems.

### Candidate Remaining Gap

The candidate gap is **not** “there is no TB system.”

The candidate gap is:

> Existing mechanisms may still fail to produce consistent participation, reporting, and care continuity across private and primary-care providers.

### Who Experiences the Problem?

Potentially:
- TB programme managers;
- Puskesmas;
- private primary-care providers;
- patients;
- district health offices;
- Ministry of Health.

### Decision-Maker / Payer

Potential decision-makers:
- Ministry of Health;
- Provincial / District Health Offices;
- health programme managers.

Potential payment mechanisms:
- Government programme funding;
- service reimbursement;
- facility-level contracting;
- programme financing.

**Status:** requires further commercial validation.

### Existing Capability Fit

Potentially addressable through:
- integration;
- workflow standardisation;
- reporting;
- referral coordination;
- existing national systems.

### New Development Requirement

Unknown.

Must first determine what existing systems already provide and what operational layer is genuinely missing.

### Demo Feasibility

Medium to high if the gap can be narrowed to a specific workflow.

### Candidate KPI

Examples:
- percentage of suspected cases successfully reported;
- time from screening to notification;
- time from suspicion to diagnostic confirmation;
- percentage linked to treatment;
- loss-to-follow-up rate.

### Regulatory Dependencies

- health data;
- RME;
- SATUSEHAT;
- TB programme reporting;
- clinical accountability;
- PSE;
- privacy/data protection.

### Scalability

Potentially high if the gap is nationally reproducible.

### Current Assessment

**Strong candidate, but the exact unresolved operational layer is not yet sufficiently isolated.**

---

## H2 — Last-Mile Utilisation of Expanding Primary-Care X-Ray Capacity Under Workforce, Workflow, and Digital-Operational Constraints

### National Problem

Indonesia is expanding primary-care X-ray capacity to improve earlier detection, especially for TB.

At the same time, radiologist and radiographer capacity remains materially constrained.

The Government and market already have:
- AI-assisted chest X-ray;
- PACS;
- teleradiology;
- DICOM infrastructure;
- national interoperability architecture.

The unresolved question is therefore:

> What still prevents expanding X-ray capacity from consistently producing timely clinical value at the primary-care level?

### Evidence

#### Equipment expansion
The Ministry of Health announced a plan to distribute approximately **10,000 X-ray units** to Puskesmas.

**Status:** GOVERNMENT PLAN

#### Radiographer capacity
2026:
- need: 36,821;
- existing: 20,553;
- gap: 16,268;
- fulfilment: 55.82%.

**Status:** VERIFIED FACT

#### Radiologist capacity
2026 projection:
- need: 4,336;
- projected availability: 2,445;
- projected gap: 1,891.

**Status:** PROJECTION

#### Government research
BKPK has already conducted a policy study on expanding X-ray utilisation in primary care.

**Status:** VERIFIED FACT

#### Digital-operational constraints
Official health-system reporting has documented limitations involving staff, devices, and internet connectivity.

**Status:** VERIFIED OPERATIONAL EVIDENCE

### Government Relevance

Very high.

Directly relevant to:
- TB active case finding;
- primary-care strengthening;
- equipment utilisation;
- specialist distribution;
- earlier detection;
- capital efficiency;
- national health-investment productivity.

### Existing Solutions

Already available:
- X-ray equipment;
- AI-assisted TB screening;
- commercial PACS;
- teleradiology;
- radiologist networks;
- SATUSEHAT imaging architecture;
- DICOM Router / NIDR;
- clinical reporting structures.

### Candidate Remaining Gap

The gap is **not**:
- lack of AI;
- lack of PACS;
- lack of teleradiology;
- lack of DICOM infrastructure.

The candidate gap is:

> Last-mile operationalisation of imaging capacity across staffing, acquisition, interpretation, digital connectivity, workflow execution, reporting, and downstream clinical action.

This remains a **hypothesis** because national facility-level utilisation data are still incomplete.

### Who Experiences the Problem?

Potentially:
- Puskesmas;
- district health offices;
- radiographers;
- radiologists;
- TB programme teams;
- patients;
- Ministry of Health.

### Decision-Maker / Payer

Potential decision-makers:
- Ministry of Health;
- Provincial / District Health Offices;
- hospitals / referral networks;
- programme operators.

Potential payer:
- Government programme funding;
- facility budgets;
- service contracts;
- managed-service models.

**Status:** payment logic still requires validation.

### Existing Capability Fit

Potentially strong because many technical components already exist.

The strategic question becomes:

> Can those components be integrated and operationalised more effectively rather than rebuilt?

### New Development Requirement

Unknown.

Likely depends on:
- orchestration;
- workflow integration;
- operational dashboards;
- local interfaces;
- connectivity;
- reporting;
- clinical handoff.

No new development should be assumed until capability mapping is complete.

### Demo Feasibility

High.

A realistic clickable workflow could demonstrate:

**screening → X-ray → AI prioritisation → clinician / radiologist review → structured result → referral / follow-up → national-system integration**

### Candidate KPI

Examples:
- X-ray utilisation rate;
- percentage successfully interpreted;
- turnaround time;
- percentage of studies receiving timely clinical review;
- percentage integrated into national reporting;
- referral completion;
- treatment initiation;
- specialist workload efficiency.

### Regulatory Dependencies

- health data;
- PSE;
- RME;
- SATUSEHAT;
- clinical responsibility;
- AI governance;
- radiology equipment requirements;
- facility and professional licensing;
- cybersecurity;
- cross-border processing if applicable.

### Scalability

Potentially very high if the operational gap is reproducible across primary-care facilities.

### Current Assessment

**Leading hypothesis.**

It currently has the strongest combination of:
- national priority;
- measurable workforce constraints;
- major Government investment;
- existing technology maturity;
- plausible operational gap;
- high demo feasibility;
- national scalability.

But the exact last-mile failure must still be validated.

---

## H3 — Operational Completion Gap in Screening-to-Care Pathways Despite Expanding National Digital Integration

### National Problem

Indonesia is expanding screening and early detection programmes.

However, screening only creates value if abnormal findings reliably progress through:

**screening → clinical review → diagnostic confirmation → referral → treatment → follow-up**

Government policy itself increasingly emphasises what happens **after** screening.

### Evidence

Current Government direction includes:
- stronger follow-up after screening;
- integration between screening systems and SITB;
- referral-system reform;
- SATUSEHAT interoperability;
- early-warning and follow-up mechanisms.

WHO and Government sources also continue to identify:
- undetected cases;
- treatment gaps;
- incomplete reporting;
- continuity challenges.

### Government Relevance

Very high.

Relevant to:
- TB;
- CKG;
- referral efficiency;
- treatment initiation;
- public-health outcomes;
- digital transformation.

### Existing Solutions

Government is already actively building:
- SATUSEHAT;
- SITB integration;
- screening programme integration;
- referral-system integration;
- digital follow-up mechanisms.

Therefore:

> A generic “care coordination platform” is not sufficient differentiation.

### Candidate Remaining Gap

The candidate gap is:

> Operational completion may remain incomplete even where national digital infrastructure already exists.

Possible unresolved areas:
- delayed action after abnormal findings;
- incomplete facility adoption;
- manual handoffs;
- inconsistent follow-up;
- private-sector participation;
- incomplete integration of imaging results.

These remain hypotheses.

### Who Experiences the Problem?

Potentially:
- patients;
- primary-care facilities;
- hospitals;
- programme managers;
- health offices;
- clinicians.

### Decision-Maker / Payer

Potentially:
- Ministry of Health;
- District / Provincial Health Offices;
- programme funders;
- providers.

Payment logic remains unclear.

### Existing Capability Fit

Potentially high for integration and orchestration, but overlap with national infrastructure is substantial.

### New Development Requirement

Unknown.

High risk of duplicating Government systems if boundaries are not clearly defined.

### Demo Feasibility

High.

### Candidate KPI

Examples:
- follow-up completion;
- referral completion;
- treatment initiation;
- time to action;
- percentage of abnormal screening results closed.

### Regulatory Dependencies

High:
- national-system integration;
- health data;
- clinical responsibility;
- RME;
- PSE;
- programme reporting.

### Scalability

Potentially high.

### Current Assessment

**Important national problem, but remaining-gap clarity is weaker than H2 because Government is already actively addressing major parts of the pathway.**

---

# 5. Existing Government and Market Capabilities

The following capabilities should currently be treated as **existing**, not assumed white spaces.

| Capability | Status |
|---|---|
| SATUSEHAT national interoperability | Existing Government capability |
| DICOM Router / NIDR architecture | Existing Government capability |
| ImagingStudy / DiagnosticReport workflow | Existing Government capability |
| SITB | Existing Government capability |
| Screening-system integration with TB workflow | Under active Government development |
| AI-assisted chest X-ray for TB | Existing Government / partner capability |
| Cloud PACS | Existing commercial capability |
| Teleradiology | Existing commercial capability |
| Radiologist networks | Existing commercial capability |
| Third-party AI integration | Existing commercial capability |
| HIS / EMR integration | Existing commercial capability |
| X-ray expansion in primary care | Active Government programme direction |

This means the research should not ask:

> “Can we build these?”

It should ask:

> **What remains operationally unresolved even though these capabilities already exist?**

---

# 6. Comparative Decision Matrix

Scoring scale:

- 1 = weak
- 2 = limited
- 3 = moderate
- 4 = strong
- 5 = very strong

These scores are provisional and intended only for research prioritisation.

| Criterion | H1 | H2 | H3 |
|---|---:|---:|---:|
| National priority | 5 | 5 | 5 |
| Evidence strength | 4 | 5 | 4 |
| Remaining-gap clarity | 3 | 4 | 3 |
| Government relevance | 5 | 5 | 5 |
| Payer clarity | 3 | 3 | 2 |
| Existing capability fit | 4 | 5 | 4 |
| Minimal new development potential | 4 | 5 | 3 |
| Demo feasibility | 4 | 5 | 5 |
| KPI measurability | 4 | 5 | 5 |
| Regulatory feasibility | 3 | 3 | 3 |
| Scalability | 4 | 5 | 5 |
| Risk of duplicating existing systems | 3 | 4 | 2 |

### Provisional Ranking

1. **H2 — strongest**
2. **H1 — second**
3. **H3 — third**

---

# 7. Leading Hypothesis

## H2 — Why It Currently Leads

H2 currently has the strongest decision profile because:

1. The Government is actively expanding X-ray capacity.
2. Radiologist and radiographer shortages are documented.
3. Government itself is studying X-ray utilisation in primary care.
4. Existing AI, PACS, teleradiology, and DICOM infrastructure prove that the problem is not merely lack of technology.
5. Operational constraints in digital implementation are already documented.
6. The hypothesis can be expressed as a measurable service-delivery problem.
7. A prototype can be demonstrated without requiring a complete new national system.
8. The problem is relevant to both:
   - Ministry of Health: service delivery and TB detection;
   - Bappenas: utilisation of existing national investment and capital efficiency.

### Provisional Problem Statement

> **Indonesia is expanding X-ray capacity into primary care to support earlier detection, especially for TB, while radiology workforce and last-mile operational capacity remain constrained. The key unresolved question is how to ensure that imaging equipment, AI, digital infrastructure, and specialist capacity are converted into timely, clinically actionable services at facility level.**

This statement is still provisional.

---

# 8. What Would Weaken or Falsify H2?

H2 should be weakened or rejected if further evidence shows that:

1. primary-care X-ray utilisation is already consistently high;
2. radiologist interpretation turnaround is already acceptable;
3. radiographer availability is adequate at deployed sites;
4. existing teleradiology providers already cover the relevant facilities at scale;
5. SATUSEHAT / DICOM integration is already operationally complete;
6. the remaining problem is mainly procurement or maintenance rather than workflow;
7. the Government already has an operational model that closes the identified last-mile gap;
8. no clear payer or decision-maker exists for the proposed operational layer.

---

# 9. Critical Evidence Gaps

The following must still be verified:

### Imaging Deployment
- How many Puskesmas currently have functional X-ray?
- How many of the planned 10,000 units have actually been deployed?
- What percentage are digital / DICOM-capable?
- What is the geographic distribution?

### Workforce
- How many X-ray-equipped primary-care facilities have radiographers onsite?
- How many have reliable access to radiologists?
- What is the actual facility-level workload?

### Utilisation
- What is the average X-ray utilisation rate?
- What percentage of installed equipment is underused?
- What are the main reasons for underutilisation?

### Interpretation
- What is the average turnaround time?
- How are studies interpreted when no radiologist is onsite?
- How much primary care is already covered by teleradiology?

### Digital Workflow
- How many facilities are operationally connected to SATUSEHAT imaging workflows?
- How widely is DICOM Router / NIDR used in production?
- What manual steps remain?

### Clinical Action
- What happens after an abnormal chest X-ray?
- What percentage reaches confirmatory testing?
- What percentage completes referral and treatment initiation?

### Commercial Logic
- Who currently pays for remote interpretation?
- How are teleradiology services procured?
- Can programme funding, facility budgets, or managed-service contracts support recurring service delivery?

---

# 10. Targeted Field Discovery Questions

Accessible facilities can be used as operational evidence, but one facility must not be treated as national proof.

Questions:

1. What imaging equipment is currently used?
2. Does it produce DICOM?
3. Is there PACS?
4. Is there a radiologist onsite?
5. If not, how are images interpreted?
6. What is the normal turnaround time?
7. What causes delays?
8. What is still manual?
9. Is the facility connected to SATUSEHAT imaging workflows?
10. Is AI used?
11. What happens after an abnormal chest X-ray?
12. How is TB suspicion communicated?
13. How is confirmatory testing arranged?
14. How is referral tracked?
15. Who pays for external reading?
16. What operational problem would the facility most want removed?
17. What existing solution has already been tried?
18. What prevents the facility from using existing PACS/teleradiology/AI more effectively?

---

# 11. Proposed Next Decision Step

The next step is **not** a full product roadmap.

The next step is to validate whether H2 is truly an unresolved national operational gap.

Recommended sequence:

1. Verify facility-level X-ray deployment and utilisation evidence.
2. Verify radiographer/radiologist availability at X-ray-equipped primary-care facilities.
3. Verify actual teleradiology coverage and interpretation workflow.
4. Verify real production adoption of national imaging interoperability.
5. Conduct targeted field discovery at selected facilities.
6. Check whether existing providers already solve the full H2 workflow.
7. Refine the problem statement.
8. Only then begin:
   - solution architecture;
   - clickable prototype;
   - preliminary POC concept.

---

# 12. Current Decision

### Decision

**Continue research with H2 as the leading hypothesis.**

### Do not yet conclude

- that a new platform is needed;
- that new AI is needed;
- that new PACS is needed;
- that new teleradiology is needed;
- that new X-ray hardware is needed;
- that a new national digital system is needed.

### Research question to carry forward

> **What specifically prevents Indonesia’s expanding primary-care X-ray capacity from consistently producing timely clinical value, despite existing AI, PACS, teleradiology, national digital infrastructure, and ongoing Government investment?**

---

# 13. References

## Government / Official

Kementerian Kesehatan RI — Expansion of TB screening and planned distribution of approximately 10,000 X-ray units to Puskesmas:  
https://www.kemkes.go.id/id/kemenkes-perluas-skrining-tb-sasar-pesantren-dan-pemukiman-padat-di-seluruh-indonesia

Kementerian Kesehatan RI — Active case finding and contact tracing for TB:  
https://www.kemkes.go.id/id/kemenkes-lacak-100-persen-kontak-erat-pasien-percepat-eliminasi-tb-pada-2030-

Kementerian Kesehatan DREAMS — Radiographer workforce demand and supply:  
https://dreams.kemkes.go.id/user/demand?nakes=44

Kementerian Kesehatan — Health workforce projection documents:  
https://repositori-ditjen-nakes.kemkes.go.id/

SATUSEHAT — DICOM Router documentation:  
https://satusehat.kemkes.go.id/platform/docs/id/dicom-system/dicom-router/

SATUSEHAT — DICOM system architecture:  
https://satusehat.kemkes.go.id/platform/docs/id/dicom-system/architecture/

SATUSEHAT — ImagingStudy documentation:  
https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/imaging-study/

Kementerian Kesehatan — AI-assisted TB collaboration with Qure.ai:  
https://www.kemkes.go.id/id/kemenkes-dan-qure-ai-jalin-kerja-sama-pemanfaatan-kecerdasan-buatan-dalam-deteksi-tb

Kementerian Kesehatan — AI governance and clinical responsibility:  
https://kemkes.go.id/id/ai-bantu-deteksi-tbc-tetapi-dokter-ingatkan-risiko-diagnosis-mandiri

BKPK — Monitoring and policy research, including expansion of X-ray utilisation in primary care:  
https://simplek.badankebijakan.kemkes.go.id/monitoring-ir

WHO Indonesia — TB surveillance and programme evidence:  
https://www.who.int/indonesia/

## Existing Market Capability

TCI — PT Teleradiologi Center Indonesia:  
https://tcihealth.co.id/

Telenasindo — PT Teleradiologi Nasional Indonesia:  
https://www.telenasindo.co.id/

HealthHub:  
https://healthhub.kr/en_main/?mc_code=21

---

## 14. Working Research Rule

> **Do not search for a market for a technology.**

> **Identify the national problem, verify what already exists, isolate the remaining operational gap, and only then decide what solution is justified.**
