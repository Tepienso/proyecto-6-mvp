"use client";

import { useState } from "react";
import Link from "next/link";
import pedidos from "@/data/pedidos.json";       // ✅ Importamos los pedidos reales
import { Pedido } from "@/types/pedidos";       // ✅ Importamos el tipo Pedido

export default function EstadoClientesPage() {
  // Usamos directamente los pedidos importados
  const [clientes] = useState<Pedido[]>(pedidos);

  return (
    <div className="page center-screen stack stack-gap-md">
      <h1 className="titulo-seccion text-center">Estado de cuenta de clientes</h1>

      <div className="tabla-container">
        <table className="tabla-ordenada">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Código</th>
              <th>Artículo</th>
              <th>Cantidad</th>
              <th>Precio Público ($)</th>
              <th>Pedido al proveedor</th>
              <th>Entregado</th>
              <th>Pagado</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((p) => (
              <tr key={p.id}>
                <td>{p.clienteNombre}</td>
                <td>{p.codigo}</td>
                <td>{p.articulo}</td>
                <td>{p.cantidad}</td>
                <td>{p.precioPublico}</td>
                <td
                  className={
                    p.pedidoProveedor === "realizado"
                      ? "estado-realizado"
                      : "estado-pendiente"
                  }
                >
                  {p.pedidoProveedor === "realizado" ? "Realizado" : "Pendiente"}
                </td>
                <td className={p.entregado ? "estado-realizado" : "estado-pendiente"}>
                  {p.entregado ? "✅" : "❌"}
                </td>
                <td className={p.pagado ? "estado-realizado" : "estado-pendiente"}>
                  {p.pagado ? "✅" : "❌"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link
        href="/estados"
        className="btn btn-volver"
        style={{ marginTop: "1.5rem" }}
      >
        ← Volver a Estados
      </Link>
    </div>
  );
}
