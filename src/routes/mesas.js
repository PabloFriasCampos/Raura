const router = require('express').Router();

const Productos = require('../models/Producto')
const Mesas = require('../models/Mesa')
const ListaProductosMesa = require('../models/ListaProductosMesa');

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const mesa = await Mesas.findOne({
    where: { id: id },
    include: Productos
  });

    const listaProductos = mesa.Productos.map(producto => ({
      id: producto.ListaProductosMesa.ListaProductosMesaID,
      Producto: producto,
      Cantidad: producto.ListaProductosMesa.Cantidad,
      Estado: producto.ListaProductosMesa.Estado
    }));
    const mesaMontada = {id: mesa.id, Productos: listaProductos};

    res.json(mesaMontada);
});


router.post('/add/:id', async (req,res) => {
  const producto = await Productos.findByPk(req.body.id)
  const yaExiste = await ListaProductosMesa.findOne({
      where: {
        ProductoId: producto.id,
        MesaId: req.params.id
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
  res.status(200)
})

module.exports = router