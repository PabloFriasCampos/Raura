const jwt = require('jsonwebtoken');
const secretKey = "secret";

class Auth {

  static createToken(trabajador) {
    return jwt.sign({ Correo: trabajador.Correo, Rol: trabajador.Rol }, secretKey, { expiresIn: "18h" });
  }

  static verifyToken(req, res, next) {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }
    try {
      const payload = jwt.verify(token, secretKey);
      req.user = payload;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Token not valid" });
    }
  }

  static verifyRole(requiredRole) {
    return (req, res, next) => {
      const user = req.user;
      if (user && user.Rol === requiredRole) {
        next();
      } else {
        return res.status(403).json({ message: "Access denied" });
      }
    };
  }

}

module.exports = Auth;
