const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  purchaseLink: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["libro", "audiolibro"],
  },
  adminId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const BookModel = model("Book", bookSchema);

module.exports = BookModel;
