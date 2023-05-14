// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const logoutUser = createAsyncThunk(
//   'auth/logoutUser',
//   async (token, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('http://192.168.100.162:8000/api/logout', null, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
     
//     }
//   }
// );

// const logoutUsersSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     error: false,
//     token: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.token = null;
//       })
//       .addCase(logoutUser.rejected, (state) => {
//         state.error = true;
//       });
//   },
// });

// export default logoutUsersSlice.reducer;
import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',async({token})=>{
    return fetch(`http://192.168.2.136:8000/api/logout`,{
        method :'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
    })
    .then((result)=>{result.json()
        .then((res)=>{ console.log(res);
          console.log(res);
        //   console.log();
                        })
                    })
})

const logoutUsersSlice = createSlice({
  name: 'auth',
  initialState: {
    error: false,
    token: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
      
      })
      .addCase(logoutUser.rejected, (state) => {
        state.error = true;
      });
  },
});

export default logoutUsersSlice.reducer;