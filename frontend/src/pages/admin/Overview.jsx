import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

const data = [
  { month: 'Jan', loans: 490000, interest: 104000, unpayedLoans: 14000 },
  { month: 'Feb', loans: 300200, interest: 79900, unpayedLoans: 12000 },
  { month: 'Mar', loans: 420000, interest: 59800, unpayedLoans: 12500 },
  { month: 'Apr', loans: 207800, interest: 69800, unpayedLoans: 10000 },
  { month: 'May', loans: 290900, interest: 88000, unpayedLoans: 11800 },
  { month: 'Jun', loans: 520300, interest: 108000, unpayedLoans: 15000 },
];

function Overview() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Total Loans
            </Typography>
            <Typography component="p" variant="h4">
              $240,000
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              as of {new Date().toLocaleDateString()}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Total Interest Earned
            </Typography>
            <Typography component="p" variant="h4">
              $3,024
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              Current Month
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Pending Approvals
            </Typography>
            <Typography component="p" variant="h4">
              $4,500
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              3 requests pending
            </Typography>
          </Paper>
        </Grid>

        {/* Charts */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Financial Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="loans" fill="#8884d8" />
                <Bar dataKey="interest" fill="#82ca9d" />
                <Bar dataKey="unpayedLoans" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Recent Activity
            </Typography>
            {/* Add activity list here */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                • New deposit from John Doe - $1,000 (2 hours ago)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Withdrawal request from Jane Smith - $500 (5 hours ago)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Interest payment processed for Group Account A - $300 (1 day ago)
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Overview;
