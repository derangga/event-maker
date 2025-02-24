import { cookies } from "next/headers";
import { RegisterForm } from "./components/register-form";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookie = await cookies();
  const session = cookie.get("session_id");
  if (session) {
    redirect("/");
  }
  return <RegisterForm />;
}
