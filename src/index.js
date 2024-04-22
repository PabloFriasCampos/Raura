const express = require('express');
const cors = require('cors');
const productos = require('./routes/productos');
const mesas = require('./routes/mesas')

const db = require('./database/database');

const app = express();

const port = process.env.PORT || 3030;

databaseStart();

app.use(express.json())
app.use(cors())
app.use('/images', express.static(__dirname + '/images'));

app.use('/productos', productos)
app.use('/mesas', mesas)

app.listen(port, () => {
  console.log('Servidor ejecutándose en el puerto: ', port)
})

async function databaseStart() {
  try {
    await db.authenticate()
    await db.sync()
  } catch (error) {
    throw new Error(error)
  }
}