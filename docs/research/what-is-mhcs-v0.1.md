# What Is MHCS?

**Status:** Working Strategic Definition  
**Version:** v0.1  
**Date:** 2026-08-23  
**Purpose:** Define MHCS conceptually and strategically, without anchoring the definition to the current software feature set.

---

## 1. Core Definition

> **MHCS is an Indonesia-led healthcare orchestration, integration, localisation, and delivery layer that brings existing healthcare systems, technologies, professionals, and partners together into an end-to-end healthcare service designed around a validated healthcare problem.**

In shorter form:

> **MHCS orchestrates existing healthcare capabilities into an end-to-end healthcare service.**

As a metaphor:

> **MHCS is the conductor of the healthcare orchestra.**

The individual instruments may already exist. The value of MHCS is to make them work together as one coordinated healthcare service.

---

## 2. The Healthcare Orchestra

Healthcare delivery already contains many independent capabilities:

- Government systems such as SATUSEHAT and programme-specific systems;
- hospitals, Puskesmas, laboratories, and other healthcare facilities;
- clinicians and other healthcare professionals;
- PACS and other imaging systems;
- AI and clinical-intelligence technologies;
- medical devices;
- referral mechanisms;
- private technology providers;
- local and international partners;
- payer and programme mechanisms.

Each capability can perform well independently.

However, the existence of all required components does not automatically mean that they operate together as one complete service.

MHCS exists to coordinate those capabilities around a defined healthcare objective.

| Orchestra metaphor | MHCS meaning |
|---|---|
| **Conductor** | MHCS |
| **Musicians / instruments** | Healthcare systems, technologies, professionals, facilities, and partners |
| **Score** | Validated end-to-end healthcare workflow |
| **Purpose of the performance** | The healthcare problem and desired outcome |
| **Performance** | Actual healthcare service delivery |
| **Result** | Completion of the intended healthcare pathway |

The conductor does not need to manufacture every instrument.

Likewise, MHCS does not need to build every capability that participates in the service.

---

## 3. The Four Core Functions of MHCS

### 3.1 Orchestration

Orchestration is the central role of MHCS.

It determines:

- which capabilities are required;
- which actor or system is responsible for each part of the workflow;
- the order in which activities occur;
- what information or event triggers the next action;
- how different actors and systems coordinate;
- what happens when part of the workflow is delayed or fails;
- and when the end-to-end service can be considered complete.

Orchestration is broader than technical integration.

Integration connects systems.

Orchestration coordinates the entire service.

---

### 3.2 Integration

Integration allows the different parts of the healthcare ecosystem to work together.

MHCS should connect with existing systems and capabilities rather than replacing them unnecessarily.

The default principle is:

> **Use what already works. Connect what must work together.**

Integration can include the exchange of clinical information, workflow events, identities, results, referrals, status information, and other data required by the end-to-end service.

Interoperability capability does not automatically mean that a production integration already exists.

Any required integration must still be validated and implemented appropriately.

---

### 3.3 Localisation

A healthcare capability that works elsewhere does not automatically become an Indonesian healthcare solution.

MHCS provides the Indonesia-facing localisation layer.

Localisation can include:

- Indonesian healthcare workflows;
- Government programmes and national systems;
- clinical practice and professional responsibilities;
- Bahasa Indonesia and local terminology;
- regulation and compliance;
- payer and financing mechanisms;
- facility operating conditions;
- infrastructure and connectivity realities;
- implementation model;
- governance and accountability.

This allows mature capabilities from Indonesia or abroad to become part of a solution that is appropriate for the Indonesian healthcare system.

---

### 3.4 Delivery

MHCS is not complete when an architecture exists, an API succeeds, or a technology produces an output.

The intended healthcare service must actually be delivered.

Delivery means that the combined capabilities operate as one end-to-end service with a defined beginning and a defined endpoint.

The endpoint depends on the healthcare problem.

For one use case, completion may mean that a screening result reaches the required national system and the appropriate follow-up occurs.

For another, it may mean completion of diagnostic confirmation, referral, treatment initiation, or another defined healthcare outcome.

Therefore:

> **The success of MHCS is the delivery of the complete service, not merely the completion of an individual technical step.**

---

## 4. Why End-to-End Matters

A healthcare pathway can contain many successful individual steps while still failing as a complete service.

For example:

```text
Screening
   ↓
Finding
   ↓
Diagnostic examination
   ↓
Clinical / AI interpretation
   ↓
Result
   ↓
Relevant national or programme system
   ↓
Required next action
   ↓
Referral / confirmation / follow-up
   ↓
Defined healthcare endpoint
```

Every individual capability may already exist.

The strategic question is:

> **Do those capabilities operate together from the beginning of the pathway to the intended endpoint?**

That is the meaning of **end-to-end** in MHCS.

MHCS should therefore be evaluated at the level of the complete healthcare service, not only at the level of individual systems.

---

## 5. MHCS Is Problem-Defined, Not Technology-Defined

MHCS should not begin with a fixed set of technologies and then search for a use case.

The sequence should be:

```text
Validated healthcare problem
        ↓
Define the required end-to-end service
        ↓
Identify required capabilities
        ↓
Identify what already exists
        ↓
Compose the healthcare orchestra
        ↓
Integrate and localise
        ↓
MHCS orchestrates delivery
        ↓
End-to-end healthcare service
```

