const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("funcionando");
});

const authRoutes = require("./auth.routes.js");
router.use("/auth", authRoutes);

const bookRoutes = require("./book.routes.js");
router.use("/book", bookRoutes);

module.exports = router;
