import React from "react";
import { Alert, Box, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControlLabel, Snackbar, TextField, useTheme } from "@mui/material";
import { RiGoogleFill } from 'react-icons/ri';
import { LiaFacebookF } from 'react-icons/lia';
import { LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login';
import { TiSocialLinkedin } from 'react-icons/ti';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { UserLogin } from "../store/actions/adminActions";
import { useForm } from "react-hook-form"
const isValid = true;
const Login = () => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
setOpen(true)
// alert('ay hy')
    }
    const handleClose = () => {
        setOpen(false)
    }


    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate()

    const [emailError, setEmailError] = useState('');
    const dispatch = useDispatch()
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm()

    const onSubmit = async ({ email, password }) => {
        setIsSubmitting(true)
        dispatch(UserLogin({ email, password })).then((res) => {
            setIsSubmitting(false)
            console.log(res.data)
            if (res.data.payload.user.is_admin == 1) {
                navigate('/admin/dashboard')
            }
            else if (res.data.payload.user.is_admin == 0) {
                navigate('/user/dashboard')
            }
        }).catch((err) => {
            if (err.response.data.message == "Email & Password does not match with our record.") {

                setEmailError("Email & Password does not match.", {
                    type: 'manual',
                    message: 'Email already exists',
                });
            } else {
                console.log(err);
            }

            setIsSubmitting(false);

        })
    }
    const theme = useTheme();
    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center ">
                {/* Form  */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 shadow-lg p-6 rounded-lg">
                    <h4 className="mb-4 text-xl">Login</h4>
                    <div className="w-72 flex flex-col gap-2">
                        <label htmlFor="email">Email</label>
                        <input
                            type='email'
                            className={`border rounded-md w-full h-8 pl-2 focus:outline-none ${errors.email ? 'border-red-500' : ''}`}
                            {...register("email", {
                                required: 'Email is required',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: 'Invalid email address',
                                }
                            })}
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                        {errors.email?.message && (
                            <p role="alert" className='text-red-600'>{errors.email.message}</p>

                        )}
                        {emailError && (
                            <p role="alert" className="text-red-600">
                                {emailError}
                            </p>
                        )}
                    </div>

                    <div className="w-72 flex flex-col gap-2">
                        <label htmlFor="password">Password</label>
                        <input
                            type='password'
                            className={`border rounded-md w-full h-8 pl-2 focus:outline-none ${errors.password ? 'border-red-500' : ''}`}
                            {...register("password", {
                                required: 'Password is required',
                                minLength: { value: 8, message: 'Password should must be 8 digit!' }

                            })}
                            aria-invalid={errors.password ? "true" : "false"}
                        />
                        {errors.password?.message && (
                            <p role="alert" className='text-red-600'>{errors.password.message}</p>
                        )}
                    </div>
                    <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button
                            variant="contained"
                            className="bg-pink-600"
                            type="submit"
                            disabled={isSubmitting || !isValid}
                        >
                            {isSubmitting ? (
                                <CircularProgress
                                    size={24}
                                    sx={{ color: 'black' }}
                                />
                            ) : (
                                'Submit'
                            )}
                        </Button>
                    </Box>
                    <div className="flex justify-end text-gray-500">
                        <Button sx={{ color: "gray", textTransform: 'none' }} onClick={handleOpen}>Forget Password</Button>
                        <Dialog open={open} onClose={handleClose}>
        <DialogTitle fontWeight='bold' >Forget Password</DialogTitle>
        <Divider/>
        <DialogContent>
          <DialogContentText color='black'>
           Enter the email adress associated with your account and we will send you a link to reset your password
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address *"
            type="email"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <Divider/> 
        <DialogActions>
          <Button variant="outlined" style={{ borderColor: 'black', color: 'black' }} onClick={handleClose}>Cancel</Button>
          <Button variant="filled" style={{ backgroundColor: 'black', color: 'white' }} onClick={handleClose}>Send</Button>
        </DialogActions>
      </Dialog>
                    </div>

                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-60 h-px my-5 bg-gray-200 border-0 dark:bg-gray-400" />
                        <span className="absolute px-3 font-medium text-black -translate-x-1/2 border-2 border-gray-400 bg-white left-1/2 dark:text-black rounded-md dark:bg-white">OR</span>
                    </div>

                    {/* Social Media Icons  */}
                    <div className="flex justify-center gap-11 ">


                        <LoginSocialFacebook
                            appId="348116810970939"
                            onResolve={(res) => {
                                console.log(res);
                            }}
                            onReject={(err) => {
                                console.log(err);
                            }}
                        >
                            <LiaFacebookF className="h-8 w-8 border-2 border-blue-600 rounded-full p-1 text-blue-600 bg-white" />
                            {/* <FacebookLoginButton /> */}
                        </LoginSocialFacebook>
                        <LoginSocialGoogle
                            client_id="384246940788-toig6ojeb1iba6rr731c250op6m7da38.apps.googleusercontent.com"
                            onResolve={(res) => {
                                console.log(res);
                            }}
                            onReject={(err) => {
                                console.log(err);
                            }}
                        >
                            <RiGoogleFill className="h-8 w-8 border-2 border-pink-600 rounded-full p-1 text-pink-600 bg-white" />
                        </LoginSocialGoogle>
                        <TiSocialLinkedin className="h-8 w-8 border-2 border-blue-600 rounded-full p-1 text-blue-600 bg-white" />
                    </div>
                    <div className="flex justify-center items-center">Need an account? &nbsp;
                        <Link color="customColors1" className="underline" to='/signup'>SIGN UP</Link>
                    </div>
                </form >


            </div >
        </>
    );
};

export default Login;