const Sequelize = require('sequelize');
const { db } = require('../config/index');

const EmployeeModel = require('./employee');

const NODE_ENV = process.env.NODE_ENV || 'development';
const databaseOptions = db[NODE_ENV];

console.log(databaseOptions);

const sequelize = new Sequelize({ ...databaseOptions, dialect: 'mysql', database: 'employee_db' });
const Employee = EmployeeModel(sequelize, Sequelize);


// sequelize.sync({ force: true, alter: 'true' })
//     .then(() => {
//         console.log(`Database & tables created!`)
//     }).catch(error => console.log(error, "error"));

module.exports = {
    Employee,
}