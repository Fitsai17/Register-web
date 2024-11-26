const express = require('express');
const { getUser, updateUser } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/profile', verifyToken, getUser);
router.put('/profile', verifyToken, updateUser);
router.delete('/delete/:id', authenticateToken, deleteUser);


module.exports = router;
