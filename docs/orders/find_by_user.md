# 📦 Ver mis órdenes

Este endpoint permite a un usuario **autenticado** consultar todas las órdenes que ha realizado. Es útil para mostrar el historial de compras o para que el usuario haga seguimiento de sus pedidos.

---

## 🧠 ¿Cuándo usar este endpoint?

- Para mostrar un historial de compras del usuario.
- Para permitir que el usuario vea el estado de sus órdenes anteriores.
- Para implementar funcionalidades como cancelar o repetir pedidos.

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

## 📦 Parámetros de la ruta

- **Método:** `GET`
- **Ruta:** `/orders/findUser`

---

## 🚀 Ejemplo curl

```bash
curl -X GET "http://localhost:3000/api/orders/findUser" \
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
  "data": [
    {
      "id": "6494138f-ad52-4ada-9cff-3b5d8fb34722",
      "total": "140.70",
      "direction": "por aca",
      "status": "refunded",
      "createdAt": "2025-02-26T19:59:58.000Z",
      "updatedAt": "2025-02-26T21:19:12.000Z",
      "userId": "6df3a7ac-920f-4bca-b339-746676230d7a",
      "products": [
        {
          "sku": "CARTO-004",
          "name": "Camiseta",
          "description": "Es una camiseta asi y asa",
          "color": "azul",
          "size": "s",
          "price": "20.10",
          "quantity": 2
        },
        {
          "sku": "CARTO-006",
          "name": "Camiseta",
          "description": "Es una camiseta asi y asa",
          "color": "verde",
          "size": "s",
          "price": "20.10",
          "quantity": 5
        }
      ]
    },
    {
      "id": "6ffe7f43-eb6a-4af3-88f6-b93e8b8b7cb9",
      "total": "140.70",
      "direction": "por aca",
      "status": "pending",
      "createdAt": "2025-03-16T16:40:09.000Z",
      "updatedAt": "2025-03-16T16:40:09.000Z",
      "userId": "6df3a7ac-920f-4bca-b339-746676230d7a",
      "products": [
        {
          "sku": "CARTO-004",
          "name": "Camiseta",
          "description": "Es una camiseta asi y asa",
          "color": "azul",
          "size": "s",
          "price": "20.10",
          "quantity": 2
        },
        {
          "sku": "CARTO-006",
          "name": "Camiseta",
          "description": "Es una camiseta asi y asa",
          "color": "verde",
          "size": "s",
          "price": "20.10",
          "quantity": 5
        }
      ]
    },
    {
      "id": "aeb7903e-b0cc-4fc7-ade7-441580fdf20b",
      "total": "140.70",
      "direction": "por aca",
      "status": "pending",
      "createdAt": "2025-03-16T16:38:52.000Z",
      "updatedAt": "2025-03-16T16:38:52.000Z",
      "userId": "6df3a7ac-920f-4bca-b339-746676230d7a",
      "products": [
        {
          "sku": "CARTO-004",
          "name": "Camiseta",
          "description": "Es una camiseta asi y asa",
          "color": "azul",
          "size": "s",
          "price": "20.10",
          "quantity": 2
        },
        {
          "sku": "CARTO-006",
          "name": "Camiseta",
          "description": "Es una camiseta asi y asa",
          "color": "verde",
          "size": "s",
          "price": "20.10",
          "quantity": 5
        }
      ]
    }
  ]
}
```

---

## 📄 Ejemplo de respuesta sin órdenes

```json
{
  "success": true,
  "message": "No orders found for this user",
  "data": []
}
```

---

## ❌ Respuesta de error
| Código | Motivo                      | Solución                                                     |
| ------ | --------------------------- | ------------------------------------------------------------ |
| 401    | No autorizado               | Asegúrate de enviar un token JWT válido en el encabezado.    |
| 500    | Error interno del servidor  | Revisa los registros del servidor para más detalles. Si el problema persiste, contacta al administrador del sistema. |

---

## 💡 Tip ¿Necesitas más detalles?
Puedes usar [Buscar orden por ID](/docs/orders/find_by_id.md) para ver información completa de una orden específica.

