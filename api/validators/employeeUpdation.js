const xss = require('xss');
const { format } = require('date-fns');
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
        name: {
            type: 'string',
            minLength: 1,
            maxLength: 100,
            allowNull: false,
        },
        age: {
            type: 'integer',
            minimum: 18,
            maximum: 60,
        },
        position: {
            type: 'string',
            format: 'good_string',
            enum: ['Software Developer', 'Sales Representative',]
        },
        date_of_joining: {
            type: 'string',
            format: 'date',
        },
        reporting_manager: {
            type: 'integer',
            minimum: 1,
        },
    },
    required: ['employee_id'],
    additionalProperties: false,
}

module.exports = (req, res, next) => {
    const errors = [
        ...validation_wrapper(new Validator().validate(req.body, EmployeeSchema)),
    ];
    if (errors.length) {
        return res
        .status(422)
        .json({ status: 0, msg: 'Validation Error', errors });
    }
    next();
};