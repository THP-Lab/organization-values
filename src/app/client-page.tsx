"use client";

import { useEffect, useState } from "react";
import Accordion from "@/components/accordion/Accordion";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Hero from "@/components/hero/Hero";
import StepList from "@/components/step-list/StepList";
import TextBox from "@/components/text-box/TextBox";
import ValueListing from "@/components/value-listing/ValueListing";
import Link from "next/link";
import { FAQ_ITEMS } from "@/data/faq-items";

export default function ClientPage() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return <div>Loading...</div>; // Un simple loader pendant l'initialisation côté client
  }
  
  const valuesCount = 0;
  const totalStakedEth = 0;
  const totalRewards = 0;
  const totalUsers = 0;

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
                An organization is more than its structure—it&apos;s a cultural movement
                built on deeply held values which help guide decision-making and
                enable sustainable growth into a thriving community with shared
                purpose.
              </p>
              <p>
                But as organizations continue to evolve, so too do the
                interpretations and applications of these core values. As they
                grow and mature, we need to collectively define the values
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
        <div className="box" data-center data-space-1 data-text-2>
          <p>
            You can also join the conversation on{" "}
            <Link
              href="https://www.kialo.com/p/dd0be798-fae9-407e-b30c-a6392b59dea5/67726"
              target="_blank"
            >
              Kialo
            </Link>
          </p>
        </div>
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
