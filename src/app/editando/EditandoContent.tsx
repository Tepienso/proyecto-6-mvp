"use client";

import React, { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import pedidosData from "../../data/pedidos.json";

type ItemPedido = {
  articulo: string;
  precio: number;
  cantidad: number;           // cantidad corregida (editable)
  cantidadOriginal: number;   // referencia inmutable
};

type Pedido = {
  id: number;
  cliente: string;
  items: ItemPedido[];
  total: number;              // total con cantidades corregidas
  totalOriginal: number;      // total con cantidades originales
  ultimaModificacion?: string;
};

export default function EditandoContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = parseInt(searchParams.get("id") || "0", 10);

  const pedidoBase = useMemo(() => pedidosData.find((p) => p.id === id), [id]);

  const inicializarPedido = (p: any): Pedido => {
    const itemsConOriginal: ItemPedido[] = p.items.map((it: any) => ({
      articulo: it.articulo,
      precio: it.precio,
      cantidad: it.cantidad,                // editable
      cantidadOriginal: it.cantidad,        // copia inmutable para referencia
    }));

    const totalOriginal = itemsConOriginal.reduce(
      (acc, it) => acc + it.cantidadOriginal * it.precio,
      0
    );
    const total = itemsConOriginal.reduce(
      (acc, it) => acc + it.cantidad * it.precio,
      0
    );

    return {
      id: p.id,
      cliente: p.cliente,
      items: itemsConOriginal,
      totalOriginal,
      total,
      ultimaModificacion: new Date().toLocaleDateString("es-AR"),
    };
  };

  const [pedido, setPedido] = useState<Pedido | null>(
    pedidoBase ? inicializarPedido(pedidoBase) : null
  );

  if (!pedido) {
    return (
      <div className="page center-screen text-center">
        <p>Pedido no encontrado</p>
        <button className="btn-uvas" onClick={() => router.push("/corregir-pedido")}>
          Volver
        </button>
      </div>
    );
  }

  const recalcularTotal = (items: ItemPedido[]) =>
    items.reduce((acc, it) => acc + it.cantidad * it.precio, 0);

  const eliminarItem = (index: number) => {
    const nuevosItems = pedido.items.filter((_, i) => i !== index);
    setPedido({
      ...pedido,
      items: nuevosItems,
      total: recalcularTotal(nuevosItems),
      ultimaModificacion: new Date().toLocaleDateString("es-AR"),
    });
  };

  const formatear = (n: number) =>
    new Intl.NumberFormat("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

  return (
    <div className="page center-screen">
      <div className="stack stack-gap-md" style={{ width: "100%" }}>
        {/* Título centrado */}
        <h2 className="tituloUva">{pedido.cliente}</h2>

        {/* Tabla de ítems */}
        <table className="tabla-pedidos" width="100%">
          <thead>
            <tr>
              <th>Artículo</th>
              <th>Precio unitario</th>
              <th>Cantidad original</th>
              <th>Cantidad corregida</th>
              <th>Diferencia parcial</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {pedido.items.map((item, index) => {
              const diferenciaParcial = (item.cantidad - item.cantidadOriginal) * item.precio;

              return (
                <tr key={index}>
                  <td>{item.articulo}</td>
                  <td>${formatear(item.precio)}</td>
                  <td>{item.cantidadOriginal}</td>
                  <td>
                    <input
                      type="number"
                      min={0}
                      value={item.cantidad}
                      onChange={(e) => {
                        const nuevaCantidad = parseInt(e.target.value || "0", 10);
                        const nuevosItems = [...pedido.items];
                        nuevosItems[index] = { ...nuevosItems[index], cantidad: nuevaCantidad };

                        setPedido({
                          ...pedido,
                          items: nuevosItems,
                          total: recalcularTotal(nuevosItems),
                          ultimaModificacion: new Date().toLocaleDateString("es-AR"),
                        });
                      }}
                    />
                  </td>
                  <td
                    style={{
                      color:
                        diferenciaParcial > 0
                          ? "green"
                          : diferenciaParcial < 0
                          ? "red"
                          : "black",
                    }}
                  >
                    ${formatear(diferenciaParcial)}
                  </td>
                  <td>
                    <button className="btn-uvas" onClick={() => eliminarItem(index)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Totales al pie */}
        <div className="totales text-center">
          <p>Total original: ${formatear(pedido.totalOriginal)}</p>
          <p>Total nuevo: ${formatear(pedido.total)}</p>
          <p
            style={{
              color:
                pedido.total - pedido.totalOriginal > 0
                  ? "green"
                  : pedido.total - pedido.totalOriginal < 0
                  ? "red"
                  : "black",
            }}
          >
            Diferencia total: ${formatear(pedido.total - pedido.totalOriginal)}
          </p>
        </div>

        {/* Acciones */}
        <div className="acciones text-center">
          <button
            className="btn-uvas"
            onClick={() => {
              console.log("Guardado (pendiente de persistencia):", pedido);
              router.push("/corregir-pedido");
            }}
          >
            Guardar cambios
          </button>
          <button className="btn-uvas" onClick={() => router.push("/corregir-pedido")}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
