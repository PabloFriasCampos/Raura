const { DataTypes } = require('sequelize');
const db = require("../database/database");
const Mesa = require('./Mesa');
const Producto = require('./Producto');

const ListaProductosMesa = db.define('ListaProductosMesa', {
  ListaProductosMesaID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Cantidad: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  Estado: {
    type: DataTypes.ENUM("CESTA","COCINA","PREPARACION","SERVIR","LISTO","SERVIDO")
  }
}, {timestamps: false});

Producto.belongsToMany(Mesa, { through: ListaProductosMesa });
Mesa.belongsToMany(Producto, { through: ListaProductosMesa });

module.exports = ListaProductosMesa;