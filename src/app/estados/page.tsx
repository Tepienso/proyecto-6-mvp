"use client";

import React, { useState } from "react";
import pedidos from "@/data/pedidos.json";
import { PedidoJson } from "@/types/pedidos";

export default function EstadosPage() {
  // Usamos directamente los pedidos importados desde pedidos.json
  const [listaPedidos] = useState<PedidoJson[]>(pedidos);

  return (
    <div className="page center-screen stack stack-gap-md">
      <h2 className="tituloUva">Estado de cuenta y estadísticas globales</h2>

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
          {listaPedidos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.cliente}</td>
              <td>${p.total}</td>
              <td>{p.cerrado ? "Sí" : "No"}</td>
              <td>{p.fechaRegistro}</td>
              <td>{p.ultimaModificacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

