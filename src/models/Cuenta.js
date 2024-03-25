const { DataTypes } = require('sequelize');
const db = require("../database/database");

const Cuenta = db.define('Cuenta', {
  NumeroMesa: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  FechaCuenta: {
    type: DataTypes.DATE
  }
}, {timestamps: false});

module.exports = Cuenta;