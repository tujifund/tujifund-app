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
  LinearProgress
} from '@mui/material';
import Layout from '../Cham-Vault/components/Layout.jsx';
import {
  Favorite,
  Assessment,
  Timeline,
  Notifications,
  Assignment,
  Group,
  CalendarToday,
  MonetizationOn,
  VolunteerActivism,
  CheckCircle,
  LocalHospital,
  CelebrationOutlined,
  School,
  FamilyRestroom
} from '@mui/icons-material';

const WelfareFund = () => {
  const features = [
    {
      title: 'Fund Management',
      description: 'Comprehensive welfare fund administration',
      icon: <MonetizationOn color="primary" />,
      details: [
        'Contribution tracking',
        'Fund allocation',
        'Emergency fund reserves',
        'Interest management',
        'Financial reporting'
      ]
    },
    {
      title: 'Claims Processing',
      description: 'Efficient claims handling system',
      icon: <Assignment color="primary" />,
      details: [
        'Digital claim submission',
        'Document management',
        'Approval workflow',
        'Payment processing',
        'Claim status tracking'
      ]
    },
    {
      title: 'Member Benefits',
      description: 'Comprehensive member welfare benefits',
      icon: <Favorite color="primary" />,
      details: [
        'Health emergencies',
        'Education support',
        'Family events',
        'Bereavement support',
        'Retirement benefits'
      ]
    },
    {
      title: 'Support Network',
      description: 'Community support system',
      icon: <VolunteerActivism color="primary" />,
      details: [
        'Member counseling',
        'Support groups',
        'Resource sharing',
        'Community events',
        'Wellness programs'
      ]
    }
  ];

  const benefitTypes = [
    {
      type: 'Medical Support',
      icon: <LocalHospital />,
      description: 'Healthcare emergencies and medical bills',
      progress: 85
    },
    {
      type: 'Education Aid',
      icon: <School />,
      description: 'School fees and educational support',
      progress: 70
    },
    {
      type: 'Family Events',
      icon: <CelebrationOutlined />,
      description: 'Weddings, births, and celebrations',
      progress: 60
    },
    {
      type: 'Bereavement Support',
      icon: <FamilyRestroom />,
      description: 'Funeral expenses and family support',
      progress: 90
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
              Welfare Fund Management
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Supporting members through life's important moments
            </Typography>
          </Box>

          {/* Benefits Visualization */}
          <Paper
            sx={{
              p: 4,
              mb: 8,
              background: 'linear-gradient(135deg, #2C3E50 0%, #3498DB 100%)',
              color: 'white',
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Welfare Benefits Coverage
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {benefitTypes.map((benefit) => (
                <Grid item xs={12} md={6} key={benefit.type}>
                  <Card
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      color: 'white',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        transition: 'transform 0.3s ease-in-out',
                      },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {benefit.icon}
                        <Typography variant="h6" sx={{ ml: 1 }}>
                          {benefit.type}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {benefit.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={benefit.progress}
                            sx={{
                              height: 8,
                              borderRadius: 5,
                              bgcolor: 'rgba(255, 255, 255, 0.1)',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: 'primary.light',
                              },
                            }}
                          />
                        </Box>
                        <Box sx={{ minWidth: 35 }}>
                          <Typography variant="body2">{`${benefit.progress}%`}</Typography>
                        </Box>
                      </Box>
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

          {/* Impact Statistics */}
          <Paper sx={{ p: 4, mb: 8, bgcolor: 'grey.50' }}>
            <Typography variant="h4" align="center" gutterBottom>
              Our Impact
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" color="primary" gutterBottom>
                    1000+
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Members Supported
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" color="primary" gutterBottom>
                    24hrs
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Response Time
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" color="primary" gutterBottom>
                    95%
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Claim Approval Rate
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" color="primary" gutterBottom>
                    5M+
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Total Benefits Paid
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* CTA Section */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h4" gutterBottom>
              Start Supporting Your Members Today
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
                startIcon={<Favorite />}
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
                Learn More
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default WelfareFund;
