import Accordion from "@/components/accordion/Accordion";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Hero from "@/components/hero/Hero";
import StepList from "@/components/step-list/StepList";
import TextBox from "@/components/text-box/TextBox";
import ValueListing from "@/components/value-listing/ValueListing";

const FAQ_ITEMS = [
  {
    question: "What is the purpose of this website?",
    answer:
      "This website is a platform for Ethereum enthusiasts to explore and discuss the core values of Ethereum. It allows community members to propose, vote on, and engage with the fundamental principles that guide the ecosystem's development.",
  },
  {
    question: "How can I participate in value proposals?",
    answer:
      "You can participate by",
  },
  {
    question: "What makes a good value proposal?",
    answer:
      "A good value proposal should be well-articulated, reflect the spirit of Ethereum, and resonate with the community. It should consider both technical and social aspects, while being specific enough to guide decision-making but flexible enough to adapt as the ecosystem evolves.",
  },
  {
    question: "How does the voting process work?",
    answer:
      "Voting uses a quadratic voting mechanism where users can allocate voting power across multiple proposals. This ensures that passionate minorities can have meaningful input while preventing any single group from dominating the process.",
  },
  {
    question: "Can values be modified after being accepted?",
    answer:
      "Yes, values can evolve through community consensus. While core values provide stability, their interpretation and application may need to adapt as Ethereum grows and faces new challenges. Any significant changes require broad community support.",
  },
];

export default function Home() {
  return (
    <main className="page">
      <section className="overlap">
        <div className="wrapper" data-wide>
          <Header />
        </div>
        <div className="wrapper">
          <Hero />
        </div>
      </section>
      <section className="section" data-green data-decorated data-space-1>
        <div className="wrapper repel">
          <h2 className="section-title">Defining Our&nbsp;Future</h2>
          <TextBox>
            <div className="prose">
              <p>
                Ethereum is more than a blockchain—it&apos;s a cultural movement
                built on deeply held values which have helped to guide the
                ecosystem and enable it to grow into a global, trustless
                platform for all.
              </p>
              <p>
                But as Ethereum continues to evolve, so too do the
                interpretations and applications of these core values. As mass
                adoption nears, we need to collectively re-assert the values
                that are important to us as a community.
              </p>
            </div>
          </TextBox>
        </div>
      </section>
      <section className="section" data-space-2>
        <div className="wrapper">
          <h2 className="section-title">Propose&nbsp;/&nbsp;Vote on Values</h2>
          <div className="box" data-end>
            <StepList />
          </div>
        </div>
      </section>
      <section className="section" data-space-1>
        <div className="wrapper">
          <h2 className="section-title">
            Explore the Community&apos;s&nbsp;Values
          </h2>
        </div>
        <div className="wrapper">
          <ValueListing />
        </div>
      </section>
      <section className="section">
        <div className="wrapper">
          <h2 className="section-title-small">Frequently Asked Questions</h2>
          <Accordion items={FAQ_ITEMS} />
        </div>
      </section>
      <section className="section" data-green>
        <div className="wrapper">
          <Footer />
        </div>
      </section>
    </main>
  );
}
