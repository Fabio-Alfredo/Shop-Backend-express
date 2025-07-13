# ❌ Cancelar orden / Solicitar reembolso

Este endpoint permite **cancelar una orden** previamente creada. Si la orden ya fue pagada, se intentará realizar un **reembolso automático** usando el sistema de pagos (ej. Stripe).

---

## 🧠 ¿Cuándo usar este endpoint?

- Cuando el usuario desea anular una compra antes de que sea procesada o enviada.
- En caso de errores durante el pago o pedidos duplicados.
- Para habilitar reembolsos desde el panel de administración.

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

- **Método:** `PUT`
- **Ruta:** `/orders/cancel/:id`
  | Campo | Tipo | Descripción | Ejemplo |
  | ----- | ---- | ----------- | ------- |
  | id | UUID | ID de la orden a cancelar | `123e4567-e89b-12d3-a456-426614174001` |

---

## 🚀 Ejemplo curl

```bash
curl -X PUT "http://localhost:3000/api/orders/cancel/123e4567-e89b-12d3-a456-426614174001" \
-H "Authorization: Bearer <tu_token_jwt_aqui>" \
-H "Content-Type: application/json"
```

---

## 📄 Respuesta exitosa

```json
HTTP/1.1 200 OK

{
  "success": true,
  "message": "Order canceled",
  "data": {
    "id": "6ffe7f43-eb6a-4af3-88f6-b93e8b8b7cb9",
    "total": "140.70",
    "direction": "por aca",
    "status": "processing refund",
    "createdAt": "2025-03-16T16:40:09.000Z",
    "updatedAt": "2025-03-19T17:16:22.000Z",
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
      }
    ]
  }
}
```

---

## ❌ Respuesta de error
| Código | Motivo                      | Solución                                                     |
| ------ | --------------------------- | ------------------------------------------------------------ |
| 401    | No autorizado               | Asegúrate de enviar un token JWT válido en el encabezado.    |
| 403    | Prohibido                   | Verifica que el usuario tenga el rol adecuado para cancelar órdenes. |
| 404    | Orden no encontrada         | Asegúrate de que el ID de la orden sea correcto y exista en el sistema. |
| 400    | Orden ya cancelada o reembolsada | Verifica el estado de la orden. Si ya fue cancelada o reembolsada, no se puede cancelar de nuevo. |
| 500    | Error interno del servidor  | Revisa los logs del servidor para más detalles o contacta al administrador del sistema. |

---

## ⚠️ Advertencia
Si el pago fue procesado, el sistema intentará **realizar el reembolso automáticamente** a través de Stripe. Este proceso puede demorar unos minutos.