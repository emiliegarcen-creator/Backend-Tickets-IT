const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: 'Falta el idToken de Google' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;

    // Condición para asignar rol según el email de Gmail
    let role = 'user';
    if (email === 'emiliegarcen3@gmail.com') {
      role = 'admin';
    }

    // Generar el token de sesión propio
    const sessionToken = jwt.sign(
      { email, role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.json({
      token: sessionToken,
      role: role,
      user: {
        email: payload.email,
        name: payload.name,
        picture: payload.picture
      }
    });

  } catch (error) {
    return res.status(401).json({ error: 'Token de Google inválido' });
  }
});

module.exports = router;