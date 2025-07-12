# 🔄 Actualizar producto

Este endpoint permite **actualizar la información de un producto existente**, incluyendo la imagen. Solo puede ser accedido por usuarios con rol **Admin**.

---

## 🧠 ¿Cuándo usar este endpoint?

- Para editar el nombre, precio, descripción o categoría de un producto.
- Para reemplazar la imagen del producto.
- Cuando se necesita corregir errores o actualizar datos.

---

## 🔐 Requiere autenticación

Debes enviar un token JWT válido en el encabezado:

```http
Authorization: Bearer <token>
```

Debes asegurarte de que el usuario tenga el rol adecuado para actualizar productos.

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

## 📦 Parámetros de la ruta
- **Método:** `PUT`
- **Ruta:** `/product/update/:id`

| Nombre | Tipo   | Descripción                          |
|--------|--------|--------------------------------------|
| id     | UUID   | ID del producto a actualizar (UUID)  |

---

## 📦 Body (form-data)

| Campo         | Tipo    | Requerido | Descripción                                |
| ------------- | ------- | --------- | ------------------------------------------ |
| `name`        | string  | ❌         | Nuevo nombre del producto                  |
| `description` | string  | ❌         | Descripción del producto                   |
| `price`       | number  | ❌         | Precio actualizado                         |
| `stock`       | number  | ❌         | Nueva cantidad en inventario               |
| `categoryId`  | number  | ❌         | ID de la nueva categoría                   |
| `image`       | archivo | ❌         | Nueva imagen del producto (`.jpg`, `.png`) |
| `variants`    | array   | ❌         | Nuevas variantes del producto (opcional)   |

---

## 🚀 Ejemplo curl

```bash
curl -X PUT "http://localhost:3000/api/product/update/7afc232e-c660-4c63-942c-abe5deeb7e3a" \
-H "Authorization: Bearer <tu_token_jwt_aqui>" \
-H "Content-Type: application/json" \
-d '{
  "name": "Camiseta Actualizada",
  "description": "Descripción actualizada de la camiseta",
  "price": 25.0,
  "stock": 60,
  "categoryId": 1,
  "image": "<url_de_la_nueva_imagen>",
  "variants": [
    {
      "color": "azul",
      "size": "s",
      "stock": 60
    },
    {
      "color": "amarilla",
      "size": "m",
      "stock": 40
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
  "message": "Product updated",
  "data": {
    "id": "7afc232e-c660-4c63-942c-abe5deeb7e3a",
    "name": "Camiseta Actualizada",
    "description": "Descripción actualizada de la camiseta",
    "price": 25.0,
    "stock": 60,
    "categoryId": 1,
    "variants": [
      {
        "color": "azul",
        "size": "s",
        "stock": 60
      },
      {
        "color": "amarilla",
        "size": "m",
        "stock": 40
      }
    ],
    "imageUrl": "<url_de_la_nueva_imagen>"
  }
}
```

---

## ❌ Respuesta de error
| Código | Motivo                      | Solución                                                     |
| ------ | --------------------------- | ------------------------------------------------------------ |
| 400    | Datos inválidos            | Verifica que todos los campos requeridos estén bien escritos |
| 404    | Producto no encontrado      | Asegúrate de que el ID del producto exista en la base de datos |
| 403    | Acceso denegado            | Solo los usuarios Admin pueden actualizar productos          |
| 401    | Token inválido o no enviado | Asegúrate de enviar el token en el header y que sea válido   |

---

## 💡 Tip "¿Sabías que...?"
Si no incluyes un campo en el *form-data*, ese dato no será modificado. Solo se actualiza lo que envías.