const Blog = require("../models/blog.model");
const fs = require("fs");
const path = require("path");

exports.createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newBlog = new Blog({
      title,
      description,
      banner: `http://localhost:4000/banner/${req.file.filename}`,
    });

    const savedBlog = await newBlog.save();

    if (!savedBlog) {
      return res.status(500).json({ message: "Blog could not be created." });
    }

    res.status(201).json({
      message: "Blog created successfully",
      data: savedBlog,
    });
  } catch (error) {
    console.error("Error in createBlog:", error);
    res.status(500).json({ message: "Error creating blog", error });
  }
};

exports.getAllBlog = async (req, res) => {
  try {
    const allblog = await Blog.find();
    res.status(201).json({
      msg: "blog get succesfully",
      data: allblog,
    });
  } catch (error) {
    console.log("error from user getAllBlog controller", error);
    res.status(501).json({
      msg: "error from user getAllBlog controller",
      error: error,
    });
  }
};

exports.getSelectedBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    res.status(201).json({
      msg: "blog get succesfully",
      data: blog,
    });
  } catch (error) {
    console.log("error from getSelectedBlog controller", error);
    res.status(501).json({
      msg: "error from getSelectedBlog controller",
      error: error,
    });
  }
};

exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    console.log(blog);
    // title
    if (req.body.title) {
      blog.title = req.body.title;
    } else {
      blog.title;
    }
    // description
    if (req.body.description) {
      blog.description = req.body.description;
    } else {
      blog.description;
    }
    // banner
    if (req.file) {
      // old image delete
      const part = blog.banner.split("/");
      const bannerLocation = part[part.length - 1];
      const targetPath = path.join("public", "temp", bannerLocation);
      fs.unlinkSync(targetPath);
      //   new image
      blog.banner = `http://localhost:4000/blog/${req?.file?.filename}`;
    } else {
      blog.banner = blog.banner;
    }
    // save to database
    await blog.save();

    res.status(201).json({
      msg: "single Blog Updatea   succesfully",
      data: blog,
    });
  } catch (error) {
    console.log("error from updateBlog controller", error);
    res.status(501).json({
      msg: "error from updateBlog controller",
      error: error,
    });
  }
};
