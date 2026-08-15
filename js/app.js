// =========================================================
// INKSPACE BLOG APPLICATION
// FRONTEND JAVASCRIPT
// Complete Professional Version
// =========================================================


// =========================================================
// API CONFIGURATION
// =========================================================

const API_BASE_URL = "https://blog-application-p7sn.onrender.com/api";


// =========================================================
// STATE MANAGEMENT
// =========================================================

const State = {

    blogs: JSON.parse(localStorage.getItem("blogs")) || [

        {
            id: 1,
            title: "The Future of Web Development",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1547658719-da4b158a5c62?auto=format&fit=crop&w=800&q=60",
            content: `
                <p>Web development is evolving at an unprecedented pace.</p>
                <h2>The Rise of JAMstack</h2>
                <p>JAMstack is revolutionizing how we build for the web.</p>
            `,
            author: "Jane Doe",
            avatar: "https://i.pravatar.cc/150?img=5",
            date: "2023-10-25",
            readingTime: "5 min",
            views: 1250,
            likes: 34,
            tags: ["WebDev", "JavaScript"],
            status: "published"
        },

        {
            id: 2,
            title: "Mastering Minimalist Photography",
            category: "Art",
            image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=60",
            content: `
                <p>Minimalist photography is about stripping down to the essentials.</p>
            `,
            author: "John Smith",
            avatar: "https://i.pravatar.cc/150?img=12",
            date: "2023-10-20",
            readingTime: "4 min",
            views: 890,
            likes: 45,
            tags: ["Photography", "Art"],
            status: "published"
        },

        {
            id: 3,
            title: "Understanding Modern CSS Grid",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=60",
            content: `
                <p>CSS Grid is a powerful layout system available in CSS.</p>
            `,
            author: "Jane Doe",
            avatar: "https://i.pravatar.cc/150?img=5",
            date: "2023-10-15",
            readingTime: "6 min",
            views: 2100,
            likes: 78,
            tags: ["CSS", "WebDev"],
            status: "published"
        }

    ],

    bookmarks:
        JSON.parse(localStorage.getItem("bookmarks")) || [],

    likes:
        JSON.parse(localStorage.getItem("likes")) || [],

    comments:
        JSON.parse(localStorage.getItem("comments")) || [

            {
                id: 1,
                blogId: 1,
                author: "Alice",
                avatar: "https://i.pravatar.cc/150?img=3",
                text: "Great article! Really helped me understand the concepts.",
                date: "2023-10-26"
            }

        ],

    notifications:
        JSON.parse(localStorage.getItem("notifications")) || [

            {
                id: 1,
                text: "Jane Doe liked your post",
                type: "like",
                read: false
            },

            {
                id: 2,
                text: "New comment on your blog",
                type: "comment",
                read: false
            }

        ],

    drafts:
        JSON.parse(localStorage.getItem("drafts")) || []

};


// =========================================================
// DOM HELPERS
// =========================================================

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    parent.querySelectorAll(selector);


// =========================================================
// LOCAL STORAGE
// =========================================================

const saveState = () => {

    localStorage.setItem(
        "blogs",
        JSON.stringify(State.blogs)
    );

    localStorage.setItem(
        "bookmarks",
        JSON.stringify(State.bookmarks)
    );

    localStorage.setItem(
        "likes",
        JSON.stringify(State.likes)
    );

    localStorage.setItem(
        "comments",
        JSON.stringify(State.comments)
    );

    localStorage.setItem(
        "notifications",
        JSON.stringify(State.notifications)
    );

    localStorage.setItem(
        "drafts",
        JSON.stringify(State.drafts)
    );

};


// =========================================================
// AUTHENTICATION
// =========================================================

const getToken = () => {

    return localStorage.getItem("token");

};


const getCurrentUser = () => {

    try {

        return JSON.parse(
            localStorage.getItem("user")
        );

    } catch (error) {

        return null;

    }

};


const isLoggedIn = () => {

    return !!localStorage.getItem("token");

};


const logoutUser = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    showToast(
        "Logged out successfully",
        "success"
    );

    setTimeout(() => {

        window.location.hash = "#/login";

    }, 500);

};


// =========================================================
// PROTECTED ROUTES
// =========================================================

const protectedRoutes = [

    "/dashboard",
    "/my-blogs",
    "/create-blog",
    "/bookmarks",
    "/profile",
    "/settings"

];


const checkAuthentication = (route) => {

    if (
        protectedRoutes.includes(route) &&
        !isLoggedIn()
    ) {

        showToast(
            "Please login to continue",
            "error"
        );

        window.location.hash = "#/login";

        return false;

    }

    return true;

};


// =========================================================
// TOAST
// =========================================================

const showToast = (
    message,
    type = "success"
) => {

    const container = $("#toastContainer");

    if (!container) {

        console.log(message);

        return;

    }

    const toast =
        document.createElement("div");

    toast.className = `toast ${type}`;

    toast.innerHTML =
        `<span>${escapeHTML(message)}</span>`;

    container.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 3000);

};


// =========================================================
// ESCAPE HTML
// =========================================================

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    const div =
        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

}


// =========================================================
// MODAL
// =========================================================

const showModal = (
    title,
    body,
    actionText,
    actionCallback
) => {

    const modal = $("#modalContent");

    if (!modal) {

        if (confirm(
            `${title}\n\n${body.replace(/<[^>]+>/g, "")}`
        )) {

            actionCallback();

        }

        return;

    }

    modal.innerHTML = `

        <div class="modal-header">

            <h3>
                ${escapeHTML(title)}
            </h3>

            <button
                class="modal-close"
                type="button">

                &times;

            </button>

        </div>

        <div class="modal-body">

            ${body}

        </div>

        <div class="modal-actions">

            <button
                class="btn btn-outline modal-cancel"
                type="button">

                Cancel

            </button>

            <button
                class="btn btn-danger modal-confirm"
                type="button">

                ${escapeHTML(actionText)}

            </button>

        </div>

    `;

    const overlay =
        $("#modalOverlay");

    if (!overlay) return;

    overlay.classList.add("active");

    $(".modal-close").onclick =
        closeModal;

    $(".modal-cancel").onclick =
        closeModal;

    $(".modal-confirm").onclick = () => {

        actionCallback();

        closeModal();

    };

};


const closeModal = () => {

    const overlay =
        $("#modalOverlay");

    if (overlay) {

        overlay.classList.remove("active");

    }

};


// =========================================================
// THEME
// =========================================================

const initTheme = () => {

    const savedTheme =
        localStorage.getItem("theme") || "light";

    document.documentElement.setAttribute(
        "data-theme",
        savedTheme
    );

};


// =========================================================
// HEADER
// =========================================================

const initializeHeader = () => {

    const themeToggle =
        $("#themeToggle");

    if (themeToggle) {

        themeToggle.onclick = () => {

            const currentTheme =
                document.documentElement
                    .getAttribute("data-theme");

            const newTheme =
                currentTheme === "light"
                    ? "dark"
                    : "light";

            document.documentElement
                .setAttribute(
                    "data-theme",
                    newTheme
                );

            localStorage.setItem(
                "theme",
                newTheme
            );

        };

    }


    const searchToggle =
        $("#searchToggle");

    if (searchToggle) {

        searchToggle.onclick = (e) => {

            e.stopPropagation();

            const searchBar =
                $("#searchBar");

            if (searchBar) {

                searchBar.classList.toggle(
                    "active"
                );

                if (
                    searchBar.classList.contains(
                        "active"
                    )
                ) {

                    $("#globalSearch")
                        ?.focus();

                }

            }

        };

    }


    const hamburgerToggle =
        $("#hamburgerToggle");

    if (hamburgerToggle) {

        hamburgerToggle.onclick = (e) => {

            e.stopPropagation();

            const navMenu =
                $("#navMenu");

            navMenu?.classList.toggle(
                "active"
            );

        };

    }


    const notifToggle =
        $("#notifToggle");

    if (notifToggle) {

        notifToggle.onclick = (e) => {

            e.stopPropagation();

            renderNotifications();

            $("#notifMenu")
                ?.classList.toggle(
                    "active"
                );

            $("#profileMenu")
                ?.classList.remove(
                    "active"
                );

        };

    }


    const profileToggle =
        $("#profileToggle");

    if (profileToggle) {

        profileToggle.onclick = (e) => {

            e.stopPropagation();

            $("#profileMenu")
                ?.classList.toggle(
                    "active"
                );

            $("#notifMenu")
                ?.classList.remove(
                    "active"
                );

        };

    }


    document.onclick = () => {

        $("#notifMenu")
            ?.classList.remove("active");

        $("#profileMenu")
            ?.classList.remove("active");

    };


    const markAllRead =
        $("#markAllRead");

    if (markAllRead) {

        markAllRead.onclick = (e) => {

            e.stopPropagation();

            State.notifications.forEach(
                notification => {

                    notification.read = true;

                }
            );

            saveState();

            renderNotifications();

        };

    }

};


