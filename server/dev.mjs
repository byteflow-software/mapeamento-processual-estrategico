import { createServer } from "node:http";
import { Resend } from "resend";
import { config } from "dotenv";

config();

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

const server = createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.method !== "POST" || req.url !== "/api/send") {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Not found" }));
  }

  let body = "";
  for await (const chunk of req) body += chunk;

  let data;
  try {
    data = JSON.parse(body);
  } catch {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "JSON inválido" }));
  }

  const { nome, telefone, email, cidade, resumo } = data;
  if (!nome || !telefone || !email || !cidade || !resumo) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Preencha todos os campos." }));
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

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
  } catch (err) {
    console.error("Resend error:", err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Erro ao enviar. Tente novamente." }));
  }
});

server.listen(3001, () => {
  console.log("API dev server running on http://localhost:3001");
});
