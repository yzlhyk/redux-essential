import { ChangeEvent, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { User } from "../users/usersSlice";
import { sub } from "date-fns";
import { useAddNewPostMutation, useGetUsersQuery } from "../api/apiSlice";

export const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const [addNewPost, { isLoading: isPostLoading }] = useAddNewPostMutation();
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);
  const onAuthorChanged = (e: ChangeEvent<HTMLSelectElement>) =>
    setUserId(e.target.value);

  const canSave = [title, content, userId].every(Boolean) && !isPostLoading;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        const date = sub(new Date(), { minutes: 5 }).toISOString();
        const reactionsCount = {
          thumbsUp: 0,
          hooray: 0,
          heart: 0,
          rocket: 0,
          eyes: 0,
        };
        const id = nanoid();
        await addNewPost({
          id,
          title,
          content,
          user: userId,
          date,
          reactionsCount,
        }).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.error("Failed to save the post: ", err);
      }
    }
  };

  let usersOptions;

  if (isLoading) {
    usersOptions = "no user";
  } else if (isSuccess) {
    usersOptions = users.map((user: User) => (
      <option value={user.id} key={user.id}>
        {user.name}
      </option>
    ));
  } else if (isError) {
    usersOptions = <div>{error.toString()}</div>;
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="psotAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};
