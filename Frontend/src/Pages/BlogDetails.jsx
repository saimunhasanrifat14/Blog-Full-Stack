import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    banner: null,
  });

  const { id } = useParams();

  useEffect(() => {
    const getSingleBlog = async () => {
      try {
        const selectedBlog = await axios.get(
          `http://localhost:4000/selected-blog/${id}`
        );
        const data = selectedBlog?.data?.data;
        setBlog(data);
        setFormData({
          title: data.title,
          description: data.description,
          banner: data.banner,
        });
      } catch (error) {
        console.log("error from get single blog", error);
      }
    };
    getSingleBlog();
  }, [id]);

  const handleSave = async () => {
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("banner", formData.banner);
      
      await axios.put(`http://localhost:4000/update-blog/${id}`, data);
      setBlog(formData);
      setIsEditing(false);
    } catch (error) {
      console.log("Error updating blog", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          [name]: file,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center py-10">
      <div className="max-w-2xl mx-auto bg-white p-6">
        {!isEditing ? (
          // View Mode
          <>
            <h1 className="text-3xl font-bold mb-4 text-center">
              {blog.title}
            </h1>
            <img
              src={blog.banner || ""}
              alt="Blog Banner"
              className="w-full object-cover rounded-xl mb-6"
            />
            <p className="text-gray-700 text-lg leading-relaxed">
              {blog.description}
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition duration-300"
                onClick={() => setIsEditing(true)}
              >
                Edit Blog
              </button>
              <button className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition duration-300">
                Delete Blog
              </button>
            </div>
          </>
        ) : (
          // Edit Mode
          <>
            {/* for title */}
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full text-3xl font-bold mb-4 text-center border-b-2 pb-2 outline-none"
            />
            {/* for banner */}
            <div className="relative w-full mb-6 group">
              {formData.banner && (
                <img
                  src={
                    typeof formData.banner === "string"
                      ? formData.banner
                      : URL.createObjectURL(formData.banner)
                  }
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-xl"
                />
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-[#0000006c] rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("bannerUpload").click()
                  }
                  className="bg-white text-black px-4 py-2 rounded-lg font-semibold cursor-pointer"
                >
                  Replace
                </button>
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
                id="bannerUpload"
                name="banner"
                accept="image/*"
                className="hidden"
                onChange={handleChange}
              />
            </div>
            {/* for description*/}
            <textarea
              name="description"
              rows="6"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 text-lg leading-relaxed"
            />
            {/* save and cancel button */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 transition duration-300"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-6 py-2 rounded-xl hover:bg-gray-500 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
