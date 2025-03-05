import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';

const ReportsPage = () => {
  const [reportType, setReportType] = useState('financial');
  const [timeRange, setTimeRange] = useState('month');

  // Mock data - replace with actual API data
  const financialData = [
    { month: 'Jan', contributions: 50000, loans: 30000, investments: 20000 },
    { month: 'Feb', contributions: 55000, loans: 35000, investments: 25000 },
    { month: 'Mar', contributions: 45000, loans: 25000, investments: 30000 },
    { month: 'Apr', contributions: 60000, loans: 40000, investments: 35000 },
  ];

  const activityLog = [
    {
      id: 1,
      date: '2025-01-12',
      action: 'Payment Received',
      user: 'John Doe',
      details: 'Monthly contribution - KES 5,000',
    },
    {
      id: 2,
      date: '2025-01-11',
      action: 'Loan Approved',
      user: 'Jane Smith',
      details: 'Business Loan - KES 50,000',
    },
  ];

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' }, 
        justifyContent: 'space-between', 
        alignItems: { xs: 'stretch', sm: 'center' }, 
        mb: { xs: 2, sm: 3 }, 
        gap: 2 
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          Reports & Analytics
        </Typography>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          sx={{ 
            bgcolor: '#1a237e',
            width: { xs: '100%', sm: 'auto' }
          }}
        >
          Export Report
        </Button>
      </Box>
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Card sx={{ mb: { xs: 2, sm: 3 } }}>
            <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
              <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Report Type</InputLabel>
                    <Select
                      value={reportType}
                      label="Report Type"
                      onChange={(e) => setReportType(e.target.value)}
                    >
                      <MenuItem value="financial">Financial Report</MenuItem>
                      <MenuItem value="membership">Membership Report</MenuItem>
                      <MenuItem value="activity">Activity Log</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Time Range</InputLabel>
                    <Select
                      value={timeRange}
                      label="Time Range"
                      onChange={(e) => setTimeRange(e.target.value)}
                    >
                      <MenuItem value="week">Last Week</MenuItem>
                      <MenuItem value="month">Last Month</MenuItem>
                      <MenuItem value="quarter">Last Quarter</MenuItem>
                      <MenuItem value="year">Last Year</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {reportType === 'financial' && (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{
                bgcolor: '#e3f2fd',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                p: { xs: 1, sm: 2 }
              }}>
                <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      fontSize: { xs: '1rem', sm: '1.25rem' },
                      textAlign: { xs: 'center', sm: 'left' }
                    }}
                  >
                    Total Contributions
                  </Typography>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2.125rem' },
                      textAlign: { xs: 'center', sm: 'left' }
                    }}
                  >
                    KES {financialData.reduce((acc, item) => acc + item.contributions, 0).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{
                bgcolor: '#e3f2fd',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                p: { xs: 1, sm: 2 }
              }}>
                <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      fontSize: { xs: '1rem', sm: '1.25rem' },
                      textAlign: { xs: 'center', sm: 'left' }
                    }}
                  >
                    Total Loans
                  </Typography>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2.125rem' },
                      textAlign: { xs: 'center', sm: 'left' }
                    }}
                  >
                    KES {financialData.reduce((acc, item) => acc + item.loans, 0).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{
                bgcolor: '#e3f2fd',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                p: { xs: 1, sm: 2 }
              }}>
                <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      fontSize: { xs: '1rem', sm: '1.25rem' },
                      textAlign: { xs: 'center', sm: 'left' }
                    }}
                  >
                    Total Investments
                  </Typography>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2.125rem' },
                      textAlign: { xs: 'center', sm: 'left' }
                    }}
                  >
                    KES {financialData.reduce((acc, item) => acc + item.investments, 0).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{ 
                      fontSize: { xs: '1rem', sm: '1.25rem' },
                      mb: { xs: 1, sm: 2 }
                    }}
                  >
                    Financial Overview
                  </Typography>
                  <TableContainer>
                    <Table 
                      size="small" 
                      sx={{ 
                        '& .MuiTableCell-root': {
                          px: { xs: 1, sm: 2 },
                          py: { xs: 0.5, sm: 1 },
                          fontSize: { xs: '0.75rem', sm: '0.875rem' }
                        }
                      }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Month</TableCell>
                          <TableCell align="right">Contrib.</TableCell>
                          <TableCell align="right">Loans</TableCell>
                          <TableCell align="right">Invest.</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {financialData.map((row) => (
                          <TableRow key={row.month}>
                            <TableCell>{row.month}</TableCell>
                            <TableCell align="right">{row.contributions.toLocaleString()}</TableCell>
                            <TableCell align="right">{row.loans.toLocaleString()}</TableCell>
                            <TableCell align="right">{row.investments.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}

        {reportType === 'activity' && (
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                    mb: { xs: 1, sm: 2 }
                  }}
                >
                  Activity Log
                </Typography>
                <TableContainer>
                  <Table 
                    size="small"
                    sx={{ 
                      '& .MuiTableCell-root': {
                        px: { xs: 1, sm: 2 },
                        py: { xs: 0.5, sm: 1 },
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                      }
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Action</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Details</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {activityLog.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell>{log.date}</TableCell>
                          <TableCell>{log.action}</TableCell>
                          <TableCell>{log.user}</TableCell>
                          <TableCell>{log.details}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ReportsPage;
