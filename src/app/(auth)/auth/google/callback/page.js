import { redirect } from "next/navigation";
import {
  appAuthFlow,
  registerGoogleAction,
  validateGoogleAuth,
} from "./action/google-auth";
import { Loading } from "./components/loading";

export default async function Page({ searchParams }) {
  const query = await searchParams;
  const account = await validateGoogleAuth(query);

  if (!account) {
    redirect("/login");
  }

  const authFlow = await appAuthFlow(account);
  if (authFlow.authType === "register") {
    const result = await registerGoogleAction(account);
    const route = result.success ? "/" : "/login";
    redirect(route);
  }

  return (
    <main className="flex flex-col w-screen h-screen justify-center items-center">
      <Loading token={`${authFlow.token}`} />
    </main>
  );
}
