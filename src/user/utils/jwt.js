const jwt = require('jsonwebtoken');

const ACCESS_SECRET = 'mykey';
const REFERESH_SECRET = 'myrefkey';

exports.createAccessToken = (user) => {
    return jwt.sign({email: user.email}, ACCESS_SECRET, {expiresIn: '15m'});
}

exports.createRefreshToken = (user) => {
    return jwt.sign({email: user.email}, REFERESH_SECRET, {expiresIn: '7d'});
}

exports.verifyRefereshToken = (token) => {
    jwt.verify(token, REFERESH_SECRET);
}

exports.verifyAccessToken = (token) => {
    jwt.verify(token, ACCESS_SECRET);
}