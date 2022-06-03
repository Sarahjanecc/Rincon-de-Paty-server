const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const UserModel = require("../models/User.model.js");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middleware/isAuthenticated");
//POST para registar el usuario

router.post("/signup", async (req, res, next) => {
  const { name, email, password, admin } = req.body;

  //validacion de Backend

  if (!name || !email || !password) {
    res.status(400).json({ errorMessage: "Campos Incompletos" });
    return;
  }

  try {
    const foundUser = await UserModel.findOne({ email });
    if (foundUser !== null) {
      res.status(400).json({ errorMessage: "Usuario ya Registrado" });
      return;
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    await UserModel.create({
      name,
      email,
      password: hashPassword,
    });

    res.json("Usuario Creado");
  } catch (error) {
    next(error);
  }
});

// POST para verificar las credenciales

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const foundUser = await UserModel.findOne({ email });
    if (foundUser === null) {
      res.status(400).json({ errorMessage: "Usuario no registrado" });
      return;
    }

    // usuario validado
    const passwordMatch = await bcryptjs.compare(password, foundUser.password);
    console.log(passwordMatch);

    if (passwordMatch === false) {
      res.status(401).json({ errorMessage: "Contraseña Incorrecta" });
      return;
    }

    // Sistema de auth. TOKEN

    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      name: foundUser.name,
      admin: foundUser.admin,
    };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "12h",
    });
    res.json({ authToken: authToken });
  } catch (error) {
    next(error);
  }
});

//get  para chekear si el TOKEN es valido.

router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log(req.payload);
  console.log("Pasando por la ruta, todo bien con el middleware");
  res.json(req.payload);
});

module.exports = router;
