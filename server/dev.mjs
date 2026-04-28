import { createServer } from "node:http";
import { Resend } from "resend";
import { config } from "dotenv";

config();

const RESEND_KEY = process.env.RESEND_API_KEY;
const resend = RESEND_KEY ? new Resend(RESEND_KEY) : null;
if (!resend) {
  console.warn("[dev] RESEND_API_KEY ausente — emails NÃO serão enviados, apenas logados no console.");
}
const TO_EMAIL = process.env.LEAD_TO_EMAIL || "contato@dellanosousa.com.br";
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || "site@dellanosousa.com.br";

async function sendOrLog(payload, label) {
  if (!resend) {
    console.log(`\n[dev] >>> ${label} (mock — sem RESEND_API_KEY)`);
    console.log(JSON.stringify(payload, null, 2));
    return;
  }
  await resend.emails.send(payload);
}

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

  if (req.method !== "POST" || (req.url !== "/api/send" && req.url !== "/api/lead-quick")) {
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

  if (req.url === "/api/lead-quick") {
    const { nome, telefone, email, utms, referrer, pageUrl } = data;
    if (!nome || !telefone) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Preencha nome e WhatsApp." }));
    }
    const utmSource = utms && utms.utm_source ? ` [${utms.utm_source}]` : "";
    const utmsHtml =
      utms && Object.keys(utms).length
        ? Object.entries(utms)
            .filter(([, v]) => v)
            .map(([k, v]) => `<div><strong>${escapeHtml(k)}:</strong> ${escapeHtml(v)}</div>`)
            .join("")
        : "<em>nenhum</em>";

    try {
      await sendOrLog({
        from: `Mapeamento Processual <${FROM_EMAIL}>`,
        to: [TO_EMAIL],
        replyTo: email || undefined,
        subject: `Lead curioso (gate)${utmSource} — ${nome}`,
        html: `
          <h2>Novo lead capturado pelo formulário de entrada</h2>
          <p style="font-family:sans-serif;font-size:14px;color:#555">Lead capturado <strong>antes</strong> de visualizar o conteúdo da landing.</p>
          <table style="border-collapse:collapse;font-family:sans-serif;font-size:15px">
            <tr><td style="padding:8px 16px 8px 0;font-weight:bold;vertical-align:top">Nome</td><td style="padding:8px 0">${escapeHtml(nome)}</td></tr>
            <tr><td style="padding:8px 16px 8px 0;font-weight:bold;vertical-align:top">WhatsApp</td><td style="padding:8px 0">${escapeHtml(telefone)}</td></tr>
            <tr><td style="padding:8px 16px 8px 0;font-weight:bold;vertical-align:top">E-mail</td><td style="padding:8px 0">${email ? escapeHtml(email) : "<em>não informado</em>"}</td></tr>
            <tr><td style="padding:8px 16px 8px 0;font-weight:bold;vertical-align:top">UTMs</td><td style="padding:8px 0">${utmsHtml}</td></tr>
            <tr><td style="padding:8px 16px 8px 0;font-weight:bold;vertical-align:top">Referrer</td><td style="padding:8px 0">${referrer ? escapeHtml(referrer) : "<em>direto</em>"}</td></tr>
            <tr><td style="padding:8px 16px 8px 0;font-weight:bold;vertical-align:top">Página</td><td style="padding:8px 0">${pageUrl ? escapeHtml(pageUrl) : "—"}</td></tr>
          </table>
        `,
      }, "lead-quick");
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ ok: true }));
    } catch (err) {
      console.error("Resend error:", err);
      res.writeHead(500, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Erro ao enviar. Tente novamente." }));
    }
  }

  const { nome, telefone, email, cidade, resumo } = data;
  if (!nome || !telefone || !email || !cidade || !resumo) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Preencha todos os campos." }));
  }

  try {
    await sendOrLog({
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
    }, "send (form longo)");

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
