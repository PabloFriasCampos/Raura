const router = require('express').Router();

const Productos = require('../models/Producto')
const Mesas = require('../models/Mesa')
const ListaProductosMesa = require('../models/ListaProductosMesa');

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const mesa = await Mesas.findOne({
      where: { id: id },
      include: Productos
    });

    const listaProductos = mesa.Productos.filter(producto => producto.ListaProductosMesa.Estado === 'CESTA')
      .map(producto => ({
        id: producto.ListaProductosMesa.ListaProductosMesaID,
        Producto: producto,
        Cantidad: producto.ListaProductosMesa.Cantidad,
        Estado: producto.ListaProductosMesa.Estado
      }));
    const mesaMontada = {id: mesa.id, Productos: listaProductos};

    res.status(200).json(mesaMontada);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post('/add/:id', async (req,res) => {
  try {
    const producto = await Productos.findByPk(req.body.id)
    const yaExiste = await ListaProductosMesa.findOne({
        where: {
          ProductoId: producto.id,
          MesaId: req.params.id,
          Estado: 'CESTA'
        }
      });
    if(yaExiste){
      yaExiste.Cantidad += +req.query.cantidad;
      await yaExiste.save();
    }else{
      await ListaProductosMesa.create({
            ProductoId: producto.id,
            MesaId: req.params.id,
            Cantidad: +req.query.cantidad,
            Estado: 'CESTA'
          });
    }
    res.status(200).json({ message: 'ok'});
  } catch (error) {
    res.status(500).json({ message: error });
  }
})

router.get('/cantidad/:id', async (req,res) => {
  try {
    const productoMesa = await ListaProductosMesa.findByPk(req.params.id);
    productoMesa.Cantidad = +req.query.cantidad;
    if(productoMesa.Cantidad == 0){
      await productoMesa.destroy()
    }else {
      await productoMesa.save();
    }

    res.status(200).json({ message: 'ok'});
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
})

router.post('/send', async (req,res) => {
  try {
    let productos = req.body
    productos.forEach(async producto => {
      let productoMesa = await ListaProductosMesa.findByPk(producto.id);
      productoMesa.Estado = producto.Producto.RequiereCocina ? 'COCINA' : 'SERVIR';
      await productoMesa.save();
    });
    res.status(200).json({ message: 'ok'});
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
})

module.exports = router