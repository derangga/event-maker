import { provideSessionAction } from "@/app/(auth)/shared/provide-session-action";

export async function POST(request) {
  try {
    const { user_id } = await request.json();
    await provideSessionAction(user_id);

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
