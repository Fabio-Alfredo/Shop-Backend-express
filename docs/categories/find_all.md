# 📚 Listar categorías

Este endpoint permite **consultar todas las categorías registradas en el sistema**. Es ideal para mostrar un menú de navegación, opciones al registrar productos, o para el panel de administración.

---

## 🧠 ¿Cuándo usar este endpoint?

- Para mostrar todas las categorías disponibles en el frontend.
- Al registrar o actualizar productos, para elegir a qué categoría pertenecen.
- Para mostrar un filtro de búsqueda por categoría.

---

## 🔐 Requiere autenticación

Debes enviar un token JWT válido en el encabezado:

```http
Authorization: Bearer <token>
```

---

## 📋 Headers

| Nombre        | Valor                      |
| ------------- | -------------------------- |
| Authorization | Bearer <tu_token_jwt_aqui> |
| Content-Type  | application/json           |

---

## 📦 Parametros de la ruta
- **Método:** `GET`
- **Ruta:** `/categories/all`

---


## 🚀 Ejemplo curl

```bash
curl -X GET "http://localhost:3000/api/categories/all" \
-H "Authorization: Bearer <tu_token_jwt_aqui>" \
-H "Content-Type: application/json"
```

---

## 📄 Respuesta exitosa

```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "categories": [
    {
      "id": "ZAP",
      "name": "Zapatos"
    },
    {
      "id": "ROPA",
      "name": "Ropa"
    }
  ]
}
```

---

## 📄 Ejemplo de respuesta sin categorias

```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "message": "No hay categorías registradas"
}
```

---


## ❌ Respuesta de error

| Código | Motivo                      | Solución                                                     |
| ------ | --------------------------- | ------------------------------------------------------------ |
| 401    | No autorizado               | Asegúrate de enviar un token JWT válido en el encabezado de autorización. |
| 500    | Error interno del servidor  | Intenta nuevamente más tarde o contacta al administrador.     |

---

## 💡 Tip ¿Cómo usar esta información?
Puedes usar el **id** de cada categoría para registrar productos en esa categoría, o para mostrar filtros y menús dinámicos.
