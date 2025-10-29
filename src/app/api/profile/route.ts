import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    user: "Juan",
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}
