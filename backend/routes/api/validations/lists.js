const { check } = require('express-validator');
const { handleValidationErrors } = require('../../../utils/validation');

const validateList = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a descriptive title'),
    check('title')
        .isLength({ max: 40})
        .withMessage('Titles must be 20 characters or less'),
    check('type')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an address'),
    check('description')
        .isLength({ max: 65})
        .withMessage('Descriptions must be 50 characters or less'),

    handleValidationErrors
];

module.exports = validateList;
