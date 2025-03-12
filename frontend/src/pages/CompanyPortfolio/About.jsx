import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Avatar, Stack, Divider } from '@mui/material';
import Layout from './Cham-Vault/components/Layout.jsx';
import {
  Speed,
  Security,
  People,
  TrendingUp,
  Diversity3,
  Handshake,
  Lightbulb,
  Stars
} from '@mui/icons-material';

const About = () => {
  const teamMembers = [
    {
      name: 'Omulo Samuel Okoth',
      position: 'CEO & Founder',
      description: 'Former investment banker with 15+ years of experience in financial technology and African markets. Passionate about democratizing financial access.',
      image: 'https://source.unsplash.com/random/150x150?man+suit+1'
    },
    {
      name: 'Michael Wamalwa',
      position: 'Chief Technology Officer',
      description: 'Tech innovator with extensive experience in fintech solutions. Previously led technology teams at major African financial institutions.',
      image: 'https://source.unsplash.com/random/150x150?woman+professional+1'
    },
    {
      name: 'Sharon Adhiambo',
      position: 'Head of Operations',
      description: 'Operations specialist with deep understanding of Chama dynamics and community banking. 10+ years experience in microfinance.',
      image: 'https://source.unsplash.com/random/150x150?man+suit+2'
    },
    {
      name: 'Linet Awuor',
      position: 'Chief Financial Officer',
      description: 'Certified accountant with expertise in group investment strategies and financial planning. Former consultant for major investment firms.',
      image: 'https://source.unsplash.com/random/150x150?woman+professional+2'
    },
    {
      name: 'Mauline Omulo',
      position: 'Head of Customer Success',
      description: 'Customer experience expert focused on helping Chamas achieve their financial goals. Extensive background in community banking.',
      image: 'https://source.unsplash.com/random/150x150?man+suit+3'
    },
    {
      name: 'Benard Onyango',
      position: 'Head of Product',
      description: 'Product strategist with a passion for creating user-friendly financial solutions. Previously led product teams at leading fintech companies.',
      image: 'https://source.unsplash.com/random/150x150?woman+professional+3'
    }
  ];

  const values = [
    {
      icon: <Diversity3 fontSize="large" color="primary" />,
      title: 'Community First',
      description: 'We believe in the power of community and collective growth. Every feature we build is designed to strengthen group collaboration and success.'
    },
    {
      icon: <Security fontSize="large" color="primary" />,
      title: 'Trust & Security',
      description: 'We maintain the highest standards of security and transparency in all our operations, ensuring your group\'s assets are always protected.'
    },
    {
      icon: <Lightbulb fontSize="large" color="primary" />,
      title: 'Innovation',
      description: 'We continuously innovate and improve our platform, incorporating the latest technology to provide cutting-edge financial solutions.'
    },
    {
      icon: <Handshake fontSize="large" color="primary" />,
      title: 'Integrity',
      description: 'We operate with unwavering integrity, ensuring all our actions and decisions are guided by what\'s best for our users.'
    }
  ];

  const milestones = [
    {
      year: '2023',
      title: 'Platform Launch',
      description: 'Successfully launched TujiFund platform, revolutionizing Chama management in Kenya.'
    },
    {
      year: '2024',
      title: 'Rapid Growth',
      description: 'Expanded to serve over 1,000 Chamas across East Africa, managing over KES 50M in assets.'
    },
    {
      year: '2025',
      title: 'Innovation Award',
      description: 'Recognized as the Most Innovative Fintech Solution at the African Banking Awards.'
    }
  ];

  return (
    <Layout>
      <Container maxWidth="xl">
        {/* Hero Section */}
        <Box sx={{ my: 8, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            About TujiFund
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Empowering Chamas Through Financial Innovation
          </Typography>
        </Box>

        {/* Vision & Mission */}
        <Box sx={{ mb: 12 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    Our Vision
                  </Typography>
                  <Typography variant="body1" paragraph>
                    To be the leading digital platform for Chama management in Africa, 
                    empowering millions of people to achieve their financial goals through 
                    collective saving and investment.
                  </Typography>
                  <Typography variant="body1">
                    We envision a future where every Chama has access to powerful digital 
                    tools that make financial management seamless, transparent, and efficient.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    Our Mission
                  </Typography>
                  <Typography variant="body1" paragraph>
                    To revolutionize how Chamas operate by providing innovative digital 
                    solutions that simplify group financial management, enhance transparency, 
                    and promote growth.
                  </Typography>
                  <Typography variant="body1">
                    We are committed to understanding and addressing the unique challenges 
                    faced by Chamas, delivering solutions that combine traditional group 
                    saving principles with modern financial technology.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Values Section */}
        <Box sx={{ mb: 12 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Our Values
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
            The principles that guide everything we do
          </Typography>
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  height: '100%',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  }
                }}>
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      {value.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Milestones Section */}
        <Box sx={{ mb: 12 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Our Journey
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
            Key milestones in our growth
          </Typography>
          <Grid container spacing={4}>
            {milestones.map((milestone, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ 
                  height: '100%',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  }
                }}>
                  <CardContent>
                    <Typography variant="h3" color="primary" gutterBottom>
                      {milestone.year}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {milestone.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {milestone.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Team Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Our Team
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
            Meet the experts behind TujiFund
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ 
                  height: '100%',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  }
                }}>
                  <CardContent>
                    <Stack 
                      direction="column" 
                      spacing={2} 
                      alignItems="center"
                      sx={{ mb: 2 }}
                    >
                      <Avatar 
                        src={member.image}
                        alt={member.name}
                        sx={{ width: 120, height: 120 }}
                      />
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                          {member.name}
                        </Typography>
                        <Typography variant="subtitle1" color="primary" gutterBottom>
                          {member.position}
                        </Typography>
                      </Box>
                    </Stack>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2" color="text.secondary" align="center">
                      {member.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

export default About;
