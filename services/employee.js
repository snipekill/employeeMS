const { Employee: EmployeeModel } = require('../models/index');

class Employee {
    constructor({ name = '', age = 0, position = '', reporting_manager = 0, date_of_joining = '', employee_id = '' }) {
        this.name = name;
        this.age = age;
        this.position = position;
        this.reporting_manager = reporting_manager;
        this.date_of_joining = date_of_joining;
        if (employee_id)
            this.employee_id = employee_id;
    }

    async destroy() {
        if (!this.employee_id)
            return { error: 'Employee Id not present' };
        const { error } = await this.getDetails();
        if (error)
            return { error: 'Employee Id is not valid' };
        await EmployeeModel.update({ active: 0 }, {
            where: {
                employee_id: this.employee_id, active: 1
            }
        });
        return { data: { employee_id: this.employee_id } };
    }

    async update() {
        if (!this.employee_id)
            return { error: 'Employee Id not present' };
        const { error } = await this.getDetails();
        if (error)
            return { error: 'Employee Id is not valid' };
        await EmployeeModel.update({
            ...this.name && { name: this.name },
            ...this.age && { age: this.age },
            ...this.position && { position: this.position },
            ...this.reporting_manager && { reporting_manager: this.reporting_manager },
            ...this.date_of_joining && { date_of_joining: this.date_of_joining },
        }, {
            where: {
                employee_id: this.employee_id, active: 1
            }
        });
        return { data: { employee_id: this.employee_id } };
    }

    async getDetails() {
        if (!this.employee_id)
            return { error: 'Employee Id not present' };
        const data = await EmployeeModel.findAll({ where: { employee_id: this.employee_id, active: 1 }, attributes: ['name', 'age', 'position', 'reporting_manager', 'date_of_joining', 'employee_id'] });
        console.log(data);
        if (data.length === 0)
            return { error: 'No such Employee Id' };
        return { data: data[0] };
    }

    static async getAll() {
        const data = await EmployeeModel.findAll({ where: { active: 1 }, attributes: ['name', 'age', 'position', 'reporting_manager', 'date_of_joining', 'employee_id'] });
        return { data };
    }

    async register() {
        if (this.employee_id)
            return { error: 'Employee Already Registered' };
        const employeeInstance = await EmployeeModel.create({
            name: this.name,
            age: this.age,
            position: this.position,
            reporting_manager: this.reporting_manager,
            date_of_joining: this.date_of_joining,
        });
        this.employee_id = employeeInstance.employee_id;
        return { data: employeeInstance };
    }
}

module.exports = Employee;