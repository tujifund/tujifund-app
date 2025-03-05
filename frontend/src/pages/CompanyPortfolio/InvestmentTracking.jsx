import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Button, Stack } from '@mui/material';
import Layout from './Cham-Vault/components/Layout.jsx';
import { 
  TrendingUp,
  PieChart,
  Assessment,
  Visibility,
  ShowChart,
  Analytics,
  Notifications,
  AccountBalance
} from '@mui/icons-material';

const InvestmentTracking = () => {
  const features = [
    {
      title: 'Account Overview',
      description: 'Get a comprehensive view of your group\'s investment portfolio with real-time updates.',
      icon: <PieChart fontSize="large" color="primary" />
    },
    {
      title: 'Performance Analytics',
      description: 'Track investment performance with detailed analytics and visual reports.',
      icon: <ShowChart fontSize="large" color="primary" />
    },
    {
      title: 'Market Insights',
      description: 'Access real-time market data and insights to make informed investment decisions.',
      icon: <Analytics fontSize="large" color="primary" />
    },
    {
      title: 'Investment Alerts',
      description: 'Receive timely notifications about market changes and investment opportunities.',
      icon: <Notifications fontSize="large" color="primary" />
    }
  ];

  const tools = [
    {
      title: 'Investment Dashboard',
      description: 'Centralized dashboard showing all your investments, returns, and performance metrics.'
    },
    {
      title: 'Risk Assessment',
      description: 'Advanced tools to evaluate and manage investment risks effectively.'
    },
    {
      title: 'Return Calculator',
      description: 'Calculate potential returns and compare different investment options.'
    },
    {
      title: 'Portfolio Diversification',
      description: 'Tools to help maintain a balanced and diversified investment portfolio.'
    }
  ];

  return (
    <Layout>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ my: 8, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Track Your Investments 
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Make Informed Investment Decisions with Advanced Tracking Tools
          </Typography>
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

        {/* Tools Section */}
        <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
          <Container maxWidth="md">
            <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
              Investment Tools
            </Typography>
            <Grid container spacing={4} sx={{ mt: 4 }}>
              {tools.map((tool, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h5" component="h3" gutterBottom>
                        {tool.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {tool.description}
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
            Ready to Optimize Your Investments?
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Get started with our advanced investment tracking tools
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
          <Button 
            variant="contained" 
            size="large" 
            sx={{ mt: 2 }}
            href="/contact"
          >
            Start Tracking
          </Button>
          <Button 
            variant="contained" 
            size="large" 
            color="primary"
            href="/contact"
            sx={{ mt: 2 }}
          >
            Contact Us Today
          </Button>
          </Stack>
        </Box>
      </Container>
    </Layout>
  );
};

export default InvestmentTracking;
