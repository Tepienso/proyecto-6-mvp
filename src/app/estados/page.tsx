import Link from "next/link";

export default function EstadosPage() {
  return (
    <div className="page center-screen text-center">
      <div className="estados-block stack stack-gap-md">
        <h1 className="titulo-seccion">Estados de cuenta </h1>
        <p className="welcome-text">
          Elegí qué tipo de estado de cuenta querés consultar:
        </p>

        <Link href="/estados/clientes" className="btn btn-volver">
          Estados de cuenta de clientes 👥
        </Link>

        <Link href="/estados/empresa" className="btn btn-volver">
          Estado de cuenta y estadísticas globales 📊
        </Link>
      </div>
    </div>
  );
}

