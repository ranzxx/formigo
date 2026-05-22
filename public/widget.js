const style = document.createElement("style");
style.innerHTML = `
  #formigo-btn {
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: #1D9E75;
    color: white;
    border: none;
    padding: 10px 18px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-family: sans-serif;
    z-index: 9999;
  }
  #formigo-form {
    position: fixed;
    bottom: 72px;
    right: 24px;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 16px;
    width: 280px;
    z-index: 9999;
    font-family: sans-serif;
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  }
`;
document.head.appendChild(style);

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
