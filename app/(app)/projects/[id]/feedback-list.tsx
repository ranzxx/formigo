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
      // tambah feedback baru ke state
      setFeedbacks(prev => [data, ...prev]);
    });

    // cleanup waktu komponen unmount
    return () => {
      pusherClient.unsubscribe(projectId);
    };
  }, [projectId]);

  return (
    <div>
      {feedbacks.length === 0 && (
        <p className="flex justify-center text-muted-foreground">no feedback</p>
      )}

      {feedbacks &&
        feedbacks.map((f) => (
          <div key={f.id}>
            <p>{f.message}</p>
          </div>
        ))}
    </div>
  );
}