This means MHCS remains conceptually stable even when the healthcare problem changes.

The composition of the orchestra may change.

The role of MHCS does not.

---

## 6. What MHCS Owns

MHCS does not need to own every technology involved in the healthcare service.

Its primary responsibility is the integrity of the **end-to-end service composition and delivery**.

Conceptually, MHCS owns responsibility for:

| Responsibility | Meaning |
|---|---|
| **Service definition** | What end-to-end healthcare service is required to solve the validated problem? |
| **Workflow orchestration** | How do actors, systems, and technologies work together from start to endpoint? |
| **Capability composition** | Which existing capabilities should participate? |
| **Integration responsibility** | What must be connected for the service to function? |
| **Localisation responsibility** | What must be adapted to Indonesia? |
| **Operational coordination** | What action should happen next and by whom? |
| **Exception awareness** | Where has the pathway stalled, failed, or remained incomplete? |
| **Delivery accountability** | Has the intended healthcare service actually reached its defined endpoint? |

This is the strategic layer that gives MHCS its identity.

---

## 7. What MHCS Does Not Need to Own

MHCS should not rebuild a mature capability simply because that capability is required by the workflow.

If an appropriate capability already exists, the preferred decision is normally:

> **USE → INTEGRATE → PARTNER → LOCALIZE**

before considering:

> **BUILD**

Therefore, MHCS does not need to be defined by ownership of:

- PACS;
- AI models;
- teleradiology;
- medical devices;
- hospital information systems;
- national Government platforms;
- programme-specific systems;
- every clinical or operational application in the pathway.

These may be instruments in the orchestra.

They are not, individually, MHCS.

---

## 8. Relationship with Government Systems

Government systems are part of the healthcare ecosystem that MHCS should strengthen and integrate with where appropriate.

MHCS should not position itself as a replacement for functioning national systems.

For example, the objective should not be:

> **Move everything into MHCS.**

The objective is:

> **Ensure that the required healthcare information reaches the appropriate authoritative system as part of the end-to-end workflow, while the overall healthcare service continues toward its intended endpoint.**

SATUSEHAT may be a major part of that architecture.

Other programme-specific systems may also remain authoritative for their respective functions.

MHCS acts as the orchestrator of the service around those systems, not as their replacement.

---

## 9. Relationship with Partners

MHCS can use capabilities from:

- Madeena;
- UGM;
- Indonesian healthcare and technology providers;
- Government systems;
- selected international technology partners.

A capability does not need to be developed internally to become part of an MHCS solution.

The strategic responsibility of MHCS is to determine:

> **Which capability is the right capability for the validated healthcare problem, and how should it be integrated and localised into the end-to-end service?**

Therefore:

> **MHCS owns the orchestration of the solution, not necessarily every underlying component.**

---

## 10. Indonesia-Led by Design

MHCS may incorporate international technology while remaining an Indonesia-led solution.

The Indonesia-led layer includes:

- problem definition;
- healthcare-service design;
- workflow composition;
- localisation;
- integration with national systems;
- regulatory interpretation;
- clinical and operational governance;
- implementation;
- accountability;
- delivery.

This supports the principle:

> **Made in Indonesia, for the People of Indonesia.**

This does not require every underlying technology to be invented in Indonesia.

It means that the complete healthcare solution is defined, adapted, governed, and delivered for the Indonesian healthcare environment.

---

## 11. MHCS Is Not a Specific Healthcare Hypothesis

A hypothesis such as H1, H2, or H3 is not MHCS itself.

Each hypothesis represents a possible healthcare problem that MHCS could be used to address.

For example:

```text
H1 / H2 / H3 / future validated problem
                 ↓
       Required end-to-end service
                 ↓
       Required capability set
                 ↓
                MHCS
      orchestrates the solution
```

If one hypothesis is falsified, MHCS does not cease to exist.

The healthcare problem and capability composition change.

The orchestration role remains.

---

## 12. The Strategic Test

A proposed MHCS solution should be able to answer five questions:

| Question | Purpose |
|---|---|
| **What healthcare problem are we solving?** | Prevent technology-first product design. |
| **What is the required end-to-end service?** | Define the start, workflow, and intended endpoint. |
| **What capabilities already exist?** | Avoid unnecessary duplication. |
| **What needs integration or localisation?** | Define the actual orchestration work. |
| **What genuinely remains missing?** | Identify whether anything must be built. |

If these questions cannot yet be answered, the MHCS solution scope should not be considered final.

---

## 13. Working Strategic Position

The current working position is:

> **MHCS is the conductor of the healthcare orchestra.**

It does not need to play every instrument.

It identifies the required healthcare service, brings together the appropriate systems, technologies, professionals, and partners, integrates and localises them for Indonesia, and orchestrates their delivery as one end-to-end healthcare service.

In formal wording:

> **MHCS is an Indonesia-led healthcare orchestration, integration, localisation, and delivery layer that brings existing healthcare systems, technologies, professionals, and partners together into an end-to-end healthcare service designed around a validated healthcare problem.**

In short:

> **MHCS orchestrates existing healthcare capabilities into an end-to-end healthcare service.**

---

## 14. Working Principle

> **Do not start with what MHCS can build.**

> **Start with the healthcare problem, define the required end-to-end service, identify the capabilities that already exist, and let MHCS orchestrate them into delivery.**
