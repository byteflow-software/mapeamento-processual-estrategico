const items = [
  "Processos criminais complexos e de alta repercussão",
  "Casos com provas digitais extraídas de celulares, computadores ou nuvem",
  "Ações com grande volume documental e múltiplas diligências",
  "Processos com elevado grau de tecnicidade probatória",
  "Defesas que precisam revisar ou reconstruir a estratégia probatória",
  "Recursos e revisões criminais que demandam releitura dos autos",
];

export default function ForWhom() {
  return (
    <section className="section for-whom" id="para-quem" aria-labelledby="para-quem-title">
      <div className="container split">
        <div>
          <p className="kicker">Para quem é indicado</p>
          <h2 id="para-quem-title">Indicado para situações que exigem leitura técnica aprofundada</h2>
        </div>
        <ul className="check-list">
          {items.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
