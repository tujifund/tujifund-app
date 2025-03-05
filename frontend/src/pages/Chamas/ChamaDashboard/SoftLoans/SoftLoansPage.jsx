import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tab,
  Tabs,
  Avatar,
  LinearProgress,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MonetizationOn,
  Person,
  CalendarToday,
  Assessment,
  Warning,
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { useParams } from 'react-router-dom';

const SoftLoansPage = () => {
  const { chamaId } = useParams();
  const [currentTab, setCurrentTab] = useState(0);
  const [openNewLoan, setOpenNewLoan] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock data - replace with API calls
  const softLoanStats = {
    totalLoans: 100000,
    activeLoans: 75000,
    defaultedLoans: 5000,
    availableFunds: 25000,
    maxLoanAmount: 10000,
    interestRate: 5,
    maxDuration: 3, // months
  };

  const softLoans = [
    {
      id: 1,
      member: 'John Doe',
      amount: 8000,
      purpose: 'Emergency Medical',
      duration: '2 months',
      interestRate: 5,
      startDate: '2025-01-01',
      status: 'Active',
      remainingAmount: 6000,
      nextPayment: '2025-02-01',
      urgency: 'High',
    },
    {
      id: 2,
      member: 'Jane Smith',
      amount: 5000,
      purpose: 'School Fees',
      duration: '1 month',
      interestRate: 5,
      startDate: '2025-01-10',
      status: 'Pending Approval',
      remainingAmount: 5000,
      nextPayment: null,
      urgency: 'Medium',
    },
  ];

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleNewLoan = () => {
    setSelectedLoan(null);
    setOpenNewLoan(true);
  };

  const renderSoftLoanStats = () => (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <MonetizationOn sx={{ color: 'primary.main', mr: 1 }} />
              <Typography color="textSecondary">Total Soft Loans</Typography>
            </Box>
            <Typography variant="h4">
              KES {softLoanStats.totalLoans.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Assessment sx={{ color: 'success.main', mr: 1 }} />
              <Typography color="textSecondary">Active Loans</Typography>
            </Box>
            <Typography variant="h4" color="success.main">
              KES {softLoanStats.activeLoans.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Warning sx={{ color: 'error.main', mr: 1 }} />
              <Typography color="textSecondary">Defaulted Loans</Typography>
            </Box>
            <Typography variant="h4" color="error.main">
              KES {softLoanStats.defaultedLoans.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <MonetizationOn sx={{ color: 'info.main', mr: 1 }} />
              <Typography color="textSecondary">Available Funds</Typography>
            </Box>
            <Typography variant="h4" color="info.main">
              KES {softLoanStats.availableFunds.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderLoanForm = () => (
    <Box sx={{ mt: 2 }}>
      <Alert severity="info" sx={{ mb: 2 }}>
        Maximum loan amount: KES {softLoanStats.maxLoanAmount.toLocaleString()}
        <br />
        Interest Rate: {softLoanStats.interestRate}% per month
        <br />
        Maximum Duration: {softLoanStats.maxDuration} months
      </Alert>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Loan Amount"
            type="number"
            inputProps={{
              max: softLoanStats.maxLoanAmount,
              min: 1000,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Duration</InputLabel>
            <Select defaultValue={1}>
              <MenuItem value={1}>1 month</MenuItem>
              <MenuItem value={2}>2 months</MenuItem>
              <MenuItem value={3}>3 months</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Urgency Level</InputLabel>
            <Select defaultValue="medium">
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Purpose"
            multiline
            rows={3}
            placeholder="Explain the reason for the soft loan request..."
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderLoans = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Member</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Purpose</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Urgency</TableCell>
            <TableCell>Progress</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {softLoans.map((loan) => (
            <TableRow key={loan.id}>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ mr: 1 }}>{loan.member[0]}</Avatar>
                  {loan.member}
                </Box>
              </TableCell>
              <TableCell>KES {loan.amount.toLocaleString()}</TableCell>
              <TableCell>{loan.purpose}</TableCell>
              <TableCell>{loan.duration}</TableCell>
              <TableCell>{loan.startDate}</TableCell>
              <TableCell>
                <Chip
                  label={loan.status}
                  color={
                    loan.status === 'Active'
                      ? 'success'
                      : loan.status === 'Pending Approval'
                      ? 'warning'
                      : 'error'
                  }
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={loan.urgency}
                  color={
                    loan.urgency === 'High'
                      ? 'error'
                      : loan.urgency === 'Medium'
                      ? 'warning'
                      : 'success'
                  }
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={((loan.amount - loan.remainingAmount) / loan.amount) * 100}
                    />
                  </Box>
                  <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="textSecondary">
                      {Math.round(((loan.amount - loan.remainingAmount) / loan.amount) * 100)}%
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => {
                    setSelectedLoan(loan);
                    setOpenNewLoan(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton color="primary">
                  <Assessment />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">
          Soft Loans
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNewLoan}
          sx={{ bgcolor: '#1a237e' }}
        >
          Request Soft Loan
        </Button>
      </Box>

      {renderSoftLoanStats()}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Active Loans" />
          <Tab label="Pending Approval" />
          <Tab label="Completed Loans" />
        </Tabs>
      </Box>

      {renderLoans()}

      {/* New Soft Loan Dialog */}
      <Dialog
        open={openNewLoan}
        onClose={() => setOpenNewLoan(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedLoan ? 'Edit Soft Loan' : 'Request Soft Loan'}
        </DialogTitle>
        <DialogContent>
          {renderLoanForm()}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewLoan(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: '#1a237e' }}
          >
            {selectedLoan ? 'Save Changes' : 'Submit Request'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SoftLoansPage;
