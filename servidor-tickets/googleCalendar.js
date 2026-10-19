const { google } = require('googleapis');

// 1. Cargamos tus credenciales (las que descargaste de la consola de Google)
const CLIENT_ID = "291073154023-e8m5l3g3dctkqm03p12btedkv0d4p8oh.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = 'http://localhost:3001/google/callback'; // O la URL de tu backend

// 2. Creamos el cliente de autenticación
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// 3. Permisos que pediremos al usuario (acceso completo a su calendario)
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

module.exports = { oauth2Client, SCOPES };