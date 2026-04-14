const items = [
  { title: "Casos complexos", desc: "Experiência consolidada em demandas de alta complexidade fático-probatória." },
  { title: "Abordagem individualizada", desc: "Cada mapeamento considera contexto, riscos e particularidades do caso concreto." },
  { title: "Integração advocacia e perícia", desc: "Convergência entre leitura jurídica e suporte técnico-pericial qualificado." },
  { title: "Profundidade e clareza defensiva", desc: "Foco em compreensão consistente dos elementos que sustentam a estratégia." },
];

export default function SocialProof() {
  return (
    <section className="section" id="prova-social" aria-labelledby="prova-social-title">
      <div className="container">
        <p className="kicker">Compromisso de atuação</p>
        <h2 id="prova-social-title">Atuação orientada por técnica, estratégia e atendimento individualizado</h2>
        <ul className="institutional-grid" role="list">
          {items.map((it) => (
            <li key={it.title}>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
