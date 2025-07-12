# 🔐 Autenticación

Todos los endpoints protegidos requieren un **token JWT** válido que debe ser enviado en el encabezado HTTP de la siguiente manera:

```http
Authorization: Bearer <token>
```

Este token es generado al iniciar sesión exitosamente y debe incluirse en cada solicitud a rutas protegidas.

## ❗Errores comunes

```text
401 Unauthorized: Token inválido o no enviado
403 Forbidden: Rol no autorizado para acceder al recurso
Token expired: Sesión caducada
bad request: Error en la solicitud, verifica los datos enviados
```

## 🚀 Ejemplo de registro de usuario

```http
POST /api/auth/register
Content-Type: application/json
{
  "name": "Nuevo Usuario",
  "email": "nuevo@ejemplo.com",
  "password": "tu_contraseña"
}
```

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "message": "Usuario registrado exitosamente"
}
```

## 📝 Ejemplo de inicio de sesión

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "tu_contraseña"
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "token": "<token_jwt>"
}
```

## 📜 Ejemplo de uso del token

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

## 📌 Notas importantes

- Asegúrate de mantener tu token JWT en un lugar seguro y no compartirlo.
- Los tokens tienen una fecha de expiración, así que maneja adecuadamente la renovación de tokens.
- Si encuentras algún problema con la autenticación, verifica tus credenciales y el estado de tu token.
