import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Box,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Divider,
  Grid,
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  Phone,
  Email,
  LocationOn,
  KeyboardArrowUp,
} from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  // Handle scroll to top visibility
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default', // Use theme's default background
      }}
    >
      {/* Navigation Bar */}
      <AppBar position="fixed" color="default" elevation={2}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{ 
                flexGrow: 1, 
                color: 'primary.main', 
                fontWeight: 'bold',
                textDecoration: 'none'
              }}
            >
              TujiFund
            </Typography>

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.name}
                    component={RouterLink}
                    to={item.path}
                    color="inherit"
                    sx={{
                      color: location.pathname === item.path ? 'primary.main' : 'inherit',
                      fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
                <Button 
                  variant="contained" 
                  color="primary"
                  component={RouterLink}
                  to="/login"
                >
                  Get Started
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem 
              key={item.name} 
              component={RouterLink} 
              to={item.path}
              onClick={() => setMobileOpen(false)}
              selected={location.pathname === item.path}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
          <ListItem>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth
              component={RouterLink}
              to="/login"
            >
               Get Started
              
            </Button>
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column' 
        }}
      >
        {children}
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          background: 'linear-gradient(135deg, #2C3E50 0%, #4CA1AF 100%)', // Deep blue to teal gradient
          color: 'white',
          py: 6,
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          boxSizing: 'border-box',
          boxShadow: '0 -4px 6px rgba(0,0,0,0.1)', // Subtle top shadow for depth
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 100%)', // Subtle overlay
            zIndex: 1,
            pointerEvents: 'none',
          }
        }}
      >
        <Box 
          sx={{ 
            maxWidth: 'lg', 
            margin: '0 auto',
            px: { xs: 2, sm: 4, md: 6 },
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Grid 
            container 
            spacing={4} 
          >
            {/* Company Info */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }} gutterBottom>
                TujiFund
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }} paragraph>
                Empowering Chamas with innovative financial management solutions. Join us in revolutionizing group savings and investments.
              </Typography>
              <Stack direction="row" spacing={2}>
                <IconButton 
                  component={RouterLink}
                  to="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'rgba(255, 255, 255, 0.9)', '&:hover': { color: '#fff' } }}
                >
                  <Facebook />
                </IconButton>
                <IconButton 
                  component={RouterLink}
                  to="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'rgba(255, 255, 255, 0.9)', '&:hover': { color: '#fff' } }}
                >
                  <Twitter />
                </IconButton>
                <IconButton 
                  component={RouterLink}
                  to="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'rgba(255, 255, 255, 0.9)', '&:hover': { color: '#fff' } }}
                >
                  <LinkedIn />
                </IconButton>
                <IconButton 
                  component={RouterLink}
                  to="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'rgba(255, 255, 255, 0.9)', '&:hover': { color: '#fff' } }}
                >
                  <Instagram />
                </IconButton>
              </Stack>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="h6" sx={{ color: '#fff' }} gutterBottom>
                Quick Links
              </Typography>
              <List dense>
                {[
                  { text: 'About Us', path: '/about' },
                  { text: 'Services', path: '/services' },
                  { text: 'Blog', path: '/blog' },
                  { text: 'Contact', path: '/contact' },
                  { text: 'Pricing Plans', path: '/pricing' }
                ].map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <Button
                      component={RouterLink}
                      to={item.path}
                      sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        textTransform: 'none',
                        '&:hover': {
                          color: '#fff',
                          backgroundColor: 'transparent'
                        }
                      }}
                    >
                      {item.text}
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Grid>

            {/* Services */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="h6" sx={{ color: '#fff' }} gutterBottom>
                Services
              </Typography>
              <List dense>
                {[
                  { text: 'Savings Management', path: '/services/savings' },
                  { text: 'Investment Tracking', path: '/services/investments' },
                  { text: 'Loan Processing', path: '/services/loans' },
                  { text: 'Financial Reports', path: '/services/reports' }
                ].map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <Button
                      component={RouterLink}
                      to={item.path}
                      sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        textTransform: 'none',
                        '&:hover': {
                          color: '#fff',
                          backgroundColor: 'transparent'
                        }
                      }}
                    >
                      {item.text}
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Grid>

            {/* Newsletter */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ color: '#fff' }} gutterBottom>
                Stay Updated
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }} paragraph>
                Subscribe to our newsletter for the latest updates and insights.
              </Typography>
              <Stack direction="row" spacing={1}>
                <TextField
                  size="small"
                  placeholder="Enter your email"
                  variant="outlined"
                  sx={{ 
                    flexGrow: 1,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#fff',
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: '#fff',
                      '&::placeholder': {
                        color: 'rgba(255, 255, 255, 0.5)',
                        opacity: 1,
                      },
                    },
                  }}
                />
                <Button 
                  variant="contained" 
                  sx={{ 
                    bgcolor: '#fff',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                    },
                  }}
                >
                  Subscribe
                </Button>
              </Stack>
              
              {/* Contact Info */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ color: '#fff' }} gutterBottom>
                  Contact Us
                </Typography>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Phone sx={{ color: 'rgba(255, 255, 255, 0.9)' }} fontSize="small" />
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      +254 700 000 000
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Email sx={{ color: 'rgba(255, 255, 255, 0.9)' }} fontSize="small" />
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      support@chamavault.com
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <LocationOn sx={{ color: 'rgba(255, 255, 255, 0.9)' }} fontSize="small" />
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Kisumu, Kenya
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          {/* Bottom Footer */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              &copy; {new Date().getFullYear()} TujiFund. All rights reserved.
            </Typography>
            <Stack direction="row" spacing={3}>
              <Button
                component={RouterLink}
                to="/privacy-policy"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#ffff',
                    backgroundColor: 'transparent'
                  }
                }}
              >
                Privacy Policy
              </Button>
              <Button
                component={RouterLink}
                to="/terms"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#ffff',
                    backgroundColor: 'transparent'
                  }
                }}
              >
                Terms of Service
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <IconButton
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'green',
            },
            zIndex: 'tooltip',
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <KeyboardArrowUp />
        </IconButton>
      )}
    </Box>
  );
};

export default Layout;
