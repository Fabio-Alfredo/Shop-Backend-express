# 🔍 Buscar usuario por ID

Este endpoint permite obtener **información detallada de un usuario** específico, utilizando su identificador único (`userId`). Incluye su nombre, correo electrónico y rol asignado.

---

## 🧠 ¿Cuándo usar este endpoint?

- Para mostrar el perfil completo de un usuario.
- Para verificar su rol actual antes de editarlo.
- Para operaciones de gestión y soporte desde el panel de administración.

---

## 🔐 Requiere autenticación

Debes enviar un token JWT válido en el encabezado:

```http
Authorization: Bearer <token>
```

Debes asegurarte de que el usuario tenga el rol adecuado para ver los detalles del usuario.

```http
ADMINISTRATOR
```

---

## 📋 Headers

| Nombre        | Valor            |
| ------------- | ---------------- |
| Authorization | Bearer <token>   |
| Content-Type  | application/json |

---

## 📦 Parámetros de la ruta

- **Método:** `GET`
- **Ruta:** `/user/find/:id`
  | Nombre | Tipo | Descripción |
  | ------ | ---- | ------------------------ |
  | id | UUID | ID del usuario a buscar |

---

## 🚀 Ejemplo curl

```bash
curl -X GET "http://localhost:3000/api/user/find/123e4567-e89b-12d3-a456-426614174001" \
-H "Authorization: Bearer <tu_token_jwt_aqui>" \
-H "Content-Type: application/json"
```

---

## 📄 Respuesta exitosa

```json
HTTP/1.1 200 OK
Content-Type: application/json
{
{
  "success": true,
  "message": "success",
  "data": {
      "id": "dbb717c8-b776-4b45-a764-de57251fe6b9",
      "name": "user2",
      "email": "user2@gmail.com",
      "roles": []
  }
}
}
```

---

## ❌ Respuesta de error
| Código | Motivo                      | Solución                                                     |
| ------ | --------------------------- | ------------------------------------------------------------ |
| 404    | Usuario no encontrado       | Verifica que el ID del usuario sea correcto y que exista en la base de datos. |
| 401    | No autorizado               | Asegúrate de enviar un token JWT válido con los permisos adecuados. |
| 500    | Error interno del servidor  | Intenta nuevamente más tarde o contacta al soporte técnico.  |

---

## 📄 Id invalido

El ID del usuario suele ser un UUID generado automáticamente al momento del registro. Asegúrate de copiarlo correctamente para evitar errores.