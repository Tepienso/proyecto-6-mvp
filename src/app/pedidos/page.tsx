"use client";
import { useState } from "react";
import CatalogoModal from "../../components/CatalogoModal"; // ✅ ruta correcta
import catalogo from "../../data/catalogo.json";

export default function Page() {
  const [cliente, setCliente] = useState("");
  const [notas, setNotas] = useState("");
  const [codigo, setCodigo] = useState("");
  const [articulo, setArticulo] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [preuni, setPreuni] = useState(0);
  const [filas, setFilas] = useState<any[]>([]);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [catalogoVisible, setCatalogoVisible] = useState(false);
  const [sugerencias, setSugerencias] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const totalPedido = filas.reduce((acc, fila) => acc + fila.pretot, 0);

  const eliminarFila = (index: number) => {
    const nuevasFilas = filas.filter((_, i) => i !== index);
    setFilas(nuevasFilas);
    // Si estás editando esta fila, salir del modo edición
    if (editIndex === index) setEditIndex(null);
  };
  const editarFila = (index: number) => {
    setEditIndex(index);
  };
  const guardarCantidad = (index: number, nuevaCantidad: number) => {
    const nuevasFilas = [...filas];
    nuevasFilas[index] = {
      ...nuevasFilas[index],
      cantidad: nuevaCantidad,
      pretot: nuevaCantidad * nuevasFilas[index].preuni,
    };
    setFilas(nuevasFilas);
  };
  const salirEdicion = () => setEditIndex(null);

  // ✅ Callback que recibe el producto seleccionado desde CatalogoModal
  const handleSeleccionProducto = (producto: any) => {
    setCodigo(producto.codigo);
    setArticulo(producto.nombre);
    setPreuni(producto.precioDistribuidor); // o precioPublico si preferís
    setCatalogoVisible(false); // cierra el modal automáticamente
  };

  const agregarFila = () => {
    const nuevaFila = {
      codigo,
      articulo,
      cantidad,
      preuni,
      pretot: cantidad * preuni,
    };
    setFilas([...filas, nuevaFila]);
    // limpiar campos
    setCodigo("");
    setArticulo("");
    setCantidad(0);
    setPreuni(0);
  };

  return (
    <div className="page center-screen">
      <div className="stack stack-gap-md">
        {/* Encabezado horizontal */}
        <div className="cliente-grid">
          <h2 className="tituloUva">
            <input
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              placeholder="Nombre del cliente"
              className="input-uvas"
            />
          </h2>
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Notas"
            className="input-uvas"
          />
        </div>

        {/* Tabla centrada */}
        <table className="tabla-simple">
          <thead>
            <tr>
              <th>Código</th>
              <th>Artículo</th>
              <th>Cantidad</th>
              <th>Precio Unitario ($)</th>
              <th>Precio Total ($)</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {/* Fila editable */}
            <tr>
              <td style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Código"
                  value={codigo}
                  onChange={(e) => {
                    const valor = e.target.value;
                    setCodigo(valor);

                    // Filtrar sugerencias
                    if (valor.length > 0) {
                      const filtrados = (catalogo as any[]).filter((p) =>
                        p.codigo.toLowerCase().startsWith(valor.toLowerCase())
                      );
                      setSugerencias(filtrados);
                    } else {
                      setSugerencias([]);
                    }
                  }}
                />

                {/* Desplegable de sugerencias */}
                {sugerencias.length > 0 && (
                  <ul
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      background: "#fff",
                      border: "1px solid #ccc",
                      width: "100%",
                      maxHeight: "150px",
                      overflowY: "auto",
                      zIndex: 20,
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {sugerencias.map((p) => (
                      <li
                        key={p.codigo}
                        style={{ padding: "5px", cursor: "pointer" }}
                        onClick={() => {
                          setCodigo(p.codigo);
                          setArticulo(p.nombre);
                          setPreuni(p.precioDistribuidor); // o precioPublico
                          setSugerencias([]); // cerrar lista
                        }}
                      >
                        {p.codigo} – {p.nombre}
                      </li>
                    ))}
                  </ul>
                )}
              </td>

              <td style={{ position: "relative" }}>
                <input
                  type="text"
                  readOnly
                  placeholder="Seleccione"
                  value={articulo || "Seleccione"}
                  onClick={() => setMenuAbierto(!menuAbierto)}
                />
                {menuAbierto && (
                  <div className="menu-flotante">
                    <div
                      className="item-menu"
                      onClick={() => {
                        setCatalogoVisible(true); // abre modal
                        setMenuAbierto(false); // cierra menú
                      }}
                    >
                      Catálogo
                    </div>

                    <div
                      className="item-menu"
                      onClick={() => {
                        alert("Función QR en desarrollo");
                        setMenuAbierto(false);
                      }}
                    >
                      QR
                    </div>
                  </div>
                )}
              </td>

              <td>
                <input
                  type="number"
                  min={0}
                  placeholder="Cantidad"
                  value={cantidad}
                  onChange={(e) => setCantidad(Number(e.target.value))}
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Precio Unitario"
                  value={preuni}
                  onChange={(e) => setPreuni(Number(e.target.value))}
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Precio Total"
                  value={cantidad * preuni}
                  readOnly
                />
              </td>
              <td>
                <button onClick={agregarFila}>Agregar</button>
              </td>
            </tr>

            {/* Filas agregadas */}
            {filas.map((fila, index) => {
              const enEdicion = editIndex === index;
              return (
                <tr key={index}>
                  <td className="tituloUva">{fila.codigo}</td>
                  <td className="tituloUva">{fila.articulo}</td>

                  {/* Cantidad: input si está en edición, texto si no */}
                  <td>
                    {enEdicion ? (
                      <input
                        type="number"
                        value={fila.cantidad}
                        onChange={(e) => {
                          const valor = Number(e.target.value);
                          // Actualiza en tiempo real y recalcula el total
                          guardarCantidad(index, isNaN(valor) ? 0 : valor);
                        }}
                        className="input-uvas"
                        style={{ width: "6rem" }}
                      />
                    ) : (
                      <span className="tituloUva">{fila.cantidad}</span>
                    )}
                  </td>

                  <td className="tituloUva">{fila.preuni}</td>
                  <td className="tituloUva">{fila.pretot}</td>

                  {/* Botones de acción */}
                  <td>
                    {enEdicion ? (
                      <>
                        <button
                          className="btn-uvas tituloUva"
                          onClick={salirEdicion}
                        >
                          Guardar
                        </button>
                        <button
                          className="btn-uvas tituloUva"
                          onClick={salirEdicion}
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn-uvas tituloUva"
                          onClick={() => editarFila(index)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn-uvas tituloUva"
                          onClick={() => eliminarFila(index)}
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* Total del pedido */}
        <div className="text-center" style={{ marginTop: "1.5rem" }}>
          <span
            className="tituloUva"
            style={{ fontSize: "1.5rem", color: "green", fontWeight: "bold" }}
          >
            Total del pedido: ${totalPedido.toFixed(2)}
          </span>
        </div>

        {/* Modal de catálogo */}
        {catalogoVisible && (
          <CatalogoModal
            onClose={() => setCatalogoVisible(false)}
            onSelect={handleSeleccionProducto}
          />
        )}
        {/* Botón de cierre de pedido */}
        <div className="text-center" style={{ marginTop: "2rem" }}>
          <button
            className="btn-uvas tituloUva"
            onClick={() => {
              alert(
                "Pedido cerrado y cargado en tabla (función en desarrollo)."
              );
              // 🔜 luego: exportar a CSV o guardar en BD
              setCliente("");
              setNotas("");
              setFilas([]);
              setCodigo("");
              setArticulo("");
              setCantidad(0);
              setPreuni(0);
              setEditIndex(null);
            }}
          >
            Cerrar pedido
          </button>
        </div>
      </div>
    </div>
  );
}
