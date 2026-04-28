import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Authority from "./components/Authority.jsx";
import Differentials from "./components/Differentials.jsx";
import ForWhom from "./components/ForWhom.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import LeadForm from "./components/LeadForm.jsx";
import LeadGate from "./components/LeadGate.jsx";
import SocialProof from "./components/SocialProof.jsx";
import Faq from "./components/Faq.jsx";
import FinalCta from "./components/FinalCta.jsx";
import Footer from "./components/Footer.jsx";

const WHATSAPP_URL = "https://wa.me/558597862000";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo-principal">
        Pular para o conteúdo principal
      </a>
      <div className="page-bg" aria-hidden="true" />
      <Header />
      <main id="conteudo-principal">
        <Hero whatsappUrl={WHATSAPP_URL} />
        <Authority />
        <Differentials />
        <ForWhom />
        <HowItWorks />
        <LeadForm />
        <SocialProof />
        <Faq />
        <FinalCta whatsappUrl={WHATSAPP_URL} />
      </main>
      <Footer />
      <LeadGate />
    </>
  );
}
