const ListaProductosMesa = require('../models/ListaProductosMesa');
const Productos = require('../models/Producto');

const cocina = {

    async cambiarEstado(Id, Estado) {
      const producto = await ListaProductosMesa.findByPk(Id);
      producto.Estado = Estado;
      await producto.save();
    },

    async getAllPedidos() {
      const pedidos = await ListaProductosMesa.findAll()
      
      const pedidosFormateados = await Promise.all(pedidos.map(async (pedido) => {
        const producto = await Productos.findByPk(pedido.ProductoId)
        return {
          ListaProductosMesaID: pedido.ListaProductosMesaID,
          Cantidad: pedido.Cantidad,
          Estado: pedido.Estado,
          MesaId: pedido.MesaId,
          Producto: producto
        }
      }))

      return pedidosFormateados;
    }

}

module.exports = cocina