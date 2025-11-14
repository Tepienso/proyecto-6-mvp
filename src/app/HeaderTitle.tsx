"use client";

import { usePathname } from "next/navigation";

export default function HeaderTitle() {
  const pathname = usePathname();

  const map: Record<string, string> = {
    "/": "UVAS",
    "/clientes": "Clientes",
    "/pedidos": "Pedidos",
    "/estados": "Estados de cuenta",
    "/herramientas": "Herramientas",
    "/ejemplo": "Ejemplo ",
  };

  const titulo = map[pathname] ?? "UVAS";

  return <h1 className="titulo-pagina">{titulo}</h1>;
}
