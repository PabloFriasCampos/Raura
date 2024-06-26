const router = require('express').Router();

const Productos = require('../models/Producto')
const Mesas = require('../models/Mesa')
const ListaProductosMesa = require('../models/ListaProductosMesa');
const { default: Sqids } = require('sqids');

const sqids = new Sqids({
  minLength: 12,
})

router.get('/:id', async (req, res) => {
  try {
    let cesta = req.query.cesta;
    let comandas = req.query.comandas;
    let id
    if(cesta) id = sqids.decode(req.params.id)[0];
    if(!cesta) id = req.params.id
    if(comandas) id = sqids.decode(req.params.id)[0];
    const mesa = await ListaProductosMesa.findAll({
      where: { MesaId: id }
    });

    const mesaConProductos = {
      id: id,
      Productos: []
    };

    for (const item of mesa) {
      const producto = await Productos.findByPk(item.ProductoId);
      if(cesta && item.Estado === 'CESTA'){
        mesaConProductos.Productos.push({
        ListaProductosMesaID: item.ListaProductosMesaID,
        Cantidad: item.Cantidad,
        Estado: item.Estado,
        Producto: {
          id: producto.id,
          Nombre: producto.Nombre,
          Categoria: producto.Categoria,
          RequiereCocina: producto.RequiereCocina,
          Precio: producto.Precio,
          Descripcion: producto.Descripcion
        }
      });
      }else if (!cesta) {
        mesaConProductos.Productos.push({
        ListaProductosMesaID: item.ListaProductosMesaID,
        Cantidad: item.Cantidad,
        Estado: item.Estado,
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

    }

    res.status(200).json(mesaConProductos);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" + error });
  }
});

router.get('/', async (req, res) => {
  try {
    const mesas = await Mesas.findAll();

    res.status(200).json(mesas);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post('/add/:id', async (req,res) => {
  try {
    const mesaId = sqids.decode(req.params.id)[0]
    console.log(mesaId)
    const producto = await Productos.findByPk(req.body.id)
    const yaExiste = await ListaProductosMesa.findOne({
        where: {
          ProductoId: producto.id,
          MesaId: mesaId,
          Estado: 'CESTA'
        }
      });
    if(yaExiste){
      yaExiste.Cantidad += +req.query.cantidad;
      await yaExiste.save();
    }else{
      await ListaProductosMesa.create({
            ProductoId: producto.id,
            MesaId: mesaId,
            Cantidad: +req.query.cantidad,
            Estado: 'CESTA'
          });
    }
    res.status(200).json({ message: 'ok'});
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error });
  }
})

router.get('/cantidad/:id', async (req,res) => {
  try {
    const productoMesa = await ListaProductosMesa.findByPk( req.params.id);
    productoMesa.Cantidad = +req.query.cantidad;
    if(productoMesa.Cantidad == 0){
      await productoMesa.destroy()
    }else {
      await productoMesa.save();
    }

    res.status(200).json({ message: 'ok'});
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" });
  }
})

router.post('/send', async (req,res) => {
  try {
    let productos = req.body
    productos.forEach(async producto => {
      let productoMesa = await ListaProductosMesa.findByPk(producto.ListaProductosMesaID);
      productoMesa.Estado = producto.Producto.RequiereCocina ? 'COCINA' : 'SERVIR';
      await productoMesa.save();
    });
    res.status(200).json({ message: 'ok'});
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
})

router.get('/estado/:id', async (req,res) => {
  try {
    let productoMesa = await ListaProductosMesa.findByPk(req.params.id);
    productoMesa.Estado = req.query.estado;
    await productoMesa.save();
    res.status(200).json({ message: 'ok'});
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" });
  }
})

module.exports = router