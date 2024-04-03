const { DataTypes } = require('sequelize');
const db = require("../database/database");

const Trabajador = db.define('Trabajador', {
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Correo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Contrasena: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Rol: {
    type: DataTypes.ENUM("COCINERO","CAMARERO","ADMIN"),
    allowNull: false
  },
}, {timestamps: false});

module.exports = Trabajador;