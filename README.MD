# RutaGo - Backend

<p align="center">
  <img src="./img_readme/desktops.png" alt="Vista Principal en Dispositivos Desktops" width="400">
  <img src="./img_readme/moviles.png" alt="Vista Principal en Dispositivos Móviles" width="400">
</p>

## Descripción

¿Estás cansado de perderte en la ciudad? 🤔 RutaGo es la aplicación web funcional que estabas esperando. Desarrollada por un equipo de programadores web entusiastas, RutaGo te brinda una solución innovadora para descubrir las rutas de autobuses en Santa Marta. 🌴

### Características Principales:

- 🌐 Frontend moderno con React y Chakra UI para una experiencia de usuario excepcional
- 🔒 Autenticación segura con bcryptjs, jsonwebtoken y recuperación de contraseña vía correo electrónico
- 🗺️ Visualización interactiva de rutas de autobús con Leaflet
- 🔐 Rutas públicas y privadas para usuarios autenticados
- 📡 Backend robusto con Node, Express, TypeORM y PostgreSQL
- 👤 Vistas personalizadas para usuarios y administradores

### Tecnologías Utilizadas:

- **Front-end**: React, Chakra UI, Axios, Leaflet
- **Back-end**: Node, bcryptjs, cors, dotenv, express, express-validator, jsonwebtoken, typeorm, postgresql, nodemailer

Nuestro equipo (Juan Díaz, Daniel Cogollos y Gian Astori) trabajó arduamente siguiendo una arquitectura MVC para entregar esta aplicación web escalable 🚀

## Instalación

Sigue estos pasos para poner en marcha el backend de RutaGo en tu entorno local:

### Prerrequisitos

- Node.js instalado
- Yarn instalado
- PostgreSQL instalado

### Instrucciones

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/Juan7diaz/RutaGo-Backend.git
   cd RutaGo-Backend
   ```

2. **Instalar dependencias**:

   ```bash
   yarn install
   ```

3. **Configurar variables de entorno**:

   Crea un archivo `.env` en la raíz del proyecto, utilizando el archivo `.env.example` como referencia, y define las siguientes variables:

   ```env
   PORT=8080
   TOKEN_SECRET=your_secret_key
   TYPEORM_CONNECTION=postgres
   TYPEORM_HOST=localhost
   TYPEORM_USERNAME=your_db_username
   TYPEORM_PASSWORD=your_db_password
   TYPEORM_PORT=5432
   TYPEORM_DATABASE=your_db_name
   ```

4. **Iniciar el servidor de desarrollo**:

   ```bash
   yarn dev
   ```

   El servidor estará disponible en `http://localhost:8080`.

5. **Insertar roles en la base de datos**:

   Una vez creadas las tablas, inserta los roles necesarios en la tabla `role`. Puedes hacer esto ejecutando el siguiente comando en tu terminal o usando tu herramienta de gestión de bases de datos preferida:

   ```sql
   INSERT INTO role (id, name) VALUES (1, 'USER'), (2, 'ADMIN');
   ```

## Repositorio del Frontend

Para configurar y ejecutar el frontend, visita el repositorio:

- [Frontend de RutaGo](https://github.com/Juan7diaz/RutaGo-Frontend)

## Contribución

¡Nos encantaría recibir tu ayuda para mejorar RutaGo! Si deseas contribuir, por favor sigue estos pasos:

1. Haz un fork del proyecto
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`)
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva característica'`)
4. Sube tus cambios a tu fork (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request


---

¿Necesitas ayuda adicional o tienes alguna pregunta? No dudes en abrir un issue o contactar a alguno de los miembros del equipo. ¡Gracias por utilizar RutaGo! 🌟

---