export default function FinalCta({ whatsappUrl }) {
  return (
    <section className="section final-cta" id="contato" aria-labelledby="contato-title">
      <div className="container">
        <h2 id="contato-title">Solicite o mapeamento estratégico do seu caso</h2>
        <p>Atendimento técnico, reservado e direcionado para situações de real complexidade.</p>
        <div className="hero-actions center">
          <a
            className="btn btn-whatsapp"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar agora no WhatsApp (abre em nova aba)"
          >
            Quero falar agora
          </a>
          <a className="btn btn-primary" href="#formulario">
            Solicitar mapeamento
          </a>
        </div>
      </div>
    </section>
  );
}
