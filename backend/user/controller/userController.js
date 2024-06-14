const User = require('../models/user');

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get Me Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
