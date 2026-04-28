import { useEffect, useState } from "react";

const STORAGE_KEY = "lead-gate:v1";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

function readUtms() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out = {};
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) out[k] = v;
  }
  return out;
}

export default function LeadGate() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "submitted") return;
    } catch {
      // localStorage indisponível — segue mostrando
    }
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nome = String(data.get("nome") || "").trim();
    const telefone = String(data.get("telefone") || "").trim();
    const email = String(data.get("email") || "").trim();

    if (nome.length < 2 || telefone.length < 8) {
      setError("Preencha nome e WhatsApp para continuar.");
      return;
    }

    setSending(true);
    setError("");

    const payload = {
      nome,
      telefone,
      email: email || null,
      utms: readUtms(),
      referrer: typeof document !== "undefined" ? document.referrer || null : null,
      pageUrl: typeof window !== "undefined" ? window.location.href : null,
    };

    try {
      const res = await fetch("/api/lead-quick", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const result = await res.json().catch(() => ({}));
        setError(result.error || "Erro ao enviar. Tente novamente.");
        setSending(false);
        return;
      }
      try {
        localStorage.setItem(STORAGE_KEY, "submitted");
      } catch {
        // ignora
      }
      setOpen(false);
    } catch {
      setError("Erro de conexão. Verifique sua internet e tente novamente.");
      setSending(false);
    }
  }

  if (!open) return null;

  return (
    <div className="lead-gate" role="dialog" aria-modal="true" aria-labelledby="lead-gate-title">
      <div className="lead-gate__backdrop" aria-hidden="true" />
      <div className="lead-gate__panel">
        <p className="kicker">Acesso reservado</p>
        <h2 id="lead-gate-title">Antes de continuar, deixe seu contato</h2>
        <p className="lead-gate__desc">
          O conteúdo abaixo apresenta a metodologia de mapeamento processual estratégico. Para acessar,
          informe seu nome e WhatsApp — um profissional da equipe poderá entrar em contato de forma reservada.
        </p>
        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="lead-gate-nome">Nome completo</label>
            <input
              id="lead-gate-nome"
              name="nome"
              type="text"
              autoComplete="name"
              required
              aria-required="true"
              disabled={sending}
              autoFocus
            />
          </div>
          <div className="field">
            <label htmlFor="lead-gate-telefone">WhatsApp (com DDD)</label>
            <input
              id="lead-gate-telefone"
              name="telefone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              required
              aria-required="true"
              disabled={sending}
              placeholder="(85) 9 0000-0000"
            />
          </div>
          <div className="field">
            <label htmlFor="lead-gate-email">
              E-mail <span className="lead-gate__optional">(opcional)</span>
            </label>
            <input
              id="lead-gate-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              disabled={sending}
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={sending}>
            {sending ? "Enviando..." : "Acessar conteúdo"}
          </button>
          {error ? (
            <p className="form-feedback error" role="alert" aria-live="assertive">
              {error}
            </p>
          ) : null}
          <p className="lead-gate__privacy">
            Seus dados serão tratados de forma reservada e usados apenas para contato profissional.
          </p>
        </form>
      </div>
    </div>
  );
}
