# 👤 Editar rol de usuario

Este endpoint permite a un **administrador** cambiar el rol asignado a un usuario. Es útil para promover o limitar permisos dentro del sistema, como pasar de `user` a `admin`, o asignar un rol personalizado como `moderador` o `vendedor`.

---

## 🧠 ¿Cuándo usar este endpoint?

- Para cambiar el nivel de acceso de un usuario.
- Para asignar roles recién creados.
- Para implementar flujos de gestión de usuarios desde un panel de control.

---

## 🔐 Requiere autenticación

Debes enviar un token JWT válido en el encabezado:

```http
Authorization: Bearer <tu_token_jwt_aqui>
```

Debes asegurarte de que el usuario tenga el rol adecuado para editar roles de otros usuarios.

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

## 📦 Body (JSON)
- **Método:** `POST`
- **Ruta:** `/users/edit-role`

```json
{
  "userId": "dbb717c8-b776-4b45-a764-de57251fe6b9",
  "roleIds": ["ADMIN"],
  "action": "REMOVE_ROLE"
}
```

---

## 🚀 Ejemplo curl

```bash
curl -X POST "http://localhost:3000/api/users/edit-role" \
-H "Authorization: Bearer <tu_token_jwt_aqui>" \
-H "Content-Type: application/json" \
-d '{
  "userId": "dbb717c8-b776-4b45-a764-de57251fe6b9",
  "roleIds": ["ADMIN"],
  "action": "REMOVE_ROLE"
}'
```

---

## 📄 Respuesta exitosa

```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "success": true,
  "message": "success",
  "data": "role editado con exito"
}
```

---

## ❌ Respuesta de error
| Código | Motivo                      | Solución                                                     |
| ------ | --------------------------- | ------------------------------------------------------------ |
| 400    | Datos de entrada inválidos  | Asegúrate de enviar un JSON válido con los campos requeridos. |
| 401    | No autorizado               | Asegúrate de enviar un token JWT válido y que el usuario tenga el rol adecuado. |
| 403    | Acceso denegado             | Verifica que el usuario tenga el rol `ADMINISTRATOR`.        |
| 500    | Error interno del servidor  | Intenta nuevamente más tarde o revisa los registros del servidor. |

---

## ⚠️ Advertencia

Este endpoint puede modificar accesos sensibles. Asegúrate de validar correctamente los permisos del usuario que hace la solicitud.
