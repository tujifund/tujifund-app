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
  Chip
} from '@mui/material';
import Layout from '../Cham-Vault/components/Layout.jsx';
import {
  TrendingUp,
  Assessment,
  Timeline,
  Security,
  Notifications,
  Analytics,
  ShowChart,
  PieChart,
  BarChart,
  Assignment,
  MonetizationOn,
  AccountBalance
} from '@mui/icons-material';

const InvestmentSolutions = () => {
  const features = [
    {
      title: 'Portfolio Management',
      description: 'Comprehensive investment portfolio tracking and management',
      icon: <PieChart color="primary" />,
      details: [
        'Portfolio diversification tools',
        'Asset allocation tracking',
        'Investment performance monitoring',
        'Portfolio rebalancing alerts',
        'Historical performance analysis'
      ]
    },
    {
      title: 'Risk Assessment',
      description: 'Advanced risk analysis and management tools',
      icon: <Security color="primary" />,
      details: [
        'Risk profiling system',
        'Market risk analysis',
        'Portfolio risk assessment',
        'Risk mitigation strategies',
        'Scenario analysis tools'
      ]
    },
    {
      title: 'Market Analysis',
      description: 'Real-time market analysis and insights',
      icon: <Analytics color="primary" />,
      details: [
        'Market trend analysis',
        'Technical indicators',
        'Fundamental analysis tools',
        'Market news integration',
        'Custom market alerts'
      ]
    },
    {
      title: 'Investment Tracking',
      description: 'Comprehensive investment monitoring system',
      icon: <ShowChart color="primary" />,
      details: [
        'Real-time investment tracking',
        'ROI calculations',
        'Dividend tracking',
        'Investment goal monitoring',
        'Performance benchmarking'
      ]
    }
  ];

  const investmentTypes = [
    {
      type: 'Stocks',
      icon: <TrendingUp />,
      description: 'Equity investments in publicly traded companies'
    },
    {
      type: 'Bonds',
      icon: <AccountBalance />,
      description: 'Fixed income securities with regular interest payments'
    },
    {
      type: 'Real Estate',
      icon: <MonetizationOn />,
      description: 'Property investments for rental income and appreciation'
    },
    {
      type: 'Mutual Funds',
      icon: <PieChart />,
      description: 'Professionally managed investment portfolios'
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
              Investment Solutions
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Smart investment tools to grow your Chama's wealth
            </Typography>
          </Box>

          {/* Investment Types */}
          <Paper sx={{ p: 4, mb: 8, bgcolor: 'grey.50' }}>
            <Typography variant="h4" gutterBottom align="center">
              Investment Opportunities
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {investmentTypes.map((investment) => (
                <Grid item xs={12} sm={6} md={3} key={investment.type}>
                  <Card
                    sx={{
                      height: '100%',
                      textAlign: 'center',
                      p: 2,
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        transition: 'transform 0.3s ease-in-out',
                      },
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      {investment.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {investment.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {investment.description}
                    </Typography>
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

          {/* Investment Process */}
          <Paper
            sx={{
              p: 4,
              mb: 8,
              background: 'linear-gradient(135deg, #2C3E50 0%, #3498DB 100%)',
              color: 'white',
            }}
          >
            <Typography variant="h4" gutterBottom align="center">
              Our Investment Process
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Assessment sx={{ fontSize: 40 }} />
                  <Typography variant="h6" sx={{ mt: 1 }}>Analyze</Typography>
                  <Typography variant="body2">
                    Market research and analysis
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Security sx={{ fontSize: 40 }} />
                  <Typography variant="h6" sx={{ mt: 1 }}>Evaluate</Typography>
                  <Typography variant="body2">
                    Risk assessment
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <MonetizationOn sx={{ fontSize: 40 }} />
                  <Typography variant="h6" sx={{ mt: 1 }}>Invest</Typography>
                  <Typography variant="body2">
                    Strategic investment execution
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Timeline sx={{ fontSize: 40 }} />
                  <Typography variant="h6" sx={{ mt: 1 }}>Monitor</Typography>
                  <Typography variant="body2">
                    Performance tracking
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* CTA Section */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h4" gutterBottom>
              Start Growing Your Investment Portfolio
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
                Start Investing
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                href="/contact"
                startIcon={<Assessment />}
              >
                Investment Consultation
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default InvestmentSolutions;
