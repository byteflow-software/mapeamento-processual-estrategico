export default function Hero({ whatsappUrl }) {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-content">
          <p className="kicker">Atuação jurídica e pericial integrada</p>
          <h1 id="hero-title">Mapeamento processual estratégico para casos complexos</h1>
          <p className="hero-subtitle">
            Advogado criminalista e perito digital atuam em conjunto na leitura aprofundada dos
            autos, na análise das provas e na identificação de fragilidades que fortalecem a
            estratégia de defesa.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#formulario">
              Solicitar mapeamento
            </a>
            <a
              className="btn btn-whatsapp"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar no WhatsApp (abre em nova aba)"
            >
              Falar no WhatsApp
            </a>
          </div>
          <ul className="hero-points" aria-label="Pilares de atuação">
            <li>Leitura estratégica de provas digitais</li>
            <li>Profundidade técnica e visão defensiva</li>
            <li>Atendimento reservado e personalizado</li>
          </ul>
        </div>

        <figure className="hero-media">
          <img
            src="/hero.jpeg"
            alt="Advogado e perito digital reunidos em escritório para análise estratégica de caso"
            width="560"
            height="746"
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}
