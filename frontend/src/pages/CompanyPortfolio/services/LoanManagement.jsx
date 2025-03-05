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
  Payment,
  Assessment,
  Timeline,
  Notifications,
  Assignment,
  CreditScore,
  AccountBalance,
  MonetizationOn,
  CalendarToday,
  Speed,
  LocalAtm,
  Receipt
} from '@mui/icons-material';

const LoanManagement = () => {
  const features = [
    {
      title: 'Loan Application',
      description: 'Streamlined loan application and processing system',
      icon: <LocalAtm color="primary" />,
      details: [
        'Digital loan application forms',
        'Document upload capability',
        'Application tracking system',
        'Automated eligibility check',
        'Quick approval process'
      ]
    },
    {
      title: 'Credit Scoring',
      description: 'Advanced credit scoring and risk assessment',
      icon: <CreditScore color="primary" />,
      details: [
        'Automated credit scoring',
        'Risk assessment metrics',
        'Credit history tracking',
        'Member contribution analysis',
        'Creditworthiness evaluation'
      ]
    },
    {
      title: 'Repayment Tracking',
      description: 'Comprehensive loan repayment management',
      icon: <Receipt color="primary" />,
      details: [
        'Automated payment tracking',
        'Payment reminder system',
        'Late payment management',
        'Prepayment handling',
        'Payment history records'
      ]
    },
    {
      title: 'Interest Management',
      description: 'Flexible interest calculation and management',
      icon: <MonetizationOn color="primary" />,
      details: [
        'Multiple interest rate options',
        'Automated interest calculation',
        'Interest payment scheduling',
        'Rate adjustment tools',
        'Interest statement generation'
      ]
    }
  ];

  const loanTypes = [
    {
      type: 'Emergency Loans',
      maxAmount: '50,000',
      term: '3-6 months',
      interest: '8%',
      processing: '24 hours'
    },
    {
      type: 'Business Loans',
      maxAmount: '500,000',
      term: '12-24 months',
      interest: '12%',
      processing: '3-5 days'
    },
    {
      type: 'Development Loans',
      maxAmount: '1,000,000',
      term: '24-36 months',
      interest: '15%',
      processing: '5-7 days'
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
              Loan Management
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Efficient and transparent loan processing system for your Chama
            </Typography>
          </Box>

          {/* Loan Types */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Available Loan Types
            </Typography>
            <Grid container spacing={4}>
              {loanTypes.map((loan) => (
                <Grid item xs={12} md={4} key={loan.type}>
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
                      <Typography variant="h5" component="h2" gutterBottom>
                        {loan.type}
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <MonetizationOn color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Maximum Amount"
                            secondary={`KES ${loan.maxAmount}`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CalendarToday color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Loan Term"
                            secondary={loan.term}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Timeline color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Interest Rate"
                            secondary={loan.interest}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Speed color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Processing Time"
                            secondary={loan.processing}
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
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

          {/* Loan Process */}
          <Paper
            sx={{
              p: 4,
              mb: 8,
              background: 'linear-gradient(135deg, #2C3E50 0%, #3498DB 100%)',
              color: 'white',
            }}
          >
            <Typography variant="h4" gutterBottom align="center">
              Loan Application Process
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Assignment sx={{ fontSize: 40 }} />
                  <Typography variant="h6" sx={{ mt: 1 }}>Apply</Typography>
                  <Typography variant="body2">
                    Submit digital application
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Assessment sx={{ fontSize: 40 }} />
                  <Typography variant="h6" sx={{ mt: 1 }}>Review</Typography>
                  <Typography variant="body2">
                    Application assessment
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <CreditScore sx={{ fontSize: 40 }} />
                  <Typography variant="h6" sx={{ mt: 1 }}>Approve</Typography>
                  <Typography variant="body2">
                    Loan approval process
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Payment sx={{ fontSize: 40 }} />
                  <Typography variant="h6" sx={{ mt: 1 }}>Disburse</Typography>
                  <Typography variant="body2">
                    Fund disbursement
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* CTA Section */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h4" gutterBottom>
              Ready to Apply for a Loan?
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
                startIcon={<LocalAtm />}
              >
                Apply Now
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                href="/auth/register"
                startIcon={<Assessment />}
              >
                Loan Calculator
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default LoanManagement;
