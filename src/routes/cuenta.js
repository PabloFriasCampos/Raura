const router = require('express').Router();

const ListaProductosMesa = require('../models/ListaProductosMesa');
const Cuentas = require('../models/Cuenta');
const ListaProductosCuenta = require('../models/ListaProductosCuenta');

router.post('/crear', async (req,res) => {
  try {
    let productos = req.body.Productos
    let nMesa = req.body.id

    let cuenta = Cuentas.create({
            NumeroMesa: nMesa,
            FechaCuenta: Date.now(),
            TotalCuenta: 0
          });

    await cuenta.save();

    productos.forEach(async producto => {
      let lpc = ListaProductosCuenta.create({
            ProductoId: producto.id,
            CuentaId: cuenta.id,
            Cantidad: producto.Cantidad,
          });
          await lpc.save();
          cuenta.TotalCuenta += producto.Cantidad;
    });
    await cuenta.save();

    await ListaProductosMesa.destroyAll({
      where: {MesaId: nMesa}
    })
    res.status(200).json({ message: 'ok'});
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
})

module.exports = router