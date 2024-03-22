import { Box, Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verificationOTPCode } from '../store/actions/adminActions';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';

const HandleVerification = ({ props }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const user_id = useSelector((state) => state.auth.user_id);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleInputFocus = () => {
    setOtpError('');
    setApiError('');
  };

  const dispatch = useDispatch();

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (otp.length === 0) {
      setOtpError('');
    } else if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      setOtpError('OTP must be a 6-digit number');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await dispatch(verificationOTPCode(otp, user_id));
      console.log(res); // Log the response to check its structure

      if (res.status === 200) {
        // Only proceed and navigate when the OTP is valid
        enqueueSnackbar(res.data.message, {
          variant: 'success',
        });
        navigate('/login');
        console.log(res, 'Signup was successful');
      } else {
        setApiError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.log(error);
      setApiError('Invalid OTP. Please try again.');
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <form onSubmit={handleOTPSubmit}>
        <div className="w-72 flex flex-col gap-2">
          <label htmlFor="verificationCode">Verification Code</label>
          <input
            type="text"
            required
            id="otp"
            name="otp"
            value={otp}
            onChange={handleChange}
            onFocus={handleInputFocus}
            className="border rounded-md w-full h-8"
          />
          {otpError && <span className="text-red-500">{otpError}</span>}
          {apiError && <span className="text-red-500">{apiError}</span>}
        </div>
        <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button
            variant="contained"
            className="bg-pink-600"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress size={24} sx={{ color: 'black' }} />
            ) : (
              'Next'
            )}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default HandleVerification;
