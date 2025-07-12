# 🔍 Buscar categoría por ID

Este endpoint permite **obtener la información de una categoría específica** a partir de su identificador único. Es útil para ver el detalle de una categoría o verificar si existe antes de actualizarla o eliminarla.

---

## 🧠 ¿Cuándo usar este endpoint?

- Para consultar detalles de una categoría en el panel de administración.
- Para validar la existencia de una categoría antes de editarla.
- Para mostrar el nombre de una categoría en páginas de detalle.

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
| Content-Type  | multipart/form-data        |

---

## 📦 Parámetros de la ruta
- **Método:** `GET`
- **Ruta:** `/category/findById/:id`

| Nombre     | Tipo   | Descripción                          |
|------------|--------|--------------------------------------|
| id         | String | ID de la categoría a buscar         |

---

## 🚀 Ejemplo curl

```bash
curl -X GET "http://localhost:3000/api/category/findById/12345" \
-H "Authorization: Bearer <tu_token_jwt_aqui>" \
-H "Content-Type: application/json"
```

---

## 📄 Respuesta exitosa

```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "message": "Categoría encontrada",
  "category": {
    "id": "ZAP",
    "name": "Zapatos"
  }
}
```

---

## ❌ Respuesta de error

| Código | Motivo                      | Solución                                                     |
| ------ | --------------------------- | ------------------------------------------------------------ |
| 400    | ID de categoría inválido    | Verifica que el ID sea un identificador válido y esté registrado |
| 401    | No autorizado               | Asegúrate de enviar un token JWT válido en el encabezado de autorización. |
| 404    | Categoría no encontrada     | Verifica que la categoría exista y esté registrada correctamente |
| 500    | Error interno del servidor  | Contacta al administrador del sistema si el problema persiste. |

---

## 📋 Donde ¿Donde consigo en ID de una categoria?

Puedes consultar todos los IDs de las categorías disponibles usando el endpoint [Listar categorías](/docs/categories/find_all.md). `