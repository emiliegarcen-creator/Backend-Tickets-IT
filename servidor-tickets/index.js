const express = require('express')
const cors = require('cors')
const usuariosRoutes = require('./routes/usuarios-routes')
const ticketRoutes = require('./routes/ticket-routes')
const maquinaRoutes = require('./routes/maquina-routes')
const { google } = require('googleapis');
const { oauth2Client, SCOPES } = require('./googleCalendar');

const app = express()
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(`Petición recibida: ${req.method} ${req.url}`)
    next()
})

app.use('/ticket', ticketRoutes)

app.use('/usuarios', usuariosRoutes)

app.use('/maquina', maquinaRoutes)

app.listen(3001, () => {
    console.log('Servidor en http://localhost:3001')
})
app.get('/auth/google', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline', 
    scope: SCOPES,
    prompt: 'consent'      
  });
  
  res.redirect(url);
});

// Google redirige al usuario aquí con un "código de autorización"
app.get('/google/callback', async (req, res) => {
  const { code } = req.query; // Google nos envía el código en la URL

  try {
    // Cambiamos el código temporal por los Tokens definitivos
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const refreshToken = tokens.refresh_token;

    // Debes guardarlo en tu base de datos junto al ID del usuario actual:
    // const refreshToken = tokens.refresh_token;
    console.log('Refresh Token obtenido con éxito:', refreshToken);
    res.send('¡Conexión con Google Calendar exitosa!');
  } catch (error) {
    console.error('Error al autenticar:', error);
    res.status(500).send('Error en la autenticación');
  }
});