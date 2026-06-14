const userService = require('../services/userServices.js');

exports.register = async (req, res) => {
  try {
    const user = await userService.register(req.body.email, req.body.password);
    res.status(201).json({ message: 'User registered successfully', user: { email: user.email } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await userService.login(req.body.email, req.body.password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

