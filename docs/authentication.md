# 🔐 Autenticación en Shop API

La autenticación en Shop API se basa en el uso de **JSON Web Tokens (JWT)** para asegurar que solo los usuarios autorizados puedan acceder a ciertos recursos y realizar acciones específicas. Además, implementamos un sistema de roles para controlar el acceso según el nivel de permisos.

---

## ⚙️ ¿Qué es JWT y por qué lo usamos?

JWT (JSON Web Token) es un formato seguro y compacto para transmitir información entre partes, firmado digitalmente para evitar manipulaciones.

Lo usamos para:

- **Autenticar** quién eres.
- **Autorizar** qué puedes hacer según tu rol.

---

## 🛡️ Roles de usuario

| Rol    | Descripción                    | Ícono |
| ------ | ------------------------------|-------|
| Admin  | Acceso total a todos los recursos y acciones. | 🔑    |
| User   | Acceso limitado a sus propios recursos, como sus pedidos. | 👤    |

---

## 📜 Flujo básico de autenticación

1. Registro de usuario: `POST /api/auth/register`
2. Inicio de sesión: `POST /api/auth/login` para obtener el token JWT.
3. Enviar el token en el header `Authorization: Bearer <token>` en cada solicitud a rutas protegidas.
4. Verificación del token en el backend para validar acceso.

---

## 📑 Endpoints de autenticación

Estos son los principales endpoints relacionados con la autenticación:

## 🚀 ¿Como registrarse?

```http
POST /api/auth/register
Content-Type: application/json
{
  "name": "Nuevo Usuario",
  "email": "nuevo@ejemplo.com",
  "password": "tu_contraseña"
}
```
### Ejemplo de respuesta exitosa

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "message": "Usuario registrado exitosamente"
}
```

---

## 📝 ¿Como obtener un token?

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "tu_contraseña"
}
```

### Ejemplo de respuesta exitosa

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "token": "<token_jwt>"
}
```

---

## 📜 ¿Como hago uso del token?

```http
GET /api/products
Authorization: Bearer <token_jwt>
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "products": [
    {
      "id": 1,
      "name": "Producto 1",
      "price": 100
    },
    {
      "id": 2,
      "name": "Producto 2",
      "price": 200
    }
  ]
}
```

---

## 🖥️ Uso del token en el frontend

Para utilizar el token JWT en el frontend, sigue estos pasos:

1. **Almacena el token**: Guarda el token JWT en el almacenamiento local o en una cookie segura después de iniciar sesión.
2. **Incluye el token en las solicitudes**: Agrega el token en el encabezado `Authorization` de cada solicitud a las rutas protegidas.

Ejemplo usando `fetch`:

```javascript
const token = localStorage.getItem('token');

fetch('/api/products', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(response => response.json())
  .then(data => console.log(data));
```

---
## ⚠️ Notas importantes

- Asegúrate de mantener tu token JWT en un lugar seguro y no compartirlo.
- Los tokens tienen una fecha de expiración, así que maneja adecuadamente la renovación de tokens.
- Si encuentras algún problema con la autenticación, verifica tus credenciales y el estado de tu token.

---
## 🔐 Conoce más

Para obtener más información sobre la autenticación y otros temas relacionados, consulta los siguientes recursos:

- [Documentación oficial de JWT](https://jwt.io/introduction/)
- [Guía de seguridad en APIs REST](https://restfulapi.net/security)
- [Mejores prácticas para manejar tokens JWT](https://auth0.com/docs/security)
