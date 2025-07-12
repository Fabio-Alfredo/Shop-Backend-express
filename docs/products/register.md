# 🆕 Registrar producto

Este endpoint permite **registrar un nuevo producto** en la tienda. Solo los usuarios con rol **Admin** pueden acceder a esta funcionalidad.

---

## 🧠 ¿Cuándo usar este endpoint?

- Cuando quieres agregar un nuevo producto a tu catálogo.
- Para definir el nombre, precio, descripción, imagen y categoría del producto.

---

## 🔐 Requiere autenticación

Debes enviar un token JWT válido en el encabezado:

```http
Authorization: Bearer <token>
```

Debes asegurarte de que el usuario tenga el rol adecuado para registrar productos.

```http
ADMINISTRATOR
```

---

## 📋 Headers

| Nombre        | Valor                      |
| ------------- | -------------------------- |
| Authorization | Bearer <tu_token_jwt_aqui> |
| Content-Type  | multipart/form-data        |

---

## 📦 Body (form-data)
- **Método:** `POST`
- **Ruta:** `/products/register`


| Campo       | Tipo    | Descripción                     | Ejemplo                                                                           |
| ----------- | ------- | ------------------------------- | --------------------------------------------------------------------------------- |
| sku         | Texto   | Código único del producto       | `CARTO-006`                                                                       |
| name        | Texto   | Nombre del producto             | `Camiseta`                                                                        |
| description | Texto   | Descripción del producto        | `Camiseta de algodón 100%`                                                        |
| price       | Texto   | Precio del producto (decimal)   | `20.1`                                                                            |
| stock       | Texto   | Cantidad en inventario          | `100`                                                                             |
| category    | Texto   | Categoría del producto          | `ZAP`                                                                             |
| variants    | Texto   | JSON string con variantes       | `[{"color":"azul","size":"s","stock":50},{"color":"rojo","size":"m","stock":30}]` |
| images      | Archivo | Una o más imágenes del producto | Seleccionar uno o varios archivos desde tu dispositivo                            |

---

## 🚀 Ejemplo curl

```bash
curl -X POST "http://localhost:3000/api/products/register" \
-H "Authorization: Bearer <tu_token_jwt_aqui>" \
-F "sku=CARTO-006" \
-F "name=Camiseta" \
-F "description=Camiseta de algodón 100%" \
-F "price=20.1" \
-F "stock=100" \
-F "category=ZAP" \
-F "variants=[{\"color\":\"azul\",\"size\":\"s\",\"stock\":50},{\"color\":\"rojo\",\"size\":\"m\",\"stock\":30}]" \
-F "images=@/ruta/a/tu/imagen1.jpg" \
-F "images=@/ruta/a/tu/imagen2.jpg"
```

--- 

## 📄 Respuesta exitosa

```json
HTTP/1.1 201 Created
Content-Type: application/json
{
  "message": "Producto creado exitosamente",
  "product": {
    "id": 15,
    "sku": "CARTO-006",
    "name": "Camiseta",
    "price": 20.1,
    "stock": 100,
    "category": "ZAP",
    "variants": [
      {"color":"azul","size":"s","stock":50},
      {"color":"rojo","size":"m","stock":30}
    ],
    "images": [
      {
        "id": "uuid-1",
        "url": "https://storage.firebase.com/imagen1.jpg"
      },
      {
        "id": "uuid-2",
        "url": "https://storage.firebase.com/imagen2.jpg"
      }
    ]
  }
}

```

---

## ❌ Respuesta de error

| Código | Motivo                      | Solución                                                     |
| ------ | --------------------------- | ------------------------------------------------------------ |
| 400    | Datos faltantes o inválidos | Verifica que todos los campos requeridos estén bien escritos |
| 401    | No autenticado              | Asegúrate de enviar el token en el header                    |
| 403    | Permiso denegado            | Solo los usuarios Admin pueden registrar productos           |


## 💡 Tip "¿Sabías que...?"
Puedes usar este endpoint junto a la subida de imágenes por Firebase para crear productos completos con fotos.

