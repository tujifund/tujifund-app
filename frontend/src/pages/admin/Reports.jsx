import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  TextField,
  MenuItem,
} from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';

const mockData = {
  accounts: [
    {
      id: 1,
      name: 'John Doe',
      accountType: 'Individual - Normal',
      principal: 5000,
      interestEarned: 250,
      interestPaid: 200,
      pendingInterest: 50,
    },
    {
      id: 2,
      name: 'Investment Group A',
      accountType: 'Group',
      principal: 10000,
      interestEarned: 500,
      interestPaid: 0,
      pendingInterest: 500,
    },
  ],
  summary: {
    totalPrincipal: 15000,
    totalInterestEarned: 750,
    totalInterestPaid: 200,
    totalPendingInterest: 550,
  },
};

function Reports() {
  const [reportType, setReportType] = useState('all');
  const [dateRange, setDateRange] = useState('month');

  const generateCumulativeReport = () => {
    // Logic to generate cumulative report
    console.log('Generating cumulative report');
  };

  const handleGenerateReport = () => {
    generateCumulativeReport();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Report Controls */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', gap: 2 }}>
            <TextField
              select
              label="Report Type"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="all">All Accounts</MenuItem>
              <MenuItem value="individual">Individual Accounts</MenuItem>
              <MenuItem value="group">Group Accounts</MenuItem>
            </TextField>
            <TextField
              select
              label="Date Range"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="month">This Month</MenuItem>
              <MenuItem value="quarter">This Quarter</MenuItem>
              <MenuItem value="year">This Year</MenuItem>
            </TextField>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              sx={{ ml: 'auto' }}
            >
              Export Report
            </Button>
            <Button
              variant="contained"
              onClick={handleGenerateReport}
              sx={{ ml: 2 }}
            >
              Generate Cumulative Report
            </Button>
          </Paper>
        </Grid>

        {/* Summary Cards */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" color="primary">
              Total Principal
            </Typography>
            <Typography variant="h4">${mockData.summary.totalPrincipal}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" color="primary">
              Total Interest Earned
            </Typography>
            <Typography variant="h4">${mockData.summary.totalInterestEarned}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" color="primary">
              Total Interest Paid
            </Typography>
            <Typography variant="h4">${mockData.summary.totalInterestPaid}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" color="primary">
              Pending Interest
            </Typography>
            <Typography variant="h4">${mockData.summary.totalPendingInterest}</Typography>
          </Paper>
        </Grid>

        {/* Detailed Report Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Detailed Account Reports
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Account Name</TableCell>
                    <TableCell>Account Type</TableCell>
                    <TableCell align="right">Principal ($)</TableCell>
                    <TableCell align="right">Interest Earned ($)</TableCell>
                    <TableCell align="right">Interest Paid ($)</TableCell>
                    <TableCell align="right">Pending Interest ($)</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockData.accounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell>{account.name}</TableCell>
                      <TableCell>{account.accountType}</TableCell>
                      <TableCell align="right">{account.principal}</TableCell>
                      <TableCell align="right">{account.interestEarned}</TableCell>
                      <TableCell align="right">{account.interestPaid}</TableCell>
                      <TableCell align="right">{account.pendingInterest}</TableCell>
                      <TableCell>
                        <Button size="small">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Reports;
