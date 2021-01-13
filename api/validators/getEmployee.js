const xss = require('xss');
const { Validator } = require('jsonschema');

const { validation_wrapper } = require('../../services/library');

Validator.prototype.customFormats.good_string = (input) => xss(input) === input;

const EmployeeSchema = {
    id: '/Employee',
    type: 'object',
    properties: {
        employee_id: {
            type: 'integer',
            minimum: 1,
        },
    },
    required: ['employee_id'],
    additionalProperties: false,
}

module.exports = (req, res, next) => {
    const { employee_id } = req.params;
    req.params = {
        ...req.params,
        employee_id: Number(employee_id)
    }
    const errors = [
        ...validation_wrapper(new Validator().validate(req.params, EmployeeSchema)),
    ];
    if (errors.length) {
        return res
        .status(422)
        .json({ status: 0, msg: 'Validation Error', errors });
    }
    
    next();
};