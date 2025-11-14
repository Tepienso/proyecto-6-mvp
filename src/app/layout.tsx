import React from "react";
import "./globals.css";
import "./custom.css";
import FooterNav from "./FooterNav";
import { Macondo } from "next/font/google";
import HeaderTitle from "./HeaderTitle";


const macondo = Macondo({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "UVAS",
  description: "Gestión de pedidos y clientes para vendedoras de cosméticos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={macondo.className}>
        <div className="page">
          {/* Banner superior */}
          <header className="header-uvas">
              <HeaderTitle />
          </header>

          {/* Contenido específico de cada página */}
          <main>{children}</main>

          {/* Banner inferior con navegación */}
          <FooterNav />
        </div>
      </body>
    </html>
  );
}

