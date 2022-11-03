import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { Root } from "react-dom/client";
import { client } from "../../api/client";
import { RootState } from "../../app/store";

export interface User {
  id: string;
  name: string;
}

// const initialState = [
//   { id: "0", name: "Tianna Jenkins" },
//   { id: "1", name: "Kevin Grant" },
//   { id: "2", name: "Madison Price" },
// ];

const baseUrl = "http://localhost:3000";

const usersAdapter = createEntityAdapter<User>();
const initialState = usersAdapter.getInitialState();

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await client.get(`${baseUrl}/users`);
  console.log("Users response: ", response);
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll);
  },
});

export default usersSlice.reducer;

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state: RootState) => state.users);

// export const selectAllUsers = (state: RootState) => state.users;

// export const selectUserById = (state: RootState, userId: string | undefined) =>
//   state.users.find((user: UserState) => user.id === userId);
