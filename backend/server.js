const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

dotenv.config();


// =============================
// CONNECT DATABASE
// =============================

connectDB();


// =============================
// CREATE APP
// =============================

const app = express();


// =============================
// MIDDLEWARE
// =============================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


// =============================
// TEST ROUTE
// =============================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "InkSpace Blog API is running!"
    });
});


// =============================
// AUTH ROUTES
// =============================

app.use("/api/auth", authRoutes);


// =============================
// BLOG ROUTES
// =============================

app.use("/api/blogs", blogRoutes);


// =============================
// SERVER
// =============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});