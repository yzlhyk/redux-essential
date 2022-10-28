import  { createSlice } from '@reduxjs/toolkit';

export interface PostState {
  id: string;
  title: string;
  content: string;
}

const initialState: PostState[] = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' }
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {}
});

export default postsSlice.reducer;