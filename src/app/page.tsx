import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="page center-screen text-center">
      {/* Contenedor con ancho uniforme */}
      <div className="home-block stack stack-gap-md">
        {/* Logo + Título pegados */}
        <div className="logo-title-block">
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
        <p className="welcome-text">¡Bienvenida, Cynthia! 👋</p>

        {/* Botones uniformes pastel */}
        <Link href="/pedidos" className="btn btn-volver">
          Registrar pedido 🛒
        </Link>
        <Link href="/clientes" className="btn btn-volver">
          Ver clientes 👤
        </Link>
        <button className="btn btn-volver">Catálogo 💄</button>
        <button className="btn btn-volver">Pagos pendientes 💵</button>
      </div>
    </div>
  );
}
