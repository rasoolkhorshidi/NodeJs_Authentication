const expressvalidator = require('express-validator');
const check = expressvalidator.check;

module.exports = {
  validateLogin: [
    check('username')
      .notEmpty()
        .withMessage('Username is required')
        .isString()
        .withMessage('Username must be a string'),
    check('password')
        .notEmpty()
            .withMessage('Password is required')
            .isString()
            .withMessage('Password must be a string'),
    ],
    validateLogout: [
        check('token')
            .notEmpty()
            .withMessage('Token is required')
            .isString()
            .withMessage('Token must be a string'),
        ],
    validateRegister: [
        check('username')
            .notEmpty()
            .withMessage('Username is required')
            .isString()
            .withMessage('Username must be a string'),
        check('password')
            .notEmpty()
            .withMessage('Password is required')
            .isString()
            .withMessage('Password must be a string'),
        check('email')
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Invalid email format'),
    ],
};