module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Employees", {
        employee_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
        },
        position: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        date_of_joining: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        reporting_manager: {
            type: DataTypes.INTEGER(10),
        },
        active: {
            type: DataTypes.INTEGER(4),
            allowNull: false,
            defaultValue: 1,
        }
    });
};
