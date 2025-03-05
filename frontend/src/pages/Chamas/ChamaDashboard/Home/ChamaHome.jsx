import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  Group,
  MonetizationOn,
  Event,
  Notifications,
  TrendingUp,
  CalendarToday,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';

const ChamaHome = () => {
  const { chamaId } = useParams();

  // Mock data - replace with API calls
  const chamaStats = {
    totalMembers: 15,
    activeMembers: 12,
    totalContributions: 250000,
    totalLoans: 150000,
    nextMeeting: '2025-01-15 14:00',
    contributionTarget: 500000,
    currentContributions: 250000,
  };

  const recentActivities = [
    {
      id: 1,
      type: 'contribution',
      user: 'John Doe',
      amount: 5000,
      date: '2025-01-12',
    },
    {
      id: 2,
      type: 'loan',
      user: 'Jane Smith',
      amount: 50000,
      date: '2025-01-11',
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Monthly Meeting',
      date: '2025-01-15',
      time: '14:00',
      type: 'meeting',
    },
    {
      id: 2,
      title: 'Loan Disbursement',
      date: '2025-01-16',
      time: '10:00',
      type: 'financial',
    },
  ];

  const memberContributions = [
    { name: 'John Doe', status: 'Paid', amount: 5000 },
    { name: 'Jane Smith', status: 'Pending', amount: 5000 },
    { name: 'Bob Wilson', status: 'Overdue', amount: 5000 },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
      {chamaId.id}
      Chama Dashboard
      </Typography>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Group sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h6">Members</Typography>
              </Box>
              <Typography variant="h4">{chamaStats.totalMembers}</Typography>
              <Typography variant="body2" color="textSecondary">
                {chamaStats.activeMembers} active members
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <MonetizationOn sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h6">Contributions</Typography>
              </Box>
              <Typography variant="h4">
                KES {chamaStats.totalContributions.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total contributions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUp sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h6">Loans</Typography>
              </Box>
              <Typography variant="h4">
                KES {chamaStats.totalLoans.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total loans issued
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Event sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h6">Next Meeting</Typography>
              </Box>
              <Typography variant="h4">
                {new Date(chamaStats.nextMeeting).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {new Date(chamaStats.nextMeeting).toLocaleTimeString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Progress Towards Goal */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Progress Towards Goal
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">
                Current: KES {chamaStats.currentContributions.toLocaleString()}
              </Typography>
              <Typography variant="body2">
                Target: KES {chamaStats.contributionTarget.toLocaleString()}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(chamaStats.currentContributions / chamaStats.contributionTarget) * 100}
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Recent Activities</Typography>
                <Button color="primary">View All</Button>
              </Box>
              <List>
                {recentActivities.map((activity) => (
                  <React.Fragment key={activity.id}>
                    <ListItem>
                      <ListItemIcon>
                        {activity.type === 'contribution' ? (
                          <MonetizationOn color="primary" />
                        ) : (
                          <TrendingUp color="secondary" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={activity.user}
                        secondary={`${activity.type === 'contribution' ? 'Contributed' : 'Borrowed'} KES ${activity.amount.toLocaleString()}`}
                      />
                      <Typography variant="caption" color="textSecondary">
                        {activity.date}
                      </Typography>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Events */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Upcoming Events</Typography>
                <Button color="primary">View Calendar</Button>
              </Box>
              <List>
                {upcomingEvents.map((event) => (
                  <React.Fragment key={event.id}>
                    <ListItem>
                      <ListItemIcon>
                        <CalendarToday color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={event.title}
                        secondary={`${event.date} at ${event.time}`}
                      />
                      <Chip
                        label={event.type}
                        color={event.type === 'meeting' ? 'primary' : 'secondary'}
                        size="small"
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Member Contributions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Member Contributions</Typography>
                <Button color="primary">View All Members</Button>
              </Box>
              <List>
                {memberContributions.map((member, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>
                        <Avatar>{member.name[0]}</Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={member.name}
                        secondary={`Expected: KES ${member.amount.toLocaleString()}`}
                      />
                      <Chip
                        label={member.status}
                        color={
                          member.status === 'Paid'
                            ? 'success'
                            : member.status === 'Pending'
                            ? 'warning'
                            : 'error'
                        }
                        size="small"
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChamaHome;
