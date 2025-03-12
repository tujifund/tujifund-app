import React from 'react';
import { Container, Typography, Box, Grid, Button, Card, CardContent, Stack } from '@mui/material';
import Layout from './Cham-Vault/components/Layout.jsx';
import { 
  Security, 
  Speed, 
  People, 
  TrendingUp, 
  AccountBalance,
  Payment,
  Assessment,
  Support
} from '@mui/icons-material';

const Home = () => {
  const features = [
    {
      icon: <Security fontSize="large" color="primary" />,
      title: 'Secure & Reliable',
      description: 'Bank-grade security measures to protect your financial data and transactions.'
    },
    {
      icon: <Speed fontSize="large" color="primary" />,
      title: 'Fast Processing',
      description: 'Quick and efficient processing of all your group\'s financial transactions.'
    },
    {
      icon: <People fontSize="large" color="primary" />,
      title: 'Easy Management',
      description: 'Simplified tools for managing group members, roles, and responsibilities.'
    },
    {
      icon: <TrendingUp fontSize="large" color="primary" />,
      title: 'Growth Tracking',
      description: 'Monitor your group\'s financial growth with detailed analytics and insights.'
    }
  ];

  const services = [
    {
      icon: <AccountBalance fontSize="large" color="primary" />,
      title: 'Savings Management',
      description: 'Automated tracking of contributions with real-time updates.'
    },
    {
      icon: <Payment fontSize="large" color="primary" />,
      title: 'Loan Processing',
      description: 'Streamlined loan applications and repayment tracking.'
    },
    {
      icon: <Assessment fontSize="large" color="primary" />,
      title: 'Financial Reports',
      description: 'Comprehensive reports for informed decision-making.'
    },
    {
      icon: <Support fontSize="large" color="primary" />,
      title: '24/7 Support',
      description: 'Round-the-clock assistance for all your needs.'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          mb: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                Transform Your Chama's Financial Management
              </Typography>
              <Typography variant="h5" paragraph>
                Streamline your group savings, investments, and loan management with our comprehensive digital platform.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button 
                  variant="contained" 
                  size="large"
                  sx={{ 
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'grey.100',
                    },
                  }}
                >
                  Get Started
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
                    },
                  }}
                >
                  Learn More
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://source.unsplash.com/random/800x600?finance"
                alt="Financial Management"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Why Choose TujiFund?
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            Experience the benefits of modern financial management
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  height: '100%',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  }
                }}>
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Services Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Our Services
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            Comprehensive solutions for your Chama's needs
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  height: '100%',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  }
                }}>
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      {service.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Statistics Section */}
        <Box sx={{ mb: 8 }}>
          <Grid container spacing={4}>
            {[
              { number: '1000+', label: 'Active Chamas' },
              { number: '50M+', label: 'Total Savings' },
              { number: '10K+', label: 'Members' },
              { number: '99.9%', label: 'Uptime' }
            ].map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Card sx={{ textAlign: 'center', p: 3 }}>
                  <Typography variant="h3" color="primary" gutterBottom>
                    {stat.number}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box 
          sx={{ 
            mb: 8, 
            p: 6,
            textAlign: 'center',
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 2,
          }}
        >
          <Typography variant="h3" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" paragraph>
            Join thousands of Chamas already using our platform
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'grey.100',
              },
            }}
          >
            Create Your Account
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

export default Home;
