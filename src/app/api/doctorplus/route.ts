import { NextResponse } from "next/server";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ ok: true, route: "/api/doctorplus" });
}

export async function POST(req: Request) {
  const backendBase =
    process.env.DOCTORPLUS_BACKEND_URL?.replace(/\/$/, "") ||
    "https://doctorplus-backend-ssz2.onrender.com";

  const apiKey = process.env.DOCTORPLUS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "DOCTORPLUS_API_KEY is not set on Vercel" },
      { status: 500 }
    );
  }

  let body: any = null;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60_000);

  try {
    const upstream = await fetch(`${backendBase}/v1/doctorplus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: controller.signal,
    });

    const text = await upstream.text();
    return new NextResponse(text, {
      status: upstream.status,
      headers: {
        "Content-Type":
          upstream.headers.get("content-type") || "application/json",
      },
    });
  } catch (e: any) {
    const isAbort = String(e?.name || "").toLowerCase().includes("abort");
    return NextResponse.json(
      { error: isAbort ? "Upstream timeout" : "Proxy error", details: String(e?.message ?? e) },
      { status: isAbort ? 504 : 502 }
    );
  } finally {
    clearTimeout(timeout);
  }
}