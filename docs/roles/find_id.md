# 🔍 Buscar rol por ID

Este endpoint permite obtener la **información detallada de un rol específico** utilizando su identificador único (`roleId`).

---

## 🧠 ¿Cuándo usar este endpoint?

- Cuando quieres mostrar los datos de un rol en una interfaz de edición.
- Para validar si un rol existe antes de asignarlo a un usuario.
- Para ver los permisos asociados a un rol (si implementas permisos a futuro).

---

## 🔐 Requiere autenticación

Debes enviar un token JWT válido en el encabezado:

```http
Authorization: Bearer <token>
```

Debes asegurarte de que el usuario tenga el rol adecuado para buscar roles.

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
- **Método:** `GET`
- **Ruta:** `/roles/find/:roleId`

| Nombre   | Tipo   | Descripción                       |
| -------- | ------ | --------------------------------- |
| roleId   | UUID   | ID del rol que deseas buscar      |

---

## 🚀 Ejemplo curl

```bash
curl -X GET "http://localhost:3000/api/roles/find/SPADMIN3" \
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
  "message": "Rol encontrado",
  "role": {
    "id": "SPADMIN3",
    "name": "superadmin3",
    "createdAt": "2025-02-26T18:17:03.000Z",
    "updatedAt": "2025-02-26T18:17:03.000Z"
  }
}
```
---

## ❌ Respuesta de error
| Código | Motivo                      | Solución                                                     |
| ------ | --------------------------- | ------------------------------------------------------------ |
| 404    | Rol no encontrado           | Verifica que el ID del rol sea correcto y que el rol exista. |
| 401    | No autorizado               | Asegúrate de enviar un token JWT válido con los permisos adecuados. |
| 500    | Error interno del servidor  | Intenta nuevamente más tarde o contacta al administrador.    |

---

## 💡 Tip ¿No sabes si un rol existe?

Recuerda que puedes utilizar este endpoint para verificar la existencia de un rol antes de realizar operaciones que dependan de él. Esto es especialmente útil en formularios de creación o edición.
