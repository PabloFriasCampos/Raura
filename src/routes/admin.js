const router = require('express').Router();
const multer = require('multer');

const Auth = require('../middleware/auth');

const cors = require('cors');

const Productos = require('../models/Producto');
const Trabajadores = require('../models/Trabajador');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/images');
  },
  filename: async (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

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

router.post('/create/trabajador', Auth.verifyToken, Auth.verifyRole('ADMIN'), async (req,res) => {
  try {
    const { Nombre, Correo, Contrasena, Rol} = req.body;

    await Trabajadores.create({
      Nombre: Nombre,
      Contrasena: Contrasena, 
      Correo: Correo,
      Rol: Rol
    });
  
    res.status(200).json({ message: 'ok'});
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" });
  }
})

router.post('/create/producto', Auth.verifyToken, Auth.verifyRole('ADMIN'), async (req,res) => {
  try {
    const { Nombre, Categoria, RequiereCocina, Precio, Descripcion} = req.body;

    const producto = await Productos.create({
      Nombre: Nombre,
      Categoria: Categoria, 
      RequiereCocina: RequiereCocina,
      Precio: Precio,
      Descripcion: Descripcion
    });
    res.status(200).json({ message: 'ok', productoId: producto.id });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" });
  }
})

router.post('/image', Auth.verifyToken, Auth.verifyRole('ADMIN'), upload.single('image'), (req, res) => {
  try {
    res.status(200).json({ message: "Correct Image Upload" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router