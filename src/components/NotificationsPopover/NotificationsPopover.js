import React from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@mui/styles'
import { Popover,CardHeader,
    CardActions,
    Divider,
    Button,
    colors,
    Card } from '@mui/material'
// import {NotificationList, EmptyList} from './components'
import NotificationList from './components/NotificationList/NotificationList'
import EmptyList from './components/EmptyList/EmptyList'

const useStyles = makeStyles(()=> ({
    root: {
        width: 350,
        maxWidth: '100%'
      },
      actions: {
        backgroundColor: colors.grey[50],
        justifyContent: 'center',
        position:'sticky',
        top:'auto',
        bottom:0
      }
}))
const NotificationsPopover = (props) => {
    const {notifications, anchorEl, ...rest } = props;
    const dispatch = useDispatch();
    const classes = useStyles();
  
    const handleClick = () => {
    //   dispatch(clearNotifications());
    };
  return (
    <div>
     <Popover
      {...rest}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      >
        <div className={classes.root}>
        <CardHeader title="Notifications" />
        <Divider />
        {notifications.length > 0 ? (
          <NotificationList notifications={notifications} />
          ) : (
          <EmptyList />
          )}
        <Divider />
        
        <CardActions className={classes.actions}>
          <Button onClick={handleClick} size="small">
          Clear Notifications
          </Button>
        </CardActions>
      </div>
      </Popover>
    </div>
  )
}

export default NotificationsPopover
