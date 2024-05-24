const router = require('express').Router();

const Productos = require('../models/Producto');
const Trabajadores = require('../models/Trabajador');

router.get('/productos', async (req,res) => {
  try {
    const productos = await Productos.findAll();
  
    res.status(200).json(productos);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" });
  }
})

router.get('/trabajadores', async (req,res) => {
  try {
    const trabajadores = await Trabajadores.findAll({
      attributes: ['Nombre', 'Correo', 'Rol']
    });
  
    res.status(200).json(trabajadores);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" });
  }
})

module.exports = router