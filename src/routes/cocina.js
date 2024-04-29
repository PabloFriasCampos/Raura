const router = require('express').Router();

const ListaProductosMesa = require('../models/ListaProductosMesa');

router.get('/all', async (req, res) => {
  try {
    const productosMesas = await ListaProductosMesa.findAll({
        where: {
          Estado: 'COCINA'
        }
      });
      return res.status(200).json(productosMesas);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router