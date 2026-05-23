'use client'

import Pusher from "pusher-js";
import { useEffect, useState } from "react"

type Feedback = {
  id: string,
  message: string,
  createdAt: Date
}

type Props = {
  projectId: string;
  initialFeedbacks: Feedback[];
};

export default function FeedbackList({ projectId, initialFeedbacks }: Props) {
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks);

  useEffect(() => {
    const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusherClient.subscribe(projectId);

    channel.bind("new-feedback", (data: Feedback) => {
      setFeedbacks(prev => [data, ...prev]);
    });

    return () => {
      pusherClient.unsubscribe(projectId);
    };
  }, [projectId]);

  return (
  <div className="mt-6 space-y-1">
    {feedbacks.length === 0 && (
      <div className="text-center py-16 border border-dashed border-border rounded-xl">
        <p className="text-sm text-muted-foreground">no feedback yet</p>
        <p className="text-xs text-muted-foreground/60 mt-1">
          feedback will appear here in realtime
        </p>
      </div>
    )}

    {feedbacks.map((f) => (
      <div
        key={f.id}
        className="flex items-start gap-3 px-4 py-3 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-foreground/30 mt-2 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground leading-relaxed">{f.message}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {new Date(f.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    ))}
  </div>
)
}