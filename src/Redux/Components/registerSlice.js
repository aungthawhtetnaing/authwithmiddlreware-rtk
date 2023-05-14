import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

export const registeruser = createAsyncThunk(
    'register/registeruser',async({data})=>{
    return fetch(`http://192.168.2.136:8000/api/register`,{
        method :'POST',
        headers :{
            Accept : "application/json",
            "content-type" : "application/json",
        },
        body:JSON.stringify({
            name:data.name,
            email:data.email,
            password:data.password
        })
    })
    .then((result)=>{result.json()
        .then((res)=>{ console.log(res.message);
          if(res.message==='Registration Success.'){
            alert('Registration Success.Please Login')
            window.location.href = '/login.js';
          }else{
            alert('Email has already exit')
          }
          console.log(data);
        //   console.log();
                        })
                    })
})

const registerUserSlice = createSlice({
    name:'register',
    initialState:{
        error:false
    },
    extraReducers :{
        [registeruser.fulfilled]:(state,action)=>{ 
            state.register=action.payload;
        },
    }
})

export default registerUserSlice.reducer;