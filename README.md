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

## Endpoints para productos

### Registro de productos

- **Method:** `POST`
- **Path:** `/product/register`
- **Descripcion**: Este endpoint permite a los usuarios con privilegios de administrador registrar nuevos productos en la aplicación. Para ello, deben proporcionar los datos correspondientes del producto (como sku, name, descripcion, precio, categoria y las variantes que este puede contener). Una vez completado el registro, se crea un producto que podrá ser editado en caso de que sea necesario realizar modificaciones.

### Requisito de autenticacion

- **Autenticación:** Requiere estar logueado. La solicitud debe incluir un token de JWT válido para proceder.
- **Roles permitidos:** Solo los usuarios con los roles máximos tienen permiso para realizar esta acción y gestionar la información de otros usuarios.

#### Ejemplo de solicitud

```json
{
  "sku": "CARTO-006",
  "name": "Camiseta ",
  "description": "Es una camiseta asi y asa",
  "price": 20.1,
  "category": "ZAP",
  "variants": [
    {
      "color": "azul",
      "size": "s",
      "stock": 50
    },
    {
      "color": "amarilla",
      "size": "m",
      "stock": 50
    }
  ]
}
```

#### Ejemplo de respuesta

- **Exitoso:**

```json
{
  "success": true,
  "message": "Product created",
  "data": {
    "id": "829942b1-daef-4f6b-963f-00258b2e2e4f",
    "status": true,
    "sku": "CARTO-012",
    "name": "Camiseta 2",
    "description": "Es una camiseta asi y asa",
    "price": 20.1,
    "updatedAt": "2025-03-16T04:09:43.439Z",
    "createdAt": "2025-03-16T04:09:43.439Z"
  }
}
```

- **Error:**

```json
{
  "error": "Producto ya ingresado"
}
```

Posibles errores adicionales:

- **Sku invalido :**

```json
{
  "errors": [
    "SKU product is required for register new product",
    "SKU must be beetween 6 and 10 characters",
    "El SKU debe tener el formato LETRAS-NÚMEROS (ej. CARTO-003)."
  ]
}
```

- **Error interno del servidor:**

```json
{
  "error": "Internal server error while register product"
}
```

### Buscar prodcto por categoria

- **Method:** `GET`
- **Path:** `/product/findAll?category={categoryId}`
- **Descripción:** Este endpoint permite a los usuarios buscar productos filtrando por su categoria. Si se proporciona un product en la solicitud, se devuelven únicamente los productos que coincidan con dicha categoria. Si no se especifica una, se devuelve la lista completa de productos.

#### Ejemplo de respuesta

- **Exitoso:**

```json
{
  "success": true,
  "message": "success",
  "data": [
    {
      "id": "d3555900-f65e-4541-b1da-15834d63d416",
      "sku": "CARTO-013",
      "name": "Camiseta polo",
      "description": "Es una camiseta asi y asa",
      "price": "20.10",
      "categories": [
        {
          "id": "RPA",
          "name": "Ropa"
        }
      ],
      "variants": [
        {
          "id": "9936d73b-12cb-4855-bb15-420d2024cac0",
          "color": "azul",
          "size": "s",
          "stock": 50
        },
        {
          "id": "d189fbcd-c0c2-488e-8097-06fbebb80611",
          "color": "amarilla",
          "size": "m",
          "stock": 50
        }
      ]
    }
  ]
}
```

- **Error:**

```json
{
  "error": "Category Not exist"
}
```

Posibles errores adicionales:

- **Error interno del servidor:**

```json
{
  "error": "Internal server error while find product"
}
```

### Editar informacion de un producto

- **Method:** `PUT`
- **Path:** `/product/update/:id`
- **Descripción:** Este endpoint permite a los administradores modificar los datos de los productos registrados, ademas pueden editarse los datos de sus variantes.

### Requisito de autenticacion

- **Autenticación:** Requiere estar logueado. La solicitud debe incluir un token de JWT válido para proceder.
- **Roles permitidos:** Solo los usuarios con los roles máximos tienen permiso para realizar esta acción y gestionar la información de otros usuarios.

#### Ejemplo de solicitud

```json
{
  "price": 30.1,
  "variants": [
    {
      "id": "9936d73b-12cb-4855-bb15-420d2024cac0",
      "color": "verde"
    }
  ]
}
```

#### Ejemplo de respuesta

- **Exitoso:**

```json
{
  "success": true,
  "message": "Product updated",
  "data": {
    "id": "d3555900-f65e-4541-b1da-15834d63d416",
    "sku": "CARTO-013",
    "name": "Camiseta polo",
    "description": "Es una camiseta asi y asa",
    "price": "30.10",
    "status": true,
    "createdAt": "2025-03-16T04:24:33.000Z",
    "updatedAt": "2025-03-16T04:36:26.000Z"
  }
}
```

- **Error:**

```json
{
  "error": "Invalid product"
}
```

Posibles errores adicionales:

- **Roles invalidos para usuario:**

```json
{
  "error": "You are not allowed to access this resource"
}
```

- **Error interno del servidor:**

```json
{
  "error": "Internal server error while update product"
}
```

- **Error en el id del producto:**

```json
{
  "errors": ["Product id must be a valid UUID"]
}
```

