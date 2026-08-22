# H2 Falsification Research

**Status:** Working Falsification Draft  
**Version:** v0.1  
**Date:** 2026-08-22  
**Research mode:** Hypothesis testing / falsification  
**Evidence cutoff:** 2026-08-22  

> **Primary question:** Does H2 remain an unresolved national operational gap after accounting for existing Government programmes, national digital infrastructure, workforce responses, financing mechanisms, and mature market capabilities?

---

## 1. Purpose

This document is designed to **try to prove H2 wrong**. It is not a supporting brief for H2 and it is not a product-justification document.

> **Research discipline:** Do not ask what evidence supports H2. Ask what evidence would weaken, narrow, or falsify H2.

Capability mapping runs in parallel. A capability that already exists in Government, the Indonesian market, Madeena/UGM, or an external partner must not automatically be treated as a new-build opportunity.

---

## 2. H2 Under Test

| Item | Working statement |
|---|---|
| **Original H2** | **Last-mile utilisation of expanding primary-care X-ray capacity under workforce, workflow, and digital-operational constraints.** |
| **Core falsification question** | Is there actually a persistent last-mile operational failure that prevents expanding primary-care X-ray capacity from producing timely and completed clinical value at sufficient scale? |
| **Reject H2 if** | Existing Government/market operating models already close the relevant workflow at sufficient scale, or the remaining problem is too small/non-material to justify a national problem statement. |
| **Narrow H2 if** | Only specific components remain unresolved while others are already adequately solved. |
| **Do not infer** | Technology existence alone does not prove the problem is solved; technology absence alone does not prove a national gap exists. |

---

## 3. Falsification Tests

| # | Test |
|---:|---|
| 1 | Is X-ray equipment consistently utilised at target facilities? |
| 2 | Is radiographer coverage operationally adequate where equipment is deployed? |
| 3 | Is radiologist access consistently available through onsite or remote models? |
| 4 | Is interpretation turnaround clinically acceptable? |
| 5 | Are PACS / DICOM transport and imaging exchange operationally reliable? |
| 6 | Is AI-assisted prioritisation already available where needed? |
| 7 | Is reporting into national systems operationally complete? |
| 8 | Are referral and confirmatory testing reliably completed? |
| 9 | Are treatment initiation and follow-up reliably closed-loop? |
| 10 | Do payment / reimbursement mechanisms sustainably support the workflow? |
| 11 | Are maintenance and radiation-safety requirements operationally covered? |
| 12 | Do existing Government and market providers already provide a sufficiently complete operating model? |

> **Relevant test:** Does the capability exist, operate in the target setting, reach sufficient scale, and close the relevant workflow?

---

## 4. Evidence Classification

| Classification | Meaning |
|---|---|
| **VERIFIED FACT** | Directly supported by an official or primary source. |
| **GOVERNMENT PLAN / TARGET** | Announced or formally planned, but not proof of completed deployment. |
| **PROJECTION** | Forecast or modelled need / supply, not direct current measurement. |
| **LOCAL OPERATING EVIDENCE** | Documented implementation at a specific locality or facility; not national proof. |
| **VENDOR CLAIM** | Provider-reported capability, deployment, scale, performance, or outcome. |
| **INFERENCE** | Reasoned interpretation from verified evidence. |
| **UNKNOWN** | Public evidence is insufficient to conclude. |
| **FALSIFIED ASSUMPTION** | An earlier white-space assumption contradicted by verified capability evidence. |

---

## 5. National Context Relevant to H2

