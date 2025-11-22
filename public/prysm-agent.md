A.6.1.1.6 - Prysm [Core]
The documents herein specify all of the logic for Prysm, including Prysm’s strategy and how it uses the Sky Primitives to operationalize this strategy.
A.6.1.1.6.1 - Introduction [Core]
Prysm is an Agent focused on building credit infrastructure for permissionless finance, with an initial focus on the Plasma ecosystem. Prysm serves as a neutral platform enabling stablecoin distribution hubs—including exchanges, wallets, and neobanks—to access institutional-grade lending infrastructure underpinning USDS, sUSDS and other Sky benefits.
With a focus on USDT, Prysm acts as the central liquidity hub catalyzing the expansion of USDT-denominated assets across DeFi and OTC lending markets, RWAs, and PayFi within Sky’s collateral portfolio. Prysm provides USDT holders with access to the Sky Savings Rate within its own suite of B2B2C and B2C savings products.
A.6.1.1.6.2.1.1.3.1.1.1 - Name [Core]
The name of the Agent is Prysm.
A.6.1.1.6.2.1.1.3.1.1.4.1 - Prysm Foundation [Core]
The Prysm Foundation is the Prime Foundation associated with Prysm. Its mandate is to support the development, growth, and adoption of Prysm.
A.6.1.1.6.2.1.1.3.1.1.4.2 - Prysm Development Company [Core]
Stablewatch sp. z o.o. is a development company that provides services to the Prysm Foundation. Stablewatch sp. z o.o. is a “Nested Contributor”, i.e., a core contributor to both Prysm and Sky.
A.6.1.1.6.2.1.2.3.1.1.1 - Agent Type [Core]
Prysm is a Prime Agent.
A.6.1.1.6.2.1.4.2.1.1.1 - Token Name [Core]
The name of Prysm’s token is Prysm.
A.6.1.1.6.2.1.4.2.1.1.2 - Token Symbol [Core]
The symbol of Prysm’s token is PRM.
A.6.1.1.6.2.1.4.2.1.1.3 - Genesis Supply [Core]
The Genesis Supply of PRM is 1 billion.
A.6.1.1.6.2.1.4.2.1.1.6 - Token Emissions [Core]
Token emissions beyond the Genesis Supply are permanently disabled; this cannot be reverted by Prysm Governance. Sky Governance retains the ability to revert where Prysm is in violation of Risk Capital requirements and emissions are required by the Risk Framework. See A.3.2 - Risk Capital.
A.6.1.1.6.2.2.1.2.1.1.1 - Operational Executor Agent [Core]
In the near term Ozone will take on the functions of an Operational Executor Agent, including both Operational GovOps and Operational Facilitator roles.
A.6.1.1.6.2.2.2.2.1.2.1.1 - Root Edit Proposal Submission [Core]
The Root Edit process begins with a PRM token holder submitting a proposal through the Powerhouse system containing a draft Artifact Edit Proposal. A PRM token holder must hold at least 1% of the circulating token supply to submit a proposal. The proposal must also be posted on the Sky Forum under the “Prysm Prime” category.
A.6.1.1.6.2.2.2.2.1.2.1.1.2 - Short-Term Transitionary Measures [Core]
Until the Powerhouse system supports submitting Artifact Edit Proposals, PRM token holders may submit Artifact Edit Proposals by posting them to the Sky Forum under the “Prysm Prime” category. The title of the post must include the text “Prysm Artifact Edit Proposal”. The post must include cryptographic proof that the author controls an account holding the required percentage of the total PRM token supply specified in A.6.1.1.6.2.2.2.2.1.2.1.1 - Root Edit Proposal Submission.
A.6.1.1.6.2.2.2.2.1.2.1.3 - Root Edit Proposal Review By Operational Facilitator [Core]
Within seven (7) days of the proposal being submitted, the Operational Facilitator must review the Root Edit Proposal for alignment.
If the proposal is aligned, the Operational Facilitator must respond to the Forum post to announce their finding. In this Forum post, the Operational Facilitator must also confirm that the proposal is feasible for Operational GovOps to operationalize.
If the proposal is misaligned, the Operational Facilitator must respond to the Forum post to announce their finding and provide the reasoning for it.
A.6.1.1.6.2.2.2.2.1.2.1.4 - Root Edit Token Holder Vote [Core]
Where their review of the proposal results in a finding of alignment with the Sky Core Atlas and Prysm Artifact, the Operational Facilitator next triggers a Snapshot poll to allow token holders to vote on the proposal. The poll is open for three (3) days. A poll must have at least 10% of the circulating token supply participating and must have more than 50% of votes cast, excluding abstentions, in favor to be approved.
A.6.1.1.6.2.2.2.2.1.2.1.4.1 - Circulating Supply Definition [Core]
For purposes of A.6.1.1.6.2.2.2.2.1.2.1.4 - Root Edit Token Holder Vote, the circulating supply of PRM tokens is equal to the total supply of PRM tokens minus the sum of:
Tokens retained by Sky and not yet distributed as token rewards (see A.2.9.2.2.2.1.2.2 - Sky Retained Tokens And Reward Pools); and
Tokens retained in vesting agreements for Prysm contributors and not yet distributed; and
Tokens in the Prysm SubProxy Account (see A.6.1.1.6.2.1.1.3.1.1.2 - SubProxy Account).
A.6.1.1.6.2.2.2.2.1.2.1.5 - Root Edit Artifact Update [Core]
At the conclusion of the poll, if the proposal is approved, the Operational Facilitator submits the edit to Powerhouse to formally update the Agent Artifact. Regardless of the outcome, the Operational Facilitator updates the Powerhouse System to include the result of the vote, including any pertinent documents.
A.6.1.1.6.2.2.2.2.1.2.1.5.1 - Short-Term Transitionary Measures [Core]
Until the Powerhouse system supports updating Agent Artifacts, the Operational Facilitator works with the Core Facilitator to update the Atlas GitHub repository located at https://github.com/sky-ecosystem/next-gen-atlas/pulls to reflect proposals approved by Prime Governance.
A.6.1.1.6.2.2.2.2.1.2.1.6 - Artifact Edit Restrictions [Core]
The Prysm Artifact cannot be edited in any way that violates the Sky Core Atlas or its specifications of the Sky Primitives, or in any way that is otherwise misaligned. The Operational Facilitator must enforce this rule through their review of Artifact Edit Proposals.
A.6.1.1.6.2.2.2.2.1.2.1.6.1 - Time-Limited Root Edit Restrictions On Removal Of Nested Contributors [Core]
For a period of three years after the Genesis Supply emissions of PRM tokens take place, any Artifact Edit that would have the effect of removing a Nested Contributor must be approved by a vote of SKY holders in addition to a vote of PRM holders to be effective.
A.6.1.1.6.2.2.2.2.1.2.3.1 - Root Edit Voting Process in Urgent and Emergency Situations [Core]
In an Urgent or Emergency Situation, as defined by the Sky Core Atlas in A.1.8.1.1 - Definition Of Emergency Situations, the Operational Facilitator may allow a Root Edit to occur more quickly than the timeline specified above. Where feasible, the Operational Facilitator should announce the decision to deploy the emergency Root Edit protocol and provide their reasoning via a public Sky Forum post (under the “Prysm Prime” category), unless doing so would endanger Prysm or its users.
A.6.1.1.6.3.3 - Omni Documents
The documents herein define Prysm’s strategic intent and operational processes relating to infrastructure inherited from Sky Core, activities unrelated to Sky Primitives, or activities spanning multiple Sky Primitives.
A.6.1.1.6.3.3.1 - Governance Information Unrelated To Root Edit Primitive
The documents herein specify Prysm’s governance information that is unrelated to the use of the Root Edit Primitive. The governance process for updating the Prysm Artifact is specified in the Root Edit Primitive above at A.6.1.1.6.2.2.2 - Root Edit Primitive.
A.6.1.1.6.3.3.1.1 - Governance Information Unrelated To Root Edit Primitive
Prysm uses the Sky Forum for governance-related discussion. Posts should use the “Prysm” category.