// =========================================================
// NOTIFICATIONS
// =========================================================

const renderNotifications = () => {

    const notifBody =
        $("#notifBody");

    const badge =
        $("#notifBadge");

    if (!notifBody) return;

    const unreadCount =
        State.notifications.filter(
            n => !n.read
        ).length;

    if (badge) {

        badge.textContent =
            unreadCount > 0
                ? unreadCount
                : "";

        badge.classList.toggle(
            "active",
            unreadCount > 0
        );

    }

    if (
        State.notifications.length === 0
    ) {

        notifBody.innerHTML = `

            <div class="empty-state">

                <p>
                    No notifications
                </p>

            </div>

        `;

        return;

    }

    notifBody.innerHTML =
        State.notifications.map(
            n => `

            <div
                class="notif-item ${
                    !n.read ? "unread" : ""
                }">

                <div class="notif-icon">

                    🔔

                </div>

                <div>

                    <p>
                        ${escapeHTML(n.text)}
                    </p>

                    <small
                        style="color:var(--text-muted)">

                        Recently

                    </small>

                </div>

            </div>

        `
        ).join("");

};


// =========================================================
// ROUTES
// =========================================================

const routes = {

    "/": HomeView,

    "/explore": ExploreView,

    "/blog/:id": BlogDetailsView,

    "/login": AuthView,

    "/register": AuthView,

    "/dashboard": DashboardView,

    "/my-blogs": MyBlogsView,

    "/create-blog": EditorView,

    "/bookmarks": BookmarksView,

    "/profile": ProfileView,

    "/settings": SettingsView

};


// =========================================================
// ROUTER
// =========================================================

const router = async () => {

    const hash =
        window.location.hash.slice(1) || "/";

    const parts =
        hash
            .split("/")
            .filter(
                part => part !== ""
            );

    let route =
        "/" + parts.join("/");

    let params = {};

    if (
        parts[0] === "blog" &&
        parts[1]
    ) {

        route = "/blog/:id";

        params.id = parts[1];

    }

    if (
        route !== "/blog/:id" &&
        !checkAuthentication(route)
    ) {

        return;

    }

    const view =
        routes[route] || NotFoundView;

    const app =
        $("#app");

    if (!app) return;

    app.innerHTML = `

        <div class="loader-container">

            <div class="loader-spinner"></div>

        </div>

    `;

    setTimeout(async () => {

      try {

    // Render the page first
    app.innerHTML = view(params);

    // Then load dashboard blogs
    if (route === "/dashboard") {
        try {
            await loadDashboardBlogs();
        } catch (error) {
            console.error(
                "Dashboard blogs error:",
                error
            );
        }
    }

} catch (error) {

    console.error(
        "View rendering error:",
        error
    );

    app.innerHTML =
        NotFoundView();

}

        attachEventListeners();

        initializeHeader();

        updateHeaderForAuth();

        window.scrollTo(
            0,
            0
        );

    }, 150);

};


window.addEventListener(
    "hashchange",
    router
);


// =========================================================
// HEADER AUTH STATE
// =========================================================

const updateHeaderForAuth = () => {

    const user =
        getCurrentUser();

    const loginLinks =
        $$(".login-link");

    const dashboardLinks =
        $$(".dashboard-link");

    if (isLoggedIn() && user) {

        loginLinks.forEach(
            element =>
                element.style.display =
                    "none"
        );

        dashboardLinks.forEach(
            element =>
                element.style.display =
                    ""
        );

    } else {

        loginLinks.forEach(
            element =>
                element.style.display =
                    ""
        );

        dashboardLinks.forEach(
            element =>
                element.style.display =
                    "none"
        );

    }

};


// =========================================================
// HOME VIEW
// =========================================================

function HomeView() {

    const publishedBlogs =
        State.blogs.filter(
            blog =>
                blog.status !== "draft"
        );

    const featured =
        publishedBlogs[0];

    return `

        <section class="hero">

            <div class="container hero-container">

                <div class="hero-content">

                    <h1>
                        Read, Write, and Explore
                        Ideas That Matter
                    </h1>

                    <p>
                        Join a community of writers
                        and readers. Discover stories,
                        insights, and knowledge from
                        around the globe.
                    </p>

                    <div class="hero-actions">

                        <a
                            href="#/explore"
                            class="btn btn-primary">

                            Start Reading

                        </a>

                        <a
                            href="#/create-blog"
                            class="btn btn-outline">

                            Start Writing

                        </a>

                    </div>

                </div>

                <div class="hero-image"></div>

            </div>

        </section>


        <div class="container">

            <div class="section">

                <div class="section-header">

                    <h2 class="section-title">
                        Featured Article
                    </h2>

                </div>

                <div class="blog-grid">

                    ${
                        featured
                            ? BlogCard(featured)
                            : EmptyBlogState()
                    }

                </div>

            </div>


            <div class="section">

                <div class="section-header">

                    <h2 class="section-title">
                        Trending Blogs
                    </h2>

                    <a
                        href="#/explore"
                        class="view-all">

                        View All

                    </a>

                </div>

                <div class="blog-grid">

                    ${
                        publishedBlogs
                            .slice(1)
                            .map(BlogCard)
                            .join("")
                            ||
                        EmptyBlogState()
                    }

                </div>

            </div>

        </div>

    `;

}


// =========================================================
// EXPLORE VIEW
// =========================================================

function ExploreView() {

    return `

        <div class="container">

            <div class="section-header">

                <div>

                    <h2 class="section-title">
                        Explore Articles
                    </h2>

                    <p
                        style="color:var(--text-muted)">

                        Discover fresh ideas and
                        stories from our community.

                    </p>

                </div>

               <div class="explore-filters">

    <select class="form-control" id="categorySelect">
        <option value="all">All Categories</option>
        <option value="Technology">Technology</option>
        <option value="Art">Art</option>
        <option value="Lifestyle">Lifestyle</option>
        <option value="Business">Business</option>
        <option value="Education">Education</option>
        <option value="Travel">Travel</option>
        <option value="Health">Health</option>
    </select>

    <select class="form-control" id="sortSelect">
        <option value="latest">Latest</option>
        <option value="popular">Most Popular</option>
        <option value="liked">Most Liked</option>
    </select>

</div>

    <option value="all">
        All Categories
    </option>

    <option value="Technology">
        Technology
    </option>

    <option value="Art">
        Art
    </option>

    <option value="Lifestyle">
        Lifestyle
    </option>

    <option value="Business">
        Business
    </option>

    <option value="Education">
        Education
    </option>

    <option value="Travel">
        Travel
    </option>

    <option value="Health">
        Health
    </option>

</select>

                    <option value="latest">
                        Latest
                    </option>

                    <option value="popular">
                        Most Popular
                    </option>

                    <option value="liked">
                        Most Liked
                    </option>

                </select>

            </div>


            <div
                class="form-group"
                style="margin-bottom:2rem">

                <input
                    type="search"
                    id="exploreSearch"
                    class="form-control"
                    placeholder="Search articles, categories or authors...">

            </div>


            <div
                class="blog-grid"
                id="exploreBlogGrid">

                ${getPublishedBlogs()
                    .map(BlogCard)
                    .join("")}

            </div>

        </div>

    `;

}


// =========================================================
// GET PUBLISHED BLOGS
// =========================================================

function getPublishedBlogs() {

    return State.blogs.filter(
        blog =>
            blog.status !== "draft"
    );

}


// =========================================================
// BLOG DETAILS
// =========================================================

