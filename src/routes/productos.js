const router = require('express').Router();

const Productos = require('../models/Producto')

router.get('/', async (req,res) => {
  try {
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
  
    res.status(200).json(productosAgrupados);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" });
  }
})

router.get('/:id', async (req,res) => {
  try {
    const id = req.params.id
    const producto = await Productos.findByPk(id)
    res.status(200).json(producto)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" });
  }
})

module.exports = router