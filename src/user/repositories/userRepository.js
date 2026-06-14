const { users } = require('../models/user');

exports.findByEmail = (email) => {
  return users.find((user) => user.email === email);
};

exports.createUser = (email, hashedPassword) => {
  const user = { email, password: hashedPassword };
  users.push(user);
  return user;
};

