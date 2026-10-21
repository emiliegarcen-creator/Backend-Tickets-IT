const express = require('express');
const router = express.Router();
const { requireAdmin } = require('../middlewares/authMiddleware');


router.get('/dashboard', requireAdmin, (req, res) => {
  res.json({
    message: 'Bienvenido al panel privado de administración',
    user: req.user
  });
});

module.exports = router;