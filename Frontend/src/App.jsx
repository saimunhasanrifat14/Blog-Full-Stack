import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Blogs from "./Pages/Blogs";
import BlogDetails from "./Pages/BlogDetails";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogDetails/:id" element={<BlogDetails />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
