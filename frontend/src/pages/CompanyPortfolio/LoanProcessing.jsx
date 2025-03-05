import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Button, Stack } from '@mui/material';
import Layout from './Cham-Vault/components/Layout.jsx';
import { 
  Payment,
  Assessment,
  Speed,
  Security,
  AccountBalance,
  Receipt,
  Timeline,
  NotificationsActive
} from '@mui/icons-material';

const LoanProcessing = () => {
  const features = [
    {
      title: 'Quick Application',
      description: 'Streamlined loan application process with minimal documentation requirements.',
      icon: <Speed fontSize="large" color="primary" />
    },
    {
      title: 'Automated Assessment',
      description: 'Smart credit scoring system for fair and quick loan approval decisions.',
      icon: <Assessment fontSize="large" color="primary" />
    },
    {
      title: 'Secure Processing',
      description: 'Bank-grade security measures to protect all loan-related information.',
      icon: <Security fontSize="large" color="primary" />
    },
    {
      title: 'Payment Tracking',
      description: 'Comprehensive system for tracking loan disbursements and repayments.',
      icon: <Payment fontSize="large" color="primary" />
    }
  ];

  const benefits = [
    {
      title: 'Fast Processing',
      description: 'Quick loan approval and disbursement process for eligible members.'
    },
    {
      title: 'Transparent Terms',
      description: 'Clear loan terms and conditions with no hidden charges.'
    },
    {
      title: 'Flexible Repayment',
      description: 'Multiple repayment options to suit different financial situations.'
    },
    {
      title: 'Automated Reminders',
      description: 'Timely notifications for upcoming payments and due dates.'
    }
  ];

  return (
    <Layout>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ my: 8, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Loan Processing
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Efficient and Secure Loan Management for Your Chama
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            sx={{ mt: 2 }}
            href="/contact"
          >
            Apply Now
          </Button>
        </Box>

        {/* Features Section */}
        <Box sx={{ py: 8 }}>
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            Key Features
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6,
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Benefits Section */}
        <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
          <Container maxWidth="md">
            <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
              Benefits
            </Typography>
            <Grid container spacing={4} sx={{ mt: 4 }}>
              {benefits.map((benefit, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h5" component="h3" gutterBottom>
                        {benefit.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {benefit.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Apply for a loan or learn more about our loan processing services
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            color="primary"
            href="/contact"
            sx={{ mt: 2 }}
          >
            Contact Us Today
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

export default LoanProcessing;
