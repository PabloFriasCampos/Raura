const express = require('express');
const cors = require('cors');
const db = require('./database/database');
const app = express();
const socket = require('socket.io')

const port = process.env.PORT || 3030;

databaseStart();

//ROUTES
const productos = require('./routes/productos');
const mesas = require('./routes/mesas');
const cuenta = require('./routes/cuenta');
const login = require('./routes/login');
const admin = require('./routes/admin');
const cocina = require('./connection/cocina');

app.use(express.json());
app.use(cors());
app.use('/images', express.static(__dirname + '/images'));

app.use('/productos', productos);
app.use('/mesas', mesas);
app.use('/cuenta', cuenta);
app.use('/auth', login);
app.use('/admin', admin);

const server = app.listen(port, () => {
  console.log('Servidor ejecutándose en el puerto: ', port)
});

const socketIO = socket(server);

socketIO.on('connection', async (socket) => {
  console.log('A connection has been created with sockedId: ', socket.id);

  socketIO.emit('getAllPedidos', await cocina.getAllPedidos());

  socket.on('cambiarEstado', async (id, Estado) => {
    await cocina.cambiarEstado(id, Estado);
    socketIO.emit('getAllPedidos', await cocina.getAllPedidos());
  });

  socket.on('refrescar',async () => {
    socketIO.emit('getAllPedidos', await cocina.getAllPedidos());
  });

});

async function databaseStart() {
  try {
    await db.authenticate();
    await db.sync();
  } catch (error) {
    throw new Error(error);
  }
}