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
  activo?: boolean;
};

type Props = {
  onClose: () => void;
  onSelect: (producto: Producto) => void;
};

export default function CatalogoModal({ onClose, onSelect }: Props) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    setProductos(catalogo as Producto[]);
  }, []);

  const productosFiltrados = productos.filter(
    (p) =>
      p.activo !== false &&
      (p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
        p.codigo.toLowerCase().includes(filtro.toLowerCase()))
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content stack stack-gap-md">
        <div className="modal-header">
          <h3 className="subtitulo-uvas">Catálogo de productos</h3>
          <button className="btn-uvas" onClick={onClose}>Cancelar</button>
        </div>

        <div className="buscador">
          <input
            type="text"
            placeholder="Buscar por nombre o código..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="input-uvas"
          />
        </div>

        <div className="catalogo-scroll">
          <table className="tabla-catalogo">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Público</th>
                <th className="descripcion">Descripción</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map((p) => (
                <tr key={p.codigo}>
                  <td>{p.codigo}</td>
                  <td>{p.nombre}</td>
                  <td>${p.precioPublico}</td>
                  <td className="descripcion">{p.descripcion ?? "—"}</td>
                  <td className="boton">
                    <button className="btn-uvas" onClick={() => onSelect(p)}>
                      Seleccionar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
