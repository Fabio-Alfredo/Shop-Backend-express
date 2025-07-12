# ➕ Añadir stock a producto

Este endpoint permite **añadir unidades al stock existente** de uno o varios productos. Solo los usuarios con rol **Admin** pueden realizar esta acción.

---


## 🧠 ¿Cuándo usar este endpoint?

- Cuando necesitas aumentar la cantidad disponible de uno o varios productos en inventario.
- Ideal para actualizar stock tras nuevas adquisiciones o devoluciones.

---

## 🔐 Requiere autenticación
Debes enviar un token JWT válido en el encabezado:

```http
Authorization: Bearer <token>
```
Debes asegurarte de que el usuario tenga el rol adecuado para modificar el stock de productos.

```http
ADMINISTRATOR
```

---
## 📋 Headers

| Nombre          | Tipo   | Descripción                          |
|-----------------|--------|--------------------------------------|
| Authorization   | String | Token JWT para autenticación         |
| Content-Type    | String | Tipo de contenido de la solicitud    |


## 📦 Body (JSON)
- **Método:** `PUT`
- **Ruta:** `/product/addStock/:id`

Array con los productos a modificar. Cada producto debe incluir su ID y la cantidad a añadir al stock.

```json
{
  "items": [
    {
      "id": "7afc232e-c660-4c63-942c-abe5deeb7e3a",
      "quantity": 10
    },
    {
      "id": "a123bc45-d678-90ef-gh12-ijkl34567890",
      "quantity": 5
    }
  ]
}
```

## 🚀 Ejemplo curl

```bash
curl -X PATCH "http://localhost:3000/api/product/addStock/7afc232e-c660-4c63-942c-abe5deeb7e3a" \
-H "Authorization: Bearer <tu_token_jwt_aqui>" \
-H "Content-Type: application/json" \
-d '{
  "items": [
    {
      "id": "7afc232e-c660-4c63-942c-abe5deeb7e3a",
      "quantity": 10
    }
  ]
}'
```

---

## 📄 Respuesta exitosa

```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "success": true,
  "message": "Products added",
  "data": {}
}
```
## ❌ Respuesta de error

en formato tabla

| Código de estado | motivo                        | solucion                                                                 |
|-----------------|-------------------------------|--------------------------------------------------------------------------|
| 400             | ID de producto inválido       | Verifica que el ID sea un UUID válido                                   |
| 401             | Token no proporcionado        | Asegúrate de incluir el token en el encabezado de la solicitud         |
| 403             | Usuario no autorizado         | Solo los usuarios con rol Admin pueden modificar el stock de productos |
| 404             | Producto no encontrado        | Verifica que el ID del producto exista en la base de datos              |
| 500             | Error interno del servidor    | Revisa los logs del servidor para más detalles sobre el error         |

---

## 💡 Tip "¿Sabías que...?"
Puedes añadir stock a varios productos en una sola solicitud, simplemente incluye todos los items en el array.

