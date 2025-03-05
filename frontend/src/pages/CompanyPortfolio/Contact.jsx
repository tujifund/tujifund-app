import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Paper,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  Facebook,
  Twitter,
  LinkedIn,
  WhatsApp
} from '@mui/icons-material';
import Layout from './Cham-Vault/components/Layout.jsx';

const Contact = () => {
  const contactInfo = [
    {
      icon: <Phone color="primary" />,
      title: 'Phone',
      details: '+254 712 345 678'
    },
    {
      icon: <Email color="primary" />,
      title: 'Email',
      details: 'info@chamavault.com'
    },
    {
      icon: <LocationOn color="primary" />,
      title: 'Location',
      details: 'Nairobi, Kenya'
    }
  ];

  const socialMedia = [
    { icon: <Facebook />, name: 'Facebook', link: 'https://facebook.com' },
    { icon: <Twitter />, name: 'Twitter', link: 'https://twitter.com' },
    { icon: <LinkedIn />, name: 'LinkedIn', link: 'https://linkedin.com' },
    { icon: <WhatsApp />, name: 'WhatsApp', link: 'https://whatsapp.com' }
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
              Contact Us
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Get in touch with our team for any inquiries or support
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {/* Contact Form */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  height: '100%',
                  '&:hover': {
                    boxShadow: 6,
                  },
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Send us a Message
                </Typography>
                <form>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="First Name"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Email"
                        variant="outlined"
                        type="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Phone"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Message"
                        variant="outlined"
                        multiline
                        rows={4}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        sx={{ mt: 2 }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                {contactInfo.map((info, index) => (
                  <Grid item xs={12} key={index}>
                    <Card
                      sx={{
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          transition: 'transform 0.3s ease-in-out',
                          boxShadow: 6,
                        },
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {info.icon}
                          <Box sx={{ ml: 2 }}>
                            <Typography variant="h6">{info.title}</Typography>
                            <Typography variant="body1" color="text.secondary">
                              {info.details}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}

                {/* Social Media */}
                <Grid item xs={12}>
                  <Card
                    sx={{
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        transition: 'transform 0.3s ease-in-out',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Follow Us
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        {socialMedia.map((social, index) => (
                          <IconButton
                            key={index}
                            color="primary"
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.name}
                          >
                            {social.icon}
                          </IconButton>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            {/* Map Section */}
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  mt: 4,
                  '&:hover': {
                    boxShadow: 6,
                  },
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Our Location
                </Typography>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '450px',
                    overflow: 'hidden',
                    borderRadius: 2,
                  }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d7977.632688436977!2d36.8155!3d-1.2841!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ske!4v1738078635275!5m2!1sen!2ske"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="ChamaVault Location"
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

export default Contact;
