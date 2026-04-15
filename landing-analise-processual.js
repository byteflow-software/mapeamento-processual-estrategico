const form = document.getElementById("capturaForm");
const feedback = document.getElementById("formFeedback");

if (form && feedback) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const requiredFields = ["nome", "telefone", "email", "cidade", "resumo"];

    const hasMissingField = requiredFields.some((field) => {
      const value = data.get(field);
      return !value || String(value).trim().length < 2;
    });

    if (hasMissingField) {
      feedback.className = "form-feedback error";
      feedback.textContent = "Por favor, preencha todos os campos para enviar a solicitação.";
      return;
    }

    feedback.className = "form-feedback success";
    feedback.textContent = "Solicitação recebida. A equipe entrará em contato de forma reservada em breve.";
    form.reset();
  });
}
