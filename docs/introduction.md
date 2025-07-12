# 🧾 Introducción

Esta API está diseñada para ser utilizada por aplicaciones de e-commerce o gestión de pedidos. Todos los endpoints están protegidos por tokens JWT y tienen control de acceso por rol.

## 🔐 Roles

| Rol         | Descripción |
|-------------|-------------|
| Admin       | Acceso completo a todos los módulos |
| Cliente     | Solo puede hacer pedidos, pagos y revisar órdenes |

## 🔄 Flujo general de uso

1. El usuario inicia sesión
2. El administrador crea productos y categorías
3. El cliente crea órdenes y realiza pagos
4. El administrador puede reembolsar o procesar órdenes

---