| Context | Evidence | Classification | Falsification implication |
|---|---|---|---|
| **Primary-care X-ray expansion** | Kemenkes announced a plan in August 2026 for phased distribution of approximately **10,000 X-ray units** to Puskesmas. | **GOVERNMENT PLAN / TARGET** | Expansion is real, but deployment, utilisation, workforce readiness, connectivity, maintenance, interpretation and downstream action are not proven by the announcement. |
| **Radiographer capacity** | DREAMS 2026: **36,821 need; 20,553 existing; 16,268 gap; 55.82% fulfilment**. Separate ASN workload view: 14,685 need vs 5,248 existing. | **VERIFIED FACT** | National shortage exists, but facility-level causality at X-ray-equipped Puskesmas remains unproven. |
| **Radiologist capacity** | 2026 projection: **4,336 demand; 2,445 projected supply; 1,891 gap**. | **PROJECTION** | Shortage exists in projection, but shortage does not prove lack of access because onsite network and teleradiology models already exist. |
| **National imaging infrastructure** | SATUSEHAT provides DICOM Router, ImagingStudy, Observation, DiagnosticReport and NIDR-related workflows. | **VERIFIED CAPABILITY** | “Indonesia lacks national DICOM architecture” is not defensible. Adoption and execution remain separate questions. |
| **AI-assisted TB imaging** | Government and commercial providers already deploy or offer AI-assisted chest X-ray/TB workflows. | **VERIFIED / MARKET CAPABILITY** | AI itself is not the white space. |
| **Digital last-mile constraints** | Kemenkes reporting identifies HR, laptop and internet limitations affecting completion of digital reporting in programmes such as CKG. | **VERIFIED OPERATIONAL EVIDENCE** | National architecture can exist while last-mile execution remains incomplete. |

---

## 6. Constraint-by-Constraint Falsification Register

