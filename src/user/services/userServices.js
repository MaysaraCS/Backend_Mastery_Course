// buisness logic
const userRepo = require('../repositories/userRepository');
const { hashPassword, comparePassword } = require('../utils/hash');
const { createAccessToken, createRefreshToken } = require('../utils/jwt');

// 1. register a user (password should be hashed)
exports.register = async (email, password) => {
  const exist = userRepo.findByEmail(email);
  if (exist) {
    throw new Error('User already exists');
  }
  const hashedPassword = await hashPassword(password);
  return userRepo.createUser(email, hashedPassword);
};

// 2. login a user (verify password and generate tokens)
exports.login = async (email, password) => {
  const user = userRepo.findByEmail(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const accessToken = createAccessToken({ email });
  const refreshToken = createRefreshToken({ email });

  return {
    message: 'Login successful',
    user: { email },
    tokens: { accessToken, refreshToken }
  };
};

