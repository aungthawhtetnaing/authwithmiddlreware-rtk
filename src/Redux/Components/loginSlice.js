import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginuser = createAsyncThunk(
  "login/loginuser",
  async ({ email, password }) => {
    try {
      const response = await fetch(`http://192.168.2.136:8000/api/login`, {
        method: "POST",
        headers: {
          Accept: "application/ecmascript",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.message=="success") {
        // If login was successful, redirect to the home page
        window.location.href = '/home.js';
       
      } else {
        // If login failed, display an error message
        alert('Login failed. Please check your username and password and try again.');
      }
      // If login was successful, store the token in localStorage
      const token=data.token
      if (token !== undefined) {
        localStorage.setItem("token", token);
      }
      

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const loginUsersSlice = createSlice({
  name: "login",
  initialState: {
    error: false,
  },
  extraReducers: {
    [loginuser.fulfilled]: (state, action) => {
      state.login = action.payload;
    },
  },
});

export default loginUsersSlice.reducer;
