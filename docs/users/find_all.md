# 👥 Obtener usuarios (con filtro por rol)

Este endpoint permite **listar todos los usuarios** del sistema. Además, puedes **filtrar los resultados por un rol específico** utilizando el parámetro `roleId`.

---

## 🧠 ¿Cuándo usar este endpoint?

- Para mostrar todos los usuarios en un panel administrativo.
- Para ver usuarios con un rol específico (como todos los `vendedores` o `usuarios`).
- Para auditar el sistema o gestionar permisos.

---

## 🔐 Requiere autenticación

Debes enviar un token JWT válido en el encabezado:

```http
Authorization: Bearer <tu_token_jwt_aqui>
```

Debes asegurarte de que el usuario tenga el rol adecuado para ver la lista de usuarios.

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
- **Ruta:** `/user/all?roleId={roleId}`

  | Nombre | Tipo   | Descripción                                 |
  | ------ | ------ | ------------------------------------------- |
  | roleId | String | ID del rol para filtrar usuarios (opcional) |

---

## 🚀 Ejemplo curl

```bash
curl -X GET "http://localhost:3000/api/user/all?roleId=ADMIN" \
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
  "message": "success",
  "data": [
    {
      "id": "2844282f-8a2a-4dd6-b59a-1886408df242",
      "name": "user2",
      "email": "user2@gmail.com",
      "roles": []
    },
    {
      "id": "6df3a7ac-920f-4bca-b339-746676230d7a",
      "name": "user",
      "email": "user@gmail.com",
      "roles": ["administrador"]
    }
  ]
}
```

---

## 📄 Ejemplo de respuesta sin producto

```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "success": true,
  "message": "success",
  "data": []
}
```

---

## ❌ Ejemplo de error

| Código | Motivo                     | Solución                                                                                                                   |
| ------ | -------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| 401    | No autorizado              | Asegúrate de enviar un token JWT válido en el encabezado.                                                                  |
| 400    | Rol no encontrado          | Verifica que el `roleId` sea correcto y que el rol exista.                                                                 |
| 500    | Error interno del servidor | Revisa los registros del servidor para más detalles. Intenta nuevamente más tarde o contacta al administrador del sistema. |

---

## 💡 Tip Filtrado por rol

Puedes combinar este endpoint con la lista de roles [Obtener roles](/docs/roles/find_all.md) para construir filtros dinámicos en tu panel de administración.
