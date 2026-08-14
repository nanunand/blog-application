const Blog = require("../models/Blog");

// =============================
// CREATE BLOG
// =============================
const createBlog = async (req, res) => {
    try {
        const {
            title,
            subtitle,
            image,
            category,
            content,
            status
        } = req.body;

        // Validate required fields
        if (!title || !category || !content) {
            return res.status(400).json({
                success: false,
                message: "Title, category and content are required"
            });
        }

        const blog = await Blog.create({
            title,
            subtitle: subtitle || "",
            image: image || "",
            category,
            content,
            status: status || "published",
            author: req.user.userId
        });

        res.status(201).json({
            success: true,
            message: "Blog published successfully",
            blog
        });

    } catch (error) {
        console.error("Create blog error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while creating blog"
        });
    }
};


// =============================
// GET ALL BLOGS
// =============================
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate("author", "name email profileImage")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            blogs
        });

    } catch (error) {
        console.error("Get blogs error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while fetching blogs"
        });
    }
};


// =============================
// GET MY BLOGS
// =============================
const getMyBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({
            author: req.user.userId
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            blogs
        });

    } catch (error) {
        console.error("Get my blogs error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while fetching your blogs"
        });
    }
};


module.exports = {
    createBlog,
    getAllBlogs,
    getMyBlogs
};