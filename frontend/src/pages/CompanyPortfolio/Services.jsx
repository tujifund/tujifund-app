import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Button, Stack, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import Layout from './Cham-Vault/components/Layout.jsx';
import { 
  AccountBalance,
  TrendingUp,
  Payment,
  Assessment,
  Security,
  Support,
  Speed,
  People,
  MonetizationOn,
  ReceiptLong,
  GroupAdd,
  EventNote,
  Notifications,
  BarChart,
  AccountBalanceWallet,
  LocalAtm,
  ArrowForward,
  Loop,
  Favorite,
  PieChart,
  Event
} from '@mui/icons-material';

const Services = () => {
  const services = [
    {
      title: 'Chama Management',
      description: 'Comprehensive tools for managing your investment group',
      icon: <AccountBalance fontSize="large" color="primary" />,
      features: [
        'Member management',
        'Role assignment',
        'Document management',
        'Meeting management'
      ]
    },
    {
      title: 'Financial Management',
      description: 'Advanced tools for handling all financial aspects',
      icon: <MonetizationOn fontSize="large" color="primary" />,
      features: [
        'Contribution tracking',
        'Account management',
        'Financial reporting',
        'Budget planning'
      ]
    },
    {
      title: 'Investment Solutions',
      description: 'Smart investment tools and portfolio management',
      icon: <TrendingUp fontSize="large" color="primary" />,
      features: [
        'Portfolio management',
        'Investment tracking',
        'Risk assessment',
        'Return analysis'
      ]
    },
    {
      title: 'Loan Management',
      description: 'Efficient loan processing and tracking system',
      icon: <Payment fontSize="large" color="primary" />,
      features: [
        'Loan application',
        'Credit scoring',
        'Repayment tracking',
        'Interest management'
      ]
    },
    {
      title: 'Merry Go Round',
      description: 'Automated rotating savings and credit system',
      icon: <Loop fontSize="large" color="primary" />,
      features: [
        'Rotation scheduling',
        'Payment tracking',
        'Member monitoring',
        'Distribution management'
      ]
    },
    {
      title: 'Welfare Fund',
      description: 'Member welfare and emergency fund management',
      icon: <Favorite fontSize="large" color="primary" />,
      features: [
        'Emergency assistance',
        'Claims processing',
        'Support network',
        'Benefit tracking'
      ]
    },
    {
      title: 'Shares Management',
      description: 'Comprehensive share ownership and trading system',
      icon: <PieChart fontSize="large" color="primary" />,
      features: [
        'Share allocation',
        'Value tracking',
        'Transaction management',
        'Dividend processing'
      ]
    },
    {
      title: 'Meeting Management',
      description: 'Efficient meeting organization and documentation',
      icon: <Event fontSize="large" color="primary" />,
      features: [
        'Meeting scheduling',
        'Virtual meetings',
        'Documentation',
        'Member participation'
      ]
    }
  ];

  const supportFeatures = [
    {
      title: 'Advanced Security',
      description: 'Bank-grade security measures to protect your data',
      icon: <Security fontSize="large" color="primary" />,
      details: [
        'Two-factor authentication',
        'End-to-end encryption',
        'Regular security audits',
        'Secure data backup'
      ]
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock assistance for all your needs',
      icon: <Support fontSize="large" color="primary" />,
      details: [
        'Live chat support',
        'Phone support',
        'Email assistance',
        'Knowledge base access'
      ]
    },
    {
      title: 'Real-time Notifications',
      description: 'Stay updated with important group activities',
      icon: <Notifications fontSize="large" color="primary" />,
      details: [
        'Payment reminders',
        'Meeting alerts',
        'Important updates',
        'Custom notifications'
      ]
    },
    {
      title: 'Analytics & Reporting',
      description: 'Comprehensive insights into your group\'s performance',
      icon: <BarChart fontSize="large" color="primary" />,
      details: [
        'Financial analytics',
        'Member performance metrics',
        'Investment tracking',
        'Custom report generation'
      ]
    }
  ];

  return (
    <Layout>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ my: 8, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Our Services
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Comprehensive Financial Solutions for Your Chama
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="/pricing"
            sx={{
              mt: 2,
              px: 4,
              py: 1.5,
              '&:hover': {
                transform: 'translateY(-2px)',
                transition: 'all 0.3s ease'
              }
            }}
          >
            View Our Pricing Plans
          </Button>
        </Box>

        {/* Services */}
        <Box sx={{ mb: 12 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Our Services
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
            Essential tools for successful Chama management
          </Typography>
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ 
                  height: '100%',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  }
                }}>
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                      {service.icon}
                      <Typography variant="h5" component="h2">
                        {service.title}
                      </Typography>
                    </Stack>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {service.description}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" gutterBottom>
                      Key Features:
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      {service.features.map((feature, idx) => (
                        <Typography 
                          key={idx} 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            mb: 1 
                          }}
                        >
                          • {feature}
                        </Typography>
                      ))}
                    </Box>
                    <Button
                      variant="outlined"
                      color="primary"
                      endIcon={<ArrowForward />}
                      component={Link}
                      to={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                      sx={{
                        mt: 2,
                        '&:hover': {
                          transform: 'translateX(8px)',
                          transition: 'transform 0.3s ease'
                        }
                      }}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Support Features */}
        <Box sx={{ mb: 12 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Support & Features
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
            Additional features to enhance your experience
          </Typography>
          <Grid container spacing={4}>
            {supportFeatures.map((feature, index) => (
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
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {feature.description}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ mt: 2 }}>
                      {feature.details.map((detail, idx) => (
                        <Typography 
                          key={idx} 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          • {detail}
                        </Typography>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Pricing CTA Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #2C3E50 0%, #3498DB 100%)',
            borderRadius: 2,
            color: 'white',
            py: 6,
            px: 4,
            mb: 8,
            position: 'relative',
            overflow: 'hidden',
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
          <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
            <Typography variant="h3" align="center" gutterBottom>
              Ready to Get Started?
            </Typography>
            <Typography variant="h6" align="center" sx={{ mb: 4, opacity: 0.9 }}>
              Choose the perfect plan for your Chama's needs
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                href="/pricing"
                sx={{
                  bgcolor: 'white',
                  color: '#2C3E50',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                View Our Pricing Plans
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="/contact"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                Contact Sales
              </Button>
            </Stack>
          </Container>
        </Box>

        {/* Pricing CTA */}
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
            Ready to Transform Your Chama?
          </Typography>
          <Typography variant="h6" paragraph>
            Choose the perfect plan for your group's needs
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
            View Pricing Plans
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

export default Services;
