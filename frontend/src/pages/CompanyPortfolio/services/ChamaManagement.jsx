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
  Divider,
  Paper
} from '@mui/material';
import Layout from '../Cham-Vault/components/Layout.jsx';
import {
  People,
  Assignment,
  Storage,
  EventNote,
  Security,
  GroupAdd,
  SupervisorAccount,
  Description,
  CalendarToday,
  CloudUpload
} from '@mui/icons-material';

const ChamaManagement = () => {
  const features = [
    {
      title: 'Member Management',
      description: 'Comprehensive member registration and profile management system',
      icon: <GroupAdd color="primary" />,
      details: [
        'Digital member registration process',
        'Profile management and updates',
        'Contact information management',
        'Member status tracking',
        'Historical member data'
      ]
    },
    {
      title: 'Role Assignment',
      description: 'Flexible role management and permission system',
      icon: <SupervisorAccount color="primary" />,
      details: [
        'Role-based access control',
        'Custom permission settings',
        'Office bearer assignments',
        'Term tracking for officials',
        'Role transition management'
      ]
    },
    {
      title: 'Document Management',
      description: 'Secure document storage and sharing platform',
      icon: <Description color="primary" />,
      details: [
        'Secure document upload',
        'Version control',
        'Document categorization',
        'Access control settings',
        'Document sharing features'
      ]
    },
    {
      title: 'Meeting Management',
      description: 'Comprehensive meeting scheduling and documentation',
      icon: <CalendarToday color="primary" />,
      details: [
        'Meeting scheduler',
        'Attendance tracking',
        'Minutes recording',
        'Action item tracking',
        'Meeting reminder system'
      ]
    }
  ];

  const benefits = [
    'Improved organizational efficiency',
    'Enhanced transparency in operations',
    'Better member engagement',
    'Streamlined communication',
    'Secure data management',
    'Reduced administrative overhead'
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
              Chama Management
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Streamline your Chama operations with our comprehensive management tools
            </Typography>
          </Box>

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

          {/* Benefits Section */}
          <Paper
            sx={{
              p: 4,
              background: 'linear-gradient(135deg, #2C3E50 0%, #3498DB 100%)',
              color: 'white',
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Typography variant="h4" gutterBottom>
              Key Benefits
            </Typography>
            <Grid container spacing={3}>
              {benefits.map((benefit) => (
                <Grid item xs={12} sm={6} key={benefit}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Security sx={{ mr: 1 }} />
                    <Typography variant="h6">{benefit}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* CTA Section */}
          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Ready to Transform Your Chama Management?
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              href="/pricing"
              sx={{ mt: 2 }}
            >
              Get Started Today
            </Button>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default ChamaManagement;
