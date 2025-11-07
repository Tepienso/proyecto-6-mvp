"use client";

import { useState, useEffect } from "react";

type Cliente = {
  id: number;
  nombre: string;
  apellido: string;
  celular: string;
  email: string;
  guardado: boolean;
};

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([
    {
      id: Date.now(),
      nombre: "",
      apellido: "",
      celular: "",
      email: "",
      guardado: false,
    },
  ]);

  // 👉 Al cargar la página, traer clientes del backend (CSV)
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await fetch("/api/clientes");
        const data = await res.json();

        // aseguramos que sea array
        const lista = Array.isArray(data) ? data : [];

        const clientesConId = lista.map((c: any, index: number) => ({
          id: Date.now() + index,
          ...c,
          guardado: true,
        }));

        setClientes([
          ...clientesConId,
          {
            id: Date.now() + lista.length + 1,
            nombre: "",
            apellido: "",
            celular: "",
            email: "",
            guardado: false,
          },
        ]);
      } catch (error) {
        console.error("Error cargando clientes:", error);
        // si falla, dejamos al menos un renglón vacío
        setClientes([
          {
            id: Date.now(),
            nombre: "",
            apellido: "",
            celular: "",
            email: "",
            guardado: false,
          },
        ]);
      }
    };
    fetchClientes();
  }, []);

  const handleChange = (id: number, campo: keyof Cliente, valor: string) => {
    setClientes((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [campo]: valor } : c))
    );
  };

  const handleGuardar = async (id: number) => {
    setClientes((prev) =>
      prev.map((c) => (c.id === id ? { ...c, guardado: true } : c))
    );

    const cliente = clientes.find((c) => c.id === id);
    if (cliente) {
      await fetch("/api/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          celular: cliente.celular,
          email: cliente.email,
        }),
      });
    }

    setClientes((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        nombre: "",
        apellido: "",
        celular: "",
        email: "",
        guardado: false,
      },
    ]);
  };

  const handleEditar = async (id: number) => {
    const cliente = clientes.find((c) => c.id === id);
    if (cliente) {
      await fetch("/api/clientes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
      });
    }
  };

  const handleEliminar = async (id: number) => {
    const cliente = clientes.find((c) => c.id === id);
    if (cliente) {
      await fetch("/api/clientes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cliente.email }),
      });
    }
    setClientes((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="page">
      <h1>Gestión de Clientes</h1>
      <table className="tabla-clientes">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Celular</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((c) => (
            <tr key={c.id}>
              <td>
                <input
                  value={c.nombre}
                  onChange={(e) => handleChange(c.id, "nombre", e.target.value)}
                />
              </td>
              <td>
                <input
                  value={c.apellido}
                  onChange={(e) =>
                    handleChange(c.id, "apellido", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  value={c.celular}
                  onChange={(e) =>
                    handleChange(c.id, "celular", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  value={c.email}
                  onChange={(e) => handleChange(c.id, "email", e.target.value)}
                />
              </td>
              <td>
                {!c.guardado ? (
                  <button onClick={() => handleGuardar(c.id)}>Guardar</button>
                ) : (
                  <>
                    <button onClick={() => handleEditar(c.id)}>Editar</button>
                    <button onClick={() => handleEliminar(c.id)}>Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
