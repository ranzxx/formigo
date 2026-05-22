"use client";

import { useEffect, useState } from "react";

const messages = [
  { msg: '"The onboarding flow is really smooth!"', site: "myapp.com" },
  { msg: '"Dark mode would be a great addition"', site: "myapp.com" },
  { msg: '"Search feature is missing on docs"', site: "myapp.com" },
  { msg: '"Love the new dashboard design!"', site: "myapp.com" },
  { msg: '"Can you add CSV export?"', site: "myapp.com" },
  { msg: '"Response time is super fast"', site: "myapp.com" },
];

export default function FeedbackDemo() {
  const [items, setItems] = useState(messages.slice(0, 3));
  const [idx, setIdx] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const next = [messages[idx % messages.length], ...prev.slice(0, 3)];
        return next;
      });
      setIdx((i) => i + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [idx]);

  return (
    <div className="mx-8 border border-border rounded-xl bg-muted p-5">
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
        live feedback dashboard
      </p>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 bg-background border border-border rounded-lg px-4 py-3"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5 shrink-0" />
            <div>
              <p className="text-sm text-foreground">{item.msg}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {item.site} · just now
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