| Constraint | Candidate claim | Evidence supporting problem | Evidence weakening / existing solution | What remains unknown | Current verdict | Effect on H2 |
|---|---|---|---|---|---|---|
| **X-ray utilisation** | Primary-care X-ray equipment is materially underutilised. | No authoritative national utilisation dataset identified. | 2026 local Government examples in Demak and Kebumen show portable X-ray actively used in TB ACF, with workforce mobilisation and TCM referral. | National utilisation rate; installed vs mobile utilisation; exams/device; downtime; geographic variation; active vs non-functional devices. | **NOT VERIFIED AS A NATIONAL BOTTLENECK** | **Weakens broad utilisation claim. H2 not falsified.** |
| **Radiographer availability** | Lack of radiographers prevents X-ray capacity from being used. | DREAMS shows a large national radiographer supply-demand gap. | Local models pool radiographers from RSUD, PARI and district networks; BAPETEN/Kemenkes readiness planning explicitly includes radiographer provision. | Availability specifically at X-ray-equipped Puskesmas; scalability of shared/mobile staffing; idle time caused by staffing; regional variation. | **NATIONAL CONSTRAINT VERIFIED; FACILITY-LEVEL CAUSALITY UNKNOWN** | **Survives narrowly.** |
| **Radiologist access** | Lack of radiologist access is a major last-mile failure. | Official workforce projection shows a substantial radiologist gap. | RSUD radiologists are used in local ACF models; commercial teleradiology exists through TCI/Telenasindo and other providers. | National coverage; TAT; after-hours access; capacity; cost; procurement and contracting barriers. | **SHORTAGE VERIFIED; ACCESS FAILURE NOT VERIFIED** | **Weakens “new teleradiology is needed.”** |
| **Connectivity / digital execution** | Connectivity prevents workflow execution. | Kemenkes documents HR, laptop and internet constraints affecting SATUSEHAT-related reporting. | Government is actively expanding integration, guidance and deployment options. | X-ray-specific disruption frequency; outage duration; effectiveness of store-and-forward; target-facility production readiness. | **PROBLEM VERIFIED, GOVERNMENT MITIGATION ACTIVE** | **Survives as contributing constraint, not standalone white space.** |
| **PACS** | Indonesia lacks PACS capacity. | — | Commercial cloud PACS and hospital PACS capability already exist. | Coverage and adoption at target primary-care sites. | **FALSIFIED AS GENERAL WHITE-SPACE CLAIM** | **Remove “build PACS” from presumed scope.** |
| **DICOM / imaging exchange** | Indonesia lacks DICOM infrastructure for primary care. | — | SATUSEHAT provides DICOM Router, production endpoints, ImagingStudy and NIDR-oriented workflows; commercial DICOM capability also exists. | Actual Puskesmas production adoption; failure/retry rates; percentage of studies successfully linked. | **ARCHITECTURE GAP FALSIFIED** | **Only adoption/execution remains testable.** |
| **AI-assisted image analysis** | AI-assisted TB image analysis is a missing capability. | — | Kemenkes collaborations and market providers already offer AI-assisted CXR/TB workflows. | Local regulatory fit; validation; procurement; coverage; workflow integration; governance. | **FALSIFIED AS GENERAL WHITE-SPACE CLAIM** | **AI is a reusable component, not the national gap itself.** |
| **Image interpretation / TAT** | Images cannot be converted into timely clinical interpretations. | Workforce constraint makes the claim plausible. | Teleradiology platforms and local onsite/RSUD reading models already exist. | National median TAT; unread/backlog rate; primary-care coverage; geographic/after-hours performance. | **UNKNOWN** | **CRITICAL FALSIFICATION TARGET.** |
| **Reporting to SATUSEHAT / programme systems** | Reporting infrastructure is missing. | Digital execution gaps are documented in other programmes. | SATUSEHAT imaging architecture already supports imaging metadata and radiology-result workflows. | Production adoption at Puskesmas; automated vs manual steps; TB-specific imaging linkage; error rates. | **ARCHITECTURE SOLVED; EXECUTION UNKNOWN** | **Do not treat reporting architecture as BUILD.** |
| **Referral / confirmatory testing** | Abnormal findings do not reliably reach TCM/confirmation. | Kemenkes 2024 report: about **1.69M suspected TB patients were not examined by TCM**; one cited cause was lack of a mechanism ensuring referred patients reached the lab. | Government has expanded molecular testing, specimen transport, ACF, digital integration and related interventions. | Whether the problem persists materially in 2026; current referral/TCM completion rate; district variation. | **STRONG HISTORICAL NATIONAL EVIDENCE; 2026 STATUS UNVERIFIED** | **Strong surviving constraint; shifts H2 downstream toward completed diagnostic action.** |
| **Treatment initiation / follow-up** | Detection does not consistently translate into treatment. | Kemenkes 2024 report documented about **94,000 drug-sensitive TB patients who did not start therapy**, with staffing/monitoring issues among contributing factors. | Government programmes include incentives, follow-up and system integration efforts. | Current 2026 treatment-initiation gap; effect attributable specifically to imaging-triggered pathways. | **STRONG PROBLEM EVIDENCE, NOT IMAGING-SPECIFIC** | **Narrows H2 toward care completion rather than radiology technology.** |
| **Procurement / payment** | Financing prevents indicated X-ray from being completed. | Kemenkes 2024 report documented about **1.9M TCM-negative suspected TB patients at FKTP who did not receive X-ray**; X-ray outside FKTP capitation was cited as one cause. | Quick Win funding, non-capitation discussions and earlier TB financing pilots exist. | **Current August 2026 reimbursement status**, tariff, eligibility, claim workflow, delays/rejections. | **HISTORICALLY STRONG BOTTLENECK; CURRENT STATUS UNKNOWN** | **HIGH-PRIORITY FALSIFICATION TARGET.** |
| **Maintenance / lifecycle** | Maintenance/downtime is a dominant last-mile bottleneck. | Government procurement/readiness processes recognise sustainable operation and maintenance requirements. | Maintenance/support requirements can be built into procurement and service models. | National downtime; repair time; PM compliance; non-functional device rate; spare-parts/service coverage. | **UNKNOWN** | **Do not claim as national bottleneck yet.** |
| **Radiation-safety / regulatory readiness** | Equipment deployment is primarily a technology deployment problem. | BAPETEN/Kemenkes 2026 readiness work explicitly covers licensing, radiation safety, infrastructure, radiologist, radiographer and PPR. | Government has an active regulatory-operational readiness process. | Readiness variance by facility; actual delays attributable to licensing/PPR/infrastructure. | **ECOSYSTEM READINESS VERIFIED AS IMPLEMENTATION REQUIREMENT** | **H2 cannot be reduced to software.** |

---

## 7. Assumptions Already Falsified or Materially Weakened

