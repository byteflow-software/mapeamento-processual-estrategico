const items = [
  { title: "Análise aprofundada dos autos", desc: "Leitura detalhada da estrutura processual e dos pontos técnicos mais relevantes para a defesa." },
  { title: "Leitura estratégica de provas digitais", desc: "Avaliação criteriosa de extrações, registros e cadeia de custódia da prova eletrônica." },
  { title: "Nulidades e fragilidades probatórias", desc: "Mapeamento técnico-jurídico de vulnerabilidades com impacto direto na estratégia defensiva." },
  { title: "Apoio técnico-pericial integrado", desc: "Advogado e perito atuam de forma coordenada para ampliar a profundidade da análise." },
  { title: "Convergência entre tese e técnica", desc: "Alinhamento entre tese jurídica, fatos e elementos técnicos para maior consistência argumentativa." },
  { title: "Atendimento reservado e estratégico", desc: "Condução discreta, profissional e personalizada conforme o contexto de cada caso." },
];

export default function Differentials() {
  return (
    <section className="section" id="diferenciais" aria-labelledby="diferenciais-title">
      <div className="container">
        <p className="kicker">O que entregamos</p>
        <h2 id="diferenciais-title">Diferenciais do mapeamento processual estratégico</h2>
        <ul className="cards-grid" role="list">
          {items.map((it) => (
            <li key={it.title} className="card">
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