function BlogDetailsView({ id }) {

    const blog =
        State.blogs.find(
            b => b.id == id
        );

    if (!blog) {

        return NotFoundView();

    }

    blog.views =
        Number(blog.views || 0) + 1;

    saveState();

    const comments =
        State.comments.filter(
            c => c.blogId == id
        );

    const isLiked =
        State.likes.includes(
            blog.id
        );

    const isBookmarked =
        State.bookmarks.includes(
            blog.id
        );

    return `

        <article
            class="container"
            style="max-width:800px">

            <div class="blog-details-header">

                <div class="breadcrumb">

                    <a href="#/">
                        Home
                    </a>

                    /

                    <a href="#/explore">
                        Explore
                    </a>

                    /

                    ${escapeHTML(blog.category)}

                </div>


                <span class="card-category">
                    ${escapeHTML(blog.category)}
                </span>


                <h1 class="blog-title">
                    ${escapeHTML(blog.title)}
                </h1>


                <div class="blog-meta">

                    <div class="author-info">

                        <img
                            src="${escapeHTML(blog.avatar)}"
                            class="avatar"
                            alt="${escapeHTML(blog.author)}">

                        <span>
                            ${escapeHTML(blog.author)}
                        </span>

                    </div>

                    <span>•</span>

                    <span>
                        ${escapeHTML(blog.date)}
                    </span>

                    <span>•</span>

                    <span>
                        ${escapeHTML(blog.readingTime)}
                    </span>

                </div>

            </div>


            <img
                src="${escapeHTML(blog.image)}"
                class="card-image"
                style="
                    height:400px;
                    margin-bottom:2rem;
                    border-radius:var(--radius-lg);
                    object-fit:cover
                "
                alt="${escapeHTML(blog.title)}">


            <div class="blog-content">

                ${blog.content}

            </div>


            ${
                blog.tags?.length
                    ? `

                    <div
                        style="
                            display:flex;
                            gap:.5rem;
                            flex-wrap:wrap;
                            margin:2rem 0
                        ">

                        ${blog.tags.map(
                            tag => `

                            <span
                                class="card-category">

                                #${escapeHTML(tag)}

                            </span>

                        `
                        ).join("")}

                    </div>

                `
                    : ""
            }


            <div
                style="
                    display:flex;
                    justify-content:space-between;
                    gap:1rem;
                    margin:2rem 0;
                    padding:1.5rem 0;
                    border-top:1px solid var(--border);
                    border-bottom:1px solid var(--border);
                    flex-wrap:wrap
                ">

                <button
                    class="btn btn-outline like-btn ${
                        isLiked ? "active" : ""
                    }"
                    data-id="${blog.id}">

                    ${isLiked ? "❤️" : "♡"}
                    ${blog.likes || 0} Likes

                </button>


                <button
                    class="btn btn-outline bookmark-btn ${
                        isBookmarked
                            ? "active"
                            : ""
                    }"
                    data-id="${blog.id}">

                    ${
                        isBookmarked
                            ? "🔖 Saved"
                            : "🔖 Save"
                    }

                </button>

            </div>


            <div class="section">

                <h3>
                    Comments (${comments.length})
                </h3>


                <div
                    class="form-group"
                    style="margin:1.5rem 0">

                    <textarea
                        class="form-control"
                        id="commentInput"
                        rows="3"
                        placeholder="Join the discussion..."></textarea>

                    <button
                        class="btn btn-primary"
                        id="postCommentBtn"
                        style="margin-top:.5rem">

                        Post Comment

                    </button>

                </div>


                <div>

                    ${
                        comments.length
                            ? comments.map(
                                c => `

                                <div
                                    style="
                                        display:flex;
                                        gap:1rem;
                                        margin-bottom:1.5rem
                                    ">

                                    <img
                                        src="${escapeHTML(c.avatar)}"
                                        class="avatar"
                                        style="
                                            width:40px;
                                            height:40px
                                        "
                                        alt="${escapeHTML(c.author)}">

                                    <div>

                                        <strong>
                                            ${escapeHTML(c.author)}
                                        </strong>

                                        <small
                                            style="
                                                color:var(--text-muted);
                                                display:block
                                            ">

                                            ${escapeHTML(c.date)}

                                        </small>

                                        <p>
                                            ${escapeHTML(c.text)}
                                        </p>

                                    </div>

                                </div>

                            `
                            ).join("")
                            : `
                                <div class="empty-state">

                                    <p>
                                        No comments yet.
                                        Be the first to comment.
                                    </p>

                                </div>
                            `
                    }

                </div>

            </div>

        </article>

    `;

}


// =========================================================
// AUTH VIEW
// =========================================================

function AuthView() {

    const isLogin =
        window.location.hash.includes(
            "login"
        );

    return `

        <div class="auth-container">

            <div class="auth-header">

                <h2>

                    ${
                        isLogin
                            ? "Welcome Back"
                            : "Create Account"
                    }

                </h2>

                <p>

                    ${
                        isLogin
                            ? "Login to access your dashboard"
                            : "Join our community of writers today"
                    }

                </p>

            </div>


            <form id="authForm">

                ${
                    !isLogin
                        ? `

                    <div class="form-group">

                        <label>
                            Full Name
                        </label>

                        <input
                            type="text"
                            class="form-control"
                            id="nameInput"
                            autocomplete="name"
                            required>

                    </div>

                `
                        : ""
                }


                <div class="form-group">

                    <label>
                        Email Address
                    </label>

                    <input
                        type="email"
                        class="form-control"
                        id="emailInput"
                        autocomplete="email"
                        required>

                </div>


                <div class="form-group">

                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        class="form-control"
                        id="passwordInput"
                        autocomplete="${
                            isLogin
                                ? "current-password"
                                : "new-password"
                        }"
                        required>

                    ${
                        !isLogin
                            ? `
                                <div
                                    class="password-strength"
                                    id="passwordStrength">
                                </div>
                            `
                            : ""
                    }

                </div>


                ${
                    !isLogin
                        ? `

                    <div class="form-group">

                        <label>
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            class="form-control"
                            id="confirmPasswordInput"
                            autocomplete="new-password"
                            required>

                    </div>

                `
                        : ""
                }


                <button
                    type="submit"
                    class="btn btn-primary"
                    style="width:100%"
                    id="authSubmitBtn">

                    ${
                        isLogin
                            ? "Login"
                            : "Register"
                    }

                </button>

            </form>


            <div class="form-footer">

                ${
                    isLogin
                        ? "Don't have an account?"
                        : "Already have an account?"
                }

                <a
                    href="#/${
                        isLogin
                            ? "register"
                            : "login"
                    }">

                    ${
                        isLogin
                            ? "Sign Up"
                            : "Login"
                    }

                </a>

            </div>

        </div>

    `;

}


// =========================================================
// DASHBOARD
// =========================================================

function DashboardView() {

    const user =
        getCurrentUser();

    const userName =
        user?.name || "User";

    const userBlogs =
        getUserBlogs();

    const totalViews =
        userBlogs.reduce(
            (sum, blog) =>
                sum + Number(blog.views || 0),
            0
        );

    const totalLikes =
        userBlogs.reduce(
            (sum, blog) =>
                sum + Number(blog.likes || 0),
            0
        );

    const userBlogIds =
        userBlogs.map(
            blog => blog.id
        );

    const totalComments =
        State.comments.filter(
            comment =>
                userBlogIds.includes(
                    comment.blogId
                )
        ).length;

    return `

        <div class="dashboard-layout">

            <aside
                class="sidebar"
                id="sidebar">

                <ul class="sidebar-menu">

                    <li>
                        <a
                            href="#/dashboard"
                            class="sidebar-link active">

                            Dashboard

                        </a>
                    </li>

                    <li>
                        <a
                            href="#/my-blogs"
                            class="sidebar-link">

                            My Blogs

                        </a>
                    </li>

                    <li>
                        <a
                            href="#/create-blog"
                            class="sidebar-link">

                            Create Blog

                        </a>
                    </li>

                    <li>
                        <a
                            href="#/bookmarks"
                            class="sidebar-link">

                            Bookmarks

                        </a>
                    </li>

                    <li>
                        <a
                            href="#/profile"
                            class="sidebar-link">

                            Profile

                        </a>
                    </li>

                    <li>
                        <a
                            href="#/settings"
                            class="sidebar-link">

                            Settings

                        </a>
                    </li>

                    <li>

                        <button
                            class="btn btn-outline"
                            id="logoutBtn"
                            style="
                                width:100%;
                                margin-top:1rem
                            ">

                            Logout

                        </button>

                    </li>

                </ul>

            </aside>


            <div class="dashboard-content">

                <h1 style="margin-bottom:1.5rem">

                    Welcome back,
                    ${escapeHTML(userName)}!

                </h1>


                <div class="stats-grid">

                    <div class="stat-card">

                        <h3>
                            Total Blogs
                        </h3>

                        <div
                            class="stat-value"
                            data-target="${userBlogs.length}">

                            0

                        </div>

                    </div>


                    <div class="stat-card">

                        <h3>
                            Total Views
                        </h3>

                        <div
                            class="stat-value"
                            data-target="${totalViews}">

                            0

                        </div>

                    </div>


                    <div class="stat-card">

                        <h3>
                            Total Likes
                        </h3>

                        <div
                            class="stat-value"
                            data-target="${totalLikes}">

                            0

                        </div>

                    </div>


                    <div class="stat-card">

                        <h3>
                            Comments
                        </h3>

                        <div
                            class="stat-value"
                            data-target="${totalComments}">

                            0

                        </div>

                    </div>

                </div>


                <div class="table-container">

                    ${
                        userBlogs.length
                            ? `

                            <table>

                                <thead>

                                    <tr>

                                        <th>
                                            Title
                                        </th>

                                        <th>
                                            Category
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Date
                                        </th>

                                        <th>
                                            Views
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    ${userBlogs.map(
                                        b => `

                                        <tr>

                                            <td>
                                                ${escapeHTML(b.title)}
                                            </td>

                                            <td>
                                                ${escapeHTML(b.category)}
                                            </td>

                                            <td>

                                                <span
                                                    style="
                                                        color:${
                                                            b.status === "draft"
                                                                ? "var(--warning)"
                                                                : "var(--success)"
                                                        }
                                                    ">

                                                    ${
                                                        b.status === "draft"
                                                            ? "Draft"
                                                            : "Published"
                                                    }

                                                </span>

                                            </td>

                                            <td>
                                                ${escapeHTML(b.date)}
                                            </td>

                                            <td>
                                                ${b.views || 0}
                                            </td>

                                        </tr>

                                    `
                                    ).join("")}

                                </tbody>

                            </table>

                        `
                            : `

                            <div class="empty-state">

                                <h3>
                                    No blogs yet
                                </h3>

                                <p>
                                    Start writing your first article.
                                </p>

                                <a
                                    href="#/create-blog"
                                    class="btn btn-primary">

                                    Create Blog

                                </a>

                            </div>

                        `
                    }

                </div>

            </div>

        </div>

    `;

}

