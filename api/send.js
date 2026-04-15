const { Resend } = require("resend");

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

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { nome, telefone, email, cidade, resumo } = req.body || {};

  if (!nome || !telefone || !email || !cidade || !resumo) {
    return res.status(400).json({ error: "Preencha todos os campos." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "E-mail inválido." });
  }

  try {
    await resend.emails.send({
      from: `Mapeamento Processual <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `Nova solicitação de mapeamento — ${nome}`,
      html: `
        <h2>Nova solicitação de mapeamento processual</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:15px">
          <tr><td style="padding:8px 16px 8px 0;font-weight:bold;vertical-align:top">Nome</td><td style="padding:8px 0">${escapeHtml(nome)}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;font-weight:bold;vertical-align:top">Telefone</td><td style="padding:8px 0">${escapeHtml(telefone)}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;font-weight:bold;vertical-align:top">E-mail</td><td style="padding:8px 0">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;font-weight:bold;vertical-align:top">Cidade/Estado</td><td style="padding:8px 0">${escapeHtml(cidade)}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;font-weight:bold;vertical-align:top">Resumo do caso</td><td style="padding:8px 0;white-space:pre-line">${escapeHtml(resumo)}</td></tr>
        </table>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return res.status(500).json({ error: "Erro ao enviar. Tente novamente." });
  }
};
