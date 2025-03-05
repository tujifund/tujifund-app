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
  Avatar
} from '@mui/material';
import Layout from '../Cham-Vault/components/Layout.jsx';
import {
  Event,
  Assessment,
  Timeline,
  Notifications,
  Assignment,
  Group,
  CalendarToday,
  VideoCall,
  CheckCircle,
  Description,
  Poll,
  Chat,
  Schedule,
  RecordVoiceOver
} from '@mui/icons-material';

const MeetingManagement = () => {
  const features = [
    {
      title: 'Meeting Scheduling',
      description: 'Efficient meeting organization and planning',
      icon: <Event color="primary" />,
      details: [
        'Calendar integration',
        'Automated reminders',
        'Venue management',
        'Attendance tracking',
        'Schedule conflicts resolution'
      ]
    },
    {
      title: 'Virtual Meetings',
      description: 'Comprehensive virtual meeting platform',
      icon: <VideoCall color="primary" />,
      details: [
        'Video conferencing',
        'Screen sharing',
        'Recording capability',
        'Chat functionality',
        'Virtual voting'
      ]
    },
    {
      title: 'Documentation',
      description: 'Complete meeting documentation system',
      icon: <Description color="primary" />,
      details: [
        'Agenda creation',
        'Minutes recording',
        'Action items tracking',
        'Document sharing',
        'Resolution management'
      ]
    },
    {
      title: 'Member Participation',
      description: 'Enhanced member engagement tools',
      icon: <RecordVoiceOver color="primary" />,
      details: [
        'Attendance tracking',
        'Participation metrics',
        'Voting system',
        'Feedback collection',
        'Discussion forums'
      ]
    }
  ];

  const meetingTypes = [
    {
      type: 'Regular Meetings',
      icon: <Event />,
      schedule: 'Monthly',
      features: ['Progress Updates', 'Financial Reports', 'Member Updates']
    },
    {
      type: 'AGM',
      icon: <Group />,
      schedule: 'Yearly',
      features: ['Annual Reports', 'Elections', 'Strategic Planning']
    },
    {
      type: 'Committee Meetings',
      icon: <Assignment />,
      schedule: 'Weekly',
      features: ['Project Planning', 'Task Assignment', 'Progress Review']
    },
    {
      type: 'Emergency Meetings',
      icon: <Notifications />,
      schedule: 'As Needed',
      features: ['Urgent Decisions', 'Crisis Management', 'Quick Resolution']
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
              Meeting Management
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Streamline your Chama meetings with our comprehensive management system
            </Typography>
          </Box>

          {/* Meeting Types */}
          <Paper
            sx={{
              p: 4,
              mb: 8,
              background: 'linear-gradient(135deg, #2C3E50 0%, #3498DB 100%)',
              color: 'white',
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Meeting Types & Schedule
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {meetingTypes.map((meeting) => (
                <Grid item xs={12} sm={6} md={3} key={meeting.type}>
                  <Card
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      color: 'white',
                      height: '100%',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        transition: 'transform 0.3s ease-in-out',
                      },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <Avatar
                          sx={{
                            bgcolor: 'primary.main',
                            width: 56,
                            height: 56
                          }}
                        >
                          {meeting.icon}
                        </Avatar>
                      </Box>
                      <Typography variant="h6" align="center" gutterBottom>
                        {meeting.type}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        align="center"
                        sx={{ mb: 2, color: 'primary.light' }}
                      >
                        {meeting.schedule}
                      </Typography>
                      <List dense>
                        {meeting.features.map((feature) => (
                          <ListItem key={feature}>
                            <ListItemIcon>
                              <CheckCircle sx={{ color: 'primary.light' }} fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                              primary={feature}
                              sx={{ '& .MuiListItemText-primary': { fontSize: '0.875rem' } }}
                            />
                          </ListItem>
                        ))}
                      </List>
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

          {/* Meeting Process */}
          <Paper sx={{ p: 4, mb: 8, bgcolor: 'grey.50' }}>
            <Typography variant="h4" align="center" gutterBottom>
              Meeting Process Flow
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <CalendarToday color="primary" sx={{ fontSize: 40 }} />
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    Schedule
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Plan and organize
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Assignment color="primary" sx={{ fontSize: 40 }} />
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    Prepare
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Set agenda and docs
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Group color="primary" sx={{ fontSize: 40 }} />
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    Conduct
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Run the meeting
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Description color="primary" sx={{ fontSize: 40 }} />
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    Follow-up
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Minutes and actions
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* CTA Section */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h4" gutterBottom>
              Ready to Transform Your Meetings?
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
                startIcon={<Event />}
              >
                Schedule Now
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                href="/contact"
                startIcon={<VideoCall />}
              >
                Try Virtual Meeting
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default MeetingManagement;