// =========================================================
// LOAD DASHBOARD BLOGS FROM BACKEND
// =========================================================

async function loadDashboardBlogs() {

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.hash = "#/login";
        return;
    }

    try {

        const response = await fetch(
            `${API_BASE_URL}/blogs/my-blogs`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {

            if (response.status === 401) {

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                window.location.hash = "#/login";
                return;
            }

            throw new Error(
                data.message || "Unable to load blogs"
            );
        }

        // Store backend blogs in frontend state
        State.blogs = data.blogs.map(blog => ({
            ...blog,

            // Convert MongoDB _id to your frontend id
            id: blog._id,

            // Convert createdAt to your existing date format
            date: blog.createdAt
                ? new Date(blog.createdAt).toLocaleDateString()
                : ""
        }));

        // Re-render dashboard
        const app =
            document.getElementById("app");

        if (app) {
            app.innerHTML = DashboardView();
        }

    } catch (error) {

        console.error(
            "Dashboard blogs error:",
            error
        );

        showToast(
            "Unable to load dashboard blogs",
            "error"
        );
    }
}
// =========================================================
// GET USER BLOGS
// =========================================================

function getUserBlogs() {

    const user =
        getCurrentUser();

    if (!user) return [];

    return State.blogs.filter(
        blog =>
            blog.author === user.name ||
            blog.authorEmail === user.email
    );

}
// =========================================================
// FETCH LOGGED-IN USER'S BLOGS FROM BACKEND
// =========================================================

async function fetchMyBlogs() {

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.hash = "#/login";
        return [];
    }

    try {

        const response = await fetch(
            `${API_BASE_URL}/blogs/my-blogs`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {

            if (response.status === 401) {

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                window.location.hash = "#/login";

                return [];
            }

            throw new Error(
                data.message || "Unable to fetch blogs"
            );
        }

        return data.blogs || [];

    } catch (error) {

        console.error(
            "Fetch my blogs error:",
            error
        );

        showToast(
            "Unable to load your blogs",
            "error"
        );

        return [];
    }
}

// =========================================================
// MY BLOGS
// =========================================================

function MyBlogsView() {

    const blogs =
        getUserBlogs();

    return `

        <div class="container">

            <div class="section-header">

                <div>

                    <h2 class="section-title">
                        My Blogs
                    </h2>

                    <p
                        style="color:var(--text-muted)">

                        Manage your published articles
                        and drafts.

                    </p>

                </div>

                <a
                    href="#/create-blog"
                    class="btn btn-primary">

                    + Create New

                </a>

            </div>


            ${
                blogs.length
                    ? `

                    <div class="table-container">

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        Title
                                    </th>

                                    <th>
                                        Category
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Date
                                    </th>

                                    <th>
                                        Views
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                ${blogs.map(
                                    b => `

                                    <tr>

                                        <td>
                                            ${escapeHTML(b.title)}
                                        </td>

                                        <td>
                                            ${escapeHTML(b.category)}
                                        </td>

                                        <td>

                                            <span
                                                style="
                                                    color:${
                                                        b.status === "draft"
                                                            ? "var(--warning)"
                                                            : "var(--success)"
                                                    }
                                                ">

                                                ${
                                                    b.status === "draft"
                                                        ? "Draft"
                                                        : "Published"
                                                }

                                            </span>

                                        </td>

                                        <td>
                                            ${escapeHTML(b.date)}
                                        </td>

                                        <td>
                                            ${b.views || 0}
                                        </td>

                                        <td>

                                            ${
                                                b.status !== "draft"
                                                    ? `
                                                    <a
                                                        href="#/blog/${b.id}"
                                                        class="btn btn-ghost">

                                                        View

                                                    </a>
                                                `
                                                    : ""
                                            }


                                            <button
                                                class="btn btn-ghost edit-blog-btn"
                                                data-id="${b.id}">

                                                Edit

                                            </button>


                                            <button
                                                class="btn btn-ghost delete-blog-btn"
                                                data-id="${b.id}"
                                                style="
                                                    color:var(--danger)
                                                ">

                                                Delete

                                            </button>

                                        </td>

                                    </tr>

                                `
                                ).join("")}

                            </tbody>

                        </table>

                    </div>

                `
                    : `

                    <div class="empty-state">

                        <h3>
                            You haven't published anything yet
                        </h3>

                        <p>
                            Share your first idea with the community.
                        </p>

                        <a
                            href="#/create-blog"
                            class="btn btn-primary">

                            Create Your First Blog

                        </a>

                    </div>

                `
            }

        </div>

    `;

}


// =========================================================
// BOOKMARKS
// =========================================================

function BookmarksView() {

    const savedBlogs =
        getPublishedBlogs().filter(
            blog =>
                State.bookmarks.includes(
                    blog.id
                )
        );

    return `

        <div class="container">

            <div class="section-header">

                <h2 class="section-title">
                    Saved Articles
                </h2>

            </div>


            ${
                savedBlogs.length > 0

                    ? `

                    <div class="blog-grid">

                        ${savedBlogs
                            .map(BlogCard)
                            .join("")}

                    </div>

                `

                    : `

                    <div class="empty-state">

                        <h3>
                            No bookmarks yet
                        </h3>

                        <p>
                            Save articles to
                            read them later.
                        </p>

                        <a
                            href="#/explore"
                            class="btn btn-primary">

                            Explore Blogs

                        </a>

                    </div>

                `
            }

        </div>

    `;

}


// =========================================================
// EDITOR
// =========================================================

