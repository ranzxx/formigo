const script = document.currentScript;
const projectId = script.getAttribute("data-project-id");

const button = document.createElement("button");
button.innerText = "Feedback";
document.body.appendChild(button);

button.addEventListener("click", () => {
  if (document.getElementById("formigo-form")) return;
  const form = document.createElement("form");
  const textarea = document.createElement("textarea");
  const submitBtn = document.createElement("button");

  submitBtn.innerText = "Submit";
  form.appendChild(textarea);
  form.appendChild(submitBtn);
  document.body.appendChild(form);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";

    const scriptSrc = script.src;
    const baseUrl = scriptSrc.replace("/widget.js", "");

    await fetch(`${baseUrl}/api/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: textarea.value,
        projectId,
      }),
    });

    form.remove();
    button.innerText = "Thanks! ✓";
  });

  form.id = "formigo-form";
});