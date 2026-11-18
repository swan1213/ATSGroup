import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Deal } from "@/components/Deal";
import { Who } from "@/components/Who";
import { How } from "@/components/How";
import { Terms } from "@/components/Terms";
import { About } from "@/components/About";
import { Company } from "@/components/Company";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main id="main">
        <Hero />
        <Deal />
        <Who />
        <How />
        <Terms />
        <About />
        <Company />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
