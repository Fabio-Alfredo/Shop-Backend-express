# 🚨 Errores comunes y cómo solucionarlos

En esta sección encontrarás las respuestas a los errores más frecuentes que puedes encontrar al usar la Shop API. Cada error incluye su significado y consejos para solucionarlo fácilmente.

---

## 🔑 Errores de autenticación y autorización

| Código | Descripción           | ¿Qué significa?                                            | ¿Cómo solucionarlo?                                                |
|--------|-----------------------|------------------------------------------------------------|-------------------------------------------------------------------|
| **401 Unauthorized** | No autorizado o token inválido | No estás autenticado o tu token JWT no es válido o expiró. | Inicia sesión para obtener un nuevo token. Asegúrate de enviar el token en el encabezado `Authorization`. |
| **403 Forbidden**    | Acceso denegado               | No tienes permisos suficientes para acceder a este recurso. | Verifica tu rol y permisos. Solo usuarios autorizados pueden acceder. Consulta con el administrador. |

---

## 🛠️ Errores relacionados con datos y validaciones

| Código | Descripción           | ¿Qué significa?                                            | ¿Cómo solucionarlo?                                                |
|--------|-----------------------|------------------------------------------------------------|-------------------------------------------------------------------|
| **400 Bad Request**  | Petición mal formada           | Los datos enviados no cumplen con el formato o faltan campos obligatorios. | Revisa la documentación para enviar los datos correctos. Verifica tipos y campos requeridos. |
| **404 Not Found**    | Recurso no encontrado          | El recurso que buscas (producto, usuario, orden, etc.) no existe. | Verifica que el ID o ruta sea correcta. Confirma que el recurso fue creado previamente. |

---

## ⚠️ Otros errores comunes

| Código | Descripción           | ¿Qué significa?                                            | ¿Cómo solucionarlo?                                                |
|--------|-----------------------|------------------------------------------------------------|-------------------------------------------------------------------|
| **409 Conflict**      | Conflicto de datos             | Ya existe un recurso con el mismo identificador o dato único (ej. email, nombre de rol). | Cambia el dato para que sea único o verifica si el recurso ya fue creado. |
| **500 Internal Server Error** | Error interno del servidor    | Problema en el servidor que impide procesar la solicitud.   | Intenta nuevamente más tarde. Contacta al soporte si persiste.     |

---

## 💡 Consejos para evitar errores

- Siempre valida los datos antes de enviarlos.
- Mantén actualizado tu token JWT y protégelo.
- Usa los endpoints según la documentación y los ejemplos proporcionados.
- En caso de error inesperado, revisa la conexión a internet y el estado del servidor.
- Consulta los logs del servidor si tienes acceso para más detalles.

---

## 🧪 Ejemplo de error 401 (No autorizado)

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "success": false,
  "message": "Token no válido o expirado"
}
```

---

## 🧪 Ejemplo de error 403 (Acceso denegado)

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "success": false,
  "message": "Acceso denegado"
}
```

---

## 🧪 Ejemplo de error 404 (No encontrado)

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "success": false,
  "message": "Recurso no encontrado"
}
```

---

## 🧪 Ejemplo de error 400 (Petición mal formada)

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "success": false,
  "message": "Petición mal formada"
}
```

---

## 🧪 Ejemplo de error 409 (Conflicto)

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{
  "success": false,
  "message": "Ya existe un recurso con ese identificador"
}
```

---

## 🧪 Ejemplo de error 500 (Error interno del servidor)

```http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "success": false,
  "message": "Error interno del servidor"
}
```

---

## 📞 ¿Necesitas más ayuda?

Si después de revisar esta sección sigues teniendo problemas, no dudes en contactar al soporte técnico o consultar la documentación oficial. Estamos aquí para ayudarte a resolver cualquier inconveniente que puedas tener con la Shop API.