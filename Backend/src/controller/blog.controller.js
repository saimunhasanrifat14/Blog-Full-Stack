const Blog = require("../models/blog.model");

exports.createBlog = async (req, res) => {
  try {
    const { title, description, author, banner } = req.body;
    const newBlog = new Blog({
      title,
      description,
      author,
      banner: `http://localhost:4000/static/${req.file.filename}`,
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
      msg: "blog created succesfully",
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
