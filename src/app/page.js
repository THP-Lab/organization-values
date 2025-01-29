import Header from "@/components/header/Header";
import Hero from "@/components/hero/Hero";

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
    </main>
  );
}
