# MHCS Market Research & Solution Development Plan

**Status:** Working Strategic Framework  
**Version:** v0.2  
**Date:** 2026-08-22  
**Based on:** MHCS Market Research Plan v0.1  
**Purpose:** To identify a validated national healthcare problem in Indonesia, define the remaining market gap, and rapidly convert that evidence into a Government-ready MHCS solution, clickable prototype, and controlled POC proposal.

---

## 1. Strategic Objective

The purpose of this work is **not to complete an exhaustive study of the Indonesian healthcare market**.

The purpose is to reach a decision:

> **What is the first national healthcare problem that MHCS should solve, and what is the fastest credible way to demonstrate that solution to the relevant Indonesian decision-makers?**

Research must therefore be **decision-oriented, evidence-based, time-bound, and directly connected to solution development.**

**Public-policy & market research → field discovery → candidate gap hypothesis → evidence validation → capability mapping → solution architecture → clickable MHCS prototype → decision-maker presentation → formal Government audience → controlled POC / deployment**

---

## 2. Core Strategic Principle

We do not begin with:
- What should MHCS 2.0 contain?
- What should MHCS 3.0 contain?
- What new feature should Adlan build?
- What technology can Madeena develop next?
- How can we sell more DDR units?
- How can MHCS replace existing Indonesian healthcare systems?

We begin with:

> **What national healthcare problem is Indonesia trying to solve now?**

Then:
> **What capability already exists?**

Then:
> **What important gap remains unresolved?**

Then:
> **What can Madeena, UGM and selected technology partners assemble quickly to solve that gap?**

Only then do we decide what needs to be built.

---

## 3. Research Is for Decision, Not for Completeness

Research should not become a long academic exercise.

A research workstream is complete enough when it helps us make one of the following decisions:

**USE / INTEGRATE / PARTNER / LOCALIZE / BUILD / DEFER / REJECT**

Every important research question should help answer:

> **Does this evidence change what MHCS should solve, how MHCS should solve it, who should pay for it, or how it should be deployed?**

---

## 4. Ministerial Access — Strategic Rule

Prof. Bayu has direct personal relationships with senior national decision-makers.

This access should be treated as a **high-value strategic asset**, not as an ordinary market-research channel.

We should therefore **not use the Ministers as our first source of problem discovery**.

We should first do our own homework through:
- official Government documents;
- Ministry of Health sources;
- Bappenas sources;
- WHO and national programme information;
- market intelligence;
- competitor analysis;
- field interviews;
- healthcare facility workflow discovery;
- regulatory research.

Before Prof. formally requests an audience, the team should already be able to state:

> **We believe Indonesia is facing problem X.**  
> **The evidence indicates that existing systems solve A, B and C, but gap Y remains.**  
> **We have designed an initial solution for gap Y.**  
> **We already have a prototype or demonstrator that can be shown.**

The purpose of the Ministerial meeting is therefore not:

> “Please tell us what we should build.”

The purpose is:

> **“We have studied a problem that is relevant to your current responsibilities. We have developed an initial solution and would like to formally present it for your consideration.”**

---

## 5. Two Decision-Maker Lenses

### 5.1 Ministry of Health Lens

Potential focus areas:
- TB active case finding;
- early detection;
- screening coverage;
- specialist shortages;
- uneven distribution of radiologists and radiographers;
- imaging utilisation;
- diagnosis and referral delays;
- treatment linkage;
- follow-up;
- primary-care capacity;
- interoperability;
- clinical workflow;
- public-health outcomes.

Core question:

> **How can MHCS help solve a measurable healthcare delivery problem?**

### 5.2 Bappenas Lens

Potential focus areas:
- utilisation of existing national healthcare investment;
- capital efficiency;
- unequal regional capacity;
- workforce productivity;
- duplication of digital infrastructure;
- scalability;
- national replicability;
- measurable social outcomes;
- sustainable financing;
- Government investment efficiency.

Core question:

> **How can MHCS improve the productivity and scalability of Indonesia’s existing healthcare assets, systems and human resources?**

