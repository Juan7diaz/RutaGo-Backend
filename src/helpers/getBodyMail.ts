export const getBodyMail = (username: string, password: string):string => {
  return `
  <html>
    <body>
      <div>
        <style>
          /* Estilos para el contenedor principal */
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 40px;
            background-color: #f9f9f9;
            font-family: Arial, sans-serif;
            font-size: 14px;
            line-height: 1.5;
          }

          /* Estilos para el encabezado */
          .header {
            text-align: center;
            margin-bottom: 20px;
          }

          /* Estilos para el contenido */
          .content {
            margin-bottom: 20px;
          }

          /* Estilos para los párrafos */
          .content p {
            margin-bottom: 10px;
          }

          /* Estilos para el enlace */
          .content a {
            color: #4CAF50;
            text-decoration: none;
          }

          /* Estilos para el enlace al pasar el mouse */
          .content a:hover {
            text-decoration: underline;
          }

          /* Estilos para el botón */
          .btn {
            display: inline-block;
            background-color: #f26327;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
          }
        </style>
        <div class="container">
          <div class="header">
            <img src="https://rutago.netlify.app/pictures/logo.jpeg" alt="RutaGo Logo" width="20%" height="20%">
          </div>
          <div class="content">
            <h2 style="color: #f26327; font-weight: bold; text-align: center;">Restablecimiento de contraseña - RutaGo</h2>
            <p>Hola <strong style="font-weight: bold;">${username}</strong>,</p>
            <p>Recibimos una solicitud para restablecer tu contraseña en RutaGo. Tu nueva contraseña es:</p>
            <p style="font-size: 18px; font-weight: bold; padding: 10px; background-color: #f26327; color: white">${password}</p>
            <p>Te recomendamos que <a href="https://rutago.netlify.app/auth/login" target="_blank" style="color: #f26327; text-decoration: none; font-weight: bold;">inicies sesión</a> y cambies tu contraseña después de acceder a tu cuenta.</p>
            <p>Si no realizaste esta solicitud, por favor ignora este correo electrónico.</p>
            <p>¡Gracias por utilizar RutaGo!</p>
            <br>
            <p style="font-weight: bold; text-align: center;">Equipo de RutaGo 🔥</p>
            <br>
            <p style="text-align: center;">No responder a este correo electrónico.</p>
          </div>
        </div>
      </div>
    </body>
  </html>
  `
}