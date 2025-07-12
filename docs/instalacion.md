# ⚙️ Instalación y configuración

Bienvenido a la guía de instalación de **Shop API**.  
Aquí aprenderás cómo poner en marcha el proyecto en tu máquina paso a paso.

---

## 📋 Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- ✅ [Node.js](https://nodejs.org/es) – Versión LTS recomendada  
- ✅ [MySQL](https://dev.mysql.com/downloads/installer/) – Base de datos relacional  
- ✅ [Git](https://git-scm.com/) – Para clonar el repositorio  
- ✅ Cuenta de [Stripe](https://dashboard.stripe.com/register) – Para procesar pagos  
- ✅ Cuenta de [Firebase](https://console.firebase.google.com/) – Para almacenar imágenes  

---

## 🔥 Clave de Firebase

La API utiliza Firebase para almacenar imágenes de productos.  
Debes generar un archivo `serviceAccountKey.json` desde la consola de Firebase y colocarlo en la **raíz del proyecto**.

```bash
/mi-proyecto
├── node_modules/
├── src/
├── .env
├── serviceAccountKey.json 👈 Aquí
└── README.md
```
#### 🔗 [Guía de configuración de Firebase](https://firebase.google.com/docs/admin/setup)

## 🛠️ Instalación

1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/shop-backend-express.git
cd shop-backend-express
```

2. Instala las dependencias

```bash
npm install
```

3. Configura las variables de entorno

Copia el archivo `.env.example` a `.env` y ajusta los valores según tu configuración.

```bash
cp .env.example .env
```

4. Inicia la base de datos

Asegúrate de tener MySQL en funcionamiento y crea una base de datos para el proyecto.

```sql
CREATE DATABASE shop;
```

5. Ejecuta las migraciones

```bash
npx sequelize-cli db:migrate
```

6. Inicia la aplicación

```bash
npm node --watch server.js
```
Lista! Ahora tu API debería estar corriendo en `http://localhost:3000`.(o el puerto que hayas configurado en `.env`).

---


📚 **¿Y ahora qué sigue?**

✨ **Paso 1:** Aprende cómo autenticarte correctamente en la [guía de autenticación](authentication.md).  
🔍 **Paso 2:** Explora los [endpoints organizados por módulos](endpoints/index.md) y comienza a conectar tu app con Shop API.

> ¡Todo está diseñado para que entiendas fácilmente cómo integrarte, incluso si no eres experto en backend!

---
