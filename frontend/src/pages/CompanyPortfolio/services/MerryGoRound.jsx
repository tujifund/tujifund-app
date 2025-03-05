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
  CircularProgress
} from '@mui/material';
import Layout from '../Cham-Vault/components/Layout.jsx';
import {
  MonetizationOn,
  Assessment,
  Timeline,
  Notifications,
  Assignment,
  Group,
  CalendarToday,
  AccountBalance,
  SwapHoriz,
  CheckCircle,
  Loop,
  PieChart
} from '@mui/icons-material';

const MerryGoRound = () => {
  const features = [
    {
      title: 'Rotation Management',
      description: 'Automated rotation scheduling and tracking system',
      icon: <Loop color="primary" />,
      details: [
        'Automated rotation scheduling',
        'Member order management',
        'Rotation history tracking',
        'Schedule adjustments',
        'Rotation notifications'
      ]
    },
    {
      title: 'Payment Tracking',
      description: 'Comprehensive payment monitoring system',
      icon: <MonetizationOn color="primary" />,
      details: [
        'Payment status tracking',
        'Contribution monitoring',
        'Payment reminders',
        'Transaction history',
        'Receipt generation'
      ]
    },
    {
      title: 'Member Management',
      description: 'Efficient member participation tracking',
      icon: <Group color="primary" />,
      details: [
        'Member participation tracking',
        'Contribution history',
        'Member rankings',
        'Performance metrics',
        'Member notifications'
      ]
    },
    {
      title: 'Distribution Management',
      description: 'Automated fund distribution system',
      icon: <SwapHoriz color="primary" />,
      details: [
        'Automated disbursements',
        'Distribution scheduling',
        'Payment confirmations',
        'Distribution history',
        'Bank integration'
      ]
    }
  ];

  const rotationStages = [
    {
      stage: 1,
      title: 'Contribution',
      description: 'Members make regular contributions',
      icon: <MonetizationOn />,
      color: '#4CAF50'
    },
    {
      stage: 2,
      title: 'Collection',
      description: 'Funds are pooled together',
      icon: <AccountBalance />,
      color: '#2196F3'
    },
    {
      stage: 3,
      title: 'Distribution',
      description: 'Funds distributed to current recipient',
      icon: <SwapHoriz />,
      color: '#9C27B0'
    },
    {
      stage: 4,
      title: 'Rotation',
      description: 'Move to next member in sequence',
      icon: <Loop />,
      color: '#FF9800'
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
              Merry-Go-Round Management
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Streamline your rotating savings and credit system
            </Typography>
          </Box>

          {/* Rotation Visualization */}
          <Paper
            sx={{
              p: 4,
              mb: 8,
              background: 'linear-gradient(135deg, #2C3E50 0%, #3498DB 100%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Rotation Cycle Visualization
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {rotationStages.map((stage, index) => (
                <Grid item xs={12} sm={6} md={3} key={stage.stage}>
                  <Box
                    sx={{
                      position: 'relative',
                      textAlign: 'center',
                      '&::after': {
                        content: index < rotationStages.length - 1 ? '""' : 'none',
                        position: 'absolute',
                        top: '50%',
                        right: '-10%',
                        width: '20%',
                        height: 2,
                        bgcolor: 'rgba(255, 255, 255, 0.3)',
                        transform: 'translateY(-50%)',
                        display: { xs: 'none', md: 'block' }
                      }
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        display: 'inline-flex',
                        mb: 2
                      }}
                    >
                      <CircularProgress
                        variant="determinate"
                        value={100}
                        size={80}
                        thickness={4}
                        sx={{
                          color: 'rgba(255, 255, 255, 0.2)',
                        }}
                      />
                      <CircularProgress
                        variant="determinate"
                        value={25 * stage.stage}
                        size={80}
                        thickness={4}
                        sx={{
                          color: stage.color,
                          position: 'absolute',
                          left: 0,
                        }}
                      />
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: 'absolute',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {stage.icon}
                      </Box>
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {stage.title}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {stage.description}
                    </Typography>
                  </Box>
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

          {/* Statistics */}
          <Paper sx={{ p: 4, mb: 8, bgcolor: 'grey.50' }}>
            <Typography variant="h4" align="center" gutterBottom>
              System Performance
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" color="primary" gutterBottom>
                    99%
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    On-time Distributions
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" color="primary" gutterBottom>
                    100%
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Payment Accuracy
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" color="primary" gutterBottom>
                    24/7
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    System Availability
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" color="primary" gutterBottom>
                    5min
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Average Processing Time
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* CTA Section */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h4" gutterBottom>
              Ready to Start Your Merry-Go-Round?
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
                startIcon={<Loop />}
              >
                Start Now
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                href="/contact"
                startIcon={<Assessment />}
              >
                Learn More
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default MerryGoRound;
