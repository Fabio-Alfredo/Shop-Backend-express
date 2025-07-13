# 💸 Aprobar reembolso de una orden

Este endpoint permite a un **administrador** aprobar la **cancelación y reembolso** de una orden previamente solicitada por un usuario. Si la orden fue pagada, se procesa el reembolso mediante el proveedor de pagos (Stripe).

---

## 🧠 ¿Cuándo usar este endpoint?

- Cuando un usuario solicita cancelar su orden y esta debe ser aprobada por un administrador.
- Para confirmar manualmente la devolución del dinero.
- Para controlar reembolsos de forma segura y centralizada.

---

## 🔐 Requiere autenticación

Debes enviar un token JWT válido en el encabezado:

```http
Authorization: Bearer <token>
```

Debes asegurarte de que el usuario tenga el rol adecuado para aprobar reembolsos.

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

## 📦 Parámetros

- **Método:** `PUT`
- **Ruta:** `/orders/refund/:id`

| Nombre | Tipo | Descripción                 |
| ------ | ---- | --------------------------- |
| id     | UUID | ID de la orden a reembolsar |

---

## 🚀 Ejemplo curl

```bash
curl -X PUT "http://localhost:3000/api/orders/refund/123e4567-e89b-12d3-a456-426614174001" \
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
  "message": "order reembolsada",
  "data": {}
}
```

---

## ❌ Respuesta de error
| Código | Motivo                      | Solución                                                     |
| ------ | --------------------------- | ------------------------------------------------------------ |
| 404    | Orden no encontrada         | Verifica que el ID de la orden sea correcto.                |
| 400    | Orden no puede ser reembolsada | Asegúrate de que la orden esté en estado cancelado o pendiente de reembolso. |
| 401    | No autorizado               | Asegúrate de que el token JWT sea válido y tenga el rol de administrador. |
| 403    | No autorizado               | Asegúrate de que el token JWT tenga el rol de administrador.|
| 500    | Error interno del servidor  | Intenta nuevamente más tarde o contacta al soporte técnico. |

---

## ⚠️ Advertencia

Este endpoint **procesa el reembolso real**, por lo que debe usarse con cuidado y validación previa.


