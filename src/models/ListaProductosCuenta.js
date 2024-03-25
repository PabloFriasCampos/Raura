const { DataTypes } = require('sequelize');
const db = require("../database/database");
const Cuenta = require('./Cuenta');
const Producto = require('./Producto');

const ListaProductosCuenta = db.define('ListaProductosCuenta', {
  ListaProductosCuentaID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Cantidad: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {timestamps: false});

Producto.belongsToMany(Cuenta, { through: ListaProductosCuenta });
Cuenta.belongsToMany(Producto, { through: ListaProductosCuenta });

module.exports = ListaProductosCuenta;