# Ravenous

Ravenous es una aplicación de búsqueda de restaurantes construida con **React** y la **API de Yelp**.  
Forma parte de mi portafolio como Full-Stack Developer Jr. con foco en frontend, APIs y buenas prácticas de UX.


## 🚀 Demo
- **Producción:** [https://ravenous.vercel.app](https://ravenous.vercel.app)  
- **Preview:** disponible en ramas de desarrollo (`dev`).

## ⚙️ Tecnologías usadas
- React (Hooks, componentes funcionales)
- CSS puro
- Fetch a API externa (Yelp)
- Deploy con Vercel

## 🔑 Funcionalidades
- Buscar negocios por **ubicación** y **palabra clave**
- Ordenar resultados por:
  - Best Match (mejor coincidencia)
  - Highest Rated (mejor calificación)
  - Most Reviewed (más reseñas)
- UX mejorado:
  - Presionar **Enter** ejecuta la búsqueda
  - Mensaje de *Unlock Access* (cuando Yelp bloquea CORS)
  - Mensaje *No results* cuando no hay coincidencias
  - Manejo de errores de API con aviso claro al usuario
- Accesibilidad básica en controles

## 📦 Instalación local
Clona el repo y corre los siguientes comandos:

```bash
git clone https://github.com/cloecoding/ravenous_2.git
cd ravenous_2
npm install
npm start
```

La app se abre en http://localhost:3000.

## 🔑 Variables de entorno

Este proyecto utiliza variables de entorno para manejar la API Key de Yelp.

1. Copia el archivo `.env.example` y renómbralo a `.env`:
   ```cp .env.example .env```



👤 Autor
Diego Espinosa
📧 diesk.93@gmail.com
🌐 GitHub

📌 Notas
Este proyecto corresponde al Path Full-Stack Engineer de Codecademy.
Se mejoró la UX respecto al curso original con:

Manejo de errores de API

Mensajes de estado (loading, no results, unlock)

Mejor accesibilidad en inputs y botones