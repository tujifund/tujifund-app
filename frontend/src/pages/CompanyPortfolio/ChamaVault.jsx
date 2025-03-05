import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
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
import { Link as RouterLink } from 'react-router-dom';

const ChamaCke = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const features = [
    {
      title: 'Smart Savings Management',
      description: 'Automate your group savings with intelligent tracking and management tools.',
      icon: '💰'
    },
    {
      title: 'Secure Investments',
      description: 'Make informed investment decisions with real-time market insights and analysis.',
      icon: '🔒'
    },
    {
      title: 'Efficient Loan Processing',
      description: 'Streamline loan applications and management with our advanced system.',
      icon: '📊'
    },
    {
      title: 'Real-time Analytics',
      description: 'Track your group\'s financial performance with comprehensive analytics and reports.',
      icon: '📈'
    }
  ];

  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="fixed" color="default" elevation={2}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: 'primary.main', fontWeight: 'bold' }}
            >
              ChamaVault
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
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ pt: 8 }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            color: 'white',
            py: 15,
            textAlign: 'center',
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h2" component="h1" gutterBottom>
              Transform Your Chama's Financial Future
            </Typography>
            <Typography variant="h5" paragraph sx={{ mb: 4 }}>
              Empower your investment group with smart tools for savings, loans, and growth
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button 
                variant="contained" 
                size="large" 
                sx={{ 
                  bgcolor: 'white', 
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'fffff',
                  }
                  
                }}
                component={RouterLink}
              to="/login"
              >
                
               Start Free Trial
              </Button>
              <Button 
                variant="outlined" 
                size="large" 
                sx={{ 
                  color: 'white', 
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'grey.100',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                Watch Demo
              </Button>
            </Stack>
          </Container>
        </Box>

        {/* Features Section */}
        <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
          <Container maxWidth="lg">
            <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
              Why Choose ChamaVault?
            </Typography>
            <Grid container spacing={4} sx={{ mt: 4 }}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6,
                      }
                    }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        textAlign: 'center',
                        fontSize: '3rem',
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h3">
                        {feature.title}
                      </Typography>
                      <Typography>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Statistics Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #2C3E50 0%, #3498DB 100%)',
            color: 'white',
            py: 8,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.1)',
              zIndex: 1
            }
          }}
        >
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)'
                    }
                  }}
                >
                  <Typography
                    variant="h2"
                    component="div"
                    sx={{
                      fontWeight: 'bold',
                      mb: 1,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                      color: '#ffffff'
                    }}
                  >
                    10K+
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      opacity: 0.9,
                      textTransform: 'uppercase',
                      letterSpacing: 1
                    }}
                  >
                    Active Users
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)'
                    }
                  }}
                >
                  <Typography
                    variant="h2"
                    component="div"
                    sx={{
                      fontWeight: 'bold',
                      mb: 1,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                      color: '#ffffff'
                    }}
                  >
                    $5M+
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      opacity: 0.9,
                      textTransform: 'uppercase',
                      letterSpacing: 1
                    }}
                  >
                    Managed Assets
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)'
                    }
                  }}
                >
                  <Typography
                    variant="h2"
                    component="div"
                    sx={{
                      fontWeight: 'bold',
                      mb: 1,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                      color: '#ffffff'
                    }}
                  >
                    98%
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      opacity: 0.9,
                      textTransform: 'uppercase',
                      letterSpacing: 1
                    }}
                  >
                    Customer Satisfaction
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box sx={{ py: 8, textAlign: 'center', bgcolor: 'grey.100' }}>
          <Container maxWidth="md">
            <Typography variant="h3" component="h2" gutterBottom>
              Ready to Get Started?
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Join thousands of successful Chamas already using ChamaVault
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              color="primary"
              sx={{
                py: 2,
                px: 4,
                fontSize: '1.2rem',
              }}
              component={RouterLink}
              to="/login"
            >
               Start Free Trials
             
            </Button>
          </Container>
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            background: 'linear-gradient(135deg, #2C3E50 0%, #4CA1AF 100%)', 
            color: 'white',
            py: 6,
            width: '100vw',
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            boxSizing: 'border-box',
            boxShadow: '0 -4px 6px rgba(0,0,0,0.1)', 
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 100%)', 
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
            <Grid container spacing={4}>
              {/* Company Info */}
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }} gutterBottom>
                  ChamaVault
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }} paragraph>
                  Empowering Chamas with innovative financial management solutions. Join us in revolutionizing group savings and investments.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <IconButton 
                    component="a"
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: 'rgba(255, 255, 255, 0.9)', '&:hover': { color: '#fff' } }}
                  >
                    <Facebook />
                  </IconButton>
                  <IconButton 
                    component="a"
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: 'rgba(255, 255, 255, 0.9)', '&:hover': { color: '#fff' } }}
                  >
                    <Twitter />
                  </IconButton>
                  <IconButton 
                    component="a"
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: 'rgba(255, 255, 255, 0.9)', '&:hover': { color: '#fff' } }}
                  >
                    <LinkedIn />
                  </IconButton>
                  <IconButton 
                    component="a"
                    href="https://instagram.com"
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
                      color: '#1a237e',
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
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2}
              sx={{ 
                mt: 4,
                pt: 2,
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                }}
              >
                {new Date().getFullYear()} ChamaVault. All rights reserved.
              </Typography>
              <Stack 
                direction="row" 
                spacing={3}
                sx={{
                  '& a': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#fff'
                    }
                  }
                }}
              >
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
            </Stack>

            {/* Scroll to Top Button */}
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
              }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <KeyboardArrowUp />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChamaCke;