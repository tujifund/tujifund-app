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
  Stack,
  Divider
} from '@mui/material';
import Layout from '../Cham-Vault/components/Layout.jsx';
import {
  ShowChart,
  Assessment,
  Timeline,
  Notifications,
  Assignment,
  Group,
  CalendarToday,
  MonetizationOn,
  PieChart,
  CheckCircle,
  TrendingUp,
  AccountBalance,
  BarChart,
  SwapHoriz
} from '@mui/icons-material';

const SharesManagement = () => {
  const features = [
    {
      title: 'Share Allocation',
      description: 'Efficient share distribution and tracking',
      icon: <PieChart color="primary" />,
      details: [
        'Share issuance',
        'Ownership tracking',
        'Transfer management',
        'Share certificates',
        'Dividend calculations'
      ]
    },
    {
      title: 'Value Tracking',
      description: 'Real-time share value monitoring',
      icon: <ShowChart color="primary" />,
      details: [
        'Value calculations',
        'Historical tracking',
        'Performance metrics',
        'Market analysis',
        'Valuation reports'
      ]
    },
    {
      title: 'Transaction Management',
      description: 'Comprehensive transaction handling',
      icon: <SwapHoriz color="primary" />,
      details: [
        'Buy/Sell processing',
        'Transfer records',
        'Transaction history',
        'Payment tracking',
        'Settlement management'
      ]
    },
    {
      title: 'Dividend Management',
      description: 'Automated dividend processing',
      icon: <MonetizationOn color="primary" />,
      details: [
        'Dividend calculations',
        'Distribution scheduling',
        'Payment processing',
        'Tax handling',
        'Reinvestment options'
      ]
    }
  ];

  const performanceMetrics = [
    {
      metric: 'Share Value Growth',
      value: '+25%',
      period: 'Year to Date',
      icon: <TrendingUp color="success" />,
      description: 'Consistent growth in share value'
    },
    {
      metric: 'Dividend Yield',
      value: '12%',
      period: 'Annual',
      icon: <MonetizationOn color="primary" />,
      description: 'Competitive dividend returns'
    },
    {
      metric: 'Transaction Volume',
      value: '500+',
      period: 'Monthly',
      icon: <SwapHoriz color="info" />,
      description: 'Active trading volume'
    },
    {
      metric: 'Member Returns',
      value: '18%',
      period: 'Average',
      icon: <BarChart color="secondary" />,
      description: 'Member investment returns'
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
              Shares Management
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Efficient and transparent share ownership management
            </Typography>
          </Box>

          {/* Performance Metrics */}
          <Paper
            sx={{
              p: 4,
              mb: 8,
              background: 'linear-gradient(135deg, #2C3E50 0%, #3498DB 100%)',
              color: 'white',
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Performance Overview
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {performanceMetrics.map((metric) => (
                <Grid item xs={12} sm={6} md={3} key={metric.metric}>
                  <Card
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      color: 'white',
                      height: '100%',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        transition: 'transform 0.3s ease-in-out',
                      },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        {metric.icon}
                      </Box>
                      <Typography variant="h4" align="center" gutterBottom>
                        {metric.value}
                      </Typography>
                      <Typography variant="subtitle1" align="center" gutterBottom>
                        {metric.metric}
                      </Typography>
                      <Typography variant="body2" align="center" color="rgba(255, 255, 255, 0.7)">
                        {metric.period}
                      </Typography>
                      <Divider sx={{ my: 1, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                      <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                        {metric.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>

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
                            <CheckCircle color="primary" fontSize="small" />
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

          {/* Share Value Chart */}
          <Paper sx={{ p: 4, mb: 8, bgcolor: 'grey.50' }}>
            <Typography variant="h4" align="center" gutterBottom>
              Share Value Trends
            </Typography>
            <Box
              sx={{
                width: '100%',
                height: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                p: 2,
                bgcolor: 'background.paper'
              }}
            >
              <Typography variant="body1" color="text.secondary">
                Interactive share value chart will be displayed here
              </Typography>
            </Box>
          </Paper>

          {/* CTA Section */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h4" gutterBottom>
              Start Managing Your Shares
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
                href="/auth/register"
                startIcon={<ShowChart />}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                href="/contact"
                startIcon={<Assessment />}
              >
                View Demo
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default SharesManagement;
