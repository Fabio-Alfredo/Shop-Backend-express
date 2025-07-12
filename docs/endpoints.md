# 🚦 Endpoints API — Guía rápida

Bienvenido a la sección de **endpoints** de Shop API. Aquí encontrarás todas las rutas agrupadas por módulos para facilitar su exploración y uso.

> Esta guía está diseñada para ayudarte a encontrar rápidamente qué endpoint usar según la tarea que quieras realizar.

---

## 🗂️ Módulos disponibles

| Módulo       | Descripción breve                          | Número de endpoints |
|--------------|------------------------------------------|---------------------|
| 📦 **Productos**    | Gestiona productos: registrar, actualizar, eliminar y stock | 5                   |
| 🗂️ **Categorías**   | Crear y listar categorías de productos                | 2                   |
| 🧾 **Órdenes**       | Crear, consultar, cancelar órdenes y reembolsos       | 4                   |
| 💳 **Pagos**         | Crear pagos y gestionar reembolsos                      | 2                   |

---

## 🚀 ¿Cómo usar esta sección?

- Haz clic en el módulo que te interesa para ver sus endpoints detallados.
- Cada endpoint incluye:
  - Descripción sencilla
  - Parámetros de entrada
  - Ejemplos claros de solicitud y respuesta
  - Posibles errores y consejos
- Usa la barra lateral para navegar rápidamente entre módulos y endpoints.

---

## 📌 Atajos rápidos

- [Productos](products/register.md) — Registrar un producto
- [Categorías](categories/create.md) — Crear una categoría
- [Órdenes](orders/create.md) — Crear una orden
- [Pagos](payments/create.md) — Crear un pago

---

> ¿Buscas algo específico? Usa el buscador 🔍 arriba para encontrar cualquier endpoint o palabra clave.

---

## 🔧 Consejos útiles

- Recuerda que para la mayoría de endpoints protegidos necesitas un token JWT válido en el header `Authorization`.
- Las acciones de actualización y eliminación requieren permisos de administrador.
- Si tienes dudas, revisa el módulo de [Autenticación](../authentication.md) y el [Glosario](../glosario.md).

---

## 🚀 ¿Dónde puedo probar la API?
Puedes utilizar herramientas como [Postman](https://www.postman.com/) o [Insomnia](https://insomnia.rest/) para probar los endpoints de la API.

---

