/**
 * Organization Values Configuration
 * 
 * This file contains all the configuration for your organization's values platform.
 * Each section can be customized to match your organization's branding, content, and needs.
 * 
 * INSTRUCTIONS:
 * 1. Replace all placeholder values with your organization's information
 * 2. For images, place them in the public/images folder and reference them with paths like "/images/your-image.png"
 */

export const organizationConfig = {
  /**
   * General information about your organization
   * These values are used throughout the site, including meta tags
   * 
   * Used in: Header component, SEO metadata, and various page titles
   * 
   * Example:
   * name: "Acme Corporation"
   * tagline: "Building a Better Tomorrow"
   */
  name: "Organization Name",
  tagline: "Organization Slogan",
  description: "Detailed description of the organization and its mission...",
  
  /**
   * Hero section content
   * This is the main banner section at the top of the landing page
   * 
   * Used in: Hero.tsx component on the homepage
   * 
   * Impact: Defines the first impression visitors get of your platform
   * 
   * Example:
   * title: "Acme Values"
   * description: "Join us in shaping our collective future through shared values and principles."
   */
  hero: {
    title: "Organization",
    description: "An organization is more than a structure, it's a cultural movement..."
  },
  
  /**
   * All content sections of the platform
   * Customize the text for each section to align with your organization's voice
   * 
   * Used in: Various components across the landing page
   */
  sections: {
    /**
     * The introductory section explaining the purpose of the platform
     * 
     * Used in: TextBox component displaying the mission statement
     * 
     * Impact: Sets the context for why values matter to your organization
     * 
     * Example:
     * title: "Our Collective Future"
     * paragraphs: ["At Acme, we believe in the power of...", "Together, we can..."]
     */
    definingFuture: {
      title: "Defining Our Future",
      paragraphs: [
        "An organization is more than its structure—it's a cultural movement built on deeply held values which help guide decision-making and enable sustainable growth into a thriving community with shared purpose.",
        "But as organizations continue to evolve, so too do the interpretations and applications of these core values. As they grow and mature, we need to collectively define the values that are important to us as a community."
      ]
    },
    /**
     * Title for the section where users can propose and vote on values
     * 
     * Used in: ValueListing component section header
     * 
     * Impact: Labels the interactive part of your platform
     */
    proposeVote: {
      title: "Propose / Vote on Values"
    },
    /**
     * Title for the section where users can join discussions about values
     * 
     * Used in: Discussion section component
     * 
     * Impact: Encourages community engagement beyond just voting
     */
    joinDiscussion: {
      title: "Join the Discussion"
    },
    /**
     * Title for the FAQ section
     * 
     * Used in: Accordion FAQ component
     * 
     * Impact: Helps users find answers to common questions
     */
    faqSection: {
      title: "Frequently Asked Questions"
    },
    /**
     * The steps that explain how the platform works
     * Each step includes a number, title, description, image, and a function to format statistics
     * 
     * Used in: StepList component that displays the workflow steps
     * 
     * Impact: Guides users through the core functionality of the platform
     * 
     * Example:
     * number: 1
     * title: "Submit Ideas"
     * description: "Share your thoughts on values that matter to our organization"
     * statImageSrc: "/images/steps/submit.svg"
     * getStatText: (count) => `${count} Ideas Shared`
     */
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
  
  /**
   * Frequently Asked Questions
   * Each FAQ item includes a question, answer, and optional links
   * The answers will be transformed into JSX in the component
   * 
   * Used in: Accordion component that displays FAQ items
   * Data is processed in src/data/faq-items.js
   * 
   * Impact: Helps users understand how the platform works and addresses common concerns
   * 
   * Example:
   * question: "How can I participate?"
   * answer: "You can participate by proposing values, voting on existing proposals..."
   * links: [{ text: "Learn more", url: "https://example.com/learn-more" }]
   */
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
  
  /**
   * External links and resources
   * All URLs for your organization's external presence
   * 
   * Used in: Footer component, social links, and various CTAs throughout the site
   * 
   * Impact: Connects your values platform with your broader community and resources
   * 
   * Example:
   * community: "https://discord.com/invite/acme-community"
   * contactEmail: "values@acme-corp.com"
   */
  externalLinks: {
    community: "https://discord.com/invite/your-organization",
    documentation: "https://docs.your-organization.com",
    contactEmail: "contact@organization-values.com",
    social: {
      twitter: "https://twitter.com/organization",
      youtube: "https://youtube.com/organization",
      discord: "https://discord.com/invite/organization",
      instagram: "https://instagram.com/organization"
    },
    legal: {
      privacy: "https://organization-values.com/privacy",
      terms: "https://organization-values.com/terms"
    },
    discussion: {
      kialo: "https://www.kialo.com/p/dd0be798-fae9-407e-b30c-a6392b59dea5/67726"
    }
  },
  
  /**
   * Footer content
   * Text that appears at the bottom of all pages
   * 
   * Used in: Footer.tsx component on all pages
   * 
   * Impact: Reinforces your organization's mission and provides key links
   * 
   * Example:
   * title: "Join us in building a values-driven organization."
   * description: ["Our platform enables transparent...", "Together we can..."] 
   */
  footer: {
    title: "Values are the foundation of any thriving community.",
    description: [
      "This platform is a collaborative experiment in collective intelligence, enabling communities to surface, discuss and align on shared values through transparent and inclusive participation.",
      "By making values explicit and measurable, we create a framework for better decision-making and stronger collective identity."
    ],
    connectTitle: "Connect With Us",
    copyright: "Organization Values. All rights reserved."
  },
  
  
  
  /**
   * Extended branding configuration
   * Define visual elements that create your brand identity across the platform
   * 
   * Used in: Layout components, theme providers, and various UI elements
   * Logo used in Header.tsx and favicon in app metadata
   * Typography applied via CSS variables
   * 
   * Impact: Creates visual consistency and reinforces your brand
   * 
   * Example:
   * logo: { main: "/images/acme-logo.svg" }
   * typography: { headingFont: "'Raleway', sans-serif" }
   * put your images in public/images 
   */
  branding: {
    logo: {
      main: "/images/logo.svg",          // Main logo used in header and key locations
      alternative: "/images/logo-alt.svg", // Alternative version (e.g., for dark backgrounds)
      favicon: "/images/favicon.ico",           // Browser tab icon
    },
    typography: {
      headingFont: "'Montserrat', sans-serif", // Font for headings
      bodyFont: "'Open Sans', sans-serif",     // Font for body text
    },
    hero: {
      backgroundImage: "/images/hero.png", // Hero section background image
    },
  },
};
