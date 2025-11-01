import Link from "next/link";

export default function Home() {
  return (
    <div className="page center-screen text-center">
      <div className="stack stack-gap-md">
        {/* Logo + Marca */}
        <div>
          {/* Aquí iría la imagen del logo original */}
          <img src="/logo-uvas.png" alt="Logo UVAS" style={{ maxWidth: "120px", margin: "0 auto" }} />
          <div className="logo-uvas-hero">UVAS</div>
        </div>

        <p>Bienvenida, Cynthia 👋</p>

        <Link href="/pedidos" className="btn btn-primary">
          Registrar pedido 🛒
        </Link>
        <button className="btn btn-primary">Ver clientes 👤</button>
        <button className="btn btn-primary">Catálogo 💄</button>
        <button className="btn btn-primary">Pagos pendientes 💵</button>
      </div>
    </div>
  );
}
