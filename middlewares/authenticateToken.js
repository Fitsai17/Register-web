const jwt = require('jsonwebtoken');

// Middleware для аутентифікації користувача за допомогою токена
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer token

  if (!token) return res.status(403).json({ error: 'Access denied. No token provided.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token.' });

    req.user = user; // Додаємо дані користувача до запиту
    console.log("Authenticated User ID:", user.id); // Логування ID користувача
    next(); // Продовжуємо обробку запиту
  });
};

module.exports = authenticateToken;
