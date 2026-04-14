const faqs = [
  { q: "Em quais casos esse mapeamento é indicado?", a: "É recomendado para processos de alta complexidade, especialmente quando há provas digitais, grande volume documental ou questões técnicas relevantes envolvidas." },
  { q: "O mapeamento é realizado apenas por advogado?", a: "Não. A metodologia contempla atuação jurídica com apoio técnico-pericial qualificado, conforme as características e a demanda de cada caso." },
  { q: "Qual a diferença entre uma análise comum e o mapeamento processual estratégico?", a: "O mapeamento processual estratégico combina leitura jurídica aprofundada e exame técnico-pericial, entregando diagnóstico mais consistente e com maior densidade estratégica." },
  { q: "Posso solicitar mesmo com o processo em andamento?", a: "Sim. A avaliação pode ser solicitada em diferentes fases processuais, considerando o momento do feito e os objetivos da defesa." },
  { q: "O atendimento pode ser feito online?", a: "Sim. O atendimento ocorre de forma online ou presencial, sempre com condução reservada e estruturada." },
];

export default function Faq() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <p className="kicker">FAQ</p>
        <h2 id="faq-title">Perguntas frequentes</h2>
        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </div>
    </section>
  );
}
