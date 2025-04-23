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
