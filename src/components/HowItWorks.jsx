const steps = [
  { n: 1, title: "Envio inicial das informações", desc: "Você compartilha, de forma reservada, os dados essenciais para a compreensão preliminar do caso." },
  { n: 2, title: "Triagem do caso", desc: "A equipe avalia pertinência, urgência e escopo técnico-jurídico da demanda." },
  { n: 3, title: "Análise jurídica e técnica", desc: "Exame aprofundado dos autos, das provas digitais e das fragilidades de sustentação." },
  { n: 4, title: "Retorno estratégico", desc: "Entrega de direcionamento técnico-jurídico com clareza sobre os próximos passos da defesa." },
];

export default function HowItWorks() {
  return (
    <section className="section" id="como-funciona" aria-labelledby="como-funciona-title">
      <div className="container">
        <p className="kicker">Como funciona</p>
        <h2 id="como-funciona-title">Fluxo simples e objetivo</h2>
        <ol className="timeline" aria-label="Etapas do mapeamento">
          {steps.map((s) => (
            <li key={s.n} className="timeline-item">
              <span aria-hidden="true">{s.n}</span>
              <h3>
                <span className="visually-hidden">Etapa {s.n}: </span>
                {s.title}
              </h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
