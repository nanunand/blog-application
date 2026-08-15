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
        })
            .populate("author", "name email profileImage")
            .sort({ createdAt: -1 });

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


// =============================
// UPDATE BLOG
// =============================
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        // Only the owner can edit the blog
        if (blog.author.toString() !== req.user.userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to edit this blog"
            });
        }

        const {
            title,
            subtitle,
            image,
            category,
            content,
            status
        } = req.body;

        if (!title || !category || !content) {
            return res.status(400).json({
                success: false,
                message: "Title, category and content are required"
            });
        }

        blog.title = title;
        blog.subtitle = subtitle || "";
        blog.image = image || "";
        blog.category = category;
        blog.content = content;

        if (status) {
            blog.status = status;
        }

        await blog.save();

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            blog
        });

    } catch (error) {
        console.error("Update blog error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while updating blog"
        });
    }
};


// =============================
// DELETE BLOG
// =============================
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        // Only the owner can delete the blog
        if (blog.author.toString() !== req.user.userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this blog"
            });
        }

        await Blog.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully"
        });

    } catch (error) {
        console.error("Delete blog error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while deleting blog"
        });
    }
};


module.exports = {
    createBlog,
    getAllBlogs,
    getMyBlogs,
    updateBlog,
    deleteBlog
};