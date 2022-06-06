const { Schema, model } = require("mongoose");

const informationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telf: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const Information = model("Information", informationSchema);

module.exports = Information;
