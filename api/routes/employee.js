const { Router } = require('express');

const { employeeCreationValidator, employeeUpdationValidator, deleteEmployeeValidator, getEmployeeValidator } = require('../validators/index');
const { wrap } = require('../../services/library');
const EmployeeService = require('../../services/Employee');

const route = Router();

module.exports = (app) => {
    app.use('/employee', route);
    route.post('/', employeeCreationValidator, wrap(async (req, res) => {
        const EmployeeInstance = new EmployeeService({ ...req.body });
        const { error, data } = await EmployeeInstance.register();
        if(error)
            return res.send({ status: 0, msg: error });
        res.send({ status: 1, msg: 'employee successfully registered', data });
    }));

    route.put('/', employeeUpdationValidator, wrap(async (req, res) => {
        const EmployeeInstance = new EmployeeService({ ...req.body });
        const { error, data } = await EmployeeInstance.update();
        if(error)
            return res.send({ status: 0, msg: error });
        res.send({ status: 1, msg: 'employee info successfully updated', data });
    }));

    route.get('/', wrap(async (req, res) => {
        const data = await EmployeeService.getAll();
        res.send({ status: 1, msg: 'all info fetched', data });
    }));

    route.get('/:employee_id', getEmployeeValidator, wrap(async (req, res) => {
        const { employee_id } = req.params;
        const EmployeeInstance = new EmployeeService({ employee_id });
        const { error, data } = await EmployeeInstance.getDetails();
        if(error)
            return res.send({ status: 0, msg: error });
        res.send({ status: 1, msg: 'employee info successfully fetched', data });
    }));

    route.delete('/', deleteEmployeeValidator, wrap(async (req, res) => {
        const { employee_id } = req.body;
        const EmployeeInstance = new EmployeeService({ employee_id });
        const { error, data } = await EmployeeInstance.destroy();
        if(error)
            return res.send({ status: 0, msg: error });
        res.send({ status: 1, msg: 'employee info successfully deleted', data });
    }));
}