const router = require('express').Router();

const Auth = require('../middleware/auth');

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
      attributes: ['id', 'Nombre', 'Correo', 'Rol']
    });
  
    res.status(200).json(trabajadores);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" });
  }
})

router.put('/trabajador', Auth.verifyToken, Auth.verifyRole('ADMIN'), async (req,res) => {
  try {
    const { id, Nombre, Correo, Rol } = req.body;
    const trabajador = await Trabajadores.findByPk(id);

    await trabajador.update({
      Nombre,
      Correo,
      Rol
    });
  
    res.status(200).json({ message: 'ok'});
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" });
  }
})

router.put('/producto', Auth.verifyToken, Auth.verifyRole('ADMIN'), async (req,res) => {
  try {
    const { id, Nombre, Categoria, Precio } = req.body;
    const producto = await Productos.findByPk(id);

    await producto.update({
      Nombre,
      Categoria,
      Precio
    });
  
    res.status(200).json({ message: 'ok'});
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" });
  }
})

module.exports = router