---

## 6. Primary Research Questions

1. What are the current healthcare priorities of Kemenkes and Bappenas?
2. What problems are currently recognised as urgent at national level?
3. Which priorities are already funded or actively implemented?
4. What healthcare infrastructure already exists?
5. What imaging equipment is already deployed?
6. Is the real constraint equipment, specialist manpower, workflow, utilisation, integration, referral, follow-up, or another factor?
7. How mature are PACS, teleradiology, AI-assisted radiology and TB AI in Indonesia?
8. What are TCI, Telenasindo, HealthHub and other relevant providers already solving?
9. What remains unresolved even after those solutions exist?
10. Where does the screening-to-treatment pathway still break?
11. What existing Government digital systems must MHCS integrate with?
12. Who experiences the problem?
13. Who controls the budget?
14. Who decides adoption?
15. Who pays?
16. What capability already exists inside Madeena, UGM and our partner ecosystem?
17. What is the minimum new development required?
18. Can the solution be demonstrated quickly?
19. Can it scale without heavy capital expenditure?
20. Can success be measured through clear POC KPIs?

---

## 7. Research Workstreams

### Workstream A — National Healthcare Priorities
**Goal:** Identify Indonesia’s current healthcare transformation checkpoint.

Research:
- RPJMN 2025–2029;
- Ministry of Health strategic priorities;
- TB elimination;
- active case finding;
- CKG / screening programmes;
- primary-care strengthening;
- specialist workforce distribution;
- digital-health transformation;
- referral improvement;
- equipment utilisation;
- national AI / imaging initiatives.

**Output:** `01-national-healthcare-priorities.md`

### Workstream B — Healthcare Facility, Imaging & Workforce Capacity
**Goal:** Understand what Indonesia already owns and where real capacity constraints exist.

Research:
- hospitals;
- Puskesmas;
- X-ray availability;
- CT / MRI / mammography where relevant;
- mobile X-ray;
- PACS;
- radiologists;
- radiographers;
- geographic distribution;
- utilisation;
- turnaround time;
- specialist concentration.

Key question:

> **If the equipment already exists, what prevents it from producing timely clinical value?**

**Output:** `02-healthcare-imaging-workforce-capacity.md`

### Workstream C — TB Screening & Care Cascade
**Goal:** Determine the real unresolved gap in the TB pathway.

Map:

**Population / risk group → screening → suspicious result → clinician review → diagnostic confirmation → referral → treatment initiation → treatment monitoring → follow-up / completion**

Do not assume:

> “TB AI is the gap.”

Test whether the actual gap is:
- screening coverage;
- image interpretation;
- prioritisation;
- clinical confirmation;
- referral;
- diagnostic confirmation;
- treatment linkage;
- follow-up;
- interoperability;
- workforce;
- reporting.

**Output:** `03-tb-care-cascade.md`

### Workstream D — Indonesia Digital-Health Landscape
**Goal:** Identify what MHCS should integrate with, not replace.

Research:
- SATUSEHAT Platform;
- SATUSEHAT Mobile;
- RME;
- SIMRS / HIS / EMR;
- SITB;
- ASIK;
- BPJS / JKN where relevant;
- FHIR;
- ImagingStudy;
- DiagnosticReport;
- DICOM Router;
- NIDR;
- referral systems.

**Output:** `04-indonesia-digital-health-landscape.md`

### Workstream E — Competitor & Existing Capability Map
Primary initial benchmarks:
- TCI
- Telenasindo
- HealthHub

Research:
- PACS;
- RIS;
- teleradiology;
- DICOM;
- AI;
- TB AI;
- radiologist network;
- hospital integration;
- SATUSEHAT evidence;
- referral / follow-up;
- multi-facility coordination;
- customer base;
- service scale;
- pricing;
- commercial model;
- partnerships;
- local entity;
- regulatory positioning.

Classify each capability as:
- Existing market capability
- Benchmark
- Potential partner
- Direct competitor
- Candidate remaining gap

**Output:** `05-competitive-capability-map.md`

---

