import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from '../posts/postsSlice'
import { User } from '../users/usersSlice';

const baseUrl = "http://localhost:3000";

export const postsApi = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl }),
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getPosts: builder.query<Post[], void>({
      // The URL for the request is '/fakeApi/posts'
      query: () => '/posts'
    }),
    getUsers: builder.query<User[], void>({
      query: () => '/users'
    })
  })
})

export const { useGetPostsQuery } = postsApi