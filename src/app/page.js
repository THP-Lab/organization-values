import { backendApi } from "@/api/backendApi";
import Accordion from "@/components/accordion/Accordion";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Hero from "@/components/hero/Hero";
import StepList from "@/components/step-list/StepList";
import TextBox from "@/components/text-box/TextBox";
import ValueListing from "@/components/value-listing/ValueListing";
import { FAQ_ITEMS } from "@/data/faq-items";

export const revalidate = 600;

export default async function Home() {
  const valuesCount = await backendApi.valuesCount();
  const totalStakedEth = await backendApi.totalStakedEth();
  const totalRewards = await backendApi.totalRewards();
  const totalUsers = await backendApi.totalUsers();

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
            <StepList
              valuesCount={valuesCount}
              totalStakedEth={totalStakedEth}
              totalUsers={totalUsers}
              totalRewards={totalRewards}
            />
          </div>
        </div>
      </section>
      <section className="section" data-space-1>
        <div className="wrapper">
          <h2 className="section-title">Join the Discussion</h2>
        </div>
        <div className="wrapper">
          <ValueListing />
        </div>
      </section>
      <div className="wrapper">
        <hr />
      </div>
      <section className="section" data-space-1>
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
