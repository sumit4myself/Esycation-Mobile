var uuid = require('node-uuid');
var secretKey = uuid.v4();

module.exports = {
    MONGO_URI: process.env.MONGO_URI || 'localhost',
    USER_MODEL: process.env.USER_MODEL || 'Account',
    AUTH_HEADER: process.env.AUTH_HEADER || 'satellizer',
    TOKEN_SECRET: process.env.TOKEN_SECRET || secretKey,
    FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || 'CHANGE ME',
    GOOGLE_SECRET: process.env.GOOGLE_SECRET || 'CHANGE ME'
};