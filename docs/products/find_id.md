# 🔎 Buscar producto por ID

Este endpoint permite **obtener los detalles de un producto específico** utilizando su identificador único (ID). Es útil para mostrar la vista detallada de un producto en la tienda o para consultas administrativas.

---

## 🧠 ¿Cuándo usar este endpoint?

- Para mostrar una página de detalle del producto.
- Cuando se quiere consultar información completa de un producto específico desde un botón o link.

---

## 🔓 No requiere autenticación

Cualquier usuario puede consultar los detalles de un producto sin necesidad de estar autenticado.

---

## 📋 Headers

| Nombre        | Valor                      |
| ------------- | -------------------------- |
| Authorization | Bearer <tu_token_jwt_aqui> |
| Content-Type  | application/json           |

---

## 📦 Parámetros de la ruta

- **Método:** `GET`
- **Ruta:** `/product/find/:id`

| Nombre | Tipo | Descripción              |
| ------ | ---- | ------------------------ |
| id     | UUID | ID del producto a buscar |

---

## 🚀 Ejemplo curl

```bash
curl -X GET "http://localhost:3000/api/product/find/123e4567-e89b-12d3-a456-426614174001" \
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
  "product":
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
}

```

---

## ❌ Respuesta de error
| Código | Motivo                      | Solución                                                     |
| ------ | --------------------------- | ------------------------------------------------------------ |
| 404    | Producto no encontrado      | Verifica que el ID del producto sea correcto y exista en la base de datos. |
| 500    | Error interno del servidor | Contacta al administrador del sistema si el problema persiste. |

---

## 💡 ¿Dónde obtengo el ID del producto?

Puedes obtener todos los IDs utilizando el endpoint [Listar productos](/docs/products/find_all.md) o al registrar un nuevo producto, el ID se devuelve en la respuesta.