function EditorView() {

    const hash =
        window.location.hash;

    const editId =
        new URLSearchParams(
            hash.includes("?")
                ? hash.split("?")[1]
                : ""
        ).get("edit");

    const editingBlog =
        editId
            ? State.blogs.find(
                blog =>
                    blog.id == editId
            )
            : null;

    const draft =
        State.drafts[0] || {};

    const currentBlog =
        editingBlog || draft;

    return `

        <div
            class="container"
            style="max-width:900px">

            <div
                style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    gap:1rem;
                    flex-wrap:wrap
                ">

                <div>

                    <h2 class="section-title">

                        ${
                            editingBlog
                                ? "Edit Blog"
                                : "Create New Blog"
                        }

                    </h2>

                    <p
                        style="color:var(--text-muted)">

                        Write something meaningful
                        for your readers.

                    </p>

                </div>

            </div>


            <form
                id="editorForm"
                style="margin-top:2rem">

                <input
                    type="hidden"
                    id="editingBlogId"
                    value="${
                        editingBlog
                            ? editingBlog.id
                            : ""
                    }">


                <div class="form-group">

                    <label>
                        Title *
                    </label>

                    <input
                        type="text"
                        class="form-control"
                        id="editorTitle"
                        value="${escapeHTML(currentBlog.title || "")}"
                        placeholder="An interesting title..."
                        maxlength="150"
                        required>

                </div>


                <div class="form-group">

                    <label>
                        Subtitle
                    </label>

                    <input
                        type="text"
                        class="form-control"
                        id="editorSubtitle"
                        value="${escapeHTML(currentBlog.subtitle || "")}"
                        placeholder="A short subtitle..."
                        maxlength="200">

                </div>


                <div class="form-group">

                    <label>
                        Featured Image URL
                    </label>

                    <input
                        type="url"
                        class="form-control"
                        id="editorImage"
                        value="${escapeHTML(currentBlog.image || "")}"
                        placeholder="https://images.unsplash.com/...">

                </div>


                <div class="form-group">

                    <label>
                        Category *
                    </label>

                    <select
                        class="form-control"
                        id="editorCategory"
                        required>

                        <option value="Technology"
                            ${
                                currentBlog.category === "Technology"
                                    ? "selected"
                                    : ""
                            }>
                            Technology
                        </option>

                        <option value="Art"
                            ${
                                currentBlog.category === "Art"
                                    ? "selected"
                                    : ""
                            }>
                            Art
                        </option>

                        <option value="Lifestyle"
                            ${
                                currentBlog.category === "Lifestyle"
                                    ? "selected"
                                    : ""
                            }>
                            Lifestyle
                        </option>

                        <option value="Business"
                            ${
                                currentBlog.category === "Business"
                                    ? "selected"
                                    : ""
                            }>
                            Business
                        </option>

                        <option value="Education"
                            ${
                                currentBlog.category === "Education"
                                    ? "selected"
                                    : ""
                            }>
                            Education
                        </option>

                        <option value="Travel"
                            ${
                                currentBlog.category === "Travel"
                                    ? "selected"
                                    : ""
                            }>
                            Travel
                        </option>

                        <option value="Health"
                            ${
                                currentBlog.category === "Health"
                                    ? "selected"
                                    : ""
                            }>
                            Health
                        </option>

                    </select>

                </div>


                <div class="form-group">

                    <label>
                        Tags
                    </label>

                    <input
                        type="text"
                        class="form-control"
                        id="editorTags"
                        value="${
                            currentBlog.tags
                                ? escapeHTML(
                                    currentBlog.tags.join(", ")
                                )
                                : ""
                        }"
                        placeholder="JavaScript, Web Development, Coding">

                    <small
                        style="color:var(--text-muted)">

                        Separate tags using commas.

                    </small>

                </div>


                <div class="form-group">

                    <label>
                        Content *
                    </label>

                    <textarea
                        class="form-control"
                        rows="14"
                        id="editorContent"
                        placeholder="Start writing your article..."
                        required>${escapeHTML(
                            stripHTML(
                                currentBlog.content || ""
                            )
                        )}</textarea>

                </div>


                <div
                    style="
                        display:flex;
                        gap:1rem;
                        justify-content:flex-end;
                        flex-wrap:wrap
                    ">

                    <button
                        type="button"
                        class="btn btn-outline"
                        id="saveDraftBtn">

                        Save Draft

                    </button>


                    <button
                        type="submit"
                        class="btn btn-primary"
                        id="publishBlogBtn">

                        ${
                            editingBlog
                                ? "Update & Publish"
                                : "Publish"
                        }

                    </button>

                </div>

            </form>

        </div>

    `;

}


// =========================================================
// CREATE BLOG OBJECT
// =========================================================

function createBlogObject(
    title,
    subtitle,
    image,
    category,
    content,
    tags,
    status = "published",
    existingBlog = null
) {

    const user =
        getCurrentUser();

    const plainText =
        stripHTML(content);

    const words =
        plainText
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .length;

    const readingMinutes =
        Math.max(
            1,
            Math.ceil(
                words / 200
            )
        );

    return {

        id:
            existingBlog?.id ||
            Date.now(),

        title,

        subtitle,

        category,

        image:
            image ||
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=60",

        content:
            `<p>${escapeHTML(content)
                .replace(/\n\n+/g, "</p><p>")
                .replace(/\n/g, "<br>")}</p>`,

        author:
            user?.name ||
            "You",

        authorEmail:
            user?.email ||
            "",

        avatar:
            user?.profileImage ||
            "https://i.pravatar.cc/150?img=12",

        date:
            existingBlog?.date ||
            new Date()
                .toISOString()
                .split("T")[0],

        readingTime:
            `${readingMinutes} min`,

        views:
            existingBlog?.views ||
            0,

        likes:
            existingBlog?.likes ||
            0,

        tags,

        status

    };

}


// =========================================================
// PROFILE
// =========================================================

function ProfileView() {

    const user = getCurrentUser();

    const name = user?.name || "User";
    const email = user?.email || "";
    const avatar =
        user?.profileImage ||
        "https://i.pravatar.cc/150?img=12";

    const bio =
        user?.bio ||
        "Software engineer and tech enthusiast.";

    const articles = getUserBlogs().length;

    return `

        <div
            class="container"
            style="max-width:800px">

            <div
                style="
                    height:200px;
                    background:var(--primary);
                    border-radius:var(--radius-lg);
                    margin-bottom:-50px
                ">
            </div>


            <div
                class="auth-container"
                style="
                    background:transparent;
                    box-shadow:none;
                    padding:0;
                    text-align:center
                ">

                <img
                    src="${escapeHTML(avatar)}"
                    class="avatar"
                    id="profileAvatar"
                    style="
                        width:100px;
                        height:100px;
                        margin:0 auto 1rem;
                        border:4px solid var(--bg-card)
                    "
                    alt="${escapeHTML(name)}">


                <h2 id="profileName">
                    ${escapeHTML(name)}
                </h2>


                <p id="profileEmail">
                    ${escapeHTML(email)}
                </p>


                <p
                    id="profileBio"
                    style="
                        color:var(--text-muted);
                        margin:1rem 0
                    ">

                    ${escapeHTML(bio)}

                </p>


                <div
                    style="
                        display:flex;
                        justify-content:center;
                        gap:2rem;
                        margin:2rem 0
                    ">

                    <div>
                        <strong>
                            ${articles}
                        </strong>
                        <br>
                        Articles
                    </div>

                    <div>
                        <strong>
                            1.2k
                        </strong>
                        <br>
                        Followers
                    </div>

                    <div>
                        <strong>
                            340
                        </strong>
                        <br>
                        Following
                    </div>

                </div>


                <div
                    style="
                        display:flex;
                        gap:1rem;
                        justify-content:center;
                        flex-wrap:wrap
                    ">

                    <button
                        class="btn btn-primary"
                        id="editProfileBtn">

                        Edit Profile

                    </button>


                    <button
                        class="btn btn-outline"
                        id="shareProfileBtn">

                        Share Profile

                    </button>

                </div>

            </div>

        </div>

    `;
}
// =========================================================
// SETTINGS
// =========================================================

function SettingsView() {

    const user =
        getCurrentUser();

    const savedSettings =
        JSON.parse(
            localStorage.getItem(
                "settings"
            )
        ) || {

            emailNotifications: true,
            commentNotifications: true

        };

    return `

        <div
            class="container"
            style="max-width:800px">

            <h2 class="section-title">
                Settings
            </h2>


            <div
                style="
                    background:var(--bg-card);
                    padding:2rem;
                    border-radius:var(--radius-lg);
                    margin-top:2rem
                ">

                <h3>
                    Account
                </h3>


                <div class="form-group">

                    <label>
                        Name
                    </label>

                    <input
                        type="text"
                        class="form-control"
                        id="settingsName"
                        value="${escapeHTML(
                            user?.name || ""
                        )}">

                </div>


                <div class="form-group">

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        class="form-control"
                        id="settingsEmail"
                        value="${escapeHTML(
                            user?.email || ""
                        )}">

                </div>

            </div>


            <div
                style="
                    background:var(--bg-card);
                    padding:2rem;
                    border-radius:var(--radius-lg);
                    margin-top:2rem
                ">

                <h3>
                    Notifications
                </h3>


                <div
                    style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        margin-bottom:1rem
                    ">

                    <span>
                        Email Notifications
                    </span>

                    <input
                        type="checkbox"
                        id="emailNotifications"
                        ${
                            savedSettings.emailNotifications
                                ? "checked"
                                : ""
                        }>

                </div>


                <div
                    style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center
                    ">

                    <span>
                        Comment Notifications
                    </span>

                    <input
                        type="checkbox"
                        id="commentNotifications"
                        ${
                            savedSettings.commentNotifications
                                ? "checked"
                                : ""
                        }>

                </div>

            </div>


            <div
                style="
                    display:flex;
                    gap:1rem;
                    justify-content:flex-end;
                    margin-top:2rem
                ">

                <button
                    class="btn btn-outline"
                    id="cancelSettingsBtn">

                    Cancel

                </button>


                <button
                    class="btn btn-primary"
                    id="saveSettingsBtn">

                    Save Changes

                </button>

            </div>

        </div>

    `;

}


// =========================================================
// 404
// =========================================================

function NotFoundView() {

    return `

        <div
            class="container"
            style="
                text-align:center;
                padding:5rem 0
            ">

            <h1
                style="
                    font-size:5rem;
                    color:var(--primary)
                ">

                404

            </h1>

            <h2>
                Page Not Found
            </h2>

            <p
                style="
                    color:var(--text-muted);
                    margin:1rem 0
                ">

                The page you are looking for
                doesn't exist.

            </p>


            <a
                href="#/"
                class="btn btn-primary">

                Back to Home

            </a>

        </div>

    `;

}


