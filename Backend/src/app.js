const express = require("express");
const app = express();
require("dotenv").config();
const userRoutes = require("./routes/user.routes");
const blogRoutes = require("./routes/blog.routes");
var cors = require("cors");

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use(userRoutes);
app.use(blogRoutes);

module.exports = { app };
