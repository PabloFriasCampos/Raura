const router = require('express').Router();

const Productos = require('../models/Producto')

/* // Codigo ejemplo para include (Cruce de tablas)
router.get('/', async (req,res) => {
  const cuenta = await Cuentas.findAll({
    where: {id: 1},
    include: Productos
  });
  res.json(cuenta)

}) */

router.get('/', async (req,res) => {
  const productos = await Productos.findAll();
  const productosAgrupados = [];

  const temporal = {};

  productos.forEach(producto => {
    if (!temporal[producto.Categoria]) {
      temporal[producto.Categoria] = [];
    }
    temporal[producto.Categoria].push(producto);
  });

  for (const categoria in temporal) {
      productosAgrupados.push({ Categoria: categoria, Productos: temporal[categoria] });
  }

  res.json(productosAgrupados);
})

router.get('/:id', async (req,res) => {
  const id = req.params.id
  const producto = await Productos.findByPk(id)
  res.json(producto)
})

module.exports = router