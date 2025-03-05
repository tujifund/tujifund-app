import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Button, Stack } from '@mui/material';
import Layout from './Cham-Vault/components/Layout.jsx';
import { 
  AccountBalance,
  TrendingUp,
  Savings,
  Assessment,
  MonetizationOn,
  Timeline,
  Speed,
  Security
} from '@mui/icons-material';

const SavingsManagement = () => {
  const features = [
    {
      title: 'Automated Contributions',
      description: 'Set up automatic contribution schedules for your members with flexible payment options.',
      icon: <MonetizationOn fontSize="large" color="primary" />
    },
    {
      title: 'Real-time Tracking',
      description: 'Monitor all contributions and savings in real-time with detailed transaction history.',
      icon: <Timeline fontSize="large" color="primary" />
    },
    {
      title: 'Smart Alerts',
      description: 'Get instant notifications for contributions, deadlines, and payment reminders.',
      icon: <Speed fontSize="large" color="primary" />
    },
    {
      title: 'Secure Transactions',
      description: 'Bank-grade security for all your financial transactions and data.',
      icon: <Security fontSize="large" color="primary" />
    }
  ];

  const benefits = [
    {
      title: 'Efficient Management',
      description: 'Streamline your group savings process with automated tracking and reporting.'
    },
    {
      title: 'Increased Transparency',
      description: 'Clear visibility of all transactions and contribution histories.'
    },
    {
      title: 'Better Compliance',
      description: 'Stay compliant with automatic record-keeping and documentation.'
    },
    {
      title: 'Enhanced Growth',
      description: 'Optimize savings strategies with data-driven insights and recommendations.'
    }
  ];

  return (
    <Layout>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ my: 8, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Savings Management
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Streamline Your Group Savings with Smart Management Tools
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            sx={{ mt: 2 }}
            href="/contact"
          >
            Get Started
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
            Ready to Optimize Your Savings?
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Join thousands of successful Chamas already using our platform
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

export default SavingsManagement;
