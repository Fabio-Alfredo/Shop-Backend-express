const {body, param} = require('express-validator');

const assingRoleValidator = [
    body('userId')
    .isUUID()
    .notEmpty()
    .withMessage('userId is required'),

    body('roleId')
    .isNumeric()
    .notEmpty()
    .withMessage('roleId is required')
]

module.exports = {
    assingRoleValidator
}