import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container component="main" maxWidth="md">
      <Box sx={{  marginTop: 8, padding: 4, border: '1px solid #ccc', borderRadius: '8px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          Your privacy is important to us. This privacy policy explains how we collect, use, and protect your information when you use our services.
        </Typography>
        
        <Typography variant="h6" component="h2" gutterBottom>
          Information We Collect
        </Typography>
        <Typography variant="body1" paragraph>
          We may collect personal information such as your name, email address, and phone number when you register for an account.
        </Typography>
        
        <Typography variant="h6" component="h2" gutterBottom>
          How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          We use your information to provide and improve our services, communicate with you, and comply with legal obligations.
        </Typography>
        
        <Typography variant="h6" component="h2" gutterBottom>
          Cookies and Tracking Technologies
        </Typography>
        <Typography variant="body1" paragraph>
          We use cookies and similar tracking technologies to monitor activity on our service and store certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
        </Typography>
        
        <Typography variant="h6" component="h2" gutterBottom>
          Third-Party Services
        </Typography>
        <Typography variant="body1" paragraph>
          We may employ third-party companies and services to facilitate our service, provide the service on our behalf, perform service-related services, or assist us in analyzing how our service is used. These third parties may have access to your personal data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
        </Typography>
        
        <Typography variant="h6" component="h2" gutterBottom>
          User Rights
        </Typography>
        <Typography variant="body1" paragraph>
          You have the right to access, correct, or delete your personal data. If you wish to be informed about what personal data we hold about you and if you want it to be removed from our systems, please contact us.
        </Typography>
        
        <Typography variant="h6" component="h2" gutterBottom>
          Data Security
        </Typography>
        <Typography variant="body1" paragraph>
          We implement security measures to protect your personal information from unauthorized access, use, or disclosure.
        </Typography>
        
        <Typography variant="h6" component="h2" gutterBottom>
          Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
        </Typography>
        
        <Typography variant="h6" component="h2" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about this privacy policy, please contact us at [your contact information].
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;