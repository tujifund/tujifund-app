import React, { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  InputBase,
  alpha,
  Tooltip,
  Collapse,
  Menu,
  MenuItem,
  Divider,
  Button,
  Badge,
  Avatar,
  useTheme,
  useMediaQuery,
  IconButton
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { 
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications,
  Dashboard,
  People,
  Assignment,
  School,
  Campaign,
  AttachMoney,
  CreditCard,
  AccountBalance,
  Group,
  Payment,
  Chat,
  NotificationsActive,
  Settings,
  AccountCircle,
  Help,
  ExitToApp,
  Language,
  DarkMode,
  LightMode
} from '@mui/icons-material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import SearchBar from '../common/SearchBar';
import NotificationsDialog from '../common/NotificationsDialog';
import ProfileDialog from '../common/ProfileDialog';
import LanguageDialog from '../common/LanguageDialog';
import HelpDialog from '../common/HelpDialog';

const drawerWidth = 240;

const ApplyLoanMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleLoanTypeNavigation = (path) => {
    navigate(`/dashboard${path}`);
    setOpen(false);
  };

  return (
    <>
      <ListItem 
        onClick={handleClick} 
        sx={{ cursor: 'pointer' }}
      >
        <ListItemIcon>
          <AttachMoney />
        </ListItemIcon>
        <ListItemText primary="Vault Loan" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem 
            onClick={() => handleLoanTypeNavigation('/loans/digital')}
            sx={{ pl: 4, cursor: 'pointer' }}
          >
            <ListItemIcon>
              <CreditCard />
            </ListItemIcon>
            <ListItemText primary="Digital Loans" />
          </ListItem>
          <ListItem 
            onClick={() => handleLoanTypeNavigation('/loans/mobile')}
            sx={{ pl: 4, cursor: 'pointer' }}
          >
            <ListItemIcon>
              <AttachMoney />
            </ListItemIcon>
            <ListItemText primary="Mobile Loans" />
          </ListItem>
          <ListItem 
            onClick={() => handleLoanTypeNavigation('/loans')}
            sx={{ pl: 4, cursor: 'pointer' }}
          >
            <ListItemIcon>
              <AccountBalance />
            </ListItemIcon>
            <ListItemText primary="VaultInua Loans" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

const MainLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false);
  const [helpVisible, setHelpVisible] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleNotificationsClick = () => {
    setNotificationsVisible(!notificationsVisible);
  };

  const handleViewAllNotifications = () => {
    handleNotificationMenuClose();
    setNotificationsVisible(true);
  };

  const handleLogout = () => {
    // Add logout logic here
    handleProfileMenuClose();
    navigate('/');
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    // Add theme toggle logic here
  };

  const handleProfileClick = () => {
    setProfileVisible(!profileVisible);
  };

  const handleLanguageClick = () => {
    handleProfileMenuClose();
    setLanguageDialogOpen(true);
  };

  const handleHelpClick = () => {
    setHelpVisible(!helpVisible);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/' },
    { text: 'My Chamas', icon: <Group />, path: '/chamas' },
    { text: 'Payments', icon: <Payment />, path: '/payments' },
    { text: 'Chat', icon: <Chat />, path: '/chat' },
    { text: 'Noticeboard', icon: <Campaign />, path: '/noticeboard' },
    { text: 'Learning', icon: <School />, path: '/learning' },
    { text: 'Reports', icon: <Assignment />, path: '/reports' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  const notifications = [
    { id: 1, text: 'New payment received', time: '5 minutes ago' },
    { id: 2, text: 'Meeting reminder: Investment Club', time: '1 hour ago' },
    { id: 3, text: 'New member request', time: '2 hours ago' },
  ];

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          TujiFund
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem 
          onClick={() => navigate('/dashboard')}
          sx={{ cursor: 'pointer' }}
        >
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem 
          onClick={() => navigate('/dashboard/chamas')}
          sx={{ cursor: 'pointer' }}
        >
          <ListItemIcon>
            <Group />
          </ListItemIcon>
          <ListItemText primary="My Chamas" />
        </ListItem>
        <ListItem 
          onClick={() => navigate('/dashboard/Noticeboard')}
          sx={{ cursor: 'pointer' }}
        >
          <ListItemIcon>
            <Campaign />
          </ListItemIcon>
          <ListItemText primary="Noticeboard" />
        </ListItem>
        <ListItem 
          onClick={() => navigate('/dashboard/learning')}
          sx={{ cursor: 'pointer' }}
        >
          <ListItemIcon>
            <School />
          </ListItemIcon>
          <ListItemText primary="Learning" />
        </ListItem>
        <ListItem 
          onClick={() => navigate('/dashboard/payments')}
          sx={{ cursor: 'pointer' }}
        >
          <ListItemIcon>
            <Payment />
          </ListItemIcon>
          <ListItemText primary="Payments" />
        </ListItem>

        <ListItem 
          onClick={() => navigate('/dashboard/chat')}
          sx={{ cursor: 'pointer' }}
        >
          <ListItemIcon>
            <Chat />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItem>

        {/* Apply Loan Menu */}
        <ApplyLoanMenu />

        {/* Settings */}
        <ListItem 
          onClick={() => navigate('/dashboard/settings')}
          sx={{ cursor: 'pointer' }}
        >
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2, ...(mobileOpen && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            TujiFund
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <SearchBar
              placeholder="Search chamas, members, meetings..."
              width="100%"
              variant="navbar"
            />
            <Tooltip title="Change language">
              <IconButton color="inherit" onClick={handleLanguageClick}>
                <Language />
              </IconButton>
            </Tooltip>

            <Tooltip title="Help">
              <IconButton color="inherit" onClick={handleHelpClick}>
                <Help />
              </IconButton>
            </Tooltip>

            <Tooltip title={darkMode ? "Light mode" : "Dark mode"}>
              <IconButton color="inherit" onClick={handleThemeToggle}>
                {darkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Notifications">
              <IconButton
                color="inherit"
                onClick={handleNotificationsClick}
              >
                <Badge badgeContent={notifications.length} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Profile">
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleProfileMenuOpen}
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light' }}>
                  JD
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        <Box sx={{
          display: helpVisible ? 'block' : 'none',
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: 1,
          p: 2,
          mt: 2,
          bgcolor: 'background.paper',
        }}>
          <HelpDialog
            open={helpVisible}
            onClose={() => setHelpVisible(false)}
          />
        </Box>

        <Box sx={{
          display: notificationsVisible ? 'block' : 'none',
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: 1,
          p: 2,
          mt: 2,
          bgcolor: 'background.paper',
        }}>
          <NotificationsDialog
            open={notificationsVisible}
            onClose={() => setNotificationsVisible(false)}
            notifications={notifications}
          />
        </Box>

        <Box sx={{
          display: profileVisible ? 'block' : 'none',
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: 1,
          p: 2,
          mt: 2,
          bgcolor: 'background.paper',
        }}>
          <ProfileDialog
            open={profileVisible}
            onClose={() => setProfileVisible(false)}
          />
        </Box>

        <Outlet />
      </Box>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>John Doe</Typography>
          <Typography variant="body2" color="textSecondary">john.doe@example.com</Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleProfileClick}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => { navigate('/dashboard/settings'); handleProfileMenuClose(); }}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)}
        onClose={handleNotificationMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            width: 320,
            maxHeight: 400,
          }
        }}
      >
        <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Notifications</Typography>
          <Button size="small">Mark all as read</Button>
        </Box>
        <Divider />
        {notifications.map((notification) => (
          <MenuItem key={notification.id} onClick={handleNotificationMenuClose}>
            <ListItemIcon>
              <NotificationsActive fontSize="small" color="primary" />
            </ListItemIcon>
            <Box>
              <Typography variant="body2">{notification.text}</Typography>
              <Typography variant="caption" color="textSecondary">
                {notification.time}
              </Typography>
            </Box>
          </MenuItem>
        ))}
        <Divider />
        <Box sx={{ p: 1, textAlign: 'center' }}>
          <Button
            size="small"
            onClick={handleViewAllNotifications}
          >
            View All Notifications
          </Button>
        </Box>
      </Menu>

      {/* Language Dialog */}
      <LanguageDialog
        open={languageDialogOpen}
        onClose={() => setLanguageDialogOpen(false)}
        languages={[
          { code: 'en', name: 'English' },
          { code: 'fr', name: 'French' },
          { code: 'es', name: 'Spanish' },
        ]}
        onSelect={(language) => {
          console.log('Selected language:', language);
          // Add logic to change app language
          setLanguageDialogOpen(false);
        }}
      />
    </Box>
  );
};

export default MainLayout;
