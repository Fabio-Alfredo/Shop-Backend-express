# 🛠️ Crear rol

Este endpoint permite a un **administrador** crear nuevos roles en el sistema. Los roles pueden luego asignarse a usuarios para definir niveles de acceso o permisos personalizados.

---

## 🧠 ¿Cuándo usar este endpoint?

- Cuando necesitas crear un rol adicional como `moderador`, `vendedor`, `editor`, etc.
- Para mantener un sistema de permisos flexible y escalable.
- Cuando estás implementando control de acceso basado en roles (RBAC).

---

## 🔐 Requiere autenticación

Debes enviar un token JWT válido en el encabezado:

```http
Authorization: Bearer <token>
```

Debes asegurarte de que el usuario tenga el rol adecuado para crear roles.

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
- **Ruta:** `/roles/create`

```json
{
  "id": "SPADMIN3",
  "name": "superadmin3"
}
```

---

## 🚀 Ejemplo curl

```bash
curl -X POST "http://localhost:3000/api/roles/create" \
-H "Authorization: Bearer <tu_token_jwt_aqui>" \
-H "Content-Type: application/json" \
-d '{
  "id": "SPADMIN3",
  "name": "superadmin3"
}'
```

---

## 📄 Respuesta exitosa

```json
HTTP/1.1 201 Created
Content-Type: application/json
{
  "success": true,
  "message": "success",
  "data": {
    "id": "SPADMIN3",
    "rol": "superadmin3",
    "updatedAt": "2025-03-19T18:02:50.248Z",
    "createdAt": "2025-03-19T18:02:50.248Z"
  }
}
```

---

## ❌ Respuesta de error
| Código | Motivo                      | Solución                                                     |
| ------ | --------------------------- | ------------------------------------------------------------ |
| 400    | Rol ya existe              | Usa un ID de rol único.                                       |
| 401    | No autorizado              | Asegúrate de enviar un token JWT válido y que el usuario tenga el rol adecuado. |
| 403    | Acceso denegado          | Verifica que el usuario tenga el rol `ADMINISTRATOR`.        |
| 500    | Error interno del servidor | Intenta nuevamente más tarde o revisa los registros del servidor. |

---

## 💡 Tip Roles personalizados

Puedes usar roles personalizados para crear dashboards exclusivos por tipo de usuario y controlar exactamente qué recursos puede usar cada uno.