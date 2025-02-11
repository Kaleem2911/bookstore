const express = require("express");
const router = express.Router();
const books = require("../Model/books");
const multer = require("multer");
const { Authentication } = require("../Routes/userAuth");
const User = require("../Model/User");
const   {upload} = require("../config/multerConfig");


const isAdmin = async (req, res, next) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
  } catch (error) {
    console.error("Error in admin check middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const storage = multer.memoryStorage();

router.post(
  "/add-books",
  Authentication,
  isAdmin,
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "File is required" });
      }

      const { title, author, price, desc, language } = req.body;

      // Save the Cloudinary URL in the database
      const book = new books({
        title,
        author,
        price,
        desc,
        language,
        file: req.file.path, // Cloudinary URL
      });

      const savedBook = await book.save();
      return res.status(200).json({ message: "Book added successfully", book: savedBook });
    } catch (error) {
      console.error("Error in /add-books route:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.put(
  "/update-books/:id",
  Authentication,
  isAdmin,
  upload.single("file"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, author, price, desc, language } = req.body;

      const updateData = { title, author, price, desc, language };

      if (req.file) {
        updateData.file = req.file.path; // Cloudinary URL
      }

      const updatedBook = await books.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found" });
      }

      return res.status(200).json({ message: "Book updated successfully", book: updatedBook });
    } catch (error) {
      console.error("Error in /update-books/:id route:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.delete(
  "/delete-books/:id",
  Authentication,
  isAdmin,
  async (req, res) => {
    console.log("Request received at /delete-books/:id");
    console.log("Params:", req.params);

    try {
      const { id } = req.params;
      const deletedBook = await books.findByIdAndDelete(id);
      if (!deletedBook) {
        console.warn(`Book with ID ${id} not found for deletion`);
        return res.status(404).json({ message: "Book not found" });
      }

      console.log("Book deleted successfully:", deletedBook);
      return res
        .status(200)
        .json({ message: "Book deleted successfully", book: deletedBook });
    } catch (error) {
      console.error("Error in /delete-books/:id route:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.get("/get-books", async (req, res) => {
  try {
    const book = await books.find();

    if (!book) {
      return res.status(404).json({ message: "Books not found" });
    }

    return res.status(200).json({ message: "Books found", book: book });
  } catch (error) {
    console.error("Error fetching book details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/get-book/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await books.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book found", book });
  } catch (error) {
    console.error("Error fetching book details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/get-book-image/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await books.findById(id);

    if (!book || !book.file) {
      return res.status(404).json({ message: "Image not found" });
    }

    
    res.set("Content-Type", "image/jpeg"); 
    return res.send(book.file); 
  } catch (error) {
    console.error("Error fetching image:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;