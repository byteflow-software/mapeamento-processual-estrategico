import { useState } from "react";

const fields = [
  { id: "nome", label: "Nome completo", type: "text", autoComplete: "name" },
  { id: "telefone", label: "Telefone", type: "tel", autoComplete: "tel", inputMode: "tel" },
  { id: "email", label: "E-mail", type: "email", autoComplete: "email", inputMode: "email" },
  { id: "cidade", label: "Cidade/Estado", type: "text", autoComplete: "address-level2" },
];

export default function LeadForm() {
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [sending, setSending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const missing = [...fields.map((f) => f.id), "resumo"].some((k) => {
      const v = data.get(k);
      return !v || String(v).trim().length < 2;
    });
    if (missing) {
      setStatus({ type: "error", message: "Por favor, preencha todos os campos para enviar a solicitação." });
      return;
    }

    setSending(true);
    setStatus({ type: "idle", message: "" });

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });

      const result = await res.json();

      if (!res.ok) {
        setStatus({ type: "error", message: result.error || "Erro ao enviar. Tente novamente." });
        return;
      }

      setStatus({
        type: "success",
        message: "Solicitação recebida. A equipe entrará em contato de forma reservada em breve.",
      });
      form.reset();
    } catch {
      setStatus({ type: "error", message: "Erro de conexão. Verifique sua internet e tente novamente." });
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="section lead-form" id="formulario" aria-labelledby="formulario-title">
      <div className="container split-form">
        <div>
          <p className="kicker">Solicitação inicial</p>
          <h2 id="formulario-title">Preencha os dados para solicitar a análise inicial do seu caso</h2>
          <p>O contato será realizado de forma reservada, por profissional da equipe, em horário combinado.</p>
        </div>
        <form onSubmit={handleSubmit} noValidate aria-describedby="form-feedback">
          {fields.map((f) => (
            <div className="field" key={f.id}>
              <label htmlFor={f.id}>{f.label}</label>
              <input
                id={f.id}
                name={f.id}
                type={f.type}
                autoComplete={f.autoComplete}
                inputMode={f.inputMode}
                required
                aria-required="true"
                disabled={sending}
              />
            </div>
          ))}
          <div className="field">
            <label htmlFor="resumo">Breve resumo do caso</label>
            <textarea id="resumo" name="resumo" rows="5" required aria-required="true" disabled={sending} />
          </div>
          <button className="btn btn-primary" type="submit" disabled={sending}>
            {sending ? "Enviando..." : "Solicitar mapeamento"}
          </button>
          <p
            id="form-feedback"
            className={`form-feedback ${status.type === "idle" ? "" : status.type}`}
            role="status"
            aria-live="polite"
          >
            {status.message}
          </p>
        </form>
      </div>
    </section>
  );
}
