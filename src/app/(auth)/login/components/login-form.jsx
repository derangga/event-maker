"use client";

import { addToast, Button, Form, Input } from "@heroui/react";
import { redirect, useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { loginAction, loginGoogleAction } from "../action/login-action";
import { GoogleIcon } from "./oauth-button";

export const LoginForm = () => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const [oauthState, oauthFormAction, isPendingOuth] = useActionState(
    loginGoogleAction,
    null
  );

  useEffect(() => {
    if (state?.success) {
      redirect("/");
    } else if (!state?.success && state?.message) {
      addToast({
        title: "Login failed",
        description: state?.message,
        color: "danger",
      });
    }
  }, [state]);

  return (
    <main className="flex flex-col w-screen h-screen justify-center items-center">
      <div className="w-full max-w-md flex flex-col border rounded-xl p-10 shadow-md">
        <Form className="gap-4" validationBehavior="native" action={formAction}>
          <Input
            isRequired
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
          />

          <Input
            isRequired
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            type="password"
          />
          <div className="flex gap-2 w-full">
            <Button
              variant="flat"
              className="grow"
              onPress={() => {
                router.push("/register");
              }}
            >
              Sign up
            </Button>
            <Button
              color="primary"
              type="submit"
              className="grow"
              isLoading={isPending}
            >
              Sign in
            </Button>
          </div>
        </Form>
        <Form className="mt-4" action={oauthFormAction}>
          <Button
            variant="bordered"
            type="submit"
            fullWidth
            startContent={<GoogleIcon />}
            isLoading={isPendingOuth}
          >
            Sign in with Google
          </Button>
        </Form>
      </div>
    </main>
  );
};
