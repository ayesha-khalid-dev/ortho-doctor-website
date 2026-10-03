import Services from "./components/Services";
import PatientStories from "./components/PatientStories";
import ContactSection from "./components/ContactSection";
import Testimonials from "./components/Testimonials";
import DoctorProfile from "./components/DoctorProfile";
import ScrollAnatomySection from "./components/anatomy/ScrollAnatomySection";
import AnnouncementBar from "./components/AnnouncementBar";
import Hero from "./components/Hero";
import ConditionsGrid from "./components/ConditionsGrid";
import SymptomChips from "./components/SymptomChips";
import TreatmentJourney from "./components/TreatmentJourney";
import WhyChooseUs from "./components/WhyChooseUs";
import BodyMap from "./components/BodyMap";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      {/* Top scrolling banner */}
      <AnnouncementBar />

      {/* Hero */}
      <Hero />

      {/* Pastel condition tiles */}
      <ConditionsGrid />

      {/* Symptom chips */}
      <SymptomChips />

      {/* Treatment journey with animated arrows */}
      <TreatmentJourney />

      {/* Stats + why choose us */}
      <WhyChooseUs />

      {/* Interactive body map */}
      <BodyMap />

      {/* Scroll-driven 3D anatomy assembly */}
      <ScrollAnatomySection />

      <DoctorProfile />
      <Services />
      <Testimonials />
      <PatientStories />
      <ContactSection />
    </main>
  );
}