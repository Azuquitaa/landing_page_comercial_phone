import { AppProvider } from "./context/AppContext";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { PlansSection } from "./components/PlansSection";
import { SlidesSection } from "./components/SlidesSection";
import { FAQSection } from "./components/FAQSection";
import { Footer } from "./components/Footer";
import { WhatsAppFloat } from "./components/WhatsAppFloat";
import { AdminPanel } from "./components/AdminPanel";

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen" style={{ fontFamily: "'Roboto', sans-serif" }}>
        <Header />
        <main>
          <HeroSection />
          <div id="planes">
            <PlansSection />
          </div>
          <SlidesSection />
          <FAQSection />
        </main>
        <Footer />
        <WhatsAppFloat />
        <AdminPanel />
      </div>
    </AppProvider>
  );
}
