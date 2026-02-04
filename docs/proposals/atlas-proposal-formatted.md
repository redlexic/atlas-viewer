# Clarifications Needed

> Please address these items so they can be incorporated into the final proposal:

1. **OEA Definition**: What does OEA stand for? (Operational Entity Agent? Operational Ecosystem Agent?) Should be defined on first use.
   Operational Executor Agent

2. **Agent Artifacts**: What exactly constitutes an "agent artifact"? (Documentation sections? Smart contracts? Configuration files? All of the above?)
   The Atlas is a governance document that includes agent artifacts. You shouldn't overexplain these things as they audience understands them well.

3. **Box 1 Context**: "Box 1" implies a multi-step framework. Are there additional boxes/steps to document?

Yes, there is a flow chart. I will incorporate that myself.

4. **Target Model**: The "target model" is referenced (the Spark process) but not fully described. Should we include more detail about what this looks like?F

Flow chart has that, just put a placeholder.

5. **Poll Outcome Recommendation**: The section presents options but doesn't clearly state the recommended approach. What is the final recommendation?

The new process with OEA handling the artifact edit process..

6. **GitHub PR Handling**: A question is posed about splitting repositories, but no recommendation is given. What is the proposed approach?

Let OEAs adopt the current process, then after they are familiar with the repos they can split the repos later.

7. **Timeline**:

   - When is the anticipated effective date for this change?
   - "February" is mentioned for Prysm - which year?
   - When is Grove expected to pass into post-token launch?

TBD - just getting feedback on the plan for now.

8. **Terminology**: Should "genesis primes and halos" be explained for readers unfamiliar with the terminology?

No, the audience is familiar with these terms.

---

# Proposal: Transition of Agent Artifact Edit Responsibility to OEA Facilitators

**Status:** Draft
**Authors:** [TBD]
**Date:** [TBD]
**Stakeholders:** Core Council, Atlas Axis, Ozone, Endgame Edge

---

## Executive Summary

This proposal recommends shifting responsibility for agent artifact edits from Core and Atlas Axis facilitators to OEA facilitators. This change establishes a transition process aligned with the intended relationship between OEA and Agents, creating operational efficiencies and improved governance tracking ahead of the pre-token and post-token governance phases.

---

## 1. Background

Currently, agent artifact edits are managed by Core and Atlas Axis facilitators as part of the broader Atlas edit process. As the ecosystem scales with new agents, this centralized approach is becoming unsustainable.

---

## 2. Rationale

### 2.1 Operational Efficiency

- **Resource Availability**: Ozone has onboarded Redlexic to the Redline team, providing additional facilitator capacity
- **Workload Distribution**: Reduces burden on Atlas Axis and Core facilitators, freeing attention for other priorities
- **Faster Turnarounds**: Dedicated OEA focus enables quicker response times on agent artifact updates

### 2.2 Governance Alignment

- **Ownership Model**: Reflects the intended relationship where OEA takes responsibility for maintaining agent artifacts
- **Quality Control**: Enables innovation on quality control processes specific to agent artifacts

### 2.3 Improved Tracking

- **Categorized History**: Separating agent artifact edits from Atlas edit proposals creates clearer audit trails
- **Single Source of Truth**: Each agent will have a dedicated record of edits, similar to post-token launch processes
- **Historical Records**: New agents will have complete edit history from Day 1 of their lifespan

### 2.4 Scalability

With the following agents active or incoming, the current model is becoming intractable:

- **Current**: Keel, Gove, Obex, Prysm, Pattern, River, SkyBase
- **Upcoming**: Fixed rate star, genesis primes and halos

Bundling ~7+ agent edits into a single Atlas edit proposal reduces clarity and manageability.

### 2.5 Timing

A significant artifact edit for Prysm is anticipated around February, providing an opportunity to implement this process in time to capture that update under the new model.

---

## 3. Proposed Process

### 3.1 Artifact Edit Posting

**Option A - OEA-Managed:**
OEA facilitator posts artifact edit proposals on behalf of agents in their dedicated Star Category.

**Option B - Agent-Managed (Target Model):**
Agents post their own artifact edit proposals with OEA support:

- OEA provides training, templates, and guidance
- OEA facilitator performs official review
- Maintains security: prevents unauthorized artifact edits through required proposal step

> _Note: Option B aligns with the current Spark process._

### 3.2 Poll Structure

**Current State:**

- One combined poll for all Atlas edit proposals
- Multiple proposals exist for operational edits

**Proposed Change:**
Bundle agent artifact edits into a structured proposal format:

- Update templates with appropriate naming conventions
- Maintain separate discussion threads per agent
- Create additional sections within the poll (similar to Executive votes with core spells and prime agent proxy spell sections)

### 3.3 GitHub Repository Management

**Current State:**
Endgame Edge has edit and merge access to all agent artifacts, operating in a high-trust environment.

**Consideration:**
Split agent artifacts into separate repositories to:

- Protect Atlas integrity through compartmentalized access
- Enable agents to manage their own PRs during transition

> _[Recommendation needed: Should repositories be split? If so, what is the proposed structure?]_

---

## 4. Governance Model Comparison

| Phase                     | Proposal Management           | Voting Platform | Voters              | PR Management |
| ------------------------- | ----------------------------- | --------------- | ------------------- | ------------- |
| **Pre-Token (Current)**   | Core/Atlas Axis               | vote.sky.money  | SKY holders         | Endgame Edge  |
| **Transition (Proposed)** | OEA Facilitator               | vote.sky.money  | SKY holders         | OEA/Agent     |
| **Post-Token Launch**     | Agent/Operational Facilitator | Snapshot        | Agent token holders | Agent         |

---

## 5. Scope

### In Scope

- Agent artifact edit proposals
- Forum post handling and approval
- Edit proposal preparation
- GitHub PR management (pending repository decision)

### Out of Scope

- Core Atlas edits (non-agent)
- Token launch governance
- Smart contract deployments

---

## 6. Implementation

### 6.1 Prerequisites

- [ ] Define repository structure (single vs. split)
- [ ] Update forum templates
- [ ] Create agent training materials
- [ ] Establish OEA review process documentation

### 6.2 Rollout

- [ ] Pilot with [TBD agent]
- [ ] Gather feedback and iterate
- [ ] Full rollout to all pre-token agents

---

## 7. Risks and Mitigations

| Risk                                  | Mitigation                                              |
| ------------------------------------- | ------------------------------------------------------- |
| OEA capacity constraints              | Redline team onboarding provides additional resources   |
| Quality degradation during transition | OEA review step maintains oversight                     |
| Unauthorized artifact edits           | Proposal step requirement prevents unauthorized changes |
| Agent readiness varies                | OEA provides templates, training, and hands-on support  |

---

## 8. Success Metrics

- Reduced turnaround time for artifact edits
- Clear historical record per agent from implementation date
- Positive feedback from Core/Atlas Axis on workload reduction
- Successful handling of Prysm artifact edit under new process

---

## Appendix

### A. Glossary

- **OEA**: [Definition needed]
- **Agent Artifact**: [Definition needed]
- **Star Category**: Forum category for agent-related proposals
- **Genesis Primes**: [Definition needed]
- **Halos**: [Definition needed]

### B. Related Documents

- [Spark Process Documentation]
- [Post-Token Launch Governance Framework]
- [Atlas Edit Proposal Template]
