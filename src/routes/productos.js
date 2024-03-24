const router = require('express').Router();

const Productos = require('../models/Producto')

router.get('/', (req,res) => {
  const productos = Productos.findAll()
  res.json(productos)

})

router.get('/:id', async (req,res) => {
  const id = req.params.id
  const producto = Productos.findByPk(id)
  res.json(producto)

})

router.post('/', (req,res) => {
  const { nombre, precio } = req.body
  res.status(200).json({
    nombre,
    precio
  })

})

module.exports = router