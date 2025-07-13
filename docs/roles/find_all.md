# 📋 Listar roles disponibles

Este endpoint permite obtener la **lista completa de roles registrados en el sistema**, incluyendo sus identificadores y nombres.

---

## 🧠 ¿Cuándo usar este endpoint?

- Para mostrar los roles disponibles en un formulario (por ejemplo, al registrar usuarios).
- En paneles de administración para gestionar roles existentes.
- Para verificar qué roles están disponibles antes de asignar uno.

---

## 🔐 Requiere autenticación

Debes enviar un token JWT válido en el encabezado:

```http
Authorization: Bearer <token>
```

Debes asegurarte de que el usuario tenga el rol adecuado para listar roles.

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

## 📦 Ruta asignada
- **Método:** `GET`
- **Ruta:** `/roles/findAll`

---

## 🚀 Ejemplo curl

```bash
curl -X GET "http://localhost:3000/api/roles/findAll" \
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
      "id": "ADMIN",
      "rol": "administrador",
      "createdAt": "2025-02-26T18:17:03.000Z",
      "updatedAt": "2025-02-26T18:17:03.000Z"
    },
    {
      "id": "CLTE",
      "rol": "cliente",
      "createdAt": "2025-02-26T18:17:03.000Z",
      "updatedAt": "2025-02-26T18:17:03.000Z"
    },
    {
      "id": "MODER",
      "rol": "moderador",
      "createdAt": "2025-02-26T18:17:03.000Z",
      "updatedAt": "2025-02-26T18:17:03.000Z"
    },
    {
      "id": "SPADMIN3",
      "rol": "superadmin3",
      "createdAt": "2025-03-19T18:02:50.000Z",
      "updatedAt": "2025-03-19T18:02:50.000Z"
    }
  ]
}
```

---

## 📄 Ejemplo de respuesta sin roles

```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "success": true,
  "message": "No se encontraron roles",
  "data": []
}
```

---

## ❌ Respuesta de error

| Código | Motivo                      | Solución                                                     |
| ------ | --------------------------- | ------------------------------------------------------------ |
| 401    | No autorizado               | Asegúrate de enviar un token JWT válido en el encabezado.     |
| 403    | Acceso denegado             | Verifica que el usuario tenga el rol `ADMINISTRATOR` para listar roles. |
| 500    | Error interno del servidor  | Verifica los registros del servidor para más detalles. Intenta nuevamente más tarde o contacta al administrador del sistema. |

---

## 💡 Tip Uso Común
Puedes usar este endpoint para popular un **select** en el formulario de asignación de roles o registro de usuarios.