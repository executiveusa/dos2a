import Nav from "@/components/Nav";
import CinematicHero from "@/components/CinematicHero";
import Services from "@/components/sections/Services";
import Pricing from "@/components/sections/Pricing";
import Process from "@/components/sections/Process";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <CinematicHero />
        <Services />
        <Pricing />
        <Process />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
