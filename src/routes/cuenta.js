const router = require('express').Router();

const Auth = require('../middleware/auth');

const ListaProductosMesa = require('../models/ListaProductosMesa');
const Cuentas = require('../models/Cuenta');
const ListaProductosCuenta = require('../models/ListaProductosCuenta');
const Trabajador = require('../models/Trabajador');

router.post('/crear', Auth.verifyToken,  async (req,res) => {
  try {
    let productos = req.body.Productos
    let nMesa = req.body.id
    let correoTrabajador = req.user.Correo

    let trabajador = await Trabajador.findOne({where: { Correo: correoTrabajador }})

    let cuenta = await Cuentas.create({
          NumeroMesa: nMesa,
          FechaCuenta: Date.now(),
          TotalCuenta: 0,
          TrabajadorID: trabajador.id
        });

    await cuenta.save();

    const tempProductos = new Map();

    productos.forEach(producto => {
      const productoId = producto.Producto.id;

      if (tempProductos.has(productoId)) {
        tempProductos.set(productoId, tempProductos.get(productoId) + producto.Cantidad);
      } else {
        tempProductos.set(productoId, producto.Cantidad);
      }
    });

    for (const [productoId, cantidad] of tempProductos) {
      let lpc = await ListaProductosCuenta.create({
        ProductoId: productoId,
        CuentumId: cuenta.id,
        Cantidad: cantidad
      });
      await lpc.save();

      cuenta.TotalCuenta += cantidad * productos.find(prod => prod.Producto.id === productoId).Producto.Precio;
    }

    await cuenta.save();

    await ListaProductosMesa.destroy({
      where: {MesaId: nMesa}
    }) 
    res.status(200).json({ message: 'ok'});
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
})

router.get('/', async (req,res) => {
  try {
    const cuentas = await Cuentas.findAll();
  
    res.status(200).json(cuentas);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
})

module.exports = router