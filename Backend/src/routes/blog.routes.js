const express = require("express");
const router = express.Router();
const blogController = require("../controller/blog.controller");
const upload = require("../middleware/multer.middleware");
const path = require("path");

router.post("/create-blog", upload.single("banner"), blogController.createBlog);
router.get("/all-blog", blogController.getAllBlog);
router.use("/static", express.static("public/temp"));
module.exports = router;
