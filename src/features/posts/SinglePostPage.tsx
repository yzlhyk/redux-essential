import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { PostState } from "./postsSlice";

export const SinglePostPage = () => {
  const { postId } = useParams();
  console.log('postID: ', postId)
  const post = useAppSelector((state: RootState) =>
    state.posts.find((post: PostState) => post.id === postId)
  );

  if (!post) {
    return (
      <section>
        <h2>Post not Found!</h2>
      </section>
    );
  }
  console.log("single post page", postId);
  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
      </article>
    </section>
  );
};
