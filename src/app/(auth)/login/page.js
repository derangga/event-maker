import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginForm } from "./components/login-form";

export default async function Page() {
  const cookie = await cookies();
  const session = cookie.get("session_id");
  if (session) {
    redirect("/");
  }

  return <LoginForm />;
}
