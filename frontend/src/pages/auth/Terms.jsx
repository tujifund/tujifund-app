import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Terms = () => {
  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ marginTop: 8, padding: 4, border: '1px solid #ccc', borderRadius: '8px' }}>
        <Typography variant="h4" gutterBottom>
          Terms and Conditions for TujiFund
        </Typography>

        <Typography variant="body1" paragraph>
          Welcome to TujiFund, a platform designed to facilitate group savings and investments. By using our services, you agree to the following terms and conditions. Please read them carefully.
        </Typography>

        <Typography variant="h6" gutterBottom>
          1. Acceptance of Terms
        </Typography>
        <Typography variant="body1" paragraph>
          By accessing and using TujiFund, you accept and agree to be bound by these terms. If you do not agree to these terms, you should not use our services. We may modify these terms from time to time, and your continued use of the services constitutes acceptance of the modified terms. It is your responsibility to review these terms periodically for updates.
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. User Responsibilities
        </Typography>
        <Typography variant="body1" paragraph>
          Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security. We will not be liable for any loss or damage arising from your failure to comply with this obligation. Additionally, users must ensure that any information provided is accurate and up-to-date.
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We are committed to protecting your privacy. Please review our Privacy Policy, which explains how we collect, use, and disclose information about you. By using our services, you consent to the collection and use of your information as described in our Privacy Policy. We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure.
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. Purpose of TujiFund
        </Typography>
        <Typography variant="body1" paragraph>
          TujiFund is designed to help users manage their group savings and investments effectively. Users can create groups, set savings goals, and track contributions. By participating in TujiFund, you agree to use the platform responsibly and for its intended purpose. Misuse of the platform may result in account suspension or termination.
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. Limitations of Liability
        </Typography>
        <Typography variant="body1" paragraph>
          Our liability is limited to the maximum extent permitted by law. We are not liable for any indirect, incidental, or consequential damages arising from your use of our services, including but not limited to loss of profits, data, or goodwill. In no event shall our total liability to you for all damages, losses, and causes of action exceed the amount paid by you, if any, for using our services. This limitation applies to all claims, regardless of the nature of the action.
        </Typography>

        <Typography variant="h6" gutterBottom>
          6. Modifications to Terms
        </Typography>
        <Typography variant="body1" paragraph>
          We reserve the right to modify these terms at any time. We will provide notice of significant changes, and your continued use of our services constitutes acceptance of the modified terms. It is your responsibility to review these terms periodically for updates. Changes may include updates to fees, features, or functionalities of the service.
        </Typography>

        <Typography variant="h6" gutterBottom>
          7. Governing Law
        </Typography>
        <Typography variant="body1" paragraph>
          These terms are governed by the laws of the jurisdiction in which our company is located, without regard to its conflict of law principles. Any disputes arising out of or related to these terms shall be resolved in the courts located in that jurisdiction. You agree to submit to the personal jurisdiction of such courts.
        </Typography>

        <Typography variant="h6" gutterBottom>
          8. Termination
        </Typography>
        <Typography variant="body1" paragraph>
          We reserve the right to terminate or suspend your access to our services at any time, without prior notice or liability, for any reason, including if you breach these terms. Upon termination, your right to use the services will immediately cease. You may also terminate your account at any time by contacting customer support.
        </Typography>

        <Typography variant="h6" gutterBottom>
          9. Indemnification
        </Typography>
        <Typography variant="body1" paragraph>
          You agree to indemnify, defend, and hold harmless our company, its affiliates, and their respective officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, costs, or expenses, including reasonable attorneys' fees, arising out of or in any way connected with your access to or use of our services, your violation of these terms, or your infringement of any intellectual property or other rights of any person or entity. This obligation will survive termination of your account.
        </Typography>

        <Typography variant="h6" gutterBottom>
          10. Contact Information
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about these terms, please contact us at support@example.com. We encourage you to reach out with any concerns or inquiries regarding your rights and responsibilities while using TujiFund.
        </Typography>

        <Typography variant="body1" paragraph>
          Thank you for using TujiFund!
        </Typography>
      </Box>
    </Container>
  );
};

export default Terms;
