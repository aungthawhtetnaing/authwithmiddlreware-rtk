import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AttachEmailSharpIcon from '@mui/icons-material/AttachEmailSharp';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CottageIcon from '@mui/icons-material/Cottage';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import KeyIcon from '@mui/icons-material/Key';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { useDispatch, useSelector } from 'react-redux';
import { registeruser } from '../Redux/Components/registerSlice';
import { loginuser } from '../Redux/Components/loginSlice';
import { useNavigate } from 'react-router-dom';
import DirectionsCarSharpIcon from '@mui/icons-material/DirectionsCarSharp';
import PeopleOutlineSharpIcon from '@mui/icons-material/PeopleOutlineSharp';
import { useForm } from 'react-hook-form';
import { EmailOutlined, Password, Visibility, VisibilityOff } from '@mui/icons-material';

const Login = ({onLogin}) => {
    const [isSignup,setIsSignup] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
      } = useForm();
    // const navigate=useNavigate()

    const dispatch=useDispatch()
   
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
      

    const onSubmit = (data) => {
        console.log(data.email);
        if (isSignup) {
                        dispatch(registeruser({data}));
                    } else {
                        dispatch(loginuser({email: data.email, password: data.password}));
                        onLogin();
                    }
      };
    

    const resetState = () =>{
        setIsSignup(!isSignup)
       
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                    display="flex"
                    flexDirection={"column"}
                    maxWidth={400}
                    alignItems="center"
                    justifyContent={"center"}
                    margin="auto"
                    marginTop={5}
                    padding={3}
                    borderRadius={5}
                    color={"#3C2441"}
                    boxShadow={"5px 5px 10px #ccc"}
                    sx={{
                        ":hover":{
                            boxShadow:'10px 10px 20px #ccc'
                        }
                    }}
                >
                    <img src='https://www.adesa.eu/v6/images/adesa-logo-desktop.svg' height={20}  style={{marginRight:'auto',paddingTop:"20px",paddingBottom:"40px"}}/>
                    <Typography color="primary" paddingBottom={2} style={{ display: 'flex', justifyContent: 'center' ,fontWeight:"bold" }}>
                        {isSignup ? <BookmarkAddIcon /> : <PeopleOutlineSharpIcon />}
                        {isSignup ? "Sign up" : "User login"}
                    </Typography>
                    {isSignup && (
                        <>
                        <TextField 
                        name='name'
                        fullWidth
                        variant='outlined' 
                        placeholder='Name'
                        type="text"
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                    <IconButton>
                                        <PersonIcon />
                                    </IconButton>
                            </InputAdornment>
                             ),
                          }}
                        className={`form-control ${errors.name && "invalid"}`}
                        {...register("name", { required: "Name is Required" })}
                        onKeyUp={() => {
                          trigger("name");
                        }}
                      />
                      {errors.name && (
                        <small style={{color:"red",marginRight:"auto"}}>{errors.name.message}</small>
                      )}
                      <br/>
                       </>
                       )}
 
                        <TextField 
                        fullWidth
                        variant='outlined' 
                        placeholder='Email'
                        type="text"
                        InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton>
                                            <EmailOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                    }}
                        className={`form-control ${errors.email && "invalid"}`}
                        {...register("email", { required: "Email is Required" ,
                        pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                        }})}
                        onKeyUp={() => {
                        trigger("email");
                        }}
                        />
                        {errors.email && (
                            <small style={{color:"red",marginRight:"auto"}}>{errors.email.message}</small>
                        )}
                        <br/>
                            
                            
            
                        <TextField 
                            fullWidth
                            variant='outlined' 
                            placeholder='Password'
                            type={showPassword ? 'text' : 'password'} // use the showPassword state to toggle password visibility
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton>
                                    <LockOpenIcon />
                                    </IconButton>
                                </InputAdornment>
                                ),
                                endAdornment: ( // add the InputAdornment with the eye icon to toggle password visibility
                                <InputAdornment position="end">
                                    <IconButton
                                    onClick={togglePasswordVisibility}
                                   
                                    aria-label="toggle password visibility"
                                    >
                                    {showPassword ? <Visibility sx={{fontSize:"20px"}}/> : <VisibilityOff  sx={{fontSize:"20px"}}/>}
                                    </IconButton>
                                </InputAdornment>
                                )
                            }}
                            className={`form-control ${errors.password && "invalid"}`}
                            {...register("password", { 
                                required: "password is Required",
                                pattern: {
                                value:  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{8,}$/,
                                message:"Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character",
                                },
                            })}
                            onKeyUp={() => {
                                trigger("password");
                            }}
                            />

          {errors.password && (
            <small style={{color:"red",marginRight:"auto"}}>{errors.password.message}</small>
          )}
            
            <br/>

                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    style={{ marginTop: '10px', marginBottom: '10px' }}
                    startIcon={
                        isSignup ? (
                            <HowToRegIcon />
                        ) : (
                            <DirectionsCarSharpIcon />
                        )
                    }
                >
                    {isSignup ? "Sign up" : "Log in"}
                </Button>
                <Typography  fontWeight="bold" padding={3}>
                    {isSignup ? "Already have an account?" : "Don't have an account?"}
                    <Button color="primary" onClick={resetState} style={{ fontWeight: 'bold',marginLeft:"10px" }}>
                        {isSignup ? "Log in" : "Sign up"}
                    </Button>
                </Typography>
            </Box>
        </form>
    </div>
)
}

export default Login;