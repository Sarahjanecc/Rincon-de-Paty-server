const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated.js");
const BookModel = require("../models/Book.model.js");
const InformationModel = require("../models/Information.model.js");

// GET "/" => para ver todos los libros
router.get("/", async (req, res, next) => {
  try {
    const response = await BookModel.find();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// Post "/create" => para crear libros
router.post("/create", isAuthenticated, async (req, res, next) => {
  const { title, img, url, description, price, type, adminId } = req.body;

  if (
    !title ||
    !description ||
    price === undefined ||
    !type ||
    !adminId ||
    !img
  ) {
    res.status(400).json("todos los campos deben estar llenos");
    return;
  }

  if (type === "audiolibro" && !url) {
    res.status(400).json(" los audiolibros necesitan url");
    return;
  }

  console.log("ruta funcionando ");

  try {
    const response = await BookModel.create({
      title,
      img,
      url,
      description,
      price,
      type,
      adminId,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// DELETE "/:id" => para eliminar un libro por id
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    // buscar un todo y borrarlo de la BD
    await BookModel.findByIdAndDelete(id);
    res.json("el libro ha sido borrado");
  } catch (error) {
    next(error);
  }
});

// PATCH "/:id" => editar un Libro
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { title, img, url, description, price, type, adminId } = req.body;

  if (
    !title ||
    !description ||
    price === undefined ||
    !type ||
    !adminId ||
    !img
  ) {
    res.status(400).json("todos los campos deben estar llenos");
    return;
  }

  if (type === "audiolibro" && !url) {
    res.status(400).json(" los audiolibros necesitan url");
    return;
  }

  try {
    const response = await BookModel.findByIdAndUpdate(
      id,
      {
        title,
        img,
        url,
        description,
        price,
        type,
        adminId,
      },
      { new: true }
    );
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// GET "/audio" => para ver todos los audio libros
router.get("/audio", isAuthenticated, async (req, res, next) => {
  try {
    const response = await BookModel.find();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// Post "/message" => para almacenar los message
router.post("/message", isAuthenticated, async (req, res, next) => {
  const { name, email, telf, message, userId } = req.body;

  try {
    const response = await InformationModel.create({
      name,
      email,
      telf,
      message,
      userId,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
