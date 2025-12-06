import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "catalogo.json");
    const content = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(content);
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Error leyendo catalogo.json:", err);
    return NextResponse.json({ error: err.message || "Error leyendo catálogo" }, { status: 500 });
  }
}
