import React, { useEffect, useState } from "react";
import axios from "axios";

const Blogs = () => {
  const [blog, setBlogs] = useState([]);
  const [realtime, setrealtime] = useState(false);
  const [formData, setFormData] = useState({
    blogTitle: "",
    blogDescrioption: "",
    image: null,
  });

  const blogs = [
    {
      id: 1,
      blogTitle: "Mastering React in 30 Days",
      blogDescrioption:
        "Learn how to build powerful web apps using React.js from scratch.",
      image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
    },
    {
      id: 2,
      blogTitle: "Understanding JavaScript Closures",
      blogDescrioption:
        "Closures are a fundamental concept in JS. This guide makes it easy to understand.",
      image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
    },
    {
      id: 3,
      blogTitle: "10 CSS Tricks Every Developer Should Know",
      blogDescrioption:
        "Improve your UI design skills with these helpful CSS techniques.",
      image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
    },
    {
      id: 4,
      blogTitle: "Why Tailwind CSS is a Game Changer",
      blogDescrioption:
        "Discover how Tailwind speeds up your styling process and makes your UI consistent.",
      image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
    },
    {
      id: 3,
      blogTitle: "10 CSS Tricks Every Developer Should Know",
      blogDescrioption:
        "Improve your UI design skills with these helpful CSS techniques.",
      image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
    },
    {
      id: 4,
      blogTitle: "Why Tailwind CSS is a Game Changer",
      blogDescrioption:
        "Discover how Tailwind speeds up your styling process and makes your UI consistent.",
      image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
    },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-gray-100 p-5 gap-5">
      {/* Form Section - 30% */}
      <div className="w-full sm:w-[30%] relative">
        <div className="w-full bg-white px-5 py-8 rounded-xl shadow-md sticky top-5 left-0">
          <h2 className="text-xl font-bold mb-4">Create a Blog</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="blogTitle"
              placeholder="Blog Title"
              value={formData.blogTitle}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-400"
              required
            />
            <textarea
              name="blogDescrioption"
              placeholder="Blog Description"
              value={formData.blogDescrioption}
              onChange={handleChange}
              rows="4"
              className="w-full border px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 cursor-pointer"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 cursor-pointer"
            >
              Submit Blog
            </button>
          </form>
        </div>
      </div>

      {/* Blog Section - 70% */}
      <div className="w-full sm:w-[70%] h-full grid grid-cols-1 sm:grid-cols-2 gap-5">
        {blogs?.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-md overflow-hidden relative"
          >
            {/* View Button */}
            <button className="absolute top-3 right-3 bg-blue-500 text-white text-sm px-3 py-1 rounded-xl hover:bg-blue-600 cursor-pointer">
              View
            </button>

            {/* Banner */}

            <img
              src={blog.image}
              alt="Banner"
              className="w-full h-80 object-cover"
            />

            {/* Title & Description */}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{blog.blogTitle}</h3>
              <p className="text-gray-600 mt-2">{blog.blogDescrioption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
