const express = require('express');
const router = express.Router();
const { register, login, updateUser, deleteUser } = require('../controllers/authController');
const authenticateToken = require('../middlewares/authenticateToken');

// Реєстрація користувача
router.post('/register', register);

// Логін користувача
router.post('/login', login);

// Оновлення даних користувача (потрібен токен)
router.put('/update', authenticateToken, updateUser);

// Видалення користувача (потрібен токен)
router.delete('/delete', authenticateToken, deleteUser);

module.exports = router;
