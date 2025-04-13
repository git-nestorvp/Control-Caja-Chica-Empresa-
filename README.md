# 💼 Sistema de Control de Caja Chica Empresarial

Este sistema permite a las empresas registrar y gestionar sus ingresos y egresos a través de una interfaz web con autenticación de usuarios y almacenamiento de datos en la nube. Está desarrollado como parte de una evaluación académica aplicando buenas prácticas de desarrollo como GitFlow, CI/CD y el uso de tecnologías modernas como Node.js y MongoDB Atlas.

## 🚀 Tecnologías Usadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- HTML, CSS, JavaScript
- Git & GitHub
- GitFlow
- GitHub Pages
- GitHub Actions (para CI/CD)

## ⚙️ Funcionalidades del Sistema

- Autenticación de usuarios (login seguro con token)
- Registro y consulta de ingresos y egresos
- Asociación de movimientos con el usuario logueado
- Panel principal (dashboard) con datos dinámicos
- Gestión del sistema vía navegador
- Implementación de ramas para control de versiones

## 🏗️ Estructura del Proyecto
/Control-Caja-Chica-Empresa │ ├── backend/ │ ├── server.js │ ├── models/ │ └── routes/ │ ├── public/ │ ├── login.html │ ├── index.html │ ├── estilos.css │ └── script.js │ ├── .github/ │ └── workflows/ │ └── nodejs.yml (CI/CD) │ ├── README.md └── .gitignore


## 🔧 Instrucciones para Ejecutar Localmente

__1. Clonar el repositorio:__

"git clone https://github.com/git-nestorvp/Control-Caja-Chica-Empresa-.git"
   
   
__2.Instalar las dependencias:__

"npm install"

__3. Crear un archivo .env con tu conexión de MongoDB Atlas:__

"MONGO_URI=tu_conexion_mongodb
JWT_SECRET=clave_secreta_para_tokens"

__4. Ejecutar el servidor:__

"node server.js"

__5. Abrir http://localhost:3000/login.html para ingresar al sistema.__


##  🔀 Flujo de Trabajo con Git y GitFlow
Este proyecto utiliza GitFlow para estructurar el desarrollo:

__main:__ versión estable del sistema

__develop:__ desarrollo integrado

__feature/:__ ramas para nuevas funcionalidades

__hotfix/:__ correcciones rápidas de producción

__release/:__ preparación de lanzamientos

## 👥 Equipo de Desarrollo

👤 Néstor (Líder del proyecto)

👤 Gisela (Colaboradora)

##  🌐 Demo del Proyecto
__👉 Puedes acceder a la versión publicada mediante GitHub Pages:__

https://git-nestorvp.github.io/Control-Caja-Chica-Empresa-/login.html

##  ⚠️ El backend debe estar encendido en una máquina local para que funcione el login.

##  📄 Licencia
Este proyecto es parte de una evaluación académica y no está licenciado para uso comercial.
