"use client";
import { useState } from "react";
import Link from "next/link";

// Datos de ejemplo (luego se pueden consolidar desde clientes.json o BD)
const pedidosEjemplo = [
  {
    cliente: "Cliente Ejemplo",
    codigo: "FITOBIO50",
    articulo: "FITOBIOLOGICA X 50 ML",
    cantidad: 2,
    precioPublico: 14000,
    pedidoProveedor: "pendiente",
    entregado: false,
    pagado: false,
  },
  {
    cliente: "Cliente Ejemplo",
    codigo: "MIA50",
    articulo: "MIA NUTRITIVA E HIDRATA 50 ML",
    cantidad: 1,
    precioPublico: 14500,
    pedidoProveedor: "realizado",
    entregado: true,
    pagado: true,
  },
];

export default function EstadoEmpresaPage() {
  const [pedidos] = useState(pedidosEjemplo);

  // Cálculos globales
  const totalFacturado = pedidos.reduce(
    (acc, p) => acc + p.precioPublico * p.cantidad,
    0
  );
  const totalCobrado = pedidos
    .filter((p) => p.pagado)
    .reduce((acc, p) => acc + p.precioPublico * p.cantidad, 0);
  const saldoPendiente = totalFacturado - totalCobrado;
  const pedidosPendientes = pedidos.filter((p) => !p.pagado).length;

  return (
    <div className="page center-screen stack stack-gap-md">
      <h1 className="titulo-seccion text-center">
        Estado global de la empresa 📊
      </h1>

      <div className="tabla-container">
        <table className="tabla-ordenada">
          <thead>
            <tr>
              <th>Métrica</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total facturado</td>
              <td>${totalFacturado}</td>
            </tr>
            <tr>
              <td>Total cobrado</td>
              <td>${totalCobrado}</td>
            </tr>
            <tr>
              <td>Saldo pendiente</td>
              <td>${saldoPendiente}</td>
            </tr>
            <tr>
              <td>Pedidos pendientes de pago</td>
              <td>{pedidosPendientes}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Link href="/estados" className="btn btn-volver" style={{ marginTop: "1.5rem" }}>
  ← Volver a Estados
</Link>
    </div>
  );
}
