# Gestión de pedidos – Definición de archivos

## Archivos principales

- **pedidos.json**
  - Contiene **todos los pedidos activos** (abiertos y cerrados pendientes).
  - Se utiliza en las páginas:
    - `/corregir-pedido/page.tsx` → listado y edición de pedidos activos.
    - `/registro_pedido/page.tsx` → registro de nuevos pedidos.
  - Campos principales:
    - `id`: identificador único.
    - `cliente`: nombre del cliente.
    - `items`: lista de artículos (articulo, cantidad, precio).
    - `total`: monto total del pedido.
    - `cerrado`: booleano, indica si el pedido ya fue solicitado al proveedor.
    - `entregado`: booleano, indica si el pedido fue entregado al cliente.
    - `fechaRegistro`: fecha de creación.
    - `ultimaModificacion`: última fecha en que se modificó.

- **pedidosHistoricos.json**
  - Contiene **solo los pedidos entregados**.
  - Se utiliza para:
    - Reportes y estadísticas.
    - Consultas históricas.
  - Estructura idéntica a `pedidos.json`, para facilitar migración y reutilización.

---

## Flujo de trabajo

1. **Registro de pedido**
   - Se crea en `pedidos.json` con `cerrado = false` y `entregado = false`.

2. **Cierre de pedido**
   - Se marca `cerrado = true` en `pedidos.json`.
   - El pedido sigue en `pedidos.json` hasta que se entregue.

3. **Entrega de pedido**
   - Se actualiza `entregado = true`.
   - El pedido se **mueve** de `pedidos.json` a `pedidosHistoricos.json`.

---

## Reglas de mantenimiento

- `pedidos.json` debe contener **solo pedidos activos** (abiertos o cerrados pendientes).
- `pedidosHistoricos.json` debe contener **todos los pedidos entregados**.
- La migración de un pedido de `pedidos.json` a `pedidosHistoricos.json` se hace en el momento de marcarlo como entregado.
- Ambos archivos comparten la misma estructura de datos para evitar duplicación de lógica.

---

## Próximos pasos

- Implementar en `/corregir-pedido/page.tsx` la opción **"Marcar como entregado"**, que:
  - Actualiza el campo `entregado = true`.
  - Mueve el pedido a `pedidosHistoricos.json`.
- Crear una nueva pantalla `/historicos/page.tsx` para consultar y filtrar pedidos entregados.
