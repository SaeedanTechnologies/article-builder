import React from 'react'
import clsx from 'clsx'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles ((theme) => ({
    root: {
        textAlign: 'center',
        padding: 5
      },
      image: {
        height: 240,
        backgroundImage: 'url("/assets/images/undraw_empty_xct9.svg")',
        backgroundPositionX: 'right',
        backgroundPositionY: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }
}))
const EmptyList = (props) => {
    const classes = useStyles()
    const { className, ...rest } = props;
  return (
    <div
    {...rest}
    className={clsx(classes.root, className)}
  >
    <div className={classes.image} />
    <Typography variant="h4">There's nothing here...</Typography>
  </div>
  )
}

export default EmptyList
