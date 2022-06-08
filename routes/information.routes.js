const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated.js");
const Information = require("../models/Information.model.js");

// GET "/" => para ver todos los mensajes
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const response = await Information.find();

    res.json(response);
  } catch (error) {
    next(error);
  }
});

// Post "/" => para crear mensajes
router.post("/", isAuthenticated, async (req, res, next) => {
  const { name, message, userId, email } = req.body;

  if (!name || !message || !userId || !email) {
    res.status(400).json("todos los campos deben estar llenos");
    return;
  }

  try {
    const response = await Information.create({
      name,
      message,
      userId,
      email,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// GET "/:id" => tener detalle de un message
router.get("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;

  try {
    const response = await Information.findById(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});
module.exports = router;

// DELETE "/:id" => para eliminar un menssage por id
router.delete("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;

  try {
    await Information.findByIdAndDelete(id);
    res.json("el mensaje ha sido borrado");
  } catch (error) {
    next(error);
  }
});