| Earlier assumption | Result | Practical implication |
|---|---|---|
| Indonesia lacks AI for TB chest X-ray. | **FALSIFIED as a general claim** | Do not start by building another AI model. |
| Indonesia lacks PACS. | **FALSIFIED** | Treat PACS primarily as USE / INTEGRATE / PARTNER territory. |
| Indonesia lacks teleradiology. | **FALSIFIED as capability-existence claim** | Test scale, TAT, coverage and commercial feasibility instead. |
| Indonesia lacks national DICOM infrastructure. | **FALSIFIED** | Integrate with existing national architecture where appropriate. |
| Radiologist shortage automatically means a new remote-reading system is needed. | **NOT SUPPORTED** | Distinguish workforce shortage from access failure. |
| The ~10,000-unit plan means ~10,000 units are already deployed. | **FALSE INTERPRETATION** | Treat it as a Government plan until deployment data are verified. |
| Existing Government architecture means implementation is complete. | **NOT SUPPORTED** | Architecture existence and operational adoption must be tested separately. |
| Financing mechanisms do not exist. | **FALSIFIED** | Test current sufficiency and national implementation instead. |

---

## 8. What Still Survives After Falsification

| Surviving candidate constraint | Current evidence strength | Why it still matters | Next falsification test |
|---|---|---|---|
| **Referral / confirmatory testing completion** | **Strong historical national evidence** | Imaging has little clinical value if suspicious findings do not reach TCM/confirmation. | Verify 2026 completion rates and whether current Government integration has materially closed the gap. |
| **Treatment initiation / follow-up** | **Strong historical evidence** | Diagnostic value is not realised if patients fail to enter treatment. | Test whether this remains material in the imaging-triggered pathway in 2026. |
| **Financing / reimbursement sustainability** | **Strong historical evidence; current status unknown** | A technically complete pathway can still fail if the examination/reading is not sustainably funded. | Verify current BPJS/Kemenkes mechanism, tariffs, eligibility and claims. |
| **Operational readiness** | **Verified implementation requirement** | X-ray deployment depends on workforce, radiation safety, facility readiness and operating governance. | Determine which readiness component actually delays/limits service delivery at target sites. |
| **Actual facility utilisation** | **Weak/unknown nationally** | Underutilisation would directly affect capital efficiency. | Obtain device-level utilisation and downtime data. |
| **Interpretation coverage / TAT** | **Unknown nationally** | Existing teleradiology may already solve this layer—or may not at scale. | Obtain TAT, coverage, backlog and after-hours data. |
| **Production adoption of national imaging integration** | **Architecture proven; adoption unknown** | Existing DICOM architecture is valuable only if deployed operationally. | Verify DICOM Router/SATUSEHAT usage in target facilities. |

---

## 9. H2 Reframing After Falsification

| Stage | Wording |
|---|---|
| **Original H2** | **Last-mile utilisation of expanding primary-care X-ray capacity under workforce, workflow, and digital-operational constraints.** |
| **Narrowed working H2** | **Whether persistent operational barriers prevent expanding primary-care imaging capacity from being converted into timely and completed clinical action, despite existing imaging, AI, interoperability, and remote-reading capabilities.** |
| **Interpretation** | The research is moving away from “missing radiology technology” and toward whether an unresolved operational completion gap remains after existing capabilities are subtracted. |
| **Status** | **Working hypothesis, not conclusion.** |

---

## 10. Evidence That Could Still Kill H2

| Falsification condition | Consequence |
|---|---|
| Deployed X-ray equipment is consistently utilised. | Remove utilisation as a national constraint. |
| Portable/shared X-ray models already provide sufficient access. | Reduce need for new operating-layer intervention. |
| Radiographer pooling reliably covers deployed sites. | Downgrade radiographer availability as dominant bottleneck. |
| Radiologist/teleradiology coverage is sufficient and TAT acceptable. | Remove interpretation access from the remaining gap. |
| SATUSEHAT imaging adoption is operationally mature at target sites. | Remove imaging-exchange/reporting integration as primary gap. |
| Suspicious findings reliably reach TCM/confirmatory testing. | Downgrade referral-completion hypothesis. |
| Treatment initiation is consistently high in the relevant pathway. | Downgrade downstream care-completion hypothesis. |
| 2026 financing/reimbursement has resolved X-ray access/payment. | Remove payment as a current bottleneck. |
| Maintenance/downtime is operationally insignificant. | Remove maintenance from H2. |
| Government already operates a complete end-to-end model. | H2 may no longer qualify as an unresolved national gap. |
| Commercial providers already provide the complete workflow at acceptable cost and scale. | Shift from BUILD to USE / PARTNER / INTEGRATE, or reject H2 as a product opportunity. |

