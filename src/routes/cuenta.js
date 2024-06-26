const router = require('express').Router();

const Auth = require('../middleware/auth');

const ListaProductosMesa = require('../models/ListaProductosMesa');
const Cuentas = require('../models/Cuenta');
const ListaProductosCuenta = require('../models/ListaProductosCuenta');
const Trabajador = require('../models/Trabajador');
const Productos = require('../models/Producto');

const PDFDocument = require('pdfkit');
const fs = require('fs');

router.post('/crear', Auth.verifyToken, async (req, res) => {
  try {
    let productos = req.body.Productos;
    let nMesa = req.body.id;
    let correoTrabajador = req.user.Correo;

    let trabajador = await Trabajador.findOne({ where: { Correo: correoTrabajador } });

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
      where: { MesaId: nMesa }
    });

    const doc = new PDFDocument();
    const pdfPath = `src/cuentas/cuenta_${cuenta.id}.pdf`;

    doc.pipe(fs.createWriteStream(pdfPath));

    doc.fontSize(25).text('Cuenta Detalle', { align: 'center' });
    doc.moveDown();
    doc.fontSize(18).text(`Mesa: ${nMesa}`);
    doc.text(`Fecha: ${new Date(cuenta.FechaCuenta).toLocaleString()}`);
    doc.text(`Trabajador: ${trabajador.Rol}, ${trabajador.Nombre}`);

    doc.moveDown();
    doc.fontSize(16).text('Productos:');
    
    productos.forEach(producto => {
      doc.text(`- ${producto.Producto.Nombre}: ${producto.Cantidad} x ${producto.Producto.Precio} = ${(producto.Cantidad * producto.Producto.Precio).toFixed(2)} €`);
    });

    doc.moveDown();
    doc.fontSize(18).text(`Total Cuenta: ${(cuenta.TotalCuenta.toFixed(2))} €`, { align: 'right' });

    doc.end();

    res.status(200).json({ message: 'ok', pdfPath });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get('/', async (req,res) => {
  try {
    const cuentas = await Cuentas.findAll();
    cuentas.reverse();
  
    res.status(200).json(cuentas);
  } catch (error) {
    console.log(error)
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

    const trabajador = await Trabajador.findByPk(cuenta.TrabajadorID);

    const cuentaConProductos = {
      id: id,
      Productos: [],
      TotalCuenta: cuenta.TotalCuenta,
      FechaCuenta: cuenta.FechaCuenta,
      Trabajador: trabajador
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