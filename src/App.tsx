import React from "react";
import "./App.css";
import PostsList from "./features/posts/PostsList";
import { Navbar } from "./app/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <React.Fragment>
        <PostsList />
      </React.Fragment>
    </div>
  );
}

export default App;
