"use client";
import { useRouter } from "next/navigation";

export default function NavSecundaria() {
  const router = useRouter();

  const salir = () => {
    if (confirm("¿Seguro que querés salir de la aplicación?")) {
      router.push("/logout"); // o la ruta que definas para salida
    }
  };

  return (
    <div className="nav-secundaria stack stack-gap-sm">
      <button className="btn btn-volver" onClick={() => router.back()}>
        Volver ↩️
      </button>
      <button className="btn btn-volver" onClick={() => router.push("/")}>
        Inicio 🏠
      </button>
      <button className="btn btn-volver" onClick={salir}>
        Salida 🚪
      </button>
    </div>
  );
}
