# 📝 Full Stack Blog Application

A responsive full-stack blog application built using HTML, CSS, JavaScript, Node.js, Express.js, MongoDB, Mongoose, and JWT authentication.

## 🚀 Features

* 🔐 User Registration & Login
* 🔑 JWT Authentication
* 🛡️ Protected Dashboard
* 📝 Create, Read, Update & Delete Blogs
* 👤 User Profile & Edit Profile
* 🚪 Logout
* 🔍 Search Blogs
* 🏷️ Blog Category Filtering
* 👥 User-specific Blogs
* 📱 Responsive Design
* 🔒 Password Hashing with bcrypt
* 🗄️ MongoDB Database

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js
* JWT
* bcryptjs

### Database

* MongoDB
* MongoDB Atlas
* Mongoose

### Tools

* Git
* GitHub
* VS Code
* Nodemon

## 📂 Project Structure

```text
blog-application/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── css/
├── js/
├── index.html
├── .gitignore
└── README.md
```

## 🔐 Authentication

The application uses JWT-based authentication.

Users can:

* Register an account
* Login securely
* Access protected routes
* Manage their own blogs
* Edit their profile
* Logout securely

Passwords are hashed using bcrypt before being stored.

## 📝 Blog Management

Authenticated users can:

* Create blogs
* View their blogs
* Edit blogs
* Delete blogs
* Search blogs
* Filter blogs by category

Each user can access and manage their own blogs from the dashboard.

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/nanunand/blog-application.git
cd blog-application
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Create Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> ⚠️ Never upload your `.env` file to GitHub.

### 4. Start the Backend

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### 5. Run the Frontend

Open the project in VS Code and run the frontend using **Live Server** or another local web server.

## 🧪 Tested Features

* ✅ User Registration
* ✅ User Login
* ✅ JWT Authentication
* ✅ Protected Dashboard
* ✅ Logout
* ✅ User-specific Blogs
* ✅ Create Blog
* ✅ Edit Blog
* ✅ Delete Blog
* ✅ Search Blogs
* ✅ Category Filtering
* ✅ User Profile
* ✅ MongoDB Connection
* ✅ Responsive UI

## 🚀 Deployment

Planned deployment:

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas

Live deployment links will be added after deployment.

## 🔮 Future Enhancements

* 💬 Comments
* ❤️ Likes
* 🔖 Bookmarks
* ✍️ Rich Text Editor
* 🖼️ Image Upload
* 👨‍💼 Admin Dashboard
* 📊 Blog Analytics
* 📧 Email Verification
* 🔑 Password Reset

## 👩‍💻 Author

**Nandini R Patil**

Computer Science and Design
Tontadarya College of Engineering, Gadag

## 📄 License

This project is developed for educational and portfolio purposes.
