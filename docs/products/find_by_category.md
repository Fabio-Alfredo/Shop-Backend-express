# 🔍 Buscar productos por categoría

Este endpoint permite **consultar todos los productos que pertenecen a una categoría específica**. Es útil para mostrar los productos organizados por secciones en una tienda.

---

## 🧠 ¿Cuándo usar este endpoint?

- Para mostrar productos filtrados por categoría (ej. "Ropa", "Tecnología", "Accesorios").
- Cuando el usuario selecciona una categoría desde el frontend o el panel de administración.

---

## 🔓 No requiere autenticación

Este endpoint es público. Cualquier usuario puede consultar productos por categoría sin necesidad de estar autenticado.


---

## 📋 Headers
| Nombre          | Tipo   | Descripción                          |
|-----------------|--------|--------------------------------------|
| Authorization   | String | Token JWT para autenticación         |
| Content-Type    | String | Tipo de contenido de la solicitud    |

---
## 📦 Parámetros de la ruta
Metodo: `GET`
Ruta: `/product/findByCategory/:category`

| Nombre     | Tipo   | Descripción                          |
|------------|--------|--------------------------------------|
| category   | String | Nombre de la categoría a buscar      |

---

## 🚀 Ejemplo curl
```bash
curl -X GET "http://localhost:3000/api/product/findByCategory/ZAP" \
-H "Authorization: Bearer <tu_token_jwt_aqui>" \
-H "Content-Type: application/json"
```

---

## 📄 Respuesta exitosa

```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "message": "Productos encontrados",
  "products": [
    {
      "id": "12345",
      "sku": "CARTO-006",
      "name": "Camiseta",
      "description": "Es una camiseta asi y asa",
      "price": 20.1,
      "category": "ZAP",
      "variants": [
        {
          "color": "azul",
          "size": "s",
          "stock": 50
        },
        {
          "color": "amarilla",
          "size": "m",
          "stock": 50
        }
      ],
      "images": [
        {
          "id": "d5e76d0d-44f8-4383-a796-84a792cb900e",
          "url": "https://..."
        }
      ]
    }
  ]
}
```

---

## 📄 Ejemplo de respuesta sin productos
```json
{
  "message": "No se encontraron productos en esta categoría"
}
```

---

## ❌ Respuesta de error
| Código | Motivo                      | Solución                                                     |
| ------ | --------------------------- | ------------------------------------------------------------ |
| 404    | Categoría no encontrada     | Verifica que la categoría exista y esté registrada correctamente |
| 403    | Acceso denegado             | Asegúrate de que el token JWT sea válido y el usuario tenga permisos |
| 401    | Token inválido o no enviado | Asegúrate de enviar el token en el header y que sea válido |
---


## 📋 Donde ¿Donde consigo en ID de una categoria?
Para obtener el ID de una categoría, puedes consultar el endpoint de **listar categorías**. Este endpoint te proporcionará una lista de todas las categorías disponibles junto con sus IDs.