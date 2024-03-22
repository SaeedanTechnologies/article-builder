import { Box, Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserSignUp } from '../store/actions/adminActions';
import { setId } from '../store/actions/authActions';
import { useNavigate } from 'react-router';
import HandleVerification from './HandleVerification';
import { useForm } from "react-hook-form"
// import { UserSignUp} from './';


let isValid = true;
const HandleNext = (props) => {
  const [emailError, setEmailError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()



  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

      
  // };

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()

  const onSubmit = async ({name, email, password}) => {
    setIsSubmitting(true);
    await dispatch(UserSignUp({name, email, password}))
      .then((res) => {
        dispatch(setId(res.data.payload.id))
        props.createSuccess()
        setIsSubmitting(false);
      }).catch((err) => {
        if ( err.response.data.payload.email == 'The email has already been taken.') {
          
          setEmailError('Email Alreay Exist', {
            type: 'manual',
            message: 'Email already exists',
          });
        }  else {
          console.log(err);
        }
        setIsSubmitting(false);
        
      })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="w-72 flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input 
          className={`border rounded-md w-full h-8 pl-2 focus:outline-none ${errors.name ? 'border-red-500' : ''}`}
          {...register("name", { required: true })}
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name?.type === "required" && (
            <p role="alert" className='text-red-600'>Name is required</p>
          )}
        </div>

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
            minLength : {value : 8 , message : 'Password should must be 8 digit!'}

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
              'Next'
            )}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default HandleNext;
