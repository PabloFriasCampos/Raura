const { DataTypes } = require('sequelize');
const db = require("../database/database");

const Mesa = db.define('Mesa', {
}, {timestamps: false});

module.exports = Mesa;