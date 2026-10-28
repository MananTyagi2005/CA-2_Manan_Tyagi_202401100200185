const express = require("express");
const mongoose = require("mongoose");
const Book = require("../models/Book");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, author, category } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Please enter the book title"
      });
    }

    const newBook = new Book({
      title,
      author,
      category
    });

    await newBook.save();

    res.status(201).json({
      message: "Book added successfully",
      book: newBook
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message
    });
  }
});

router.get("/", async (req, res) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;

    page = Math.max(1, Math.floor(page));
    limit = Math.min(100, Math.max(1, Math.floor(limit)));

    const skip = (page - 1) * limit;

    const books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalRecords = await Book.countDocuments();

    res.status(200).json({
      currentPage: page,
      totalRecords: totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      books: books
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const available = req.body.available;

    if (!mongoose.isValidObjectId(bookId)) {
      return res.status(400).json({
        message: "Invalid book ID"
      });
    }

    if (typeof available !== "boolean") {
      return res.status(400).json({
        message: "Available must be true or false"
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { available: available },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.status(200).json({
      message: "Book availability updated successfully",
      book: updatedBook
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message
    });
  }
});

module.exports = router;