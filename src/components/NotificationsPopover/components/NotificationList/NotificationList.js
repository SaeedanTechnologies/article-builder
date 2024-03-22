import React from 'react'
import { List, ListItem, ListItemText } from '@mui/material';
import clsx
 from 'clsx';
import { Link as RouterLink } from 'react-router-dom';
const NotificationList = (props) => {
  const { notifications, className, ...rest } = props;

  return (
    <List
    {...rest}
    // className={clsx(classes.root, className)}
    disablePadding
  >
    {notifications.map((notification, i) => (
      <ListItem
        // className={classes.listItem}
        component={RouterLink}
        divider={i < notifications.length - 1}
        key={notification.id}
        to="#"
      >
        {/* <ListItemAvatar>{avatars[notification.type]}</ListItemAvatar> */}
        <ListItemText
          primary={notification.title}
          primaryTypographyProps={{ variant: 'body1' }}
          secondary={notification.created_at}
        />
      </ListItem>
    ))}
  </List>
  )
}

export default NotificationList
