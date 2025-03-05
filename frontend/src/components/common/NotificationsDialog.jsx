import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Close as CloseIcon,
  NotificationsActive,
  Circle as CircleIcon,
} from '@mui/icons-material';

const NotificationsDialog = ({ 
  open, 
  onClose, 
  notifications = [],
  title = "Notifications",
  showMarkAllRead = true,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMarkAllRead = () => {
    // Add mark all as read logic here
    console.log('Marking all notifications as read');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: '80vh',
        },
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">{title}</Typography>
          <Box>
            {showMarkAllRead && (
              <Button 
                size="small" 
                onClick={handleMarkAllRead}
                sx={{ mr: 1 }}
              >
                Mark all as read
              </Button>
            )}
            <IconButton
              edge="end"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {notifications.length === 0 ? (
          <Box sx={{ 
            py: 4, 
            textAlign: 'center',
            color: 'text.secondary'
          }}>
            <NotificationsActive sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
            <Typography>No notifications to display</Typography>
          </Box>
        ) : (
          <List sx={{ pt: 0 }}>
            {notifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <NotificationsActive color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={notification.text}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          {notification.time}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  {!notification.read && (
                    <ListItemSecondaryAction>
                      <CircleIcon 
                        sx={{ 
                          color: 'primary.main',
                          fontSize: 12,
                        }} 
                      />
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
                {index < notifications.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NotificationsDialog;
