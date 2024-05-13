const router = require('express').Router();

const ListaProductosMesa = require('../models/ListaProductosMesa');
const Cuentas = require('../models/Cuenta');
const ListaProductosCuenta = require('../models/ListaProductosCuenta');

router.post('/crear', async (req,res) => {
  try {
    let productos = req.body.Productos
    let nMesa = req.body.id

    let cuenta = await Cuentas.create({
          NumeroMesa: nMesa,
          FechaCuenta: Date.now(),
          TotalCuenta: 0
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

module.exports = router