"use client";
import { useState } from "react";

// Ejemplo de datos de clientes (luego se puede cargar desde clientes.json o BD)
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
        pedidoProveedor: "pendiente", // pendiente | realizado
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
    <div className="page center-screen">
      <h2 className="tituloUva text-center">Estado de cuenta de clientes</h2>

      <table className="tabla-simple" style={{ marginTop: "1.5rem" }}>
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
                <td className="tituloUva">{c.nombre}</td>
                <td className="tituloUva">{p.codigo}</td>
                <td className="tituloUva">{p.articulo}</td>
                <td className="tituloUva">{p.cantidad}</td>
                <td className="tituloUva">{p.precioPublico}</td>
                <td className="tituloUva">
                  {p.pedidoProveedor === "realizado" ? "Realizado" : "Pendiente"}
                </td>
                <td className="tituloUva">{p.entregado ? "✅" : "❌"}</td>
                <td className="tituloUva">{p.pagado ? "✅" : "❌"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
