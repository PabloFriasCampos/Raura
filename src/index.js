const express = require('express');
const cors = require('cors');
const productos = require('./routes/productos');

const db = require('./database/database');

const app = express();

const port = process.env.PORT || 3030;

(async () => {
  try {
    await db.authenticate()
    await db.sync()
  } catch (error) {
    throw new Error(error)
  }
})()

app.use(express.json())
app.use(cors())

app.use('/productos', productos)

app.listen(port, () => {
  console.log('Servidor ejecutándose en el puerto: ', port)
})