## 8. Field Discovery — Operational Evidence

Field discovery is important, but one facility must not be treated as proof of a national problem.

**Permata Bunda can provide operational evidence.**

It can help us understand:
- current software;
- existing workflow;
- radiology process;
- patient flow;
- bottlenecks;
- manual work;
- interoperability;
- existing capabilities;
- unmet operational needs.

However:

> **A problem discovered at Permata Bunda must not automatically be described as an Indonesia-wide problem.**

National relevance must be cross-validated against:
- official evidence;
- multiple facilities;
- market research;
- Government priorities.

Do not begin with:

> “Would you like to use MHCS?”

Begin with:
- What do you currently use?
- What works well?
- Where does the workflow repeatedly fail?
- What causes delay?
- What requires manual transfer?
- What happens when a radiologist is unavailable?
- What happens after an abnormal screening result?
- How is referral tracked?
- What solution have you already tried?
- What problem would you pay to remove?

**Output:** `06-field-discovery.md`

---

## 9. Payer, Procurement & Commercial Logic

For every candidate solution, identify:
- problem owner;
- beneficiary;
- operator;
- decision-maker;
- budget owner;
- payer.

Potential payers:
- Ministry of Health;
- Provincial / District Health Office;
- hospitals;
- Puskesmas;
- BPJS/JKN;
- employer;
- university;
- donor;
- CSR;
- patient;
- other programme funders.

Test commercial models including:
- subscription;
- per-study;
- managed service;
- reimbursement;
- procurement;
- licence;
- revenue share;
- bundled service.

Every solution hypothesis must answer:

> **Who pays and why?**  
> **What recurring revenue can exist?**  
> **What capital is required before revenue?**  
> **Can the model replicate?**

**Output:** `07-payer-commercial-model.md`

---

## 10. Regulatory & Compliance

Compliance is part of solution architecture, not an afterthought.

Research:
- KBLI / business licence;
- PSE;
- RME;
- SATUSEHAT;
- PDP;
- health data;
- data controller / processor;
- hosting;
- cross-border processing;
- cybersecurity;
- audit;
- AI / software medical-device considerations;
- clinical responsibility;
- radiology equipment;
- facility requirements;
- professional licensing;
- TB reporting;
- BPJS/payment requirements.

Classify each item:
- Confirmed applicable
- Potentially applicable
- Needs confirmation
- Not applicable

**Output:** `08-regulatory-compliance.md`

---

## 11. Madeena / UGM / Partner Capability Map

Map the required capability against:
- current MHCS;
- Madeena;
- DDR;
- UGM;
- Beijing partners;
- Shanghai partners;
- Hainan infrastructure;
- Indonesian existing providers;
- other selected international partners.

Use:

| Required capability | Existing source | Proven? | Integration required? | Localization required? | New development required? |
|---|---|---|---|---|---|

Every item receives one decision:

**USE / INTEGRATE / PARTNER / LOCALIZE / BUILD / DEFER**

Engineering rule:

> **Do not build before checking whether a mature capability already exists.**

**Output:** `09-capability-integration-map.md`

---

## 12. Candidate Gap vs Validated Gap

During early research, use the term:

### Candidate Gap / Gap Hypothesis

Do not call something a confirmed “white space” simply because MHCS does not currently have the capability.

A Candidate Gap becomes a:

### Validated Gap

only after sufficient evidence from:
1. authoritative sources;
2. competitor / market check;
3. field validation;
4. national-policy relevance.

---

## 13. Fast Track — Decision Sprint

The full research framework can continue, but the immediate task is not to complete every workstream.

The immediate objective is to identify the:

# Top 3 National Healthcare Gap Hypotheses

For each hypothesis, produce:
1. National problem
2. Evidence
3. Government relevance
4. Affected users/facilities
5. Existing solutions
6. Candidate remaining gap
7. Decision-maker
8. Payer
9. Existing Madeena/partner capability
10. New development required
11. Demo feasibility
12. Potential KPI
13. Regulatory dependency
14. Scalability potential

