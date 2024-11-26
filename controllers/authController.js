const { User } = require('../models'); // Підключаємо модель User
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Реєстрація користувача
const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Логін користувача
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('User not found');
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid password');

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Оновлення даних користувача
const updateUser = async (req, res) => {
  try {
    const { id } = req.user; // Отримуємо ID користувача з токена
    const { username, email } = req.body;

    if (!username && !email) {
      return res.status(400).json({ error: 'Username or email must be provided' });
    }

    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;

    const updated = await User.update(updateData, { where: { id } });

    if (updated[0]) {
      return res.status(200).json({ message: 'User updated successfully' });
    }
    res.status(404).json({ message: 'User not found' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Видалення користувача
const deleteUser = async (req, res) => {
  try {
    const { id } = req.user; // Отримуємо ID користувача з токена

    // Видаляємо користувача з бази даних
    const deleted = await User.destroy({ where: { id } });

    if (deleted) {
      return res.status(200).json({ message: "User deleted successfully" });
    }

    res.status(404).json({ message: "User not found" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

module.exports = { register, login, updateUser, deleteUser }; // Експортуємо всі функції контролера
