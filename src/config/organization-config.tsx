export const organizationConfig = {
  // General information
  name: "Organization Name",
  tagline: "Organization Slogan",
  description: "Detailed description of the organization and its mission...",
  
  // Content
  hero: {
    title: "Organization",
    description: "An organization is more than a structure, it's a cultural movement..."
  },
  
  // Sections content
  sections: {
    definingFuture: {
      title: "Defining Our Future",
      paragraphs: [
        "An organization is more than its structure—it's a cultural movement built on deeply held values which help guide decision-making and enable sustainable growth into a thriving community with shared purpose.",
        "But as organizations continue to evolve, so too do the interpretations and applications of these core values. As they grow and mature, we need to collectively define the values that are important to us as a community."
      ]
    },
    proposeVote: {
      title: "Propose / Vote on Values"
    },
    joinDiscussion: {
      title: "Join the Discussion"
    },
    faqSection: {
      title: "Frequently Asked Questions"
    },
    steps: [
      {
        number: 1,
        title: "Propose Values",
        description: "Propose a value that you feel is important and / or view the values others have explored",
        statImageSrc: "/images/steps/propose.svg",
        getStatText: (count) => `${count} Values Proposed`
      },
      {
        number: 2,
        title: "Vote with ETH",
        description: "Vote on proposed values by depositing ETH For or Against, and pay a small fee to the value pool",
        statImageSrc: "/images/steps/vote.svg",
        getStatText: (count) => `${count} ETH in votes`
      },
      {
        number: 3,
        title: "Earn Rewards",
        description: "As more people vote on the same value, your shares accrue a portion of their fees",
        statImageSrc: "/images/steps/earn.svg",
        getStatText: (count) => `${count} in Rewards`
      },
      {
        number: 4,
        title: "Shape the Future",
        description: "Values are ranked by total ETH voted for. You can withdraw your ETH at any time",
        statImageSrc: "/images/steps/shape.svg",
        getStatText: (count) => `${count}+ Contributors`
      }
    ]
  },
  
  // FAQ items - chaque answer sera transformé en JSX dans le composant
  faq: [
    {
      question: "What's this all about?",
      answer: `This platform allows people to propose, discuss, and vote on values they feel are important to the organization.

The objective is to see how certain mechanisms and forums can be used to encourage honest dialogue and a synthesis of diverse perspectives as a means to establish a community-created values system. While the outcome is unforeseen, we are hoping that the community will converge on values that are important to them.`,
      links: [
        {
          text: "Intuition Systems",
          url: "https://www.intuition.systems/"
        }
      ]
    },
    {
      question: "How does it work?",
      answer: `Anyone can propose a value, which includes a name and a description. When you propose a value, you must pay a small fee. This fee goes into a pool for that proposed value, and these fees are shared pro-rata between everyone that votes on the value.

You can vote for or against a value that you propose. The amount you deposit to vote can be as little or as much as you want. Other users can subsequently vote 'for' or 'against' the value you proposed by depositing ETH. You don't need to propose a value to participate, as you can deposit ETH to vote 'for' or 'against' existing values, or simply participate in the discussion on the forum if there is a linked forum thread.

The values that are proposed by the community will be stack-ranked according to the total ETH deposit for, less the total ETH deposited against, for each respective value.`
    },
    {
      question: "What sort of values can I propose?",
      answer: `You are free to propose any sort of values that you wish. These can be serious proposals to which you've given thought and consideration, or they can be frivolous. Be aware that frivolous proposals are less likely to see serious engagement and may end up dropping to the bottom of the rank (and therefore wasting your proposed fee and limiting any potential earnings).`
    },
    {
      question: "Why is there a fee to participate?",
      answer: `When you deposit ETH in a value, voting either "for" or "against", there is a small fee that is paid into the pool for that value. When you withdraw ETH, there is a small withdrawal fee. The fees paid into the pool are shared between participants that have some ETH in the pool at that time.

This means that if you deposit some ETH into the pool for a specific value, you will get a percentage of all deposit and withdrawal fees that are paid by participants that deposit and withdraw after you deposit, and before you withdraw.`
    },
    
  ],
  
  // External links and resources
  externalLinks: {
    community: "https://discord.com/invite/your-organization",
    documentation: "https://docs.your-organization.com",
    social: {
      twitter: "https://twitter.com/your-organization",
      // Other links...
    },
    discussion: {
      kialo: "https://www.kialo.com/p/dd0be798-fae9-407e-b30c-a6392b59dea5/67726"
    }
  },
  
  // Technical configuration
  contracts: {
    predicateId: process.env.NEXT_PUBLIC_PREDICATE_ID || "default_predicate_id",
    subjectId: process.env.NEXT_PUBLIC_SUBJECT_ID || "default_subject_id",
    votingContractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x...",
  },
  
  // Extended branding
  branding: {
    logo: {
      main: "/images/logo.svg",
      alternative: "/images/logo-alt.svg", 
      favicon: "/favicon.ico",
    },
    typography: {
      headingFont: "'Montserrat', sans-serif",
      bodyFont: "'Open Sans', sans-serif",
    },
    hero: {
      backgroundImage: "/images/hero.png", // Relative path from public folder
    },
  },
  
  // Application settings
  appSettings: {
    minStakeAmount: "0.01",  // in ETH
    featuredValuesCount: 5,
    defaultSortMethod: "stake", // "stake", "newest", etc.
    allowAnonymousViewing: true,
    requireConnectForProposing: true,
  },
  

  
 
};
