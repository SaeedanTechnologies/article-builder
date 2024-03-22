import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import HandleNext from './SignUp_Component/HandleNext';
import HandleVerification from './SignUp_Component/HandleVerification';
import { Link } from 'react-router-dom';
import { RiGoogleFill } from 'react-icons/ri';
import { LiaFacebookF } from 'react-icons/lia';
import { TiSocialLinkedin } from 'react-icons/ti';

const steps = ['', '', ''];

export default function HorizontalLinearStepper() {
  const [user_id, setUserId] = React.useState('');
  const navigate = useNavigate()
  const handleNavigate = ()=>{
    navigate('/login')
  }
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
    <div style={{ width: '340px',borderRadius:'5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', padding: '25px'}}>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div className='flex justify-between pt-6'>
          <h4 className="mb-4 text-xl">Sign Up</h4>
          <Link to='/login' className="mb-4 text-xl underline">Login</Link>
        </div>
        {activeStep === 0 && (
  <HandleNext createSuccess = {handleNext} setUserId={setUserId} />
)}

  
        {activeStep === 1 && (
          <HandleVerification createSuccess = {handleNext} user_id = {user_id}  />
        )}
  
        {activeStep === 2 && (
          handleNavigate()
        )}
  
        <React.Fragment>
        {activeStep > 0 && (
           <Link
             className='text-red-600 underline flex justify-center items-center'
             onClick={handleBack}
           >
             Back
           </Link>
         )}
         <div className="inline-flex items-center justify-center w-full">
           <hr className="w-60 h-px my-5 bg-gray-200 border-0 dark:bg-gray-400" />
           <span className="absolute px-3 font-medium text-black -translate-x-1/2 border-2 border-gray-400 bg-white left-1/2 dark:text-black rounded-md dark:bg-white">OR</span>
         </div>

         <div className="flex justify-center gap-11 ">
           <RiGoogleFill className="h-8 w-8 border-2 border-pink-600 rounded-full p-1 text-pink-600 bg-white" />
           <LiaFacebookF className="h-8 w-8 border-2 border-blue-600 rounded-full p-1 text-blue-600 bg-white" />
           <TiSocialLinkedin className="h-8 w-8 border-2 border-blue-600 rounded-full p-1 text-blue-600 bg-white" />
         </div>
         <div className="flex justify-center items-center">
           Already a user? &nbsp; <Link color="customColors1" className="underline" to='/login'>LOGIN</Link>
         </div>
        </React.Fragment>
      </Box>
    </div>
  </div>
  
  );
}
