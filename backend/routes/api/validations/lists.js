const { check } = require('express-validator');
const { handleValidationErrors } = require('../../../utils/validation');

const validateList = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a descriptive title'),
    check('type')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an address'),

    handleValidationErrors
];

module.exports = validateList;
