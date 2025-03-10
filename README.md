# 📘 Shop API

Shop API es una solución diseñada para ayudar a las tiendas a gestionar de manera eficiente la compra y venta de productos. Permite la creación de órdenes y el procesamiento automático de pagos, optimizando la experiencia tanto para los clientes como para los administradores.

Además, la API facilita la administración de usuarios, el control de productos y la actualización de su información, incluyendo la gestión de stock. También ofrece la posibilidad de cancelar órdenes y solicitar reembolsos, brindando flexibilidad en la gestión de compras.

Para garantizar la seguridad y el control de acceso, Shop API cuenta con autenticación mediante tokens y protección de rutas basada en roles de usuario, permitiendo una personalización avanzada de permisos.

## Librerias utilizadas

El proyecto utiliza las siguientes librerías y herramientas para su funcionamiento:

- **Express** (^4.21.2): Framework web para Node.js.
- **Sequelize** (^6.37.5): ORM para la base de datos SQL.
- **Sequelize CLI** (^6.6.2): Herramienta de línea de comandos para trabajar con Sequelize.
- **jsonwebtoken (JWT)** (^9.0.2): Manejo de tokens para autenticación y autorización.
- **bcryptjs** (^2.4.3): Para la encriptación de contraseñas.
- **stripe** (^17.5.0): Integración con la plataforma de pagos Stripe.
- **dotenv** (^16.4.7): Para manejar las variables de entorno.
- **cors** (^2.8.5): Habilita la comunicación entre diferentes dominios.
- **express-validator** (^7.2.1): Librería para la validación de datos en Express.
- **http-errors** (^2.0.0): Para manejar y generar errores HTTP.
- **mysql2** (^3.12.0): Cliente MySQL para la conexión a bases de datos MySQL.

## Requisitos previos

Antes de comenzar con la instalación, asegúrate de tener lo siguiente:

- **Node.js**: Necesitarás tener Node.js instalado. Puedes descargarlo e instalarlo desde [aquí](https://nodejs.org/es).
- **MySQL**: Este proyecto requiere una base de datos MySQL para almacenar la información. Asegúrate de tener MySQL instalado en tu máquina o de tener acceso a un servidor MySQL. Puedes descargar MySQL desde [aquí](https://dev.mysql.com/downloads/installer/).
- **Stripe**: Si planeas usar la integración de pagos con [Stripe](https://stripe.com/es-us), necesitarás una cuenta en Stripe y una clave secreta para procesar pagos.

## Instalacion

1. Clona el repositorio

```bash
git clone https://github.com/Fabio-Alfredo/Shop-Backend-express.git
```

2. Ve al direcctorio del proyecto

```bash
cd Shop-Backend-express
```

3. Instala las dependencias

```bash
npm install
```

## Configuracion de variables de entorno

Configuración el servidor

```
PORT= # Puerto donde se ejecutara la aplicacion .
```

Configuración de la base de datos

```
DATABASE= # Nombre de la base de datos.
DB_USER= # Usuario de la base de datos.
DB_PASSWORD= # Contraseña para la conexión del usuario.
DB_HOST= # Host para la conexión a la base de datos.
DB_DIALECT= # Dialecto para la conexión a la base de datos.
```

Seguridad

```
PASS_SALT= # Numero de rondas para encriptar contraseñas.
JWT_SECRET= # Clave secreta para firmar y verificar tokens JWT.
```

Mas variables

```
STRIPE_SECRET= # Clave secreta de Stripe para procesar pagos
NODE_ENV= # Entorno de ejecución (development, production, etc.)
```

# Uso

Instrucciones para arrancar el servidor:

Para iniciar el servidor en modo desarrollo:

1.

```bash
node app.js
```

2.

```bash
node --watch server.js
```

# Endpoints

Los principales endpoints de la API se detallan a continuación:

## Endpoints para Autenticacion

### Registro de usuarios

- **Method:** `POST`
- **Path:** `/auth/register`
- **Descripcion**: Este endpoint permite a los usuarios registrarse en la aplicación proporcionando sus datos personales (como nombre, correo electrónico, contraseña, etc.). Al completar el registro, se crea una nueva cuenta de usuario, lo que les permite acceder a las funcionalidades de la aplicación, como realizar compras o gestionar su perfil.

#### Ejemplo de solicitud

```json
{
  "username": "user",
  "email": "user@gmail.com",
  "password": "password"
}
```

#### Ejemplo de respuesta

- **Exitoso:**

```json
{
  "success": true,
  "message": "success",
  "data": {}
}
```

- **Error:**

```json
{
  "error": "Email already in use"
}
```

Posibles errores adicionales:

- **Error en email y contraseña:**

```json
{
  "errors": [
    "Email is not valid",
    "Password must be between 6 and 20 characters"
  ]
}
```

- **Error interno del servidor:**

```json
{
  "error": "Internal server error while register user"
}
```

### Login de usuarios

- **Method:** `POST`
- **Path:** `/auth/login`
- **Descripción:** Este endpoint permite a los usuarios autenticarse en la aplicación proporcionando sus credenciales (correo electrónico y contraseña). Al iniciar sesión correctamente, se genera un token de autenticación que les permite acceder a las funcionalidades protegidas de la aplicación, como la gestión de su perfil o la realización de transacciones.

#### Ejemplo de solicitud

```json
{
  "email": "user@gmail.com",
  "password": "password"
}
```

#### Ejemplo de respuesta

- **Exitoso:**

```json
{
  "success": true,
  "message": "success login",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZkZjNhN2FjLTkyMGYtNGJjYS1iMzM5LTc0NjY3NjIzMGQ3YSIsImVtYWlsIjoiZmFiaW8yQGdtYWlsLmNvbSIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTc0MDg4MzQ2MywiZXhwIjoxNzQwODkwNjYzfQ.h7ZJ1ggWUcj74VypvTbkBM7I6E8u6NL3W1wvzU1BQgU"
  }
}
```

- **Error:**

```json
{
  "error": "Invalid credentials "
}
```

Posibles errores adicionales:

- **Error en email y contraseña:**

```json
{
  "errors": ["Email is not valid", "Password is required"]
}
```

- **Error interno del servidor:**

```json
{
  "error": "Internal server error while login user"
}
```

## Endpoints para Usuarios

### Buscar de usuario por ID

- **Method:** `GET`
- **Path:** `/user/findId/:id`
- **Descripción:** Este endpoint permite a los administradores buscar la informacion de un usuario por medio de su ID.

### Requisito de autenticacion

- **Autenticación:** Requiere estar logueado. La solicitud debe incluir un token de JWT válido para proceder.
- **Roles permitidos:** Solo los usuarios con los roles máximos tienen permiso para realizar esta acción y gestionar la información de otros usuarios.

#### Ejemplo de respuesta

- **Exitoso:**

```json
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

- **Error:**

```json
{
  "error": "Invalid credentials "
}
```

Posibles errores adicionales:

- **Token ya expirado:**

```json
{
  "error": "TokenExpiredError is not defined"
}
```

- **Id no existente:**

```json
{
  "error": "Invalid data user"
}
```

- **Error interno del servidor:**

```json
{
  "error": "Internal service errro for find user"
}
```

### Buscar de usuarios por roles

- **Method:** `GET`
- **Path:** `/user/all?roleId={roleId}`
- **Descripción:** Este endpoint permite a los administradores buscar usuarios filtrando por rol. Si se proporciona un rol en la solicitud, se devuelven únicamente los usuarios que coincidan con dicho rol. Si no se especifica un rol, se devuelve la lista completa de usuarios.

### Requisito de autenticacion

- **Autenticación:** Requiere estar logueado. La solicitud debe incluir un token de JWT válido para proceder.
- **Roles permitidos:** Solo los usuarios con los roles máximos tienen permiso para realizar esta acción y gestionar la información de otros usuarios.

#### Ejemplo de respuesta

- **Exitoso:**

```json
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

- **Error:**

```json
{
  "error": "Invalid role, not exists"
}
```

Posibles errores adicionales:

- **Token ya expirado:**

```json
{
  "error": "TokenExpiredError is not defined"
}
```

- **Error interno del servidor:**

```json
{
  "error": "Internal service error for find all users"
}
```

### Editar roles de un usuario

- **Method:** `PUT`
- **Path:** `/user/assingRole`
- **Descripción:** Este endpoint permite a los administradores modificar los roles de los usuarios. A través de una acción específica, se puede eliminar un rol asignado a un usuario (acciones "REMOVE_ROLE", "REMOVE_ROLE"),.

### Requisito de autenticacion

- **Autenticación:** Requiere estar logueado. La solicitud debe incluir un token de JWT válido para proceder.
- **Roles permitidos:** Solo los usuarios con los roles máximos tienen permiso para realizar esta acción y gestionar la información de otros usuarios.

#### Ejemplo de solicitud

```json
{
  "userId": "dbb717c8-b776-4b45-a764-de57251fe6b9",
  "roleIds": ["ADMIN"],
  "action": "REMOVE_ROLE"
}
```

#### Ejemplo de respuesta

- **Exitoso:**

```json
{
  "success": true,
  "message": "success",
  "data": "role editado con exito"
}
```

- **Error:**

```json
{
  "error": "Invalid data user"
}
```

Posibles errores adicionales:

- **Roles invalidos para usuario:**

```json
{
  "error": "You are not allowed to access this resource"
}
```

- **Editar sus propios roles:**

```json
{
  "error": "Invalid action update your roles"
}
```

- **Error interno del servidor:**

```json
{
  "error": "Internal server error for  edit role"
}
```