---

## 11. Critical Unknowns and Validation Backlog

| Priority | Unknown | Evidence needed | Best next method |
|---|---|---|---|
| **P1** | Actual X-ray utilisation | Deployed/active device counts, exams/device, idle time, downtime, geographic variation. | Government operational data + field validation. |
| **P1** | Interpretation coverage and turnaround | % interpreted, median TAT, after-hours coverage, remote vs onsite, backlog/unread rate. | Provider/facility data + interviews. |
| **P1** | Current 2026 payment model | Reimbursement route, non-capitation status, tariff, eligible providers, claims, rejection/delay. | Current Kemenkes/BPJS policy verification + payer interview. |
| **P2** | SATUSEHAT imaging production adoption | Active DICOM Router sites, Puskesmas adoption, error/failure rate, study linkage rate. | SATUSEHAT/Kemenkes operational data + facility verification. |
| **P2** | Maintenance | Downtime, service-contract coverage, repair TAT, PM compliance, spare-parts availability. | Procurement/service records + field interviews. |
| **P2** | Referral / TCM completion in 2026 | Referral completion, TCM completion after suspicious CXR, loss-to-follow-up, district variation. | Current programme data + field validation. |

---

## 12. Targeted Field Validation Matrix

| Domain | Questions to test |
|---|---|
| **Equipment & utilisation** | How many X-ray devices are available? How many are operational? Exams/day or week? What limits utilisation? Typical downtime? |
| **Radiographer** | Is a radiographer always available? If not, what shared/mobile staffing model is used? Does staffing cause idle equipment? |
| **Interpretation** | Who reads the image? Onsite or remote? Normal TAT? After-hours process? Any unread backlog? |
| **AI** | Is AI used? What exact role does it play? Does it change workflow or only generate a score? Who remains clinically responsible? |
| **DICOM / PACS / SATUSEHAT** | Does the modality produce DICOM? Is PACS used? Is DICOM Router/SATUSEHAT production integration active? Which steps remain manual? |
| **Referral / TCM** | What happens after a suspicious result? Who creates referral? Who verifies that TCM is completed? Where are patients lost? |
| **Treatment / follow-up** | Who tracks treatment initiation and follow-up? Is monitoring cross-facility or facility-bounded? |
| **Payment** | Who pays for X-ray and remote reading? How are claims submitted? Are claims delayed/rejected? |
| **Maintenance / regulation** | Who maintains equipment? What is typical repair time? Which licensing/PPR/infrastructure requirements cause delay? |
| **Existing solution test** | Which existing Government/provider solution already works well? What specific operational problem remains even if no new software is introduced? |

---

## 13. Current Verdict

| Item | Current position |
|---|---|
| **H2 status** | **NOT FALSIFIED — BUT SIGNIFICANTLY NARROWED** |
| **Rejected framing** | “Indonesia needs a new AI/PACS/teleradiology/DICOM system because primary care lacks radiology technology.” |
| **Surviving research question** | **Does a persistent operational gap remain between expanding imaging capacity and completed clinical action—particularly across financing, regulated operational readiness, interpretation coverage, referral/confirmatory testing, and follow-up—after accounting for existing Government and market capabilities?** |
| **Most important next evidence** | Actual facility utilisation; interpretation coverage/TAT; current 2026 payment mechanism. |
| **Promotion gate** | H2 should not become a Minister-Grade Problem Statement until it survives national evidence review, competitor/market check, field validation, capability mapping, payer validation and regulatory feasibility. |

---

## 14. Implication for the Parallel Prototype Track

The hypothesis-driven prototype may visualise:

