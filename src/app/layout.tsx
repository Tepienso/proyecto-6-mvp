import React from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import "./custom.css";



const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"], // podés elegir variantes
});
export const metadata = {
  title: "UVAS",
  description: "Gestión de pedidos y clientes para vendedoras de cosméticos",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}
