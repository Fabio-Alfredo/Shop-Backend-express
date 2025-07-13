# 🧾 Crear orden

Este endpoint permite a un usuario **realizar una compra creando una nueva orden** con los productos seleccionados. La orden puede incluir múltiples productos con sus respectivas cantidades.

---

## 🧠 ¿Cuándo usar este endpoint?

- Cuando el usuario finaliza su carrito de compras.
- Para registrar una orden en el sistema y prepararla para el pago.
- Para mantener un historial de compras por usuario.

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

## 📦 Body (JSON)

- **Método:** `POST`
- **Ruta:** `/orders/create`

```json
{
  "direction": "por aca",
  "products": [
    {
      "sku": "CARTO-004",
      "id": "b2d8a815-3f4d-4ae6-8972-e4826dcd380c",
      "quantity": 2
    },
    {
      "sku": "CARTO-006",
      "id": "e7b69d73-a836-452f-a034-4145f9a59052",
      "quantity": 5
    }
  ]
}
```

---

## 🚀 Ejemplo curl

```bash
curl -X POST "http://localhost:3000/api/orders/create" \
-H "Authorization: Bearer <tu_token_jwt_aqui>" \
-H "Content-Type: application/json" \
-d '{
  "direction": "por aca",
  "products": [
    {
      "sku": "CARTO-004",
      "id": "b2d8a815-3f4d-4ae6-8972-e4826dcd380c",
      "quantity": 2
    },
    {
      "sku": "CARTO-006",
      "id": "e7b69d73-a836-452f-a034-4145f9a59052",
      "quantity": 5
    }
  ]
}'
```

---

## 📄 Respuesta exitosa

```json
HTTP/1.1 201 Created
Content-Type: application/json
{
  "success": true,
  "message": "Order created",
  "data": {
    "id": "aeb7903e-b0cc-4fc7-ade7-441580fdf20b",
    "total": "140.70",
    "direction": "por aca",
    "status": "pending",
    "createdAt": "2025-03-16T16:38:52.000Z",
    "updatedAt": "2025-03-16T16:38:52.000Z",
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
| 400    | Datos inválidos             | Verifica que todos los campos requeridos estén bien escritos y que los productos existan. |
| 401    | No autorizado               | Asegúrate de enviar un token JWT válido en el encabezado de autorización. |
| 404    | Usuario no encontrado       | Asegúrate de que el usuario esté autenticado y exista en el sistema. |
| 409    | Stock insuficiente          | Verifica que haya suficiente stock disponible para los productos solicitados. |
| 500    | Error interno del servidor  | Intenta nuevamente más tarde. Si el problema persiste, contacta al administrador del sistema. |

---

## 💡 Tip ¿Sabías que...?
Puedes ver tus órdenes creadas usando el endpoint [Buscar órdenes del usuario](/docs/orders/find_by_user.md), ideal para mostrar un historial de compras.

