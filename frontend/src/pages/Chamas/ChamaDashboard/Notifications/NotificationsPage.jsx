import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Email,
  Message,
  Settings,
  Delete as DeleteIcon,
  Warning,
  Info,
  CheckCircle,
  Error,
  CalendarToday,
  MonetizationOn,
  Group,
  Assignment,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';

const NotificationsPage = () => {
  const { chamaId } = useParams();
  const [openSettings, setOpenSettings] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Mock data - replace with API calls
  const notifications = [
    {
      id: 1,
      type: 'Loan',
      title: 'Loan Application Approved',
      message: 'Your loan application for KES 50,000 has been approved',
      timestamp: '2025-01-12T11:30:00',
      status: 'unread',
      priority: 'high',
      icon: <MonetizationOn />,
    },
    {
      id: 2,
      type: 'Meeting',
      title: 'Upcoming Meeting Reminder',
      message: 'Monthly meeting scheduled for tomorrow at 2 PM',
      timestamp: '2025-01-12T10:15:00',
      status: 'read',
      priority: 'medium',
      icon: <CalendarToday />,
    },
    {
      id: 3,
      type: 'Contribution',
      title: 'Contribution Due',
      message: 'Your monthly contribution of KES 5,000 is due in 3 days',
      timestamp: '2025-01-12T09:00:00',
      status: 'unread',
      priority: 'high',
      icon: <Warning />,
    },
  ];

  const notificationSettings = {
    email: {
      enabled: true,
      frequency: 'instant',
      types: ['loans', 'meetings', 'contributions'],
    },
    sms: {
      enabled: true,
      frequency: 'daily',
      types: ['loans', 'contributions'],
    },
    push: {
      enabled: true,
      frequency: 'instant',
      types: ['all'],
    },
  };

  const getNotificationIcon = (type, priority) => {
    const color = priority === 'high' ? 'error' : priority === 'medium' ? 'warning' : 'info';
    switch (type) {
      case 'Loan':
        return <MonetizationOn color={color} />;
      case 'Meeting':
        return <CalendarToday color={color} />;
      case 'Contribution':
        return <Warning color={color} />;
      case 'Member':
        return <Group color={color} />;
      default:
        return <Info color={color} />;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const renderNotificationsList = () => (
    <List>
      {notifications.map((notification) => (
        <React.Fragment key={notification.id}>
          <ListItem
            sx={{
              bgcolor: notification.status === 'unread' ? 'action.hover' : 'inherit',
              '&:hover': { bgcolor: 'action.selected' },
            }}
          >
            <ListItemIcon>
              {getNotificationIcon(notification.type, notification.priority)}
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: notification.status === 'unread' ? 600 : 400 }}
                  >
                    {notification.title}
                  </Typography>
                  <Chip
                    label={notification.type}
                    size="small"
                    sx={{ ml: 1 }}
                    color={
                      notification.priority === 'high'
                        ? 'error'
                        : notification.priority === 'medium'
                        ? 'warning'
                        : 'default'
                    }
                  />
                </Box>
              }
              secondary={
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {notification.message}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatTimestamp(notification.timestamp)}
                  </Typography>
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );

  const renderNotificationSettings = () => (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        {/* Email Notifications */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Email sx={{ mr: 1 }} />
                <Typography variant="h6">Email Notifications</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.email.enabled}
                        color="primary"
                      />
                    }
                    label="Enable email notifications"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Frequency</InputLabel>
                    <Select
                      value={notificationSettings.email.frequency}
                      label="Frequency"
                    >
                      <MenuItem value="instant">Instant</MenuItem>
                      <MenuItem value="daily">Daily Digest</MenuItem>
                      <MenuItem value="weekly">Weekly Digest</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Notification Types
                  </Typography>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Loans"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Meetings"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Contributions"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* SMS Notifications */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Message sx={{ mr: 1 }} />
                <Typography variant="h6">SMS Notifications</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.sms.enabled}
                        color="primary"
                      />
                    }
                    label="Enable SMS notifications"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Frequency</InputLabel>
                    <Select
                      value={notificationSettings.sms.frequency}
                      label="Frequency"
                    >
                      <MenuItem value="instant">Instant</MenuItem>
                      <MenuItem value="daily">Daily Digest</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Notification Types
                  </Typography>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Loans"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Contributions"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Push Notifications */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <NotificationsIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Push Notifications</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.push.enabled}
                        color="primary"
                      />
                    }
                    label="Enable push notifications"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Frequency</InputLabel>
                    <Select
                      value={notificationSettings.push.frequency}
                      label="Frequency"
                    >
                      <MenuItem value="instant">Instant</MenuItem>
                      <MenuItem value="daily">Daily Digest</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Notification Types
                  </Typography>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="All Notifications"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">
          Notifications
        </Typography>
        <Button
          variant="contained"
          startIcon={<Settings />}
          onClick={() => setOpenSettings(true)}
          sx={{ bgcolor: '#1a237e' }}
        >
          Notification Settings
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          {renderNotificationsList()}
        </CardContent>
      </Card>

      {/* Notification Settings Dialog */}
      <Dialog
        open={openSettings}
        onClose={() => setOpenSettings(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Notification Settings</DialogTitle>
        <DialogContent>
          {renderNotificationSettings()}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSettings(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: '#1a237e' }}
            onClick={() => setOpenSettings(false)}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NotificationsPage;
