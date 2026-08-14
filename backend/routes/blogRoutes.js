const express = require("express");

const {
    createBlog,
    getAllBlogs,
    getMyBlogs
} = require("../controllers/blogController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// Get all blogs
router.get("/", getAllBlogs);


// Create blog
router.post("/", protect, createBlog);


// Get logged-in user's blogs
router.get("/my-blogs", protect, getMyBlogs);


module.exports = router;