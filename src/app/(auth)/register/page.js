"use client";

import { addToast, Button, Form, Input } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { registerAction } from "./_action/register-action";

export default function Page() {
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formEvent = e.currentTarget;
    const form = new FormData(formEvent);
    const password = Object.fromEntries(form)?.password;

    if (password.length < 8) {
      setErrors({ password: "minimum password character 8" });
      return;
    }

    let isUpper = false;
    let isLower = false;
    let isNumber = false;
    let isSpecial = false;

    for (const c of password) {
      if (c === c.toUpperCase()) {
        isUpper = true;
      }
      if (c === c.toLowerCase()) {
        isLower = true;
      }

      if (!isNaN(parseInt(c))) {
        isNumber = true;
      }

      if (!/[a-zA-Z0-9]/.test(c)) {
        isSpecial = true;
      }
    }

    if (!isUpper || !isLower || !isNumber || !isSpecial) {
      setErrors({
        password:
          "password must contains lower, upper, number, and special character",
      });

      return;
    }

    const result = await registerAction(form);

    if (!result.success) {
      addToast({
        title: "Register failed",
        description: result.message,
        color: "danger",
      });

      return;
    }

    formEvent.reset();

    // TODO: implement login process after success register
  };

  return (
    <main className="flex flex-col w-screen h-screen justify-center items-center">
      <Form
        className="w-full max-w-md flex flex-col gap-4 border rounded-xl p-10 shadow-md"
        validationErrors={errors}
        onSubmit={onSubmit}
      >
        <Input
          isRequired
          label="Name"
          labelPlacement="outside"
          name="name"
          placeholder="Enter your name"
          type="text"
        />
        <Input
          isRequired
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your username"
          type="email"
        />
        <Input
          isRequired
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type={isVisible ? "text" : "password"}
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeOff className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <Eye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
        />
        <div className="flex gap-2 w-full justify-end">
          <Button color="primary" type="submit">
            Register
          </Button>
        </div>
      </Form>
    </main>
  );
}
