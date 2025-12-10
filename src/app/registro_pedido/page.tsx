"use client";

import React from "react";

export default function RegistroPedidoPage() {
  return (
    <div className="page center-screen text-center">
      {/* Botones principales en columna */}
      <div className="button-group-vertical">
        <button 
          className="granbtn-uvas" 
          onClick={() => window.location.href = "/pedidos"}
        >
          Nuevo pedido
        </button>

        <button 
          className="granbtn-uvas" 
          onClick={() => window.location.href = "/corregir-pedido"}
        >
          Corregir pedido
        </button>
      </div>
    </div>
  );
}
