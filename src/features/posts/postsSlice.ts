import {
  createAsyncThunk,
  createSelector,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { client } from "../../api/client";
export interface IEmoji {
  [index: string]: number;
}
export interface Post {
  id: string;
  title: string;
  content: string;
  user: string;
  date: string;
  reactionsCount: IEmoji;
}


export enum DataStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}

const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a: Post, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
  status: DataStatus.IDLE,
  error: null,
});

// const initialState: PostState = {
//   posts: [
//     {
//       id: "1",
//       title: "First Post!",
//       content: "Hello!",
//       user: "1",
//       date: sub(new Date(), { minutes: 10 }).toISOString(),
//       reactionsCount: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
//     },
//     {
//       id: "2",
//       title: "Second Post",
//       content: "More text",
//       user: "2",
//       date: sub(new Date(), { minutes: 5 }).toISOString(),
//       reactionsCount: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
//     },
//   ],
//   status: DataStatus.IDLE,
//   error: undefined,
// };

const baseUrl = "http://localhost:3000";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await client.get(`${baseUrl}/posts`);
  console.log("Posts response: ", response);
  return response.data;
});

export const addNewPost = createAsyncThunk<any,any>(
  "posts/addNewPost",
  async (initialPost: Post) => {
    console.log('intitial post: ', initialPost)
    const response = await client.post(`${baseUrl}/posts`, initialPost);
    return response.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.entities[id];
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload as {
        postId: string;
        reaction: string;
      };
      const existingPost = state.entities[postId];
      if (existingPost) {
        existingPost.reactionsCount[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        // state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, postsAdapter.addOne);
  },
});

export const { postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;

// export const selectAllPosts = (state: RootState) => state.posts.posts;

// export const selectPostById = (state: RootState, postId: string | undefined) =>
//   state.posts.posts.find((post: Post) => post.id === postId);

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state: RootState) => state.posts);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state: RootState, userId: string | undefined) => userId],
  (posts: Post[], userId) => posts.filter((post: Post) => post.user === userId)
);
