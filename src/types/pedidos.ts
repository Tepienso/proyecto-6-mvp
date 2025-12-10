// src/types/pedidos.ts

// Estado general del pedido: abierto o cerrado
export type EstadoPedido = "abierto" | "cerrado";

// Estado del pedido al proveedor: pendiente o realizado
export type EstadoProveedor = "pendiente" | "realizado";

// Definición del modelo Pedido
export interface Pedido {
  id: string;               // Identificador único (ej: UUID o código)
  clienteId: string;        // ID del cliente
  clienteNombre: string;    // Nombre del cliente (para mostrar en tablas)
  codigo: string;           // Código del producto
  articulo: string;         // Nombre del artículo
  cantidad: number;         // Cantidad pedida
  precioPublico: number;    // Precio unitario público
  pedidoProveedor: EstadoProveedor; // Estado del pedido al proveedor
  entregado: boolean;       // Si el pedido fue entregado
  pagado: boolean;          // Si el pedido fue pagado
  estado: EstadoPedido;     // Estado del pedido (abierto/cerrado)
  createdAt: string;        // Fecha de creación (ISO string)
  closedAt?: string;        // Fecha de cierre (ISO string, opcional)
  notas?: string;           // Notas adicionales (opcional)
}
