import { Box, Button, Grid, TextField, styled } from '@mui/material'
import React from 'react'
import Page from '../../../../../components/page'
import { useLocation, useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { updateCompetition } from '../../../../../store/actions/competetionActions'
import { useSnackbar } from 'notistack'
const StyledRoot = styled(Box)(({theme})=>({
    minHeight:'100vh',
    padding:theme.spacing(4),
    marginTop:theme.spacing(5)
}))
const initialValues = {
    title:'',
    description:'',
    member_name:'',
}
const EditCompetition = () => {
    const {state} = useLocation()
    console.log(state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar()
    const [formValues, setFormValues] = React.useState(initialValues)
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormValues({...formValues,[name]:value})
    }
    React.useEffect(()=>{
        setFormValues({
            ...formValues,
            title: state?.title || '',
            description: state?.description || '',
            member_name: state?.jury[0]?.member_name || ''
        })
    },[])
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateCompetition(state.id, state.jury[0].id, formValues.member_name, formValues.title, formValues.description)).then((result) => {
            enqueueSnackbar(result.data.message,{
                variant:'success'
            })
            navigate('/admin/competetions')
        }).catch((err) => {
            console.log(err)
        });
        console.log(formValues)
    }
  return (
    <Page title="Edit Competition">
        <StyledRoot>
                <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>

                <Grid item xs={12} lg={12}>
                    <TextField label="Title" fullWidth
                    name="title"
                    value={formValues.title}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} lg={12}>
                    <TextField label="Description" multiline rows={4} fullWidth
                    name="description"
                    value={formValues.description}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} lg={12}>
                    <TextField label="Member Name" fullWidth
                    name="member_name"
                    value={formValues.member_name}
                    onChange={handleChange}
                    />
                </Grid>
                <Button type='submit'>
                    Update
                </Button>
            </Grid>
                </form>
        </StyledRoot>
    </Page>
  )
}

export default EditCompetition
