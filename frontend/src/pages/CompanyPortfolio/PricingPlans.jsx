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
  ListItemText 
} from '@mui/material';
import { Check, Star } from '@mui/icons-material';
import Layout from './Cham-Vault/components/Layout';

const PricingPlans = () => {
  const plans = [
    {
      title: 'Basic',
      price: 'Free',
      period: 'month',
      features: [
        'Up to 5 Chama Members',
        'Basic Financial Reports',
        'Meeting Schedule',
        'Mobile App Access',
        'Email Support'
      ],
      buttonText: 'Get Started',
      buttonVariant: 'contained',
      cardColor: 'linear-gradient(135deg, #43A047 0%, #66BB6A 100%)', // Green for growth and stability
      textColor: 'white'
    },
    {
      title: 'Professional',
      price: 'KSH 500',
      period: 'month',
      features: [
        'Up to 20 Chama Members',
        'Advanced Financial Analytics',
        'Investment Tracking',
        'Priority Support',
        'Custom Reports'
      ],
      buttonText: 'Start Pro',
      buttonVariant: 'contained',
      highlighted: true,
      cardColor: 'linear-gradient(135deg, #1976D2 0%, #42A5F5 100%)', // Blue for trust and professionalism
      textColor: 'white'
    },
    {
      title: 'Enterprise',
      price: 'KSH 1000',
      period: 'month',
      features: [
        'Unlimited Members',
        'Custom Solutions',
        'Dedicated Account Manager',
        'API Access',
        'Online meetings',
        'Automated Disbursments',
        'Autometed minute keeping',
        '24/7 Support'
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'contained',
      cardColor: 'linear-gradient(135deg, #6A1B9A 0%, #9C27B0 100%)', // Purple for luxury and premium
      textColor: 'white'
    }
  ];

  return (
    <Layout>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2C3E50 0%, #3498DB 100%)',
          pt: 8,
          pb: 6,
          color: 'white',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.1)',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              mb: 4,
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            Pricing Plans
          </Typography>
          <Typography variant="h5" align="center" paragraph>
            Choose the perfect plan for your Chama
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="flex-start">
          {plans.map((plan) => (
            <Grid item key={plan.title} xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  minHeight: 600, // Fixed height for all cards
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  background: plan.cardColor,
                  color: plan.textColor,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-16px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                  }
                }}
              >
                <CardContent sx={{ 
                  flexGrow: 1, 
                  p: 4, 
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <Box>
                    <Typography 
                      variant="h4" 
                      component="h2" 
                      gutterBottom 
                      align="center"
                      sx={{
                        fontWeight: 'bold',
                        mb: 3,
                        color: 'white',
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: -8,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 60,
                          height: 3,
                          background: 'rgba(255, 255, 255, 0.8)',
                          borderRadius: 4
                        }
                      }}
                    >
                      {plan.title}
                    </Typography>
                    <Box sx={{ 
                      textAlign: 'center', 
                      mb: 4,
                      position: 'relative',
                    }}>
                      <Typography 
                        variant="h3" 
                        component="span"
                        sx={{
                          fontWeight: 'bold',
                          color: 'white'
                        }}
                      >
                        {plan.price}
                      </Typography>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.8)',
                          mt: 1
                        }}
                      >
                        /{plan.period}
                      </Typography>
                    </Box>
                    <List dense sx={{ mb: 4 }}>
                      {plan.features.map((feature, idx) => (
                        <ListItem 
                          key={feature}
                          sx={{
                            py: 1.5
                          }}
                        >
                          <ListItemIcon>
                            <Check sx={{ color: 'white' }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={feature}
                            sx={{
                              '& .MuiTypography-root': {
                                color: 'rgba(255, 255, 255, 0.9)'
                              }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  <Box sx={{ mt: 'auto', textAlign: 'center' }}>
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      href="/contact"
                      sx={{
                        py: 1.5,
                        bgcolor: 'white',
                        color: plan.title === 'Basic' ? '#43A047' :
                               plan.title === 'Professional' ? '#1976D2' :
                               '#6A1B9A',
                        fontWeight: 'bold',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.9)',
                          transform: 'translateY(-3px)'
                        }
                      }}
                    >
                      {plan.buttonText}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* FAQ Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Can I upgrade my plan later?
              </Typography>
              <Typography color="text.secondary" paragraph>
                Yes, you can upgrade your plan at any time. The new pricing will be prorated for the remainder of your billing period.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                What payment methods do you accept?
              </Typography>
              <Typography color="text.secondary" paragraph>
                We accept all major credit cards, M-PESA, and bank transfers for enterprise plans.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Is there a long-term commitment?
              </Typography>
              <Typography color="text.secondary" paragraph>
                No, all our plans are billed monthly and you can cancel at any time.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Do you offer custom plans?
              </Typography>
              <Typography color="text.secondary" paragraph>
                Yes, we offer custom enterprise solutions. Contact our sales team to discuss your specific needs.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

export default PricingPlans;
