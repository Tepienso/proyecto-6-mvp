import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="page center-screen text-center">
      {/* Contenedor con ancho uniforme */}
      <div className="home-block stack stack-gap-md">
        {/* Logo + Título pegados */}
        <div className="logo-title-block" style={{ minWidth: "220px" }}>
          <Image
            src="/assets/uvas-logo.png"
            alt="Logo UVAS"
            width={120}
            height={120}
            priority
          />
          <Image
            src="/assets/UVAS-título.png"
            alt="Título UVAS"
            width={120}
            height={120}
            priority
          />
        </div>

        {/* Bienvenida destacada */}
        <p className="welcome-text">¡Bienvenida, Cynthia!</p>

        {/* Botones principales UVAS */}
        <Link href="/registro_pedido" className="btn-uvas">
          Registrar pedido
        </Link>
        <Link href="/clientes" className="btn-uvas">
          Ver clientes
        </Link>
        <Link href="/estados" className="btn-uvas">
          Estados de cuenta
        </Link>
        <Link href="/herramientas" className="btn-uvas">
          Herramientas
        </Link>
      </div>
    </div>
  );
}
