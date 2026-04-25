import Head from "next/head";
import Header from "../components/layout/Header";
import Hero from "../components/home/Hero";
import PortfolioSection from "../components/portfolio/PortfolioSection";
import { AboutSection, ContactSection, Footer } from "../components/sections/ExtraSections";

export default function Home() {
  return (
    <>
      <Head>
        <title>AETHER — AI Creative Strategist</title>
        <meta
          name="description"
          content="AI-креатор с 3-летним опытом. Экспертиза на стыке кода и визуального искусства. Генеративный арт, WebGL, 3D, UI/UX."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="AETHER — AI Creative Strategist" />
        <meta property="og:description" content="Превращаю шум в смысл. AI-креатор на стыке кода и визуального искусства." />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <Hero />
        <PortfolioSection />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
