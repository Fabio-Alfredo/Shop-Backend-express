# 🔍 Buscar orden por ID

Este endpoint permite **consultar los detalles completos de una orden específica** utilizando su identificador único (`orderId`). Devuelve información como productos incluidos, estado, totales y fecha de creación.

---

## 🧠 ¿Cuándo usar este endpoint?

- Para mostrar la página de detalle de una orden.
- Cuando el usuario da clic sobre una orden en su historial.
- Para revisiones desde un panel de administración.

---

## 🔐 Requiere autenticación

Debes enviar un token JWT válido en el encabezado:

```http
Authorization: Bearer <token>
```

---

## 📋 Headers

| Nombre          | Valor                      |
|-----------------|----------------------------|
| Authorization    | Bearer <tu_token_jwt_aqui> |
| Content-Type     | application/json           |

---

##  📦 Parámetros de la ruta
- **Método:** `GET`
- **Ruta:** `/orders/findById/:orderId`

| Nombre   | Tipo   | Descripción                       |
|----------|--------|-----------------------------------|
| orderId  | UUID | ID de la orden a consultar        |

---

## 🚀 Ejemplo curl

```bash
curl -X GET "http://localhost:3000/api/orders/findById/123e4567-e89b-12d3-a456-426614174001" \
-H "Authorization: Bearer <tu_token_jwt_aqui>" \
-H "Content-Type: application/json"
```

---

## 📄 Respuesta exitosa

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "message": "succes",
  "data": {
    "id": "6494138f-ad52-4ada-9cff-3b5d8fb34722",
    "total": "140.70",
    "direction": "por aca",
    "status": "refunded",
    "createdAt": "2025-02-26T19:59:58.000Z",
    "updatedAt": "2025-02-26T21:19:12.000Z",
    "userId": "6df3a7ac-920f-4bca-b339-746676230d7a",
    "user": {
      "id": "6df3a7ac-920f-4bca-b339-746676230d7a",
      "name": "fabio2",
      "email": "fabio2@gmail.com"
    },
    "products": [
      {
        "sku": "CARTO-004",
        "id": "b2d8a815-3f4d-4ae6-8972-e4826dcd380c",
        "name": "Camiseta",
        "description": "Es una camiseta asi y asa",
        "color": "azul",
        "size": "s",
        "price": "20.10",
        "quantity": 2
      },
      {
        "sku": "CARTO-006",
        "id": "e7b69d73-a836-452f-a034-4145f9a59052",
        "name": "Camiseta",
        "description": "Es una camiseta asi y asa",
        "color": "verde",
        "size": "s",
        "price": "20.10",
        "quantity": 5
      }
    ]
  }
}
```

---

## ❌ Respuesta de error
 
| Código | Motivo                      | Solución                                                     |
| ------ | --------------------------- | ------------------------------------------------------------ |
| 404    | Orden no encontrada         | Verifica que el `orderId` sea correcto y que la orden exista. |
| 401    | No autorizado               | Asegúrate de enviar un token JWT válido en el encabezado de autorización. |
| 500    | Error interno del servidor  | Contacta al administrador del sistema si el problema persiste. |

---

## 💡 Tip ¿No recuerdas el ID?
Usa el endpoint [Ver mis órdenes](/docs/orders/find_by_user.md) para listar tus órdenes y obtener sus IDs.