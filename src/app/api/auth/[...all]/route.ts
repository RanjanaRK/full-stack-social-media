export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: Request) {
  const { auth } = await import("@/lib/auth");
  const { toNextJsHandler } = await import("better-auth/next-js");

  const handler = toNextJsHandler(auth); // 👈 create once inside function
  return handler.GET(req); // 👈 call after
}

export async function POST(req: Request) {
  const { auth } = await import("@/lib/auth");
  const { toNextJsHandler } = await import("better-auth/next-js");

  const handler = toNextJsHandler(auth);
  return handler.POST(req);
}
