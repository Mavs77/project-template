//The code below is setting up a structure for storing items with a name and description in your database

const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Item", ItemSchema);