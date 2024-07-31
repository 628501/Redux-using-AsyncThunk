import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteUsers, displayUsers, updateUsers, userDetails } from "../Services/UserService";

const initialState = {
  users: [],
  isLoading: false,
  error: "",
};


export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await displayUsers();
      return response; 
    } catch (error) {
      return rejectWithValue({ error: "No users found" });
    }
  }
);


export const addUsers = createAsyncThunk(
  "users/addUsers",
  async (user, { rejectWithValue }) => {
    try {
      const response = await userDetails(user);
      return response;
    } catch (error) {
      return rejectWithValue({ error: "User Not Added" });
    }
  }
);


export const userUpdate = createAsyncThunk(
  "users/userUpdate",
  async (user, { rejectWithValue }) => {
    try {
      const response = await updateUsers(user);
      return response;
    } catch (error) {
      return rejectWithValue({ error: "User Not Updated" });
    }
  }
);


export const userDelete = createAsyncThunk(
  "users/userDelete",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await deleteUsers(userId);
      return response;
    } catch (error) {
      return rejectWithValue({ error: "Not Deleted" });
    }
  }
);


export const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.users = action.payload; 
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
        state.users = [];
      })
      .addCase(addUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.users.push(action.payload);
      })
      .addCase(addUsers.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      })
      .addCase(userUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.users = state.users.map((u) => u.id === action.payload.id ? action.payload : u)
      })
      .addCase(userUpdate.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      })
      .addCase(userDelete.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userDelete.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.users = state.users.filter((u) => u.id !== action.payload)
      })
      .addCase(userDelete.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      });
  },
});

export const { deleteUser, updateUser } = UserSlice.actions;

export default UserSlice.reducer;
