"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import pedidos from "../../data/pedidos.json";

export default function CorregirPedidoPage() {
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [ordenCampo, setOrdenCampo] = useState<"cliente" | "ultimaModificacion" | null>(null);
  const [ordenAsc, setOrdenAsc] = useState(true);
  const router = useRouter();

  // Filtrado
  let pedidosFiltrados = pedidos.filter((pedido) => {
    if (filtroEstado === "abiertos" && pedido.cerrado) return false;
    if (filtroEstado === "cerrados" && !pedido.cerrado) return false;
    if (busqueda && !pedido.cliente.toLowerCase().includes(busqueda.toLowerCase())) return false;
    return true;
  });

  // Ordenamiento
  if (ordenCampo) {
    pedidosFiltrados = [...pedidosFiltrados].sort((a, b) => {
      const valorA = a[ordenCampo];
      const valorB = b[ordenCampo];
      if (valorA < valorB) return ordenAsc ? -1 : 1;
      if (valorA > valorB) return ordenAsc ? 1 : -1;
      return 0;
    });
  }

  const handleOrdenar = (campo: "cliente" | "ultimaModificacion") => {
    if (ordenCampo === campo) {
      setOrdenAsc(!ordenAsc);
    } else {
      setOrdenCampo(campo);
      setOrdenAsc(true);
    }
  };

  return (
    <div className="page center-screen text-center">
      <div className="corregir-container">
        {/* Filtros */}
        <div className="filtros">
          <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="abiertos">Solo editables</option>
            <option value="cerrados">Solo cerrados</option>
          </select>

          <input
            type="text"
            placeholder="Buscar cliente..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        {/* Tabla */}
        <table className="tabla-pedidos">
          <thead>
            <tr>
              <th onClick={() => handleOrdenar("cliente")}>
                Cliente {ordenCampo === "cliente" ? (ordenAsc ? "▲" : "▼") : ""}
              </th>
              <th onClick={() => handleOrdenar("ultimaModificacion")}>
                Última modificación {ordenCampo === "ultimaModificacion" ? (ordenAsc ? "▲" : "▼") : ""}
              </th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {pedidosFiltrados.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.cliente}</td>
                <td>{pedido.ultimaModificacion}</td>
                <td>
                  {pedido.cerrado ? (
                    <button className="btn-uvas no-editable" disabled>
                      No editable
                    </button>
                  ) : (
                    <button
                      className="btn-uvas"
                      onClick={() => router.push(`/editando?id=${pedido.id}`)}
                    >
                      Editar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
