"use client";

import React, { useState } from "react";
import pedidos from "@/data/pedidos.json";
import { PedidoJson } from "@/types/pedidos";

export default function EstadoClientesPage() {
  // Usamos directamente los pedidos importados desde pedidos.json
  const [clientes] = useState<PedidoJson[]>(pedidos);

  return (
    <div className="page center-screen stack stack-gap-md">
      <h2 className="tituloUva">Estado de cuenta de clientes</h2>

      <table className="tabla-pedidos" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Cerrado</th>
            <th>Fecha registro</th>
            <th>Última modificación</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.cliente}</td>
              <td>${c.total}</td>
              <td>{c.cerrado ? "Sí" : "No"}</td>
              <td>{c.fechaRegistro}</td>
              <td>{c.ultimaModificacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
