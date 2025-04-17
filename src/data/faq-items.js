import Link from "next/link";

export const FAQ_ITEMS = [
  {
    question: "What's this all about?",
    answer: (
      <>
        This platform is partnering with{" "}
        <Link href="https://www.intuition.systems/" target="_blank">
          Intuition Systems
        </Link>{" "}
        to run a social experiment that allows people to propose, discuss, and
        vote on values they feel are important to the organization.
        <br />
        <br />
        The objective of the experiment is to see how certain mechanisms and
        forums can be used to encourage honest dialogue and a synthesis of
        diverse perspectives as a means to establish a community-created values
        system. While the outcome of the experiment is unforeseen, we are hoping
        that the community will converge on values that are important to them.
      </>
    ),
  },
  {
    question: "How does it work?",
    answer: (
      <>
        Anyone can propose a value, which includes a name and a description.
        When you propose a value, you must pay a small fee. This fee goes into a
        pool for that proposed value, and these fees are shared pro-rata between
        everyone that votes on the value.
        <br />
        <br />
        You can vote for or against a value that you propose. The amount you
        deposit to vote can be as little or as much as you want. Other users can
        subsequently vote &apos;for&apos; or &apos;against&apos; the value you
        proposed by depositing ETH. You don&apos;t need to propose a value to
        participate, as you can deposit ETH to vote &apos;for&apos; or
        &apos;against&apos; existing values, or simply participate in the
        discussion on the forum if there is a linked forum thread.
        <br />
        <br />
        The values that are proposed by the community will be stack-ranked
        according to the total ETH deposit for, less the total ETH deposited
        against, for each respective value.
      </>
    ),
  },
  {
    question: "What sort of values can I propose?",
    answer: (
      <>
        You are free to propose any sort of values that you wish. These can be
        serious proposals to which you&apos;ve given thought and consideration,
        or they can be frivolous. Be aware that frivolous proposals are less
        likely to see serious engagement and may end up dropping to the bottom
        of the rank (and therefore wasting your proposed fee and limiting any
        potential earnings).
      </>
    ),
  },
  {
    question: "Why is there a fee to participate?",
    answer: (
      <>
        When you deposit ETH in a value, voting either &quot;for&quot; or
        &quot;against&quot;, there is a small fee that is paid into the pool for
        that value. When you withdraw ETH, there is a small withdrawal fee. The
        fees paid into the pool are shared between participants that have some
        ETH in the pool at that time.
        <br />
        <br />
        This means that if you deposit some ETH into the pool for a specific
        value, you will get a percentage of all deposit and withdrawal fees that
        are paid by participants that deposit and withdraw after you deposit,
        and before you withdraw.
      </>
    ),
  },
  {
    question: "What are the fees to participate?",
    answer: (
      <>
        There is a static fee to propose a new value, which is{" "}
        <strong>0.0004 ETH</strong> and a minimum stake of{" "}
        <strong>0.001 ETH</strong>. The purpose of this fee is to discourage
        spam. The fees are shared between everyone who votes on the proposed
        value by depositing ETH.
        <br />
        <br />
        There are also fees for voting on a proposed value. The fee is{" "}
        <strong>0.3%</strong> percent of the amount of ETH you deposit or
        withdraw (i.e. it applies to both deposits and withdrawals). That means
        that you pay 0.3% percent of the amount of ETH that you deposit, and you
        also pay <strong>0.3%</strong> percent of whatever amount of that ETH
        you withdraw.
        <br />
        <br />
        Fees are shared between all users that have previously voted in the same
        way, e.g. if you are depositing to vote &quot;yes&quot;, your deposit
        fee will be shared between all participants that previously voted yes
        for that value, relative to their share of the pool (i.e. how much of
        the total pool their ETH makes up). From that point on, you will also
        get a portion of any of the ETH that anyone else deposits or withdraws.
      </>
    ),
  },
  {
    question: "Can I make a profit?",
    answer: (
      <>
        Potentially. The mechanism of paying a fee into a value&apos;s pool
        incentivizes participants to keep their ETH in one value pool instead of
        changing between value pools, as the most profitable strategy is to be
        one of the first to deposit, and one of the last to withdraw —thereby
        collecting a portion of everyone else&apos;s fees that deposit after you
        and withdraw before you.
        <br />
        <br />
        This mechanism encourages people to think carefully about the values
        they vote on. By voting on values that the community are less likely to
        engage with, the potential for earning any profit is quite low.
        Alternatively, by engaging in the conversation and contributing
        thoughtfully, the potential for earning is higher.
        <br />
        <br />
        This mechanism also encourages people to think seriously about values
        they propose, and not to simply follow-the-herd, because the most
        profitable strategy is to create a value that hasn&apos;t already been
        proposed, that people will be likely to engage with. This can be a
        contrarian view that conflicts with a value that has already been
        proposed, but only if it has a compelling argument, as being contrarian
        for the sake of it is not likely to see much engagement. In theory, this
        should encourage robust but honest dialogue and debate.
      </>
    ),
  },
  {
    question: "Can I lose money by participating?",
    answer: (
      <>
        You can&apos;t lose more than the fees that you pay into the pool when
        you deposit and withdraw ETH as part of voting for a value, or the
        static fee you pay for proposing a value. See the section on fees to
        learn more.
      </>
    ),
  },
  {
    question: "How long will the experiment run for?",
    answer: (
      <>
        We aim to run the experiment for a least four weeks from the time of
        launch, although we may decide to extend this time should there be
        sufficient demand. Based on community feedback, we may also decide to
        leave the dapp running indefinitely, but we will only collect and
        analyze results from the specified period.
      </>
    ),
  },
  {
    question: "Will the results of the experiment be published?",
    answer: (
      <>
        Yes, we aim to publish the findings and learnings from the experiment a
        number of weeks after the initial run. We will publish the findings via
        our organization and partner channels.
      </>
    ),
  },
  {
    question: "What's the motivation for running this experiment?",
    answer: (
      <>
        We believe that community values are part of the DNA of any 
        organization, and are what guides its development. The core
        values of an organization's ecosystem are what makes it robust and strong,
        and are why organizations become important infrastructure for the world.
        <br />
        <br />
        However, these values should come from the ground-up, surfaced as a
        collective endeavour in dialogue and transparency. We are running this
        social experiment as a way to understand how we can foster such dialogue
        and allow the community to align on its values collectively, giving
        common knowledge to the values that are most important to the community.
        We will continue to explore this space in the future, iterating and
        refining ideas with the community to find out what works and what
        doesn&apos;t, and we plan to open source what we build.
      </>
    ),
  },
  {
    question: "What is Intuition?",
    answer: (
      <>
        Intuition is building the foundational infrastructure for a new
        information economy via the introduction of non-resolving{" "}
        <em>Information Markets</em> and a novel identity and data
        interoperability protocol.
        <br />
        <br />
        Think community notes meets prediction markets meets decentralized
        identity meets verifiable data. Much like cloud computing revolutionized
        hardware, Intuition redefines identities, data, and algorithms—freeing
        them from the constraints of individual platforms and applications to
        exist in an open, credibly-neutral, decentralized knowledge graph
        designed for maximum composability. Contributions to this knowledge
        graph are incentivized via cryptoeconomic mechanics, encouraging users
        and developers to supply, surface, and curate meaningful information.
        This approach allows developers to bypass complex data management
        layers, retain ownership over their contributions, and receive
        programmatic rewards for valuable data, creating a more sustainable,
        cooperative, and user-centric digital ecosystem. The vision is to bring
        better <em>intuition</em> to all of our interactions by providing people
        and machines with the data they need, when they need it, from the
        sources they trust.
        <br />
        <br />
        The Intuition protocol is a decentralized framework designed to enhance
        trust and data verification within digital ecosystems. It operates by
        creating a semantic, verifiable social and knowledge graph that allows
        users to interact with data in a more reliable manner. Intuition is
        pioneering a novel crowdsourced approach to data verification, allowing
        users to assess trust levels based on verifiable, user-centric data and
        analytics.
      </>
    ),
  },
  {
    question: "How secure is this platform?",
    answer: (
      <>
        The platform's infrastructure is open source and has been fully audited.
        The underlying systems are upgradeable but are managed by a multi-signature
        security process that has the power to update some parameters, but these are timelocked,
        giving users the ability to remove deposits before any changes take effect.
      </>
    ),
  },
  {
    question:
      "Does the financial aspect introduce bias that undermines these values?",
    answer: (
      <>
        We think that the mechanism we&apos;ve designed will incentivize people
        to participate meaningfully and to give serious consideration to the
        values they propose and / or vote on. The ability to profit not only
        incentivizes people to think about what the community will converge on,
        but will also incentivize people to think outside-the-box and encourage
        novel and compelling debate on the proposed values.
      </>
    ),
  },
  {
    question: "Won't the values just be dominated by large stakeholders?",
    answer: (
      <>
        With the current design, this is definitely a possibility, and it is
        something that we would like to improve upon. Any future iterations of
        this experiment will likely use more sophisticated mechanisms such as
        Quadratic Voting or Connection Oriented Cluster Matching, in order to
        reduce the impact that larger stakeholders can have. However, these sophisticated
        mechanisms require an identity and reputation layer that would introduce
        too much UX friction for such an early experiment. Therefore, this is
        something we have chosen to iterate towards over time.
      </>
    ),
  },
  {
    question: "What is the discussion forum integration?",
    answer: (
      <>
        Our platform integrates with discussion forums designed to facilitate structured debates
        and discussions, primarily aimed at enhancing critical thinking and
        reasoning skills. These forums operate through a visual format known as argument
        mapping, where users can explore various perspectives on a central
        thesis by adding supporting or opposing arguments in a tree-like
        structure. We want to explore how effective argument mapping can be in a
        community setting, in terms of allowing people to see an overview of the
        dialogue around certain proposed values.
      </>
    ),
  },
  {
    question: "How do I create a discussion thread for a value I'm proposing?",
    answer: (
      <>
        <ul>
          <li>
            Click on the discussion forum link available on the platform homepage.
          </li>
          <li>
            Click on the <strong>+</strong> button to create a new topic.
          </li>
          <li>
            A form will appear where you can enter the name of your proposed value followed by its description.
            The description should be exactly the same as the description that you
            entered on the values platform. There is a character limit for these entries.
          </li>
          <li>Save your proposed value to add it to the list of discussion topics.</li>
          <li>
            The proposed value will now be available for community discussion.
          </li>
        </ul>
      </>
    ),
  },
  {
    question:
      "How do I participate in a conversation for an existing value in the discussion forum?",
    answer: (
      <>
        <ul>
          <li>
            Click on a value in the discussion forum, which will load the conversation thread for that value.
          </li>
          <li>
            To participate in the discussion, locate the response options which may be organized as
            <strong> For</strong> arguments or <strong>Against</strong> arguments,
            depending on your point of view.
          </li>
          <li>
            Write your contribution in the input box that appears and save your comment.
          </li>
        </ul>
        <strong>Rules for posting:</strong>
        <ul>
          <li>
            Conversation must be respectful and civil and relevant. Any posts
            that are deemed inappropriate or disrespectful will be removed.
            Similarly, any promotion of unrelated products/services or inappropriate content
            will be deleted and users may face restrictions.
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "Disclaimer",
    answer: (
      <>
        This software is provided for use at the user&apos;s own risk. The platform 
        operators and Intuition Systems are not liable for any unforeseen
        circumstances that may result in the loss of funds. As this is
        experimental software, users acknowledge the possibility of bugs or
        unexpected issues. It is strongly recommended that users only deposit
        amounts they are prepared to lose.
        <br />
        <br />
        This disclaimer is intended to promote transparency and help users make
        informed decisions. Users are encouraged to review the documentation and
        contact our support team with any questions or concerns.
        <br />
        <br />
        The organization reserves the right to discontinue this program
        at any time without prior notice. In such cases, all deposited funds
        will remain accessible for withdrawal. While we strive to deliver
        innovative solutions, we urge users to engage with the platform
        responsibly.
      </>
    ),
  },
];
