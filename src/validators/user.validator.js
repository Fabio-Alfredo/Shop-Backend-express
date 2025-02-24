const {body, param} = require('express-validator');
const actionRoles = require('../utils/constants/operationRoles.util');

const actionList = Object.values(actionRoles);

const assingRoleValidator = [
    body('userId')
    .isUUID()
    .notEmpty()
    .withMessage('userId is required'),

    body('roleIds')
    .isArray({min: 1})
    .withMessage('roleIds is required')
    .notEmpty()
    .withMessage('roleIds is required'),

    body('roleIds.*')
    .isString()
    .withMessage('roleIds must be an array of strings'),


    body('action')
    .isIn(actionList)
    .withMessage(`action must be one of the following values: ${actionList.join(', ')}`)
    .isString()
    .notEmpty()
    .withMessage('action is required')

]

const idValidators = [
    param('id')
    .isUUID()
    .notEmpty()
    .withMessage('userId is required')
]

module.exports = {
    assingRoleValidator,
    idValidators
}