import { EntityId } from "@reduxjs/toolkit";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useGetUserQuery } from "../api/apiSlice";
import { selectAllUsers, selectUserById, User } from "../users/usersSlice";

export const PostAuthor = ({ userId }: { userId: EntityId }) => {
  const {data:author, isFetching, isSuccess} = useGetUserQuery(userId);

  let content;

  if(isFetching) {
    content = "Loading Author..."
  } else if (isSuccess) {
    content = author ? author.name : "Unknown author"
  }

  return <span>by {content}</span>;
};
