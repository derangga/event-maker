"use client";
import { Progress } from "@heroui/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export const Loading = ({ userId }) => {
  useEffect(() => {
    if (!userId && userId < 1) return;

    const requestSession = async () => {
      try {
        const response = await fetch("/api/auth/session", {
          method: "POST",
          body: JSON.stringify({ user_id: userId }),
        });

        const route = response.ok ? "/" : "/login";
        redirect(route);
      } catch (error) {
        console.log("[ERROR] failed generate session");
        redirect("/login");
      }
    };
    requestSession();
  }, [userId]);

  return (
    <Progress
      isIndeterminate
      aria-label="Loading..."
      className="max-w-md"
      size="sm"
    />
  );
};
