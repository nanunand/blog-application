const express = require("express");

const {
    createBlog,
    getAllBlogs,
    getMyBlogs,
    updateBlog,
    deleteBlog
} = require("../controllers/blogController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// =============================
// GET ALL BLOGS
// =============================
router.get("/", getAllBlogs);


// =============================
// GET MY BLOGS
// =============================
router.get("/my-blogs", protect, getMyBlogs);


// =============================
// CREATE BLOG
// =============================
router.post("/", protect, createBlog);


// =============================
// UPDATE BLOG
// =============================
router.put("/:id", protect, updateBlog);


// =============================
// DELETE BLOG
// =============================
router.delete("/:id", protect, deleteBlog);


module.exports = router;