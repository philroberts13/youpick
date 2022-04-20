const { check } = require('express-validator');
const { handleValidationErrors } = require('../../../utils/validation');

const validateIdea = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a title'),
    check('title')
        .isLength({ max: 40})
        .withMessage('Titles must be 20 characters or less'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a description'),
    check('description')
        .isLength({ max: 65})
        .withMessage('Descriptions must be 50 characters or less'),

    handleValidationErrors
];

module.exports = validateIdea;
