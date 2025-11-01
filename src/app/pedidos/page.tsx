"use client";

import { useState } from "react";
import Link from "next/link";

interface Item {
  id: number;
  producto: string;
  cantidad: number;
  precio: number;
}

export default function PedidosPage() {
  const [items, setItems] = useState<Item[]>([
    { id: Date.now(), producto: "", cantidad: 1, precio: 0 },
  ]);

  const handleChange = (id: number, field: keyof Item, value: string | number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleAdd = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now(), producto: "", cantidad: 1, precio: 0 },
    ]);
  };

  const handleRemove = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const calcularTotal = (cantidad: number, precio: number) =>
    (cantidad || 0) * (precio || 0);

  const totalGeneral = items.reduce(
    (acc, item) => acc + calcularTotal(item.cantidad, item.precio),
    0
  );

  return (
    <div className="page">
      <h1 className="logo-uvas text-center">Registrar pedido</h1>

      <div className="stack stack-gap-md">
        {items.map((item) => (
          <div
            key={item.id}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <input
              type="text"
              placeholder="Producto"
              className="input"
              value={item.producto}
              onChange={(e) => handleChange(item.id, "producto", e.target.value)}
              style={{ flex: 2 }}
            />
            <input
              type="number"
              placeholder="Cantidad"
              className="input"
              value={item.cantidad}
              onChange={(e) =>
                handleChange(item.id, "cantidad", Number(e.target.value))
              }
              style={{ width: "90px" }}
            />
            <input
              type="number"
              placeholder="Precio unitario"
              className="input"
              value={item.precio}
              onChange={(e) =>
                handleChange(item.id, "precio", Number(e.target.value))
              }
              style={{ width: "120px" }}
            />
            <span style={{ minWidth: "100px", textAlign: "center" }}>
              {calcularTotal(item.cantidad, item.precio).toFixed(2)}
            </span>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleRemove(item.id)}
            >
              ❌
            </button>
          </div>
        ))}

        <button type="button" className="btn btn-primary" onClick={handleAdd}>
          ➕ Nuevo artículo
        </button>

        <div className="text-center" style={{ marginTop: "1rem" }}>
          <strong>Total general: {totalGeneral.toFixed(2)}</strong>
        </div>

        <button type="submit" className="btn btn-primary">
          Guardar pedido ✅
        </button>

        <Link href="/" className="btn btn-secondary">
          ⬅️ Volver al inicio
        </Link>
      </div>
    </div>
  );
}
