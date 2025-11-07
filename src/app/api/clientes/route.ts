import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "clientes.csv");

// Asegura que exista la carpeta y el CSV con encabezados
function ensureCSV() {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "Nombre,Apellido,Celular,Email\n", "utf8");
  }
}

// Escribe la lista completa de clientes al CSV
function writeCSV(clientes: Array<{ nombre: string; apellido: string; celular: string; email: string }>) {
  const encabezados = "Nombre,Apellido,Celular,Email";
  const filas = clientes
    .map((c) =>
      [c.nombre, c.apellido, c.celular, c.email]
        .map((v) => (v ?? "").toString().replace(/"/g, '""')) // escapa comillas
        .map((v) => (v.includes(",") ? `"${v}"` : v)) // encapsula valores con coma
        .join(",")
    )
    .join("\n");
  const contenido = `${encabezados}\n${filas}${filas ? "\n" : ""}`;
  fs.writeFileSync(filePath, contenido, "utf8");
}

// Lee todos los clientes del CSV
function readCSV(): Array<{ nombre: string; apellido: string; celular: string; email: string }> {
  ensureCSV();
  const contenido = fs.readFileSync(filePath, "utf8");
  const lineas = contenido.split("\n").filter((l) => l.trim() !== "");
  const datos = lineas.slice(1); // quita encabezado
  return datos.map((l) => {
    const cols = l.split(",");
    const [nombre = "", apellido = "", celular = "", email = ""] = cols;
    return { nombre, apellido, celular, email };
  });
}

// 👉 GET: devuelve todos los clientes
export async function GET() {
  try {
    const clientes = readCSV();
    return NextResponse.json(clientes);
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Error inesperado" }, { status: 500 });
  }
}

// 👉 POST: agrega un nuevo cliente
export async function POST(req: Request) {
  try {
    ensureCSV();
    const nuevoCliente = await req.json();
    const clientes = readCSV();
    clientes.push(nuevoCliente);
    writeCSV(clientes);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Error inesperado" }, { status: 500 });
  }
}

// 👉 PUT: edita un cliente existente (por email como identificador)
export async function PUT(req: Request) {
  try {
    const clienteEditado = await req.json();
    let clientes = readCSV();
    clientes = clientes.map((c) =>
      c.email === clienteEditado.email ? clienteEditado : c
    );
    writeCSV(clientes);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Error inesperado" }, { status: 500 });
  }
}

// 👉 DELETE: elimina un cliente (por email como identificador)
export async function DELETE(req: Request) {
  try {
    const { email } = await req.json();
    let clientes = readCSV();
    clientes = clientes.filter((c) => c.email !== email);
    writeCSV(clientes);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Error inesperado" }, { status: 500 });
  }
}
