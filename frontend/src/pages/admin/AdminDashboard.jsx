import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Grid,
  Paper,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Notifications as NotificationsIcon,
  AccountBalance as AccountBalanceIcon,
  ExitToApp as ExitToAppIcon,
  Settings as SettingsIcon,
  Message as MessageIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Components for different sections
import Overview from './Overview';
import ClientAccounts from './ClientAccounts';
import Reports from './Reports';
import WithdrawalRequests from './WithdrawalRequests';
import Notifications from './Notifications';
import PaymentRecording from './PaymentRecording';
import AdminSettings from './Adminsettings';
import UserManagement from './UserManagement';
import EducationalResources from './EducationalResources';
import PaymentModuleManagement from './PaymentModuleManagement';
import SubscriptionManagement from './SubscriptionManagement';

// Modals
// import NotificationsModal from '../client/NotificationsModal';
// import MessagesModal from '../client/MessagesModal';
// import ProfileModal from '../client/ProfileModal';

const drawerWidth = 240;

function AdminDashboard() {
  const [open, setOpen] = useState(true);
  const [selectedSection, setSelectedSection] = useState('overview');
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openMessages, setOpenMessages] = useState(false);

  // Example user data
  const exampleUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    address: '123 Main St, Anytown, USA',
    accountType: 'Admin',
    accountBalance: 10000,
    totalDeposits: 50000,
    lastLogin: 'January 22, 2025',
    accountCreated: 'January 1, 2021'
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleOpenNotifications = () => setOpenNotifications(true);
  const handleOpenMessages = () => setOpenMessages(true);
  const handleOpenProfile = () => setOpenProfile(true);

  const menuItems = [
    { text: 'Overview', icon: <DashboardIcon />, section: 'overview' },
    { text: 'Manage Users', icon: <PeopleIcon />, section: 'client-accounts' },
    { text: 'Reports', icon: <AssessmentIcon />, section: 'reports' },
    { text: 'Manage VaultLoan', icon: <AccountBalanceIcon />, section: 'withdrawals' },
    { text: 'Notifications', icon: <NotificationsIcon />, section: 'notifications' },
    { text: 'Finanial Learning Resources', icon: <PeopleIcon />, section: 'EducationalResources' },
    { text: 'Subscription Management', icon: <PeopleIcon />, section: 'SubscriptionManagement ' },
    { text: 'Payment Configuration', icon: <AccountBalanceIcon />, section: 'PaymentModuleManagement' },
    { text: 'User Management', icon: <PeopleIcon />, section: 'user-management' },
    // { text: 'SystemUpdates', icon: <PeopleIcon />, section: 'user-management' },
    { text: 'Settings', icon: <SettingsIcon />, section: 'Adminsettings' },
  ];

  const renderSection = () => {
    switch (selectedSection) {
      case 'overview':
        return <Overview />;
      case 'client-accounts':
        return <ClientAccounts />;
      case 'notifications':
        return <Notifications />;
      case 'payment-recording':
        return <PaymentRecording />;
      case 'reports':
        return <Reports />;
      case 'withdrawals':
        return <WithdrawalRequests />;
      case 'user-management':
        return <UserManagement />;
      case 'Adminsettings':
        return <AdminSettings />;
      case 'PaymentModuleManagement':
        return <PaymentModuleManagement/>;
      case 'EducationalResources':
        return <EducationalResources/>;
      case 'SubscriptionManagement ':
        return <SubscriptionManagement />;  
      default:
        return <Overview />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            ChamaVault- AdminDashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" onClick={handleOpenNotifications}>
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleOpenMessages}>
            <MessageIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleOpenProfile}>
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        open={open}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => setSelectedSection(item.section)}
                selected={selectedSection === item.section}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {renderSection()}
      </Box>

      {/* Modals */}
      {/* <NotificationsModal open={openNotifications} onClose={() => setOpenNotifications(false)} />
      <MessagesModal open={openMessages} onClose={() => setOpenMessages(false)} />
      <ProfileModal open={openProfile} onClose={() => setOpenProfile(false)} user={exampleUser} /> */}
    </Box>
  );
}

export default AdminDashboard;
