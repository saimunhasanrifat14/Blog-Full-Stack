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
    const selectedBlog = await Blog.findById(id);

    if (req.body.title) {
      selectedBlog.title = req.body.title;
    }

    if (req.body.description) {
      selectedBlog.description = req.body.description;
    }

    if (req.file) {
      const part = selectedBlog.banner.split("/");
      const bannerLocation = part[part.length - 1];
      const targetPath = path.join("public", "temp", bannerLocation);
      if (fs.existsSync(targetPath)) {
        fs.unlinkSync(targetPath);
      }
      selectedBlog.banner = `http://localhost:4000/banner/${req.file.filename}`;
    }

    await selectedBlog.save();

    res.status(200).json({
      msg: "Single blog updated successfully",
      data: selectedBlog,
    });
  } catch (error) {
    console.log("Error from updateBlog controller:", error);
    res.status(500).json({
      msg: "Error from updateBlog controller",
      error,
    });
  }
};

// delete blog
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const Item = await Blog.findOne({ _id: id });
    if (!Item) {
      return res.json({
        msg: "blog not found",
      });
    }
    const part = Item.banner.split("/");
    const bannerLocation = part[part.length - 1];
    const targetPath = path.join("public", "temp", bannerLocation);
    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath);
    }

    const deleItem = await Blog.findByIdAndDelete(id);

    return res.status(201).json({
      msg: "single Blog delete succesfully",
      data: deleItem,
    });
  } catch (error) {
    console.log("error from  updateBlog controller", error);
    res.status(501).json({
      msg: "error from  updateBlog controller",
      error: error,
    });
  }
};
