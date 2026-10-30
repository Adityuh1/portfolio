import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Tools from "@/components/Tools";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DotField from "@/components/DotField";
import TypeCode from "@/components/TypeCode";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-paper text-ink selection:bg-ink selection:text-paper">
      {/* Background canvas effects */}
      <DotField />

      {/* Typing easter egg: typing 'aditya' triggers hero name re-spelling & wave */}
      <TypeCode word="aditya" />

      {/* Sticky Top Header */}
      <Header />

      {/* Main Content Sections */}
      <main id="main" className="relative z-10 flex-1">
        <Hero />
        <About />
        <Work />
        <Experience />
        <Tools />
        <Contact />
      </main>

      {/* Bottom Footer */}
      <Footer />
    </div>
  );
}