> **screening → image acquisition → DICOM → AI prioritisation → radiologist / clinician review → structured result → TCM / confirmatory testing → referral → treatment / follow-up → SATUSEHAT / programme reporting**

The prototype must **not** imply that every component must be newly built.

Each component should be evaluated in the parallel capability map and receive one decision:

| Decision | Meaning |
|---|---|
| **USE** | Existing capability can be used substantially as-is. |
| **INTEGRATE** | Existing capability should be connected into the workflow. |
| **PARTNER** | Capability is best supplied by an external or market partner. |
| **LOCALIZE** | Capability exists but requires Indonesian workflow/language/regulatory adaptation. |
| **BUILD** | A validated capability gap remains and requires new development. |
| **DEFER** | Not required for the current hypothesis/prototype or evidence is insufficient. |

The prototype is a **visualisation and falsification tool**, not proof of technical implementation.

---

## 15. Next Research Actions

| Priority | Action | Decision value |
|---|---|---|
| **1** | Verify facility-level X-ray utilisation and downtime. | Determines whether utilisation is a real national/target-site bottleneck. |
| **2** | Verify interpretation coverage and turnaround time. | Determines whether existing radiologist networks/teleradiology already solve the reading layer. |
| **3** | Verify the current 2026 payment/reimbursement mechanism. | Determines whether the historical financing bottleneck is still active. |
| **4** | Verify SATUSEHAT imaging production adoption at representative target sites. | Separates existing architecture from real operational use. |
| **5** | Conduct falsification-oriented field interviews. | Tests where the actual last-mile failure occurs rather than asking users to invent product features. |

---

## 16. Source Register

### Official / Government

| ID | Source | Used for |
|---|---|---|
| **GOV-01** | Kementerian Kesehatan DREAMS — Radiographer Supply & Demand, 2026 — https://dreams.kemkes.go.id/user/demand?nakes=44 | National radiographer need, existing supply, gap and fulfilment. |
| **GOV-02** | Kementerian Kesehatan DREAMS — Radiographer Workload / ASN — https://dreams.kemkes.go.id/user/abk?nakes=2101000 | Separate workload-based ASN requirement; not combined with GOV-01. |
| **GOV-03** | Kementerian Kesehatan — 2026 Regional Health Workforce Projection — https://repositori-ditjen-nakes.kemkes.go.id/802/1/2026_IND_Dokumen%20Proyeksi%20Kebutuhan%20Named%20Nakes%20Berbasis%20Wilayah.pdf | 2026 radiologist projected demand, supply and gap. |
| **GOV-04** | Kementerian Kesehatan — Laporan Kinerja 2024 — https://ppid.kemkes.go.id/wp-content/uploads/2025/03/Lakip-2024_compressed_compressed.pdf | TCM completion, X-ray financing/access, treatment-initiation gaps and stated causes. |
| **GOV-05** | BKPK — Inovasi Pembiayaan Tuberkulosis dan Tantangannya, 8 Nov 2024 — https://www.badankebijakan.kemkes.go.id/inovasi-pembiayaan-tuberkulosis-dan-tantangannya/ | TB financing pilot and policy recommendations. |
| **GOV-06** | Kementerian Kesehatan — Inovasi Pembiayaan untuk Tuntaskan Penanganan Tuberkulosis — https://www.kemkes.go.id/id/inovasi-pembiayaan-untuk-tuntaskan-penanganan-tuberkulosis | Non-capitation incentive design and treatment milestones. |
| **GOV-07** | BAPETEN — Mobile X-Ray Operational Readiness in Puskesmas, 11 Feb 2026 — https://bapeten.go.id/berita/bapeten-dan-kementerian-kesehatan-perkuat-kesiapan-operasional-mobile-xray-di-puskesmas-untuk-eliminasi-tbc-nasional-131054?lang=id | Licensing, radiation safety, infrastructure, radiologist, radiographer and PPR readiness. |
| **GOV-08** | SATUSEHAT — DICOM Router — https://satusehat.kemkes.go.id/platform/docs/id/dicom-system/dicom-router/ | DICOM Router and radiology workflow architecture. |
| **GOV-09** | SATUSEHAT — DICOM Router Setup — https://satusehat.kemkes.go.id/platform/docs/id/dicom-system/setup-dicom/ | Production/sandbox endpoint and deployment mechanism. |
| **GOV-10** | SATUSEHAT — DICOM System Architecture — https://satusehat.kemkes.go.id/platform/docs/id/dicom-system/architecture/ | Workflows with/without MWL and PACS. |
| **GOV-11** | SATUSEHAT — ImagingStudy — https://satusehat.kemkes.go.id/platform/docs/id/fhir/resources/imaging-study/ | DICOM Router / NIDR / ImagingStudy workflow. |
| **GOV-12** | Kementerian Kesehatan Pusdatin — Laporan Kinerja 2025 — https://setjen.kemkes.go.id/uploads/topics/17756325607990.pdf | HR, laptop and internet constraints affecting digital execution. |
| **GOV-13** | Kementerian Kesehatan — TB screening expansion / ~10,000 X-ray units, Aug 2026 — https://www.kemkes.go.id/id/kemenkes-perluas-skrining-tb-sasar-pesantren-dan-pemukiman-padat-di-seluruh-indonesia | Government X-ray expansion plan. |
| **GOV-14** | Ditjen P2 Kemenkes — TB/CKG screening expansion, 18 Aug 2026 — https://p2.kemkes.go.id/kemenkes-dan-kemenag-perkuat-kerja-sama-skrining-tb-terintegrasi-ckg-di-pondok-pesantren-dan-pemukiman-padat-penduduk/ | Corroboration of Government expansion direction. |

