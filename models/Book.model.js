const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  Img: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  Description: {
    type: String,
  },
  Quantity: {
    type: Number,
  },
  Price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["libro", "audiolibro"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const BookModel = model("Book", bookSchema);

module.exports = BookModel;