### Eliminar un producto

- **Method:** `DELETE`
- **Path:** `/product/delete/:id`
- **Descripción:** Este endpoint permite a los administradores eliminar un producto, esto se logra cambiando el estado de activo a inactivo.

### Requisito de autenticacion

- **Autenticación:** Requiere estar logueado. La solicitud debe incluir un token de JWT válido para proceder.
- **Roles permitidos:** Solo los usuarios con los roles máximos tienen permiso para realizar esta acción y gestionar la información de otros usuarios.

#### Ejemplo de respuesta

- **Exitoso:**

```json
{
  "success": true,
  "message": "Product deleted",
  "data": {}
}
```

- **Error:**

```json
{
  "error": "Invalid product"
}
```

Posibles errores adicionales:

- **Id de producto invalido:**

```json
{
  "errors": ["Product id must be a valid UUID"]
}
```

- **Error interno del servidor:**

```json
{
  "error": "Internal server error while delete product"
}
```

### Editar stock de un producto

- **Method:** `PUT`
- **Path:** `/product/addStock`
- **Descripción:** Este endpoint permite a los administradores modificar el stock de las variantes de un producto registrado.

### Requisito de autenticacion

- **Autenticación:** Requiere estar logueado. La solicitud debe incluir un token de JWT válido para proceder.
- **Roles permitidos:** Solo los usuarios con los roles máximos tienen permiso para realizar esta acción y gestionar la información de otros usuarios.

#### Ejemplo de solicitud

```json
{
  "items": [
    {
      "id": "7afc232e-c660-4c63-942c-abe5deeb7e3a",
      "quantity": 10
    }
  ]
}
```

#### Ejemplo de respuesta

- **Exitoso:**

```json
{
  "success": true,
  "message": "Products added",
  "data": {}
}
```

- **Error:**

```json
{
  "error": "Invalid product"
}
```

Posibles errores adicionales:

- **Tipo de id invalid:**

```json
{
  "errors": ["Product id must be a valid UUID"]
}
```

- **Error interno del servidor:**

```json
{
  "error": "Error while add products"
}
```

- **Cantidad para stock invalida:**

```json
{
  "errors": ["Quantity must be a number greater than 0"]
}
```

## Endpoints para categorias

### Creacion de una categoria

- **Method:** `POST`
- **Path:** `/category/create`
- **Descripcion**: Este endpoint permite a los usuarios con privilegios de administrador registrar una nueva categoria para los productos. Para ello, deben proporcionar los datos correspondientes de la categoria (como id y nombre).

### Requisito de autenticacion

- **Autenticación:** Requiere estar logueado. La solicitud debe incluir un token de JWT válido para proceder.
- **Roles permitidos:** Solo los usuarios con los roles máximos tienen permiso para realizar esta acción y gestionar la información de otros usuarios.

#### Ejemplo de solicitud

```json
{
  "id": "RPA",
  "category": "ropa"
}
```

#### Ejemplo de respuesta

- **Exitoso:**

```json
{
  "success": true,
  "message": "Product created",
  "data": {
    "id": "829942b1-daef-4f6b-963f-00258b2e2e4f",
    "status": true,
    "sku": "CARTO-012",
    "name": "Camiseta 2",
    "description": "Es una camiseta asi y asa",
    "price": 20.1,
    "updatedAt": "2025-03-16T04:09:43.439Z",
    "createdAt": "2025-03-16T04:09:43.439Z"
  }
}
```

- **Error:**

```json
{
  "error": "Category already exist"
}
```

Posibles errores adicionales:

- **Formato de id invalido:**

```json
{
  "errors": ["Id must be between 3 and 5 characters"]
}
```

- **Categoria no proporcionada:**

```json
{
  "error": "Expected double-quoted property name in JSON at position 18 (line 3 column 1)"
}
```

- **Error interno del servidor:**

```json
{
  "error": "Internal server error while create category"
}
```

### Buscar todas las categorias

- **Method:** `GET`
- **Path:** `/category/all`
- **Descripción:** Este endpoint permite a los administradores buscar todas las categorias existentes.

### Requisito de autenticacion

- **Autenticación:** Requiere estar logueado. La solicitud debe incluir un token de JWT válido para proceder.
- **Roles permitidos:** Solo los usuarios con los roles máximos tienen permiso para realizar esta acción y gestionar la información de otros usuarios.

#### Ejemplo de respuesta

- **Exitoso:**

```json
{
  "success": true,
  "message": "sucess",
  "data": [
    {
      "id": "ACC",
      "category": "Accesorios",
      "createdAt": "2025-02-26T18:41:31.000Z",
      "updatedAt": "2025-02-26T18:41:31.000Z"
    },
    {
      "id": "RPA",
      "category": "Ropa",
      "createdAt": "2025-02-26T18:41:31.000Z",
      "updatedAt": "2025-02-26T18:41:31.000Z"
    },
    {
      "id": "ZAP",
      "category": "Zapatos",
      "createdAt": "2025-02-26T18:41:31.000Z",
      "updatedAt": "2025-02-26T18:41:31.000Z"
    }
  ]
}
```

- **Error:**

```json
{
  "error": "Internal server error while find all categories"
}
```
