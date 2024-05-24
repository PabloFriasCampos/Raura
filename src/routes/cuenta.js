const router = require('express').Router();

const Auth = require('../middleware/auth');

const ListaProductosMesa = require('../models/ListaProductosMesa');
const Cuentas = require('../models/Cuenta');
const ListaProductosCuenta = require('../models/ListaProductosCuenta');
const Trabajador = require('../models/Trabajador');
const Productos = require('../models/Producto');

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

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const productosCuenta = await ListaProductosCuenta.findAll({
      where: { CuentumId: id }
    });
    cuenta = await Cuentas.findByPk(id);

    const cuentaConProductos = {
      id: id,
      Productos: [],
      TotalCuenta: cuenta.TotalCuenta,
      FechaCuenta: cuenta.FechaCuenta
    };

      for (const item of productosCuenta) {
      const producto = await Productos.findByPk(item.ProductoId);
        cuentaConProductos.Productos.push({
        ListaProductosCuentaID: item.ListaProductosCuentaID,
        Cantidad: item.Cantidad,
        Producto: {
          id: producto.id,
          Nombre: producto.Nombre,
          Categoria: producto.Categoria,
          RequiereCocina: producto.RequiereCocina,
          Precio: producto.Precio,
          Descripcion: producto.Descripcion
        }
      });
    }

    res.status(200).json(cuentaConProductos);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" });
  }
})

module.exports = router