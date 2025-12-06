"use client";
import { useState } from "react";
import Link from "next/link"; // ✅ Importamos Link para el botón Volver

// Datos de ejemplo (luego se pueden cargar desde JSON o BD)
const clientesEjemplo = [
  {
    id: "CL001",
    nombre: "Cliente Ejemplo",
    pedidos: [
      {
        codigo: "FITOBIO50",
        articulo: "FITOBIOLOGICA X 50 ML",
        cantidad: 2,
        precioPublico: 14000,
        pedidoProveedor: "pendiente",
        entregado: false,
        pagado: false,
      },
      {
        codigo: "MIA50",
        articulo: "MIA NUTRITIVA E HIDRATA 50 ML",
        cantidad: 1,
        precioPublico: 14500,
        pedidoProveedor: "realizado",
        entregado: true,
        pagado: true,
      },
    ],
  },
];

export default function EstadoClientesPage() {
  const [clientes] = useState(clientesEjemplo);

  return (
    <div className="page center-screen stack stack-gap-md">
      {/* ✅ Título separado y centrado */}
      <h1 className="titulo-seccion text-center">Estado de cuenta de clientes</h1>

      {/* ✅ Tabla más ancha y ordenada */}
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
            {clientes.map((c) =>
              c.pedidos.map((p, idx) => (
                <tr key={`${c.id}-${idx}`}>
                  <td>{c.nombre}</td>
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
                    {p.pedidoProveedor === "realizado"
                      ? "Realizado"
                      : "Pendiente"}
                  </td>
                  <td
                    className={p.entregado ? "estado-realizado" : "estado-pendiente"}
                  >
                    {p.entregado ? "✅" : "❌"}
                  </td>
                  <td
                    className={p.pagado ? "estado-realizado" : "estado-pendiente"}
                  >
                    {p.pagado ? "✅" : "❌"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Botón Volver: ahora apunta a /estados en lugar de la Home */}
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