### Local operating evidence

| ID | Source | Used for |
|---|---|---|
| **LOCAL-01** | Dinkesda Demak — ACF with Portable X-Ray, Mranggen II, 8 Jul 2026 — https://dinkes.demakkab.go.id/2026/07/08/dinkesda-demak-intensifkan-tracing-tb-dengan-x-ray-portable-melalui-metode-acf/ | Local Puskesmas/RSUD/radiographer/radiologist operating model and TCM referral. |
| **LOCAL-02** | Kabupaten Demak — Portable X-Ray at Puskesmas Demak I, 16 Jul 2026 — https://demakkab.go.id/news/dinkesda-demak-gencarkan-penemuan-kasus-tbc-melalui-x-ray-portable-di-puskesmas-demak-i | Local screening and downstream referral evidence. |
| **LOCAL-03** | Dinkes PPKB Kebumen — ACF TB with Portable X-Ray, 9 Jun 2026 — https://kesehatanppkb.kebumenkab.go.id/index.php/web/post/1793/acf-active-case-finding-tb-paru-untuk-temukan-kasus-tbc | Additional local operating evidence. |

### Market / vendor capability evidence

These sources establish **capability existence**, not national coverage or independently verified performance.

| ID | Source | Used for |
|---|---|---|
| **MKT-01** | TCI — https://tcihealth.co.id/ | Vendor-reported teleradiology and AI TB capability. |
| **MKT-02** | TCI Services — https://tcihealth.co.id/id/service.html | PACS SaaS, teleradiology, AI and integration capability. |
| **MKT-03** | Telenasindo ThenaPACS — https://www.telenasindo.co.id/product/thenapacs-picture-archiving-and-comunication-system | Cloud PACS, DICOM and HIS/EMR integration capability. |
| **MKT-04** | Telenasindo ThetraRIS — https://telenasindo.co.id/product/thetraris-radiology-information-system | Teleradiology request-to-report/settlement workflow. |
| **MKT-05** | HealthHub Indonesia project report — https://healthhub.kr/modules/board/bd_view.html?al=asc&id=news_en&lang=en&mc_code=2310&no=21&or=bd_order&p=1 | Vendor-reported Indonesian mobile/cloud PACS, teleradiology and TB AI activity. |

---

## 17. Working Research Rule

> **A constraint is not a white space merely because it is difficult.**

> **A capability is not “solved” merely because a product exists.**

The relevant question is:

> **Is the problem still unresolved in the target Indonesian workflow at sufficient scale, after accounting for Government systems, existing market capability, operational models, financing, regulation and localisation?**

Only the layer that survives that test should remain a candidate for new development.
