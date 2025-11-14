"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FooterNav() {
  const pathname = usePathname();

  return (
    <footer className="footer-nav">
      <nav>
        {pathname === "/" ? (
          // En la Home solo mostramos "Salir"
          <Link href="/salir" className="btn-nav">Salir 🚪</Link>
        ) : (
          <>
            <Link href="/" className="btn-nav">⬅️ Volver</Link>
            <Link href="/salir" className="btn-nav">Salir 🚪</Link>
          </>
        )}
      </nav>
    </footer>
  );
}
