import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userLoginThunk = createAsyncThunk(
  "userLogin",
  async (userCred, thunkApi) => {
    let res;

    if (userCred.userType === "user")
      res = await axios.post("http://localhost:5000/user/login", userCred);

    if (userCred.userType === "author")
      res = await axios.post("http://localhost:5000/author/login", userCred);

    if (userCred.userType === "admin")
      res = await axios.post("http://localhost:5000/admin/login", userCred);

    if (res.data.message === "login success") {
      sessionStorage.setItem("token", res.data.token);
      return res.data;
    } else {
      return thunkApi.rejectWithValue(res.data.message);
    }
  }
);

export const userLoginSlice = createSlice({
  name: "user-login-slice",
  initialState: {
    isPending: false,
    currentUser: {},
    errorOccured: false,
    errorMessage: "",
    loginStatus: false,
  },
  reducers: {
    resetState: (state, payload) => {
      state.isPending = false;
      state.currentUser = {};
      state.errorOccured = false;
      state.errorMessage = "";
      state.loginStatus = false;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(userLoginThunk.pending, (state, action) => {
        state.isPending = true;
      })
      .addCase(userLoginThunk.fulfilled, (state, action) => {
        state.isPending = false;
        state.currentUser = action.payload.user;
        state.errorOccured = false;
        state.errorMessage = "";
        state.loginStatus = true;
      })
      .addCase(userLoginThunk.rejected, (state, action) => {
        state.isPending = false;
        state.currentUser = {};
        state.errorMessage = action.payload;
        state.errorOccured = true;
        state.loginStatus = false;
      }),
});

export default userLoginSlice.reducer;
export const { resetState } = userLoginSlice.actions;
