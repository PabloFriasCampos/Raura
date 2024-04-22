const { DataTypes } = require('sequelize');
const db = require("../database/database");
const Trabajador = require('./Trabajador');

const Cuenta = db.define('Cuenta', {
  NumeroMesa: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  FechaCuenta: {
    type: DataTypes.DATE
  },
  TotalCuenta: {
    type: DataTypes.DECIMAL
  }
}, {timestamps: false});

Trabajador.hasMany(Cuenta, { foreignKey: 'TrabajadorID'});
Cuenta.belongsTo(Trabajador, { foreignKey: 'TrabajadorID'});

module.exports = Cuenta;