// =========================================================
// EMPTY BLOG STATE
// =========================================================

function EmptyBlogState() {

    return `

        <div
            class="empty-state"
            style="grid-column:1/-1">

            <h3>
                No articles available
            </h3>

            <p>
                Be the first person to publish an article.
            </p>

            <a
                href="#/create-blog"
                class="btn btn-primary">

                Start Writing

            </a>

        </div>

    `;

}


// =========================================================
// BLOG CARD
// =========================================================

function BlogCard(blog) {

    const isBookmarked =
        State.bookmarks.includes(
            blog.id
        );

    return `

        <article class="blog-card">

            <a
                href="#/blog/${blog.id}">

                <img
                    src="${escapeHTML(blog.image)}"
                    class="card-image"
                    alt="${escapeHTML(blog.title)}"
                    loading="lazy">

            </a>


            <div class="card-content">

                <a
                    href="#/explore"
                    class="card-category">

                    ${escapeHTML(blog.category)}

                </a>


                <a
                    href="#/blog/${blog.id}">

                    <h3 class="card-title">

                        ${escapeHTML(blog.title)}

                    </h3>

                </a>


                <p class="card-desc">

                    ${escapeHTML(
                        stripHTML(
                            blog.content || ""
                        )
                    ).substring(0, 120)}...

                </p>


                <div class="card-footer">

                    <div class="author-info">

                        <img
                            src="${escapeHTML(blog.avatar)}"
                            class="avatar"
                            alt="${escapeHTML(blog.author)}"
                            loading="lazy">

                        <span>
                            ${escapeHTML(blog.author)}
                        </span>

                    </div>


                    <div class="card-stats">

                        <span class="stat-item">

                            👁️ ${blog.views || 0}

                        </span>


                        <span class="stat-item">

                            ❤️ ${blog.likes || 0}

                        </span>


                        <button
                            type="button"
                            class="stat-item bookmark-btn ${
                                isBookmarked
                                    ? "active"
                                    : ""
                            }"
                            data-id="${blog.id}">

                            ${
                                isBookmarked
                                    ? "🔖"
                                    : "📑"
                            }

                        </button>

                    </div>

                </div>

            </div>

        </article>

    `;

}
function editProfile() {

    const user = getCurrentUser();

    if (!user) {

        showToast(
            "Please login first",
            "error"
        );

        return;
    }

    const currentName =
        user.name || "";

    const currentEmail =
        user.email || "";

    const currentBio =
        user.bio ||
        "Software engineer and tech enthusiast.";

    const currentImage =
        user.profileImage ||
        "https://i.pravatar.cc/150?img=12";


    const modal = $("#modalContent");

    const overlay = $("#modalOverlay");

    if (!modal || !overlay) {

        // Fallback if modal does not exist

        const name =
            prompt(
                "Enter your name:",
                currentName
            );

        if (!name) return;

        user.name = name.trim();

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        showToast(
            "Profile updated successfully",
            "success"
        );

        router();

        return;
    }


    modal.innerHTML = `

        <div class="modal-header">

            <h3>
                Edit Profile
            </h3>

            <button
                class="modal-close"
                type="button">

                &times;

            </button>

        </div>


        <div class="modal-body">

            <div class="form-group">

                <label>
                    Full Name
                </label>

                <input
                    type="text"
                    id="editProfileName"
                    class="form-control"
                    value="${escapeHTML(currentName)}"
                    maxlength="100"
                    required>

            </div>


            <div class="form-group">

                <label>
                    Email Address
                </label>

                <input
                    type="email"
                    id="editProfileEmail"
                    class="form-control"
                    value="${escapeHTML(currentEmail)}"
                    required>

            </div>


            <div class="form-group">

                <label>
                    Profile Image URL
                </label>

                <input
                    type="url"
                    id="editProfileImage"
                    class="form-control"
                    value="${escapeHTML(currentImage)}"
                    placeholder="https://example.com/profile.jpg">

            </div>


            <div class="form-group">

                <label>
                    Bio
                </label>

                <textarea
                    id="editProfileBio"
                    class="form-control"
                    rows="4"
                    maxlength="250"
                    placeholder="Tell readers about yourself...">${escapeHTML(currentBio)}</textarea>

            </div>

        </div>


        <div class="modal-actions">

            <button
                class="btn btn-outline"
                id="cancelEditProfile"
                type="button">

                Cancel

            </button>


            <button
                class="btn btn-primary"
                id="saveProfileBtn"
                type="button">

                Save Changes

            </button>

        </div>

    `;


    overlay.classList.add("active");


    $(".modal-close").onclick =
        closeModal;

    $("#cancelEditProfile").onclick =
        closeModal;


    $("#saveProfileBtn").onclick = () => {

        const name =
            $("#editProfileName")
                ?.value
                .trim();

        const email =
            $("#editProfileEmail")
                ?.value
                .trim()
                .toLowerCase();

        const image =
            $("#editProfileImage")
                ?.value
                .trim();

        const bio =
            $("#editProfileBio")
                ?.value
                .trim();


        if (!name) {

            showToast(
                "Name is required",
                "error"
            );

            return;
        }


        if (!email) {

            showToast(
                "Email is required",
                "error"
            );

            return;
        }


        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(email)
        ) {

            showToast(
                "Please enter a valid email address",
                "error"
            );

            return;
        }


        user.name =
            name;

        user.email =
            email;

        user.bio =
            bio ||
            "Software engineer and tech enthusiast.";

        user.profileImage =
            image ||
            "https://i.pravatar.cc/150?img=12";


        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );


        // Update author information
        // for existing blogs belonging
        // to this user

        State.blogs.forEach(blog => {

            if (
                blog.authorEmail ===
                currentEmail
            ) {

                blog.author =
                    user.name;

                blog.authorEmail =
                    user.email;

                blog.avatar =
                    user.profileImage;

            }

        });


        saveState();


        closeModal();


        showToast(
            "Profile updated successfully!",
            "success"
        );


        setTimeout(() => {

            router();

        }, 500);

    };

}

// =========================================================
// ATTACH EVENT LISTENERS
// =========================================================

