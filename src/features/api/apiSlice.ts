import { EntityId } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../posts/postsSlice";
import { User } from "../users/usersSlice";

const baseUrl = "http://localhost:3000";

export const postsApi = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl }),
  // The "endpoints" represent operations and requests for this server
  tagTypes:['Post'],
  endpoints: (builder) => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getPosts: builder.query<Post[], void>({
      // The URL for the request is '/fakeApi/posts'
      query: () => "/posts",
      providesTags: ['Post']
    }),
    getPost: builder.query<Post, EntityId>({
      query: (postId) => `/posts/${postId}`,
    }),
    addNewPost: builder.mutation<Post,Post>({
      query: postDto => ({
        url:'/posts',
        method: 'POST',
        body: postDto
      }),
      invalidatesTags: ['Post']
    }),
    getUsers: builder.query<User[], void>({
      query: () => "/users",
    }),
    getUser: builder.query<User, EntityId>({
      query: (userId) => `/users/${userId}`,
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useGetUsersQuery,
  useGetUserQuery,
} = postsApi;
