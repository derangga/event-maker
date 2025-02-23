import { provideSessionAction } from "@/app/(auth)/shared/provide-session-action";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const authorization = request.headers.get("Authorization") || "";
    const accessToken = authorization.split(" ");

    if (!authorization || accessToken[0] !== "Bearer") {
      return new Response(JSON.stringify({ message: "Unauthorize" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const tokenClaims = jwt.verify(accessToken[1], process.env.JWT_SECRET);
    await provideSessionAction(tokenClaims.uid);

    return new Response(JSON.stringify({ message: "ok" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(`[ERROR] ${error}`);
    return new Response(
      JSON.stringify({ errors: [{ message: "failed request session" }] }),
      {
        status: 422,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
