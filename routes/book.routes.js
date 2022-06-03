const router = require("express").Router();
const BookModel = require("../models/Book.model.js");

router.get("/", async (req, res, next) => {
  try {
    const response = await UserModel.find().select("title");
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
