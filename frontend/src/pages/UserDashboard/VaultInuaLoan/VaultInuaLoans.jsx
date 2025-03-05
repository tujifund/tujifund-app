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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MonetizationOn,
  Assignment,
  AccountBalance,
  CalendarToday,
  Assessment,
  Person,
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { useParams } from 'react-router-dom';

const VaultInuaLoans = () => {
  const { chamaId } = useParams();
  const [currentTab, setCurrentTab] = useState(0);
  const [openNewLoan, setOpenNewLoan] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [loanDetails, setLoanDetails] = useState({
    amount: '',
    purpose: '',
    duration: '',
    startDate: new Date(),
    guarantors: [],
    collateral: '',
  });

  // Mock data - replace with API calls
  const loans = [
    {
      id: 1,
      member: 'John Doe',
      amount: 50000,
      purpose: 'Business Expansion',
      duration: '12 months',
      interestRate: 10,
      startDate: '2025-01-01',
      status: 'Active',
      remainingAmount: 45000,
      nextPayment: '2025-02-01',
      guarantors: ['Jane Smith', 'Bob Wilson'],
    },
    {
      id: 2,
      member: 'Jane Smith',
      amount: 30000,
      purpose: 'Education',
      duration: '6 months',
      interestRate: 8,
      startDate: '2025-01-05',
      status: 'Pending Approval',
      remainingAmount: 30000,
      nextPayment: null,
      guarantors: ['John Doe', 'Alice Brown'],
    },
  ];

  const loanStats = {
    totalLoans: 500000,
    activeLoans: 350000,
    defaultedLoans: 20000,
    availableFunds: 150000,
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleNewLoan = () => {
    setSelectedLoan(null);
    setActiveStep(0);
    setOpenNewLoan(true);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const steps = ['Loan Details', 'Guarantors', 'Collateral', 'Review'];

  const renderLoanStats = () => (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Loans
            </Typography>
            <Typography variant="h4">
              KES {loanStats.totalLoans.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Active Loans
            </Typography>
            <Typography variant="h4">
              KES {loanStats.activeLoans.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Defaulted Loans
            </Typography>
            <Typography variant="h4" color="error">
              KES {loanStats.defaultedLoans.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Available Funds
            </Typography>
            <Typography variant="h4" color="success">
              KES {loanStats.availableFunds.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderLoanForm = () => {
    switch (activeStep) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Loan Amount"
                type="number"
                value={loanDetails.amount}
                onChange={(e) => setLoanDetails({ ...loanDetails, amount: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Duration</InputLabel>
                <Select
                  value={loanDetails.duration}
                  onChange={(e) => setLoanDetails({ ...loanDetails, duration: e.target.value })}
                >
                  <MenuItem value="3">3 months</MenuItem>
                  <MenuItem value="6">6 months</MenuItem>
                  <MenuItem value="12">12 months</MenuItem>
                  <MenuItem value="24">24 months</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Purpose"
                multiline
                rows={3}
                value={loanDetails.purpose}
                onChange={(e) => setLoanDetails({ ...loanDetails, purpose: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Start Date"
                  value={loanDetails.startDate}
                  onChange={(newValue) => setLoanDetails({ ...loanDetails, startDate: newValue })}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Select Guarantors
            </Typography>
            <List>
              {['Jane Smith', 'Bob Wilson', 'Alice Brown'].map((member) => (
                <ListItem key={member}>
                  <ListItemIcon>
                    <Avatar>{member[0]}</Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={member}
                    secondary="Available as guarantor"
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      const newGuarantors = [...loanDetails.guarantors];
                      if (newGuarantors.includes(member)) {
                        newGuarantors.splice(newGuarantors.indexOf(member), 1);
                      } else {
                        newGuarantors.push(member);
                      }
                      setLoanDetails({ ...loanDetails, guarantors: newGuarantors });
                    }}
                  >
                    {loanDetails.guarantors.includes(member) ? 'Remove' : 'Add'}
                  </Button>
                </ListItem>
              ))}
            </List>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Collateral Details
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Collateral Description"
              value={loanDetails.collateral}
              onChange={(e) => setLoanDetails({ ...loanDetails, collateral: e.target.value })}
              placeholder="Describe the collateral in detail..."
            />
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Loan Application Summary
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Amount:</Typography>
                <Typography>KES {Number(loanDetails.amount).toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Duration:</Typography>
                <Typography>{loanDetails.duration} months</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Purpose:</Typography>
                <Typography>{loanDetails.purpose}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Guarantors:</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {loanDetails.guarantors.map((guarantor) => (
                    <Chip key={guarantor} label={guarantor} />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Collateral:</Typography>
                <Typography>{loanDetails.collateral}</Typography>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return null;
    }
  };

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
            <TableCell>Progress</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loans.map((loan) => (
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
          Vault Inua Loans
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNewLoan}
          sx={{ bgcolor: '#1a237e' }}
        >
          Request Vault Loan
        </Button>
      </Box>

      {renderLoanStats()}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Active Loans" />
          <Tab label="Pending Approval" />
          <Tab label="Completed Loans" />
        </Tabs>
      </Box>

      {renderLoans()}

      {/* New Loan Application Dialog */}
      <Dialog
        open={openNewLoan}
        onClose={() => setOpenNewLoan(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedLoan ? 'Edit Loan' : 'Vault Loan Application'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {renderLoanForm()}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewLoan(false)}>
            Cancel
          </Button>
          {activeStep > 0 && (
            <Button onClick={handleBack}>
              Back
            </Button>
          )}
          <Button
            variant="contained"
            sx={{ bgcolor: '#1a237e' }}
            onClick={activeStep === steps.length - 1 ? () => setOpenNewLoan(false) : handleNext}
          >
            {activeStep === steps.length - 1 ? 'Submit Application' : 'Next'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VaultInuaLoans;
