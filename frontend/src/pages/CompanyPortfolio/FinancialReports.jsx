import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Button, Stack } from '@mui/material';
import Layout from './Cham-Vault/components/Layout.jsx';
import { 
  Assessment,
  BarChart,
  PieChart,
  Timeline,
  Download,
  Share,
  Print,
  CloudDownload
} from '@mui/icons-material';

const FinancialReports = () => {
  const features = [
    {
      title: 'Comprehensive Reports',
      description: 'Generate detailed financial reports including balance sheets, income statements, and cash flow analysis.',
      icon: <Assessment fontSize="large" color="primary" />
    },
    {
      title: 'Visual Analytics',
      description: 'Interactive charts and graphs for better understanding of financial data.',
      icon: <BarChart fontSize="large" color="primary" />
    },
    {
      title: 'Custom Reports',
      description: 'Create customized reports based on your specific requirements and preferences.',
      icon: <PieChart fontSize="large" color="primary" />
    },
    {
      title: 'Trend Analysis',
      description: 'Track financial trends and patterns over time with historical data analysis.',
      icon: <Timeline fontSize="large" color="primary" />
    }
  ];

  const reportTypes = [
    {
      title: 'Financial Statements',
      description: 'Balance sheets, income statements, and cash flow statements.'
    },
    {
      title: 'Member Reports',
      description: 'Individual member contributions, loans, and investment reports.'
    },
    {
      title: 'Performance Analytics',
      description: 'Group performance metrics and growth analysis reports.'
    },
    {
      title: 'Compliance Reports',
      description: 'Regulatory compliance and audit-ready financial reports.'
    }
  ];

  return (
    <Layout>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ my: 8, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Financial Reports
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Comprehensive Financial Reporting and Analytics
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            sx={{ mt: 2 }}
            href="/contact"
          >
            Get Started
          </Button>
        </Box>

        {/* Features Section */}
        <Box sx={{ py: 8 }}>
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            Key Features
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6,
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Report Types Section */}
        <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
          <Container maxWidth="md">
            <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
              Available Reports
            </Typography>
            <Grid container spacing={4} sx={{ mt: 4 }}>
              {reportTypes.map((report, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h5" component="h3" gutterBottom>
                        {report.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {report.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Export Options */}
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Export Options
          </Typography>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            <Button startIcon={<Download />} variant="outlined">
              PDF Export
            </Button>
            <Button startIcon={<Share />} variant="outlined">
              Share Report
            </Button>
            <Button startIcon={<Print />} variant="outlined">
              Print Report
            </Button>
            <Button startIcon={<CloudDownload />} variant="outlined">
              Excel Export
            </Button>
          </Stack>
        </Box>

        {/* CTA Section */}
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Ready to Generate Reports?
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Get started with our comprehensive financial reporting tools
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            color="primary"
            href="/contact"
            sx={{ mt: 2 }}
          >
            Contact Us Today
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

export default FinancialReports;
