const { User } = require('../models');

const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { username, email } = req.body;
  try {
    await User.update({ username, email }, { where: { id: req.user.id } });
    res.json({ message: 'Profile updated' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getUser, updateUser };
