import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography
} from '@mui/material';
import {
  Dashboard,
  Group,
  Payment,
  Chat,
  Announcement,
  School,
  Assessment,
  Settings
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/' },
  { text: 'My Chamas', icon: <Group />, path: '/chamas' },
  { text: 'Payments', icon: <Payment />, path: '/payments' },
  { text: 'Chat', icon: <Chat />, path: '/chat' },
  { text: 'Noticeboard', icon: <Announcement />, path: '/noticeboard' },
  { text: 'Learning', icon: <School />, path: '/learning' },
  { text: 'Reports', icon: <Assessment />, path: '/reports' },
  { text: 'Settings', icon: <Settings />, path: '/settings' },
  <p>powered by samuel omulo</p>
];

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ overflow: 'auto' }}>
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" color="primary">
          ChamaVault
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              '&:hover': {
                backgroundColor: '#e3f2fd',
              }
            }}
          >
            <ListItemIcon sx={{ color: '#1a237e' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
