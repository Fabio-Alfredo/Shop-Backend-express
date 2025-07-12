# 🏷️ Crear categoría

Este endpoint permite **crear una nueva categoría de productos**, que luego puede usarse para clasificar productos al registrarlos o actualizarlos.

---

## 🧠 ¿Cuándo usar este endpoint?

- Para organizar productos en secciones como “Ropa”, “Tecnología”, “Alimentos”, etc.
- Cuando deseas añadir nuevas líneas de productos a tu tienda.

---

## 🔐 Requiere autenticación

Debes enviar un token JWT válido en el encabezado:

```http
Authorization: Bearer <token>
```

Debes asegurarte de que el usuario tenga el rol adecuado para crear categorías.

```http
ADMINISTRATOR
```

---

## 📋 Headers

| Nombre        | Valor                      |
| ------------- | -------------------------- |
| Authorization | Bearer <tu_token_jwt_aqui> |
| Content-Type  | application/json           |

---

## 📦 Body (JSON)
- **Método:** `POST`
- **Ruta:** `/categories/create`

```json
{
  "id": "ZAP",
  "name": "Zapatos"
}
```

## 🚀 Ejemplo curl

```bash
curl -X POST "http://localhost:3000/api/categories/create" \
-H "Authorization: Bearer <tu_token_jwt_aqui>" \
-H "Content-Type: application/json" \
-d '{
  "id": "ZAP",
  "name": "Zapatos"
}'
```

---

## 📄 Respuesta exitosa

```json
{
  "message": "Categoría creada exitosamente",
  "category": {
    "id": "ZAP",
    "name": "Zapatos"
  }
}
```

---

## ❌ Respuesta de error

| Código | Motivo                      | Solución                                                     |
| ------ | --------------------------- | ------------------------------------------------------------ |
| 400    | Datos de entrada inválidos  | Verifica que todos los campos requeridos estén presentes y sean válidos. |
| 401    | No autorizado               | Asegúrate de enviar un token JWT válido en el encabezado de autorización. |
| 403    | Prohibido                   | El usuario no tiene permisos para crear categorías.          |
| 409    | Conflicto                   | Ya existe una categoría con el mismo ID.                    |
| 500    | Error interno del servidor  | Intenta nuevamente más tarde o contacta al administrador.     |

---

## 💡 Tip ¿Sabías que...?
Puedes reutilizar estas categorías para clasificar fácilmente tus productos en secciones específicas y facilitar la navegación del cliente.
