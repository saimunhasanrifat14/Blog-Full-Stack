const express = require("express");
const router = express.Router();
const blogController = require("../controller/blog.controller");

router.post("/create-blog", blogController.createBlog);
router.get("/all-blog", blogController.getAllBlog);

module.exports = router;
