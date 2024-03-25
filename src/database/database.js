const { Sequelize } = require('sequelize');

const db = new Sequelize('raura','root','', {
  host : "localhost",
  dialect : "mysql"
});

module.exports = db;