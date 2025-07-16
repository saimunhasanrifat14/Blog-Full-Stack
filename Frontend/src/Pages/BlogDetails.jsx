import React from "react";

const BlogDetails = () => {
  return (
   <div className="w-full h-screen flex items-center justify-center">
     <div className="max-w-3xl mx-auto bg-white p-6 mt-10">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4 text-center">
        The Power of Simplicity in Life
      </h1>

      {/* Banner */}
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
        alt="Blog Banner"
        className="w-full h-64 object-cover rounded-xl mb-6"
      />

      {/* Description */}
      <p className="text-gray-700 text-lg leading-relaxed">
        Simplicity is not about deprivation. It’s about appreciating the small
        things, decluttering the unnecessary, and finding peace in less. When
        life gets too busy, the best way to regain clarity is to slow down,
        breathe, and embrace a simpler way of living. Whether it’s your home,
        your work, or your thoughts — simplifying can bring calmness and focus
        to your everyday life.
      </p>
      {/* Buttons */}
      <div className="flex justify-center gap-4">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition duration-300">
          Edit Blog
        </button>
        <button className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition duration-300">
          Delete Blog
        </button>
      </div>
    </div>
   </div>
  );
};

export default BlogDetails;
