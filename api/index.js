const { Router } = require('express');

const employee = require('./routes/employee');


module.exports = () => {
    const app = Router();
    employee(app);
    return app;
}