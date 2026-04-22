export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: Request) {
  const { auth } = await import("@/lib/auth");
  const { toNextJsHandler } = await import("better-auth/next-js");
  const { GET } = toNextJsHandler(auth);
  return GET(req);
}

export async function POST(req: Request) {
  const { auth } = await import("@/lib/auth");
  const { toNextJsHandler } = await import("better-auth/next-js");
  const { POST } = toNextJsHandler(auth);
  return POST(req);
}
