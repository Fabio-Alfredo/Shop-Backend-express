# 🗑️ Eliminar producto

Este endpoint permite **eliminar un producto existente** de forma permanente del sistema. Solo los usuarios con rol **Admin** pueden realizar esta acción.

---


## 🧠 ¿Cuándo usar este endpoint?

- Cuando deseas remover productos que ya no están disponibles.
- Para limpiar el catálogo de productos obsoletos o incorrectos.

---

## 🔐 Requiere autenticación

Debes enviar un token JWT válido en el encabezado:

```http
Authorization: Bearer <token>
```

Debes asegurarte de que el usuario tenga el rol adecuado para eliminar productos.

```http
ADMINISTRATOR
```

---

## 📋 Headers

| Nombre        | Valor                      |
| ------------- | -------------------------- |
| Authorization | Bearer <tu_token_jwt_aqui> |
| Content-Type  | application/json          |

---

## 📦 Parámetros de la ruta
- **Método:** `DELETE`
- **Ruta:** `/product/delete/:id`

| Campo | Tipo | Descripción | Ejemplo |
| ----- | ---- | ----------- | ------- |
| id    | UUID | ID del producto a eliminar | `123e4567-e89b-12d3-a456-426614174001` |

---

## 🚀 Ejemplo curl

```bash
curl -X DELETE "http://localhost:3000/api/product/delete/123e4567-e89b-12d3-a456-426614174001" \
-H "Authorization: Bearer <tu_token_jwt_aqui>"
```

## 📄 Respuesta exitosa

```json
HTTP/1.1 200 OK
{
  "success": true,
  "message": "Producto eliminado exitosamente"
}
```

## ❌ Respuesta de error
| Código | Motivo                      | Solución                                                     |
| ------ | --------------------------- | ------------------------------------------------------------ |
| 401    | No autorizado               | Asegúrate de enviar un token JWT válido en el encabezado.    |
| 403    | Prohibido                  | Verifica que el usuario tenga el rol `ADMINISTRATOR`. |
| 404    | Producto no encontrado      | Asegúrate de que el ID del producto sea correcto y exista en la base de datos. |
| 500    | Error interno del servidor | Intenta nuevamente más tarde o contacta al administrador del sistema. |

## ⚠️ Advertencia
Esta acción es **irreversible**. Una vez eliminado, el producto no podrá ser recuperado.