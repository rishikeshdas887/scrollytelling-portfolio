import Navbar from "@/components/Navbar";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import ScrollHUD from "@/components/ScrollHUD";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#05080e] text-slate-100 selection:bg-amber-500/30 selection:text-white">
      {/* Magnetic Custom Cursor */}
      <CustomCursor />

      {/* Floating Glass Navigation */}
      <Navbar />

      {/* Vertical Navigation & Chapter Progress Rail */}
      <ScrollHUD />

      {/* 500vh Cinematic Scrollytelling Sequence */}
      <ScrollyCanvas totalFrames={240} />

      {/* Capabilities Bento Grid */}
      <TechStack />

      {/* Selected Works Case Studies with Filters & Deep Dives */}
      <Projects />

      {/* Engineering Philosophy & Milestones */}
      <Experience />

      {/* Contact Portal & Terminal Footer */}
      <Contact />
    </main>
  );
}
