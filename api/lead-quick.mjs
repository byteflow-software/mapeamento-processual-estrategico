import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = process.env.LEAD_TO_EMAIL || "contato@dellanosousa.com.br";
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || "site@dellanosousa.com.br";

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderUtms(utms) {
  if (!utms || typeof utms !== "object") return "<em>nenhum</em>";
  const entries = Object.entries(utms).filter(([, v]) => v);
  if (entries.length === 0) return "<em>nenhum</em>";
  return entries
    .map(([k, v]) => `<div><strong>${escapeHtml(k)}:</strong> ${escapeHtml(v)}</div>`)
    .join("");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { nome, telefone, email, utms, referrer, pageUrl } = req.body || {};

  if (!nome || !telefone) {
    return res.status(400).json({ error: "Preencha nome e WhatsApp." });
  }

  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "E-mail inválido." });
    }
  }

  const utmSource = utms && utms.utm_source ? ` [${utms.utm_source}]` : "";

  try {
    await resend.emails.send({
      from: `Mapeamento Processual <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      replyTo: email || undefined,
      subject: `Lead curioso (gate)${utmSource} — ${nome}`,
      html: `
        <h2>Novo lead capturado pelo formulário de entrada</h2>
        <p style="font-family:sans-serif;font-size:14px;color:#555">
          Lead capturado <strong>antes</strong> de visualizar o conteúdo da landing.
        </p>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:15px">
          <tr><td style="padding:8px 16px 8px 0;font-weight:bold;vertical-align:top">Nome</td><td style="padding:8px 0">${escapeHtml(nome)}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;font-weight:bold;vertical-align:top">WhatsApp</td><td style="padding:8px 0">${escapeHtml(telefone)}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;font-weight:bold;vertical-align:top">E-mail</td><td style="padding:8px 0">${email ? escapeHtml(email) : "<em>não informado</em>"}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;font-weight:bold;vertical-align:top">UTMs</td><td style="padding:8px 0">${renderUtms(utms)}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;font-weight:bold;vertical-align:top">Referrer</td><td style="padding:8px 0">${referrer ? escapeHtml(referrer) : "<em>direto</em>"}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;font-weight:bold;vertical-align:top">Página</td><td style="padding:8px 0">${pageUrl ? escapeHtml(pageUrl) : "—"}</td></tr>
        </table>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return res.status(500).json({ error: "Erro ao enviar. Tente novamente." });
  }
}
