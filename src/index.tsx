import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SinglePostPage } from "./features/posts/SinglePostPage";
import { AddPostForm } from "./features/posts/AddPostForm";
import PostsList from "./features/posts/PostsList";
import { EditPostForm } from "./features/posts/EditPostForm";
import { UsersList } from "./features/users/UsersList";
import { UserPage } from "./features/users/UserPage";

const container = document.getElementById("root")!;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <>
            <AddPostForm />
            <PostsList />
          </>
        ),
      },
      {
        path: "posts/:postId",
        element: <SinglePostPage />,
      },
      {
        path: "/editPost/:postId",
        element: <EditPostForm />
      },
      {
        path: "users",
        element: <UsersList />
      },
      {
        path: "users/:userId",
        element: <UserPage />
      }
    ],
  },
]);
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
