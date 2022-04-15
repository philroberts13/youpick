const { check } = require('express-validator');
const { handleValidationErrors } = require('../../../utils/validation');

const validateIdea = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a title'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a description'),

    handleValidationErrors
];

module.exports = validateIdea;
