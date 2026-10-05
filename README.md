# CRUD + Login MVC (Sails.js y React)

Proyecto universitario que implementa un sistema completo con autenticación (registro/login) y un CRUD de productos. 

Construido con **Sails.js** en el backend (Node.js) y **React (Vite)** en el frontend.

## Estructura del Proyecto

El repositorio está dividido en dos partes principales:
- `backend/`: API RESTful con Sails.js, gestión de sesiones, encriptación de contraseñas con bcryptjs y políticas de seguridad.
- `frontend/`: Aplicación de React configurada con Vite, que consume la API usando fetch y maneja el estado de la sesión.

## Cómo levantar el proyecto localmente

### 1. Clonar el repositorio
```bash
git clone https://github.com/samuel2787/CRUD-Login-MVC.git
cd CRUD-Login-MVC
```

### 2. Levantar el Backend (Sails.js)
Abre una terminal, entra a la carpeta del backend, instala las dependencias y corre el servidor:
```bash
cd backend
npm install
npm run start
```
*(Si usas Sails globalmente puedes correr `sails lift`)*. El servidor correrá en `http://localhost:1337`.

### 3. Levantar el Frontend (React + Vite)
Abre **otra** terminal, entra a la carpeta del frontend, instala las dependencias y corre el servidor de desarrollo:
```bash
cd frontend
npm install
npm run dev
```
El frontend correrá en `http://localhost:5173`.

---

## ⚠️ Nota sobre la Base de Datos

Este proyecto utiliza la base de datos local por defecto de Sails (`sails-disk`), la cual se guarda en la carpeta `.tmp` del backend. 

Por motivos de seguridad y buenas prácticas, **la carpeta `.tmp` está ignorada en Git**, por lo que la base de datos no se sube al repositorio. 

**Cuando clones este proyecto por primera vez:**
1. Tu base de datos estará vacía.
2. Inicia los servidores.
3. Entra a la pantalla inicial del frontend y usa la opción **"Registrarme"** para crear un usuario nuevo.
4. Con ese nuevo usuario podrás iniciar sesión y empezar a utilizar el CRUD de productos de manera normal.
