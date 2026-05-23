(function () {
  const script = document.currentScript;
  const projectId = script.getAttribute("data-project-id");
  const baseUrl = script.src.replace("/widget.js", "");

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
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      z-index: 9999;
      box-shadow: 0 2px 12px rgba(0,0,0,0.15);
      transition: background 0.2s;
    }
    #formigo-btn:hover { background: #0F6E56; }
    #formigo-popup {
      position: fixed;
      bottom: 72px;
      right: 24px;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 16px;
      width: 300px;
      z-index: 9999;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      box-shadow: 0 4px 24px rgba(0,0,0,0.1);
    }
    #formigo-popup h4 {
      margin: 0 0 4px;
      font-size: 14px;
      font-weight: 600;
      color: #111;
    }
    #formigo-popup p {
      margin: 0 0 12px;
      font-size: 12px;
      color: #6b7280;
    }
    #formigo-textarea {
      width: 100%;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 8px 10px;
      font-size: 13px;
      font-family: inherit;
      resize: none;
      outline: none;
      box-sizing: border-box;
      color: #111;
    }
    #formigo-textarea:focus { border-color: #1D9E75; }
    #formigo-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
    }
    #formigo-submit {
      background: #1D9E75;
      color: white;
      border: none;
      padding: 7px 14px;
      border-radius: 6px;
      font-size: 13px;
      cursor: pointer;
      font-family: inherit;
    }
    #formigo-submit:hover { background: #0F6E56; }
    #formigo-submit:disabled { opacity: 0.6; cursor: not-allowed; }
    #formigo-close {
      background: none;
      border: none;
      font-size: 18px;
      color: #9ca3af;
      cursor: pointer;
      line-height: 1;
    }
    #formigo-close:hover { color: #111; }
    #formigo-brand {
      font-size: 11px;
      color: #9ca3af;
    }
  `;
  document.head.appendChild(style);

  // buat tombol
  const btn = document.createElement("button");
  btn.id = "formigo-btn";
  btn.innerText = "Feedback";
  document.body.appendChild(btn);

  btn.addEventListener("click", () => {
    if (document.getElementById("formigo-popup")) return;

    const popup = document.createElement("div");
    popup.id = "formigo-popup";
    popup.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
        <div>
          <h4>share your feedback</h4>
          <p>we'd love to hear what you think</p>
        </div>
        <button id="formigo-close" aria-label="close">×</button>
      </div>
      <textarea id="formigo-textarea" rows="4" placeholder="what's on your mind?"></textarea>
      <div id="formigo-footer">
        <span id="formigo-brand">powered by formigo</span>
        <button id="formigo-submit">send</button>
      </div>
    `;
    document.body.appendChild(popup);

    // close button
    document.getElementById("formigo-close").addEventListener("click", () => {
      popup.remove();
    });

    // submit
    document.getElementById("formigo-submit").addEventListener("click", async () => {
      const textarea = document.getElementById("formigo-textarea");
      const submitBtn = document.getElementById("formigo-submit");
      const message = textarea.value.trim();

      if (!message) {
        textarea.style.borderColor = "#ef4444";
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerText = "sending...";

      const res = await fetch(`${baseUrl}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, projectId }),
      });

      if (res.ok) {
        popup.innerHTML = `
          <div style="text-align:center;padding:16px 0">
            <div style="font-size:28px;margin-bottom:8px">✓</div>
            <h4 style="color:#1D9E75;margin:0 0 4px">thanks for your feedback!</h4>
            <p style="margin:0;font-size:12px;color:#6b7280">we appreciate your input</p>
          </div>
        `;
        setTimeout(() => popup.remove(), 2500);
      } else {
        submitBtn.disabled = false;
        submitBtn.innerText = "send";
        textarea.style.borderColor = "#ef4444";
      }
    });
  });
})();