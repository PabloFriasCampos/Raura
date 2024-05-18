const router = require('express').Router();
const jwt = require("jsonwebtoken");
const secretKey = "secret";
const Trabajador = require('../models/Trabajador')

router.post("/login", async (req, res) => {
  try {
    const Correo = req.body.Correo;
    const Contrasena = req.body.Contrasena;
    if (!Correo || !Contrasena) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    const trabajador = await Trabajador.findOne({ where: {Correo: Correo, Contrasena: Contrasena}})
    if (trabajador != null && trabajador != undefined) {
      const token = jwt.sign({ Correo, Rol: trabajador.Rol }, secretKey, { expiresIn: "18h" });
      return res.status(200).json({ token: token });
    } else {
      return res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// TEST
router.get("/protected", verifyToken, async (req, res) => {
  return res.status(200).json({ message: "You have access" });
});
router.get("/admin", verifyToken, verifyRole('ADMIN'), (req, res) => {
  return res.status(200).json({ message: "You have access" });
});

function verifyToken(req, res, next) {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token not provied" });
  }
  try {
    const payload = jwt.verify(token, secretKey);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token not valid" });
  }
}

function verifyRole(requiredRole) {
  return (req, res, next) => {
    const user = req.user;
    if (user && user.Rol === requiredRole) {
      next();
    } else {
      return res.status(403).json({ message: "Token not valid" });
    }
  };
}

module.exports = router