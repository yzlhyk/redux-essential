import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { RootState } from "../../app/store";
import { PostAuthor } from "./PostAuthor";
import {
  DataStatus,
  fetchPosts,
  Post,
  selectAllPosts,
  selectPostIds,
  selectPostById,
} from "./postsSlice";
import { ReactionButtons } from "./ReactionButtons";

import { useGetPostsQuery } from "../api/apiSlice";
import { TimeAgo } from "./TimeAgo";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Spinner } from "../../components/Spinner";
import { EntityId } from "@reduxjs/toolkit";
import { fetchUsers } from "../users/usersSlice";

let PostExerpt = ({ postId }: { postId: EntityId }) => {
  const post = useAppSelector((state: RootState) =>
    selectPostById(state, postId)
  );

  if (!post) {
    return <div>Invalid Post</div>;
  }

  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  );
};

const PostsList = () => {
  const dispatch = useAppDispatch();
  const orderedPostsIds = useAppSelector(selectPostIds);
  // const {data:posts, isLoading, isSuccess, isError, error} = useGetPostsQuery();

  const postStatus = useAppSelector((state: RootState) => state.posts.status);
  const error = useAppSelector((state: RootState) => state.posts.error);

  useEffect(() => {
    if (postStatus === DataStatus.IDLE) {
      dispatch(fetchPosts());
      dispatch(fetchUsers());
      console.log("fetched posts");
    }
  }, [postStatus, dispatch]);

  let content;

  if (postStatus === DataStatus.LOADING) {
    content = <Spinner text="Loading..." />;
  } else if (postStatus === DataStatus.SUCCEEDED) {
    content = orderedPostsIds.map((postId: EntityId) => (
      <PostExerpt key={postId} postId={postId} />
    ));
  } else if (postStatus === DataStatus.FAILED) {
    content = <div>{error}</div>;
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
