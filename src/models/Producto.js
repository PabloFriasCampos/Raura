const { DataTypes } = require('sequelize');
const db = require("../database/database");

const Producto = db.define('Producto', {
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Categoria: {
    type: DataTypes.ENUM("COMIDA","BEBIDA")
  },
  Disponible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  Precio: {
    type: DataTypes.DECIMAL(10, 2)
  },
  Descripcion: {
    type: DataTypes.TEXT
  }
}, {timestamps: false});

module.exports = Producto;