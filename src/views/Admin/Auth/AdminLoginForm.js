import React from 'react'
import { Button, styled, TextField, Stack   } from '@mui/material'
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate } from 'react-router'
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux'
import { UserLogin } from '../../../store/actions/adminActions';
const StyledButton = styled(Button)(({theme})=> ({
    margin:'10px 0',
    background:theme.palette.primary.main,
    '&:hover' : {
        background:theme.palette.primary.main
    }
}))
const initialValues = {
    email:'',
    password:''
}
const AdminLoginForm = () => {
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormValues({...formValues, [name]:value})
    }
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const [formValues, setFormValues] = React.useState(initialValues)
    const [loading, setLoading] = React.useState(null)
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(UserLogin(formValues)).then((result) => {
          if(result.status == 200) {
            navigate('/admin/dashboard')
          }
        }).catch((err) => {
          console.log(err)
        });
        // enqueueSnackbar('OK!', {
        //     variant: 'success'
        //   });
        // setLoading(true)
        // console.log(formValues)
        // dispatch(adminLogin(formValues)).then((res)=> {
        //     console.log(res)
        //     setLoading(false)
        // })
    }
    
  return (
    <form onSubmit={handleSubmit}>

        <Stack>
       <TextField label='Email' sx={{mb:'1rem', width:'350px',}} 
       name='email'  value={formValues.email} onChange={handleChange} required
       autoComplete='off'
       />
        <TextField label='Password' sx={{mb:'1rem', width:'350px',}} 
        name='password' value={formValues.password} onChange={handleChange} required 
       autoComplete='off'
       type="password" />
        {
          loading ? <StyledButton type='submit' variant='disabled'>    <RotatingLines
          strokeColor="white"
          strokeWidth="5"
          animationDuration="0.75"
          width="30"
          visible={loading}/> </StyledButton> :
          <StyledButton type='submit' sx={{color:'#fff',}}
          className="bg-pink-600"
          > Login </StyledButton>
        }
        
        </Stack>
        </form>
  )
}

export default AdminLoginForm
