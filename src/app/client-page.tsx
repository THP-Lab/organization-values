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
import { organizationConfig } from "@/config/organization-config";

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
  
  // Destructurer les sections pour faciliter l'accès
  const { sections, externalLinks } = organizationConfig;

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
      <section className="section" data-green data-space-1>
        <div className="wrapper repel">
          <h2 className="section-title">{sections.definingFuture.title}</h2>
          <TextBox>
            <div className="prose">
              {sections.definingFuture.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </TextBox>
        </div>
      </section>
      <section className="section" data-space-2>
        <div className="wrapper">
          <h2 className="section-title">{sections.proposeVote.title}</h2>
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
          <h2 className="section-title">{sections.joinDiscussion.title}</h2>
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
              href={externalLinks.discussion.kialo}
              target="_blank"
            >
              Kialo
            </Link>
          </p>
        </div>
      </div>
      <section className="section" data-space-1>
        <div className="wrapper">
          <h2 className="section-title-small">{sections.faqSection.title}</h2>
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
