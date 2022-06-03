const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  Telefono: {
    type: String,
    required: true,
  },
  Message: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const Contact = model("Contact", contactSchema);

module.exports = Contact;
