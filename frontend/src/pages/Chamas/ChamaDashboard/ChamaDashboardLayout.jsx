import React, { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  useMediaQuery,
  Button,
  InputBase,
  alpha,
  Tooltip,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  Group,
  Event,
  AccountBalance,
  MonetizationOn,
  Loop,
  Share,
  Favorite,
  Flag,
  Notifications,
  Settings,
  AccountCircle,
  Search as SearchIcon,
  Help,
  ExitToApp,
  NotificationsActive,
  Language,
  DarkMode,
  LightMode,
  NavigateNext,
  ArrowBack,
  Dashboard,
  AccountBalanceWallet,
} from '@mui/icons-material';
import { useNavigate, useLocation, Outlet, useParams } from 'react-router-dom';
import SearchBar from '../../../components/common/SearchBar';
import NotificationsDialog from '../../../components/common/NotificationsDialog';
import ProfileDialog from '../../../components/common/ProfileDialog';
import LanguageDialog from '../../../components/common/LanguageDialog';
import HelpDialog from '../../../components/common/HelpDialog';
import { useChama, ChamaProvider } from '../../../context/ChamaContext';

const drawerWidth = 240;

const ChamaContent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();
  const { chamaId } = useParams();
  const { performChamaSearch } = useChama();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
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

  const handleLogout = () => {
    handleProfileMenuClose();
    navigate('/login');
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleBackToHome = () => {
    navigate('/dashboard');
  };

  const handleViewAllNotifications = () => {
    handleNotificationMenuClose();
    setNotificationsVisible(true);
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

  const handleNotificationsClick = () => {
    setNotificationsVisible(!notificationsVisible);
  };

  const menuItems = [
    { text: 'Home', icon: <Dashboard />, path: `/ChamaDashboard/${chamaId}/home` },
    { text: 'Membership', icon: <Group />, path: `/ChamaDashboard/${chamaId}/membership` },
    { text: 'Meetings', icon: <Event />, path: `/ChamaDashboard/${chamaId}/meetings` },
    { text: 'Accounts', icon: <AccountBalance />, path: `/ChamaDashboard/${chamaId}/accounts` },
    { text: 'Vault Inua Loans', icon: <MonetizationOn />, path: `/ChamaDashboard/${chamaId}/loans` },
    { text: 'Soft Loans', icon: <MonetizationOn />, path: `/ChamaDashboard/${chamaId}/soft-loans` },
    { text: 'Merry Go Round', icon: <Loop />, path: `/ChamaDashboard/${chamaId}/merry-go-round` },
    { text: 'Shares', icon: <Share />, path: `/ChamaDashboard/${chamaId}/shares` },
    { text: 'Welfare', icon: <Favorite />, path: `/ChamaDashboard/${chamaId}/welfare` },
    { text: 'Goals', icon: <Flag />, path: `/ChamaDashboard/${chamaId}/goals` },
    { text: 'Open Vault', icon: <AccountBalanceWallet />, path: `/ChamaDashboard/${chamaId}/vault-manager` },
    { text: 'Billing', icon: <MonetizationOn />, path: `/ChamaDashboard/${chamaId}/billing` },
    { text: 'Settings', icon: <Settings />, path: `/ChamaDashboard/${chamaId}/settings` },
  ];

  const notifications = [
    { id: 1, text: 'New loan request from John', time: '5 minutes ago' },
    { id: 2, text: 'Meeting scheduled for tomorrow', time: '1 hour ago' },
    { id: 3, text: 'Payment reminder: Monthly contribution', time: '2 hours ago' },
  ];

  // Mock chama data - replace with actual data
  const chamaName = "Intel Kwote";

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          {chamaName}
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                if (isMobile) setMobileOpen(false);
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: '#1a237e',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <IconButton 
            color="inherit" 
            onClick={handleBackToHome}
            sx={{ mr: 2 }}
          >
            <Home />
          </IconButton>

          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ 
              color: 'white',
              '& .MuiBreadcrumbs-separator': { color: 'white' },
              display: { xs: 'none', sm: 'flex' }
            }}
          >
            <Link
              color="inherit"
              href="/dashboard/chamas"
              onClick={(e) => {
                e.preventDefault();
                navigate('/dashboard/chamas');
              }}
              sx={{ 
                color: 'white',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              My Chamas
            </Link>
            <Typography color="white">{chamaName}</Typography>
          </Breadcrumbs>

          <Box sx={{ 
            flexGrow: 1,
            display: { xs: 'none', sm: 'flex' }
          }}>
            <SearchBar
              placeholder="Search members, meetings, loans..."
              width="100%"
              variant="navbar"
              onSearch={performChamaSearch}
            />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Change language">
              <IconButton color="inherit" onClick={handleLanguageClick}>
                <Language />
              </IconButton>
            </Tooltip>

            <Tooltip title={darkMode ? "Light mode" : "Dark mode"}>
              <IconButton color="inherit" onClick={handleThemeToggle}>
                {darkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Help">
              <IconButton color="inherit" onClick={handleHelpClick}>
                <Help />
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
            keepMounted: true,
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
            title={`${chamaName} Notifications`}
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
        <MenuItem onClick={handleLanguageClick}>
          <ListItemIcon>
            <Language fontSize="small" />
          </ListItemIcon>
          Change Language
        </MenuItem>
        <MenuItem onClick={handleHelpClick}>
          <ListItemIcon>
            <Help fontSize="small" />
          </ListItemIcon>
          Help
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
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

const ChamaDashboardLayout = () => {
  return (
    <ChamaProvider>
      <ChamaContent />
    </ChamaProvider>
  );
};

export default ChamaDashboardLayout;
