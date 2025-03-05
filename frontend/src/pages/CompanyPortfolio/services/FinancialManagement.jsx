import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack
} from '@mui/material';
import Layout from '../Cham-Vault/components/Layout.jsx';
import {
  AccountBalance,
  TrendingUp,
  Receipt,
  Assessment,
  Timeline,
  AttachMoney,
  AccountBalanceWallet,
  ShowChart,
  PieChart,
  Assignment
} from '@mui/icons-material';

const FinancialManagement = () => {
  const features = [
    {
      title: 'Contribution Tracking',
      description: 'Automated system for tracking member contributions',
      icon: <AttachMoney color="primary" />,
      details: [
        'Automated contribution reminders',
        'Multiple payment methods support',
        'Real-time contribution tracking',
        'Contribution history reports',
        'Defaulter management system'
      ]
    },
    {
      title: 'Account Management',
      description: 'Comprehensive account management system',
      icon: <AccountBalanceWallet color="primary" />,
      details: [
        'Multiple account handling',
        'Bank reconciliation',
        'Transaction categorization',
        'Account balance monitoring',
        'Financial alerts system'
      ]
    },
    {
      title: 'Financial Reporting',
      description: 'Advanced financial reporting and analytics',
      icon: <Assessment color="primary" />,
      details: [
        'Income statements',
        'Balance sheets',
        'Cash flow statements',
        'Custom report generation',
        'Financial trend analysis'
      ]
    },
    {
      title: 'Budget Planning',
      description: 'Smart budgeting and expense tracking tools',
      icon: <Timeline color="primary" />,
      details: [
        'Budget creation wizard',
        'Expense tracking',
        'Budget vs. actual analysis',
        'Category-wise budgeting',
        'Budget alerts and notifications'
      ]
    }
  ];

  const statistics = [
    {
      value: '98%',
      label: 'Accuracy in Financial Tracking'
    },
    {
      value: '45%',
      label: 'Reduction in Administrative Time'
    },
    {
      value: '100%',
      label: 'Transparent Transactions'
    },
    {
      value: '24/7',
      label: 'Financial Monitoring'
    }
  ];

  return (
    <Layout>
      <Box
        sx={{
          bgcolor: 'background.default',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="lg">
          {/* Hero Section */}
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography
              component="h1"
              variant="h2"
              color="primary"
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              Financial Management
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Advanced financial tools for efficient Chama operations
            </Typography>
          </Box>

          {/* Statistics Section */}
          <Grid container spacing={3} sx={{ mb: 8 }}>
            {statistics.map((stat) => (
              <Grid item xs={12} sm={6} md={3} key={stat.label}>
                <Paper
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #2C3E50 0%, #3498DB 100%)',
                    color: 'white',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="subtitle1">
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Main Features */}
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {features.map((feature) => (
              <Grid item xs={12} md={6} key={feature.title}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      transition: 'transform 0.3s ease-in-out',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {feature.icon}
                      <Typography variant="h5" component="h2" sx={{ ml: 1 }}>
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" paragraph>
                      {feature.description}
                    </Typography>
                    <List>
                      {feature.details.map((detail) => (
                        <ListItem key={detail}>
                          <ListItemIcon>
                            <Assignment color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={detail} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Process Flow */}
          <Paper sx={{ p: 4, mb: 8, bgcolor: 'grey.50' }}>
            <Typography variant="h4" gutterBottom align="center">
              Our Financial Management Process
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Receipt color="primary" sx={{ fontSize: 40 }} />
                  <Typography variant="h6" sx={{ mt: 1 }}>Record</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Automated transaction recording
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <ShowChart color="primary" sx={{ fontSize: 40 }} />
                  <Typography variant="h6" sx={{ mt: 1 }}>Track</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Real-time financial monitoring
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <PieChart color="primary" sx={{ fontSize: 40 }} />
                  <Typography variant="h6" sx={{ mt: 1 }}>Analyze</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Comprehensive financial analysis
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Assessment color="primary" sx={{ fontSize: 40 }} />
                  <Typography variant="h6" sx={{ mt: 1 }}>Report</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Detailed financial reporting
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* CTA Section */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h4" gutterBottom>
              Ready to Streamline Your Financial Operations?
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
              sx={{ mt: 3 }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                href="/pricing"
                startIcon={<TrendingUp />}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                href="/contact"
                startIcon={<AccountBalance />}
              >
                Schedule Demo
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default FinancialManagement;
