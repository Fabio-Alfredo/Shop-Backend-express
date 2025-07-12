# 📦 Obtener todos los productos

Este endpoint permite **consultar todos los productos disponibles** en el sistema. Es ideal para mostrar el catálogo completo de productos en el frontend o en el panel de administración.

---

## 🧠 ¿Cuándo usar este endpoint?

- Para mostrar una lista completa de productos al usuario final.
- En dashboards de administración para gestionar productos.
- Para aplicar filtros o búsquedas desde el frontend.

---

## 🔓 No requiere autenticación

Cualquier usuario puede hacer esta consulta, no necesita estar registrado ni autenticado.

---

## 📋 Headers

| Nombre        | Valor                      |
| ------------- | -------------------------- |
| Content-Type  | application/json          |

---
## 📦 Ruta asignada
- **Método:** `GET`
- **Ruta:** `/products/findAll`

---

## 🚀 Ejemplo curl

```bash
curl -X GET "http://localhost:3000/api/products/findAll" \
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
      "stock": 100,
      "variants": [
        {"color":"azul","size":"s","stock":50},
        {"color":"rojo","size":"m","stock":30}
      ],
      "images": [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg"
      ]
    },
    // Otros productos...
  ]
}
```

---

## 📄 Ejemplo de respuesta sin productos

```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "message": "No se encontraron productos",
  "products": []
}
```

---

## ❌ Respuesta de error

| Código | Motivo                      | Solución                                                     |
| ------ | --------------------------- | ------------------------------------------------------------ |
| 500    | Error interno del servidor  | Verifica los registros del servidor para más detalles. Intenta nuevamente más tarde o contacta al administrador del sistema. |

---

## 📋 ¿Quieres buscar productos por categoría?
Usa el endpoint [Buscar productos por categoría](/docs/products/find_by_category.md) para filtrar productos según su categoría.

