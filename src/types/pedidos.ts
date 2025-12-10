// src/types/pedidos.ts

// Estado general del pedido: abierto o cerrado
export type EstadoPedido = "abierto" | "cerrado";

// Estado del pedido al proveedor: pendiente o realizado
export type EstadoProveedor = "pendiente" | "realizado";

// Definición del modelo Pedido (completo, para lógica interna)
export interface Pedido {
  id: string;
  clienteId: string;
  clienteNombre: string;
  codigo: string;
  articulo: string;
  cantidad: number;
  precioPublico: number;
  pedidoProveedor: EstadoProveedor;
  entregado: boolean;
  pagado: boolean;
  estado: EstadoPedido;
  createdAt: string;
  closedAt?: string;
  notas?: string;
}

// 👉 Nuevo bloque al final: coincide con pedidos.json
export type PedidoJson = {
  id: number;
  cliente: string;
  items: {
    articulo: string;
    cantidad: number;
    precio: number;
  }[];
  total: number;
  cerrado: boolean;
  fechaRegistro: string;
  ultimaModificacion: string;
};
