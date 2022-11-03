import React from "react";
import { useParams, Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { PostAuthor } from "./PostAuthor";
import { Post, selectPostById } from "./postsSlice";
import { ReactionButtons } from "./ReactionButtons";

export const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useAppSelector((state:RootState)=>selectPostById(state, postId!));

    
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
        <PostAuthor userId={post.user} />
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  );
};
