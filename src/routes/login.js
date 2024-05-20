const router = require('express').Router();

const Auth = require('../middleware/auth');

const Trabajador = require('../models/Trabajador');

router.post("/login", async (req, res) => {
  try {
    const Correo = req.body.Correo;
    const Contrasena = req.body.Contrasena;
    if (!Correo || !Contrasena) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    const trabajador = await Trabajador.findOne({ where: {Correo: Correo, Contrasena: Contrasena}})
    if (trabajador != null && trabajador != undefined) {
      const token = Auth.createToken(trabajador);
      return res.status(200).json({ token: token });
    } else {
      return res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// TEST
router.get("/protected", Auth.verifyToken, async (req, res) => {
  return res.status(200).json({ message: "You have access" });
});
router.get("/admin", Auth.verifyToken, Auth.verifyRole('ADMIN'), (req, res) => {
  return res.status(200).json({ message: "You have access" });
});

module.exports = router