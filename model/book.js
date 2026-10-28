const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  author: {
    type: String,
    default: ""
  },

  category: {
    type: String,
    default: ""
  },

  available: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: {
    createdAt: true,
    updatedAt: false
  }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;