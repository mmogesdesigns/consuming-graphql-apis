import React from "react";
import { Routes, Route } from "react-router-dom";
import CreatePostPage from "./views/CreatePostsPage";
import UpdatePostPage from "./views/UpdatePostPage";
import DeletePostPage from "./views/DeletePostPage";

const App = () => {
  return (
    <Routes>
     
        <Route path="/create-post" element={<CreatePostPage/>} />
        <Route path="/update-post" element={<UpdatePostPage/>} />
        <Route path="/delete-post" element={<DeletePostPage/>} />
      
    </Routes>
  );
};

export default App;
