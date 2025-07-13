# 💳 Crear pago

Este endpoint permite **realizar el pago de una orden existente** utilizando un token de pago generado por una plataforma como Stripe. Al procesar correctamente el pago, la orden se actualiza a "pagada".

---

## 🧠 ¿Cuándo usar este endpoint?

- Inmediatamente después de que el usuario confirme su compra.
- Para enviar la información de pago al backend y registrar la transacción.
- Para actualizar el estado de una orden a "pagada".

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
- **Ruta:** `/payments/create`

```json
{
  "method": "card",
  "orderId": "aeb7903e-b0cc-4fc7-ade7-441580fdf20b",
  "description": "aca va algo",
  "paymentDetails": {
    "token": "tok_abc123",
    "email": "user@example.com"
  }
}
```

---

## 🚀 Ejemplo curl

```bash
curl -X POST "http://localhost:3000/api/payments/create" \
-H "Authorization: Bearer <tu_token_jwt_aqui>" \
-H "Content-Type: application/json" \
-d '{
  "method": "card",
  "orderId": "aeb7903e-b0cc-4fc7-ade7-441580fdf20b",
  "description": "Pago de la orden",
  "paymentDetails": {
    "token": "tok_abc123",
    "email": "user@example.com"
    }
}'
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
    "id": "2ced9b1e-0702-4fc4-bcce-7323727f625b",
    "method": "card",
    "updatedAt": "2025-03-19T17:41:58.060Z",
    "createdAt": "2025-03-19T17:41:58.060Z"
  }
}
```

---

## ❌ Respuesta de error

| Código | Motivo                      | Solución                                                     |
| ------ | --------------------------- | ------------------------------------------------------------ |
| 400    | Datos de pago inválidos     | Verifica que todos los campos requeridos estén presentes y sean válidos. |
| 404    | Orden no encontrada         | Asegúrate de que la orden exista y el ID sea correcto.      |
| 402    | Pago no autorizado          | Verifica que el token de pago sea válido y que la tarjeta tenga fondos suficientes. |
| 500    | Error interno del servidor  | Intenta nuevamente más tarde o contacta al administrador del sistema. |


---

## 💡 ¿Y si el pago falla?
El estado de la orden no se actualiza si el pago es rechazado. Puedes reintentar el proceso usando otro token válido.