function attachEventListeners() {


    // =====================================================
    // BOOKMARKS
    // =====================================================

    $$(".bookmark-btn")
        .forEach(btn => {

            btn.onclick = e => {

                e.preventDefault();

                e.stopPropagation();

                const id =
                    parseInt(
                        btn.dataset.id
                    );

                const index =
                    State.bookmarks.indexOf(
                        id
                    );

                if (index > -1) {

                    State.bookmarks.splice(
                        index,
                        1
                    );

                    showToast(
                        "Removed from bookmarks",
                        "warning"
                    );

                } else {

                    State.bookmarks.push(
                        id
                    );

                    showToast(
                        "Added to bookmarks",
                        "success"
                    );

                }

                saveState();

                router();

            };

        });


    // =====================================================
    // LIKES
    // =====================================================

    $$(".like-btn")
        .forEach(btn => {

            btn.onclick = e => {

                e.preventDefault();

                const id =
                    parseInt(
                        btn.dataset.id
                    );

                const blog =
                    State.blogs.find(
                        b => b.id === id
                    );

                if (!blog) return;

                const index =
                    State.likes.indexOf(
                        id
                    );

                if (index > -1) {

                    State.likes.splice(
                        index,
                        1
                    );

                    blog.likes =
                        Math.max(
                            0,
                            Number(blog.likes || 0) - 1
                        );

                    showToast(
                        "Like removed",
                        "warning"
                    );

                } else {

                    State.likes.push(
                        id
                    );

                    blog.likes =
                        Number(blog.likes || 0) + 1;

                    State.notifications.unshift({

                        id: Date.now(),

                        text:
                            "Someone liked your post",

                        type: "like",

                        read: false

                    });

                    showToast(
                        "Article liked ❤️",
                        "success"
                    );

                }

                saveState();

                router();

            };

        });


    // =====================================================
    // DELETE BLOG
    // =====================================================

    $$(".delete-blog-btn")
        .forEach(btn => {

            btn.onclick = () => {

                const id =
                    parseInt(
                        btn.dataset.id
                    );

                showModal(
                    "Delete Blog",

                    `
                        <p>
                            Are you sure you want to delete
                            this blog?
                        </p>

                        <p
                            style="
                                color:var(--danger);
                                margin-top:.5rem
                            ">

                            This action cannot be undone.

                        </p>
                    `,

                    "Delete",

                    () => {

                        State.blogs =
                            State.blogs.filter(
                                blog =>
                                    blog.id !== id
                            );

                        State.comments =
                            State.comments.filter(
                                comment =>
                                    comment.blogId !== id
                            );

                        State.bookmarks =
                            State.bookmarks.filter(
                                bookmarkId =>
                                    bookmarkId !== id
                            );

                        State.likes =
                            State.likes.filter(
                                likeId =>
                                    likeId !== id
                            );

                        saveState();

                        showToast(
                            "Blog deleted successfully",
                            "success"
                        );

                        router();

                    }
                );

            };

        });


    // =====================================================
    // EDIT BLOG
    // =====================================================

    $$(".edit-blog-btn")
        .forEach(btn => {

            btn.onclick = () => {

                const id =
                    parseInt(
                        btn.dataset.id
                    );

                window.location.hash =
                    `#/create-blog?edit=${id}`;

            };

        });


    // =====================================================
    // LOGOUT
    // =====================================================

    const logoutBtn =
        $("#logoutBtn");

    if (logoutBtn) {

        logoutBtn.onclick = () => {

            showModal(
                "Logout",

                `
                    <p>
                        Are you sure you want to logout?
                    </p>
                `,

                "Logout",

                logoutUser
            );

        };

    }


    // =====================================================
    // AUTHENTICATION
    // =====================================================

    const authForm =
        $("#authForm");

    if (authForm) {

        authForm.onsubmit =
            async e => {

                e.preventDefault();

                const isLogin =
                    window.location.hash
                        .includes("login");


                if (isLogin) {

                    await handleLogin();

                } else {

                    await handleRegister();

                }

            };

    }


    // =====================================================
    // PASSWORD STRENGTH
    // =====================================================

    const passwordInput =
        $("#passwordInput");

    if (passwordInput) {

        passwordInput.oninput = () => {

            const strength =
                $("#passwordStrength");

            if (!strength) return;

            const password =
                passwordInput.value;

            let text = "";

            if (!password) {

                text = "";

            } else if (
                password.length < 6
            ) {

                text =
                    "Weak password";

            } else if (
                password.length < 10
            ) {

                text =
                    "Medium password";

            } else {

                text =
                    "Strong password";

            }

            strength.textContent =
                text;

        };

    }


    // =====================================================
    // EDITOR
    // =====================================================

    const editorForm =
        $("#editorForm");

    if (editorForm) {

        editorForm.onsubmit =
            e => {

                e.preventDefault();

                publishBlog();

            };

    }


    // =====================================================
    // SAVE DRAFT
    // =====================================================

    const saveDraftBtn =
        $("#saveDraftBtn");

    if (saveDraftBtn) {

        saveDraftBtn.onclick =
            saveDraft;

    }


    // =====================================================
    // COMMENTS
    // =====================================================

    const postCommentBtn =
        $("#postCommentBtn");

    if (postCommentBtn) {

        postCommentBtn.onclick =
            postComment;

    }


    // =====================================================
    // EXPLORE SEARCH
    // =====================================================

    const exploreSearch =
        $("#exploreSearch");

    if (exploreSearch) {

        exploreSearch.oninput =
            filterExploreBlogs;

    }


    // =====================================================
    // EXPLORE SORT
    // =====================================================

    const sortSelect =
        $("#sortSelect");

    if (sortSelect) {

        sortSelect.onchange =
            filterExploreBlogs;

    }
const categorySelect =
    $("#categorySelect");

if (categorySelect) {

    categorySelect.onchange =
        filterExploreBlogs;

}

    // =====================================================
    // SETTINGS
    // =====================================================

    const saveSettingsBtn =
        $("#saveSettingsBtn");

    if (saveSettingsBtn) {

        saveSettingsBtn.onclick =
            saveSettings;

    }


    const cancelSettingsBtn =
        $("#cancelSettingsBtn");

    if (cancelSettingsBtn) {

        cancelSettingsBtn.onclick =
            () => {

                window.location.hash =
                    "#/dashboard";

            };

    }

// =====================================================
// PROFILE
// =====================================================

// EDIT PROFILE

const editProfileBtn =
    $("#editProfileBtn");

if (editProfileBtn) {

    editProfileBtn.onclick =
        editProfile;

}


// SHARE PROFILE

const shareProfileBtn =
    $("#shareProfileBtn");

if (shareProfileBtn) {

    shareProfileBtn.onclick =
        async () => {

            try {

                await navigator.clipboard.writeText(
                    window.location.href
                );

                showToast(
                    "Profile link copied!",
                    "success"
                );

            } catch {

                showToast(
                    "Unable to copy profile link",
                    "error"
                );

            }

        };

}
   

    // =====================================================
    // READING PROGRESS
    // =====================================================

    const readingProgress =
        $("#readingProgress");

    if (readingProgress) {

        window.onscroll =
            updateReadingProgress;

        updateReadingProgress();

    }


    // =====================================================
    // ANIMATED COUNTERS
    // =====================================================

    initializeCounters();

}


// =========================================================
// LOGIN
// =========================================================

async function handleLogin() {

    const email =
        $("#emailInput")
            ?.value
            .trim()
            .toLowerCase();

    const password =
        $("#passwordInput")
            ?.value;


    if (!email || !password) {

        showToast(
            "Please enter email and password",
            "error"
        );

        return;

    }


    const submitBtn =
        $("#authSubmitBtn");

    if (submitBtn) {

        submitBtn.disabled = true;

        submitBtn.textContent =
            "Logging in...";

    }


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/auth/login`,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            email,

                            password

                        })

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            showToast(
                data.message ||
                "Invalid email or password",
                "error"
            );

            return;

        }


        localStorage.setItem(
            "token",
            data.token
        );


        localStorage.setItem(
            "user",
            JSON.stringify(
                data.user
            )
        );


        showToast(
            `Welcome back, ${data.user.name}!`,
            "success"
        );


        setTimeout(
            () => {

                window.location.hash =
                    "#/dashboard";

            },
            700
        );


    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        showToast(
            "Unable to connect to server. Make sure backend is running.",
            "error"
        );

    } finally {

        if (submitBtn) {

            submitBtn.disabled = false;

            submitBtn.textContent =
                "Login";

        }

    }

}


// =========================================================
// REGISTER
// =========================================================

async function handleRegister() {

    const name =
        $("#nameInput")
            ?.value
            .trim();

    const email =
        $("#emailInput")
            ?.value
            .trim()
            .toLowerCase();

    const password =
        $("#passwordInput")
            ?.value;

    const confirmPassword =
        $("#confirmPasswordInput")
            ?.value;


    if (
        !name ||
        !email ||
        !password ||
        !confirmPassword
    ) {

        showToast(
            "Please fill in all fields",
            "error"
        );

        return;

    }


    if (
        password !==
        confirmPassword
    ) {

        showToast(
            "Passwords do not match",
            "error"
        );

        return;

    }


    if (
        password.length < 6
    ) {

        showToast(
            "Password must be at least 6 characters",
            "error"
        );

        return;

    }


    const submitBtn =
        $("#authSubmitBtn");

    if (submitBtn) {

        submitBtn.disabled = true;

        submitBtn.textContent =
            "Creating Account...";

    }


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/auth/register`,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            name,

                            email,

                            password

                        })

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            showToast(
                data.message ||
                "Registration failed",
                "error"
            );

            return;

        }


        showToast(
            "Registration successful! Please login.",
            "success"
        );


        setTimeout(
            () => {

                window.location.hash =
                    "#/login";

            },
            1000
        );


    } catch (error) {

        console.error(
            "Registration error:",
            error
        );

        showToast(
            "Unable to connect to server. Make sure backend is running.",
            "error"
        );

    } finally {

        if (submitBtn) {

            submitBtn.disabled = false;

            submitBtn.textContent =
                "Register";

        }

    }

}


// =========================================================
// PUBLISH BLOG
// =========================================================

