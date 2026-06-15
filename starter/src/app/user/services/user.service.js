const { UserAlreadyExistsError, IncorrectCredentialsError } = require('../errors');
const userRepo = require('../repositories/user.repository');
const {hashPassword, comparePassword} = require('../utils/hash');
const {createAccessToken, createRefreshToken, verifyRefreshToken, verifyAccessToken} = require('../utils/jwt');
const logger = require('../../../common/logger/logger');
const correlationId = require('../../../common/correlation/correlationId');

// 1. register user
exports.register = async (email, password, correlationId) => {
    logger.info(`Registering user with email: ${email}`, {correlationId: correlationId});
    const exists = userRepo.findByEmail(email);
    if (exists) throw UserAlreadyExistsError;
    logger.info(`User with email: ${email} does not exist, proceeding to create user`, {correlationId: correlationId});

    const hashedPassword = await hashPassword(password);
    logger.info(`hashed password`,{correlationId: correlationId});
    return userRepo.create(email, hashedPassword);
    logger.info(`user created with email: ${email}`, {correlationId: correlationId});
}

// 2. login user
exports.login = async (email, password) => {
    const user = userRepo.findByEmail(email);
    if (!user) throw IncorrectCredentialsError; 

    const isCorrectPassword = await comparePassword(password, user.password);
    if (!isCorrectPassword) throw IncorrectCredentialsError;

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    return {accessToken, refreshToken};
}

// 3. get current user
exports.getMe = (token) => {
    return verifyAccessToken(token);
}

// 4. refresh access token
exports.refresh = (token) => {
    const user = verifyRefreshToken(token);
    const newAccessToken = createAccessToken(user);
    return {newAccessToken};
}