# Biblioteca Digital

Aplicación web full-stack desarrollada con Node.js, Express, PostgreSQL y EJS para la gestión de una biblioteca digital, permitiendo la administración de libros y el control de préstamos mediante usuarios autenticados con JWT.

---

## Descripción

Biblioteca Digital es un sistema web que permite gestionar un catálogo de libros y el ciclo completo de préstamos bibliotecarios.

La aplicación implementa autenticación con JWT, control de acceso por roles y una arquitectura MVC completa siguiendo las buenas prácticas de desarrollo con Node.js.

---

## Funcionalidades

### Usuarios

- Registro de usuarios.
- Inicio de sesión.
- Cierre de sesión.
- Contraseñas cifradas mediante bcrypt.
- Autenticación basada en JWT almacenado en cookies.
- Control de acceso mediante middleware de autenticación.

### Gestión de libros

- Crear libros (Administrador).
- Ver catálogo de libros.
- Ver detalles de un libro.
- Editar libros (Administrador).
- Eliminar libros (Administrador).
- Gestión de disponibilidad.

### Gestión de préstamos

- Solicitar préstamo de libros.
- Consulta de préstamos propios.
- Gestión de solicitudes por parte del administrador.
- Aprobación de préstamos.
- Registro de devoluciones.
- Rechazo automático de solicitudes competidoras.
- Prevención de solicitudes duplicadas.

### Roles

#### Usuario

- Consultar catálogo.
- Ver detalles de libros.
- Solicitar préstamos.
- Consultar sus préstamos.

#### Administrador

- Gestionar catálogo de libros.
- Gestionar préstamos.
- Aprobar solicitudes.
- Registrar devoluciones.
- Acceso a funcionalidades administrativas.

---

## Tecnologías utilizadas

### Backend

- Node.js
- Express.js

### Base de datos

- PostgreSQL

### Frontend

- EJS
- Bootstrap 5
- CSS personalizado

### Seguridad

- JWT (JSON Web Token)
- bcrypt
- cookie-parser

### Arquitectura

- MVC (Model - View - Controller)

---

## Estructura del proyecto

```text
proyecto-final/
│
├── config/
│   └── database.js
│
├── controllers/
│   ├── authController.js
│   ├── bookController.js
│   └── loanController.js
│
├── middlewares/
│   ├── auth.js
│   ├── admin.js
│   └── errorHandler.js
│
├── models/
│   ├── User.js
│   ├── Book.js
│   └── Loan.js
│
├── routes/
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   └── loanRoutes.js
│
├── public/
│   ├── css/
│   └── js/
│
├── views/
│   ├── auth/
│   ├── books/
│   ├── loans/
│   ├── layouts/
│   ├── partials/
│   └── error.ejs
│
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
```

---

## Modelo de datos

### Tabla users

```text
id
username
email
password
role
```

### Tabla books

```text
id
title
author
category
description
available
```

### Tabla loans

```text
id
user_id
book_id
loan_date
status
```

---

## Estados de préstamo

```text
PENDING
APPROVED
REJECTED
RETURNED
```

---

## Instalación local

### 1. Clonar repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear archivo .env

```env
JWT_SECRET=tu_clave_secreta
```

### 4. Configurar PostgreSQL

Crear la base de datos:

```sql
CREATE DATABASE Biblioteca;
```

### 5. Ejecutar el proyecto

```bash
npm start
```

La aplicación estará disponible en:

```text
http://localhost:3000
```

---

## Seguridad implementada

- Hash de contraseñas con bcrypt.
- Autenticación mediante JWT.
- Middleware de autorización.
- Control de roles.
- Protección de rutas administrativas.
- Manejo centralizado de errores.

---

## Autor

Thiago Herrera De La Cruz

Proyecto Final de la Asignatura Optativa Node.js.

Universidad de Ciencias Informáticas (UCI)