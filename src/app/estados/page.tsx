"use client";

import Link from "next/link";

export default function EstadosPage() {
  return (
    <div className="page center-screen stack stack-gap-md">
      <h1 className="titulo-seccion text-center">Estado de cuenta</h1>

      <div className="stack stack-gap-md text-center">
        <Link href="/estados/clientes" className="btn btn-uvas">
          Estado de cuenta de clientes
        </Link>
        <Link href="/estados/empresa" className="btn btn-uvas">
          Estado de cuenta global (empresa)
        </Link>
      </div>
    </div>
  );
}
