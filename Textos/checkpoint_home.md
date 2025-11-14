# Checkpoint UVAS – Home (10-11-2025)

## Condiciones de diseño acordadas
- **Banner superior**: violeta claro, con la palabra "UVAS".
- **Banner inferior (FooterNav)**:
  - En la Home: solo botón "Salir 🚪".
  - En páginas internas: botones "Volver ⬅️" y "Salir 🚪".
- **Botones principales**:
  - Clase `.btn-uvas`.
  - Fondo blanco, borde violeta, sombra suspendida.
  - Hover con sombra más intensa y escala 1.05.
  - Active con sombra reducida y escala 0.97.
- **Texto de bienvenida**:
  - Clase `.welcome-text`.
  - Tipografía Macondo.
  - Tamaño 2rem, peso 600, color violeta.
  - Sin emoticón de la mano.
- **Tipografía global**:
  - Macondo aplicada vía `next/font/google` en `layout.tsx`.
- **Estética general**:
  - Sobria, elegante, coherente con la identidad UVAS.

---

## Forma de trabajo
- Iteración paso a paso, validando visualmente cada ajuste.
- Archivos entregados completos y listos para reemplazar.
- Registro de cambios y checkpoints para continuidad fluida.
- Documentación clara para cada bloque de CSS y JSX.

---

## Función de los principales archivos

### `custom.css`
- Define estilos base y específicos de UVAS.
- Contiene clases universales (`page`, `center-screen`, etc.).
- Estilos de botones (`.btn-uvas`) y bienvenida (`.welcome-text`).

### `layout.tsx`
- Define la estructura global de la aplicación.
- Aplica tipografía Macondo a todo el `<body>`.
- Renderiza el banner superior con "UVAS".
- Incluye el `FooterNav` en todas las páginas.

### `FooterNav.tsx`
- Renderiza el banner inferior violeta.
- En Home: solo botón "Salir 🚪".
- En páginas internas: botones "Volver ⬅️" y "Salir 🚪".

### `page.tsx` (Home)
- Pantalla de inicio.
- Logo + título UVAS.
- Texto de bienvenida destacado.
- Botones principales: Registrar pedido, Ver clientes, Estados de cuenta, Herramientas.
- El botón "Salir" se eliminó del cuerpo y se trasladó al FooterNav.

---

## Próximo paso
- Revisar **ClientesPage** para aplicar el mismo criterio de diseño y coherencia visual.