The purpose is to select **one leading Minister-grade problem statement**.

---

## 14. Parallel Solution Development

Research and product design should run in parallel.

We should not wait until all research is completed before visualising the solution.

Once a strong candidate problem begins to emerge, the team should begin creating:

### A. Solution Architecture

**National problem → existing system → missing capability → MHCS orchestration → clinical workflow → Government system integration**

### B. Clickable MHCS Prototype

The prototype does not need to be a complete production system.

It should allow a decision-maker to understand the future solution by clicking through a realistic workflow.

Possible modules:
- Government / programme dashboard;
- facility dashboard;
- screening workflow;
- patient/member journey;
- DICOM / imaging flow;
- AI-assisted result;
- clinician confirmation;
- referral;
- follow-up;
- national-system integration;
- KPI dashboard.

Objective:

> **See it. Click it. Understand it.**

### C. Technical Demonstrator

In parallel, integrate real available capabilities from:
- Madeena;
- Beijing;
- Shanghai;
- Hainan;
- selected Indonesian / international partners.

---

## 15. Government Audience Readiness Gate

Prof. should request a formal audience only when we can present a credible package.

Minimum package:

### Deliverable 1 — Decision-Maker Presentation
Approx. 8–12 pages.

**National problem → evidence → Government priority → existing capability → remaining gap → MHCS solution → how it works → expected impact → proposed POC**

### Deliverable 2 — Clickable Product Prototype
A professional interactive HTML / web-based demonstration.

### Deliverable 3 — Preliminary POC Proposal
Define:
- target geography;
- target facilities;
- target population;
- use case;
- workflow;
- required integrations;
- KPI;
- duration;
- governance;
- regulatory dependencies;
- success criteria;
- scale-up pathway.

### Deliverable 4 — Regulatory Readiness Map
Demonstrate understanding of:
- compliance;
- patient data;
- clinical accountability;
- interoperability;
- deployment requirements.

---

## 16. How Prof. Can Position the Discussion

The future Government conversation should not be:

> “We have MHCS. Would you like to use it?”

It should be closer to:

> **“For many years, our team and students have worked on Indonesian radiography and healthcare innovation. We have recently studied the current development of Indonesia’s healthcare system and identified a specific problem that appears highly relevant to today’s national priorities. We have already developed an initial solution and interactive prototype around this problem. I would like to request an opportunity to formally present the solution and discuss whether it may contribute to the Government’s current programme.”**

This is:

**evidence → credibility → solution → formal presentation**

not:

**relationship → idea → request for help**

---

## 17. Strategic Positioning

# Made in Indonesia, for the People of Indonesia.

This does not mean that every component must be invented from zero in Indonesia.

It means:
- Indonesian problem definition;
- Indonesian leadership;
- Indonesian clinical knowledge;
- Indonesian regulatory compliance;
- Indonesian workflow;
- Indonesian implementation;
- Indonesian accountability;
- Indonesian localization.

Supported by:

> **selected mature international technologies where they provide proven value.**

---

## 18. Development Principle

> **Integrate before build.**

> **Localize before reinvent.**

> **Build only what is genuinely missing.**

> **Use technology to solve a validated problem — never search for a problem to justify technology.**

---

## 19. Definition of Success

This phase is successful when we can say:

> **Indonesia is currently trying to solve problem X.**  
> **Evidence shows existing solutions already address A, B and C.**  
> **However, candidate gap Y remains materially unresolved.**  
> **Madeena / UGM / partner capabilities can solve most of Y through integration and localization.**  
> **Only Q requires new development.**  
> **We have translated this into a working solution architecture.**  
> **We have a clickable prototype that a Minister can understand.**  
> **We have a credible POC proposal.**  
> **Prof. can therefore request a formal audience with something concrete to present.**

---

## 20. Final Strategic Rule

> **Do not search for a market for MHCS.**

> **Understand Indonesia’s national healthcare problem first.**

> **Use evidence to identify the remaining gap.**

> **Use the best existing capabilities to assemble the solution.**

> **Then show the decision-maker something real.**