function publishBlog() {

    const title =
        $("#editorTitle")
            ?.value
            .trim();

    const subtitle =
        $("#editorSubtitle")
            ?.value
            .trim();

    const image =
        $("#editorImage")
            ?.value
            .trim();

    const category =
        $("#editorCategory")
            ?.value;

    const tagsValue =
        $("#editorTags")
            ?.value
            .trim();

    const content =
        $("#editorContent")
            ?.value
            .trim();

    const editingId =
        $("#editingBlogId")
            ?.value;


    // =====================================================
    // VALIDATION
    // =====================================================

    if (!title) {

        showToast(
            "Please enter a blog title",
            "error"
        );

        $("#editorTitle")?.focus();

        return;

    }


    if (!category) {

        showToast(
            "Please select a category",
            "error"
        );

        return;

    }


    if (!content) {

        showToast(
            "Please write some content before publishing",
            "error"
        );

        $("#editorContent")?.focus();

        return;

    }


    if (
        content.length < 20
    ) {

        showToast(
            "Blog content should contain at least 20 characters",
            "error"
        );

        return;

    }


    const tags =
        tagsValue
            ? tagsValue
                .split(",")
                .map(
                    tag =>
                        tag.trim()
                )
                .filter(Boolean)
            : [];


    const existingBlog =
        editingId
            ? State.blogs.find(
                blog =>
                    blog.id ==
                    parseInt(editingId)
            )
            : null;


    const blog =
        createBlogObject(
            title,
            subtitle,
            image,
            category,
            content,
            tags,
            "published",
            existingBlog
        );


    // =====================================================
    // UPDATE EXISTING BLOG
    // =====================================================

    if (existingBlog) {

        const index =
            State.blogs.findIndex(
                b =>
                    b.id ===
                    existingBlog.id
            );

        if (index !== -1) {

            State.blogs[index] =
                blog;

        }

        showToast(
            "Blog updated and published successfully!",
            "success"
        );

    }


    // =====================================================
    // CREATE NEW BLOG
    // =====================================================

    else {

        State.blogs.unshift(
            blog
        );

        showToast(
            "Blog published successfully!",
            "success"
        );

    }


    // =====================================================
    // REMOVE DRAFT
    // =====================================================

    State.drafts = [];


    // =====================================================
    // SAVE
    // =====================================================

    saveState();


    // =====================================================
    // REDIRECT
    // =====================================================

    setTimeout(
        () => {

            window.location.hash =
                "#/my-blogs";

        },
        1000
    );

}


// =========================================================
// SAVE DRAFT
// =========================================================

function saveDraft() {

    const title =
        $("#editorTitle")
            ?.value
            .trim();

    const subtitle =
        $("#editorSubtitle")
            ?.value
            .trim();

    const image =
        $("#editorImage")
            ?.value
            .trim();

    const category =
        $("#editorCategory")
            ?.value;

    const tagsValue =
        $("#editorTags")
            ?.value
            .trim();

    const content =
        $("#editorContent")
            ?.value
            .trim();


    if (
        !title &&
        !content
    ) {

        showToast(
            "Write something before saving a draft",
            "error"
        );

        return;

    }


    const tags =
        tagsValue
            ? tagsValue
                .split(",")
                .map(
                    tag =>
                        tag.trim()
                )
                .filter(Boolean)
            : [];


    const draft = {

        id: Date.now(),

        title:
            title || "Untitled Draft",

        subtitle,

        image,

        category:
            category || "Technology",

        content,

        tags,

        status: "draft",

        date:
            new Date()
                .toISOString()
                .split("T")[0]

    };


    State.drafts = [
        draft
    ];


    saveState();


    showToast(
        "Draft saved successfully",
        "success"
    );

}


// =========================================================
// COMMENTS
// =========================================================

function postComment() {

    const input =
        $("#commentInput");

    const text =
        input?.value
            .trim();


    if (!text) {

        showToast(
            "Comment cannot be empty",
            "error"
        );

        return;

    }


    const hash =
        window.location.hash;

    const blogId =
        parseInt(
            hash.split("/")[2]
        );


    if (!blogId) {

        showToast(
            "Unable to identify article",
            "error"
        );

        return;

    }


    const user =
        getCurrentUser();


    State.comments.push({

        id: Date.now(),

        blogId,

        author:
            user?.name ||
            "You",

        avatar:
            user?.profileImage ||
            "https://i.pravatar.cc/150?img=12",

        text,

        date: "Just now"

    });


    State.notifications.unshift({

        id: Date.now() + 1,

        text:
            `New comment on your article`,

        type: "comment",

        read: false

    });


    saveState();


    showToast(
        "Comment posted successfully!",
        "success"
    );


    router();

}


// =========================================================
// EXPLORE FILTER
// =========================================================

function filterExploreBlogs() {

    const search =
        $("#exploreSearch")
            ?.value
            .trim()
            .toLowerCase() || "";

    const sort =
        $("#sortSelect")
            ?.value || "latest";

    const category =
        $("#categorySelect")
            ?.value || "all";

    let blogs =
        getPublishedBlogs();


    if (search) {

        blogs =
            blogs.filter(
                blog => {

                    const searchable =
                        `

                            ${blog.title}

                            ${blog.category}

                            ${blog.author}

                            ${(blog.tags || []).join(" ")}

                            ${stripHTML(
                                blog.content || ""
                            )}

                        `
                        .toLowerCase();

                    return searchable.includes(
                        search
                    );

                }
            );

    }
if (category !== "all") {

    blogs =
        blogs.filter(
            blog =>
                blog.category === category
        );

}

    if (sort === "popular") {

        blogs.sort(
            (a, b) =>
                Number(b.views || 0) -
                Number(a.views || 0)
        );

    }


    if (sort === "liked") {

        blogs.sort(
            (a, b) =>
                Number(b.likes || 0) -
                Number(a.likes || 0)
        );

    }


    if (sort === "latest") {

        blogs.sort(
            (a, b) =>
                new Date(b.date) -
                new Date(a.date)
        );

    }


    const grid =
        $("#exploreBlogGrid");

    if (!grid) return;


    grid.innerHTML =
        blogs.length
            ? blogs
                .map(BlogCard)
                .join("")
            : EmptyBlogState();


    // Reattach bookmark buttons
    $$(".bookmark-btn")
        .forEach(btn => {

            btn.onclick = e => {

                e.preventDefault();

                e.stopPropagation();

                const id =
                    parseInt(
                        btn.dataset.id
                    );

                toggleBookmark(id);

            };

        });

}


// =========================================================
// TOGGLE BOOKMARK
// =========================================================

function toggleBookmark(id) {

    const index =
        State.bookmarks.indexOf(id);

    if (index > -1) {

        State.bookmarks.splice(
            index,
            1
        );

        showToast(
            "Removed from bookmarks",
            "warning"
        );

    } else {

        State.bookmarks.push(
            id
        );

        showToast(
            "Added to bookmarks",
            "success"
        );

    }

    saveState();

    router();

}


// =========================================================
// SETTINGS SAVE
// =========================================================

function saveSettings() {

    const user =
        getCurrentUser();

    if (!user) return;


    const name =
        $("#settingsName")
            ?.value
            .trim();

    const email =
        $("#settingsEmail")
            ?.value
            .trim();


    if (!name || !email) {

        showToast(
            "Name and email are required",
            "error"
        );

        return;

    }


    user.name =
        name;

    user.email =
        email;


    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );


    const settings = {

        emailNotifications:
            $("#emailNotifications")
                ?.checked || false,

        commentNotifications:
            $("#commentNotifications")
                ?.checked || false

    };


    localStorage.setItem(
        "settings",
        JSON.stringify(settings)
    );


    showToast(
        "Settings saved successfully",
        "success"
    );


    setTimeout(
        () => {

            router();

        },
        600
    );

}


// =========================================================
// COUNTERS
// =========================================================

function initializeCounters() {

    const statValues =
        $$(".stat-value");

    if (!statValues.length) return;


    statValues.forEach(
        stat => {

            const target =
                parseInt(
                    stat.dataset.target
                ) || 0;

            let current = 0;

            const duration = 700;

            const steps = 40;

            const increment =
                target / steps;

            const interval =
                duration / steps;

            const timer =
                setInterval(
                    () => {

                        current +=
                            increment;

                        if (
                            current >= target
                        ) {

                            current =
                                target;

                            clearInterval(
                                timer
                            );

                        }

                        stat.textContent =
                            Math.floor(
                                current
                            );

                    },
                    interval
                );

        }
    );

}


// =========================================================
// READING PROGRESS
// =========================================================

function updateReadingProgress() {

    const progressBar =
        $("#readingProgress");

    if (!progressBar) return;


    const scrollHeight =
        document.documentElement
            .scrollHeight -
        window.innerHeight;


    const scrollTop =
        window.scrollY;


    const progress =
        scrollHeight > 0
            ? (
                scrollTop /
                scrollHeight
            ) * 100
            : 0;


    progressBar.style.width =
        `${Math.min(
            100,
            Math.max(
                0,
                progress
            )
        )}%`;

}


// =========================================================
// STRIP HTML
// =========================================================

function stripHTML(html) {

    if (!html) return "";

    const temp =
        document.createElement(
            "div"
        );

    temp.innerHTML =
        html;

    return temp.textContent ||
        temp.innerText ||
        "";

}


// =========================================================
// INITIALIZATION
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initTheme();

        router();

        updateHeaderForAuth();

        renderNotifications();

    }
);


// =========================================================
// INITIALIZE IMMEDIATELY
// =========================================================

initTheme();

router();

updateHeaderForAuth();