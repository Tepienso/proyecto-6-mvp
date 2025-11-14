# Checkpoint UVAS – Clientes (11-11-2025)

## Condiciones de diseño acordadas
- **Banner superior**:
  - Título dinámico según la ruta.
  - En esta página: “Clientes”.
  - Tipografía **Poppins**, color del fondo del cuerpo.
- **Cuerpo de la página**:
  - Tabla de clientes sin título duplicado.
  - Inputs estilizados con clase `.input-uvas`.
  - Botones coherentes con la Home (`.btn-uvas`).
- **FooterNav**:
  - En páginas internas (como Clientes): botones “Volver ⬅️” y “Salir 🚪”.
- **Estética general**:
  - Coherencia visual con la Home.
  - Tipografía Macondo en el cuerpo, Poppins en títulos.
  - Colores y sombras consistentes con la identidad UVAS.

---

## Forma de trabajo
- Iteración paso a paso, validando visualmente cada ajuste.
- Archivos entregados completos y listos para reemplazar.
- Registro de cambios y checkpoints para continuidad fluida.
- Documentación clara para cada bloque de CSS y JSX.

---

## Función de los principales archivos

### `clientes/page.tsx`
- Renderiza la tabla de clientes.
- Maneja operaciones CRUD (crear, editar, eliminar, guardar).
- Inputs con clase `.input-uvas`.
- Botones con clase `.btn-uvas`.
- Ya no incluye título interno: el título se muestra en el banner superior.

### `layout.tsx`
- Define la estructura global de la aplicación.
- Banner superior dinámico con componente `HeaderTitle`.
- Aplica tipografía Macondo al cuerpo.
- Incluye `FooterNav` en todas las páginas.

### `HeaderTitle.tsx`
- Detecta la ruta actual con `usePathname`.
- Muestra título dinámico en el banner superior:
  - Home → “UVAS”
  - Clientes → “Clientes”
  - Pedidos → “Pedidos”
  - Estados → “Estados de cuenta”
  - Herramientas → “Herramientas”

### `custom.css`
- Clase `.input-uvas`: borde violeta, tipografía Macondo, fondo blanco, foco con sombra violeta.
- Estilos de tabla `.tabla-clientes` y contenedor `.acciones`.
- Mantiene coherencia con botones `.btn-uvas` y tipografía definida.

---

## Próximo paso
- Revisar **Pedidos** y **Estados de cuenta** para aplicar el mismo criterio de diseño y coherencia visual.
