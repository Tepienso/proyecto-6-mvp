"use client";

import { useEffect, useState } from "react";
import catalogo from "../data/catalogo.json";

type Producto = {
  codigo: string;
  nombre: string;
  precioDistribuidor: number;
  precioPublico: number;
  imagen?: string;
  descripcion?: string;
};

type Props = {
  onClose: () => void;
  onSelect: (producto: Producto) => void;
};

export default function CatalogoModal({ onClose, onSelect }: Props) {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    // Carga inicial desde el JSON
    setProductos(catalogo as Producto[]);
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content stack stack-gap-md">
        <div className="modal-header">
          <h3 className="subtitulo-uvas">Catálogo de productos</h3>
          <button className="btn-uvas" onClick={onClose}>Cancelar</button>
        </div>

        <div className="catalogo-lista stack stack-gap-md">
          {productos.map((p) => (
            <div key={p.codigo} className="catalogo-item stack stack-gap-sm">
              {p.imagen && (
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  className="catalogo-imagen"
                />
              )}
              <div className="catalogo-info">
                <strong>{p.nombre}</strong>
                <p>Código: {p.codigo}</p>
                <p>Distribuidor: ${p.precioDistribuidor}</p>
                <p>Público: ${p.precioPublico}</p>
                {p.descripcion && <small>{p.descripcion}</small>}
              </div>
              <button className="btn-uvas" onClick={() => onSelect(p)}>
                Seleccionar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
