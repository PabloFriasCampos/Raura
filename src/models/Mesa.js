const { DataTypes } = require('sequelize');
const db = require("../database/database");

const Mesa = db.define('Mesa', {
  NumeroMesa: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {timestamps: false});

module.exports = Mesa;