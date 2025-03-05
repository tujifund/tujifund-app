import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  TableContainer, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
  Chip,
  Stepper,
  Step,
  StepLabel,
  Snackbar,
  Alert,
  Checkbox,
  FormControlLabel,
  Switch
} from '@mui/material';
import { 
  AccountBalance, 
  MonetizationOn, 
  CreditCard, 
  Healing, 
  ShowChart, 
  CurrencyExchange,
  Add,
  Edit,
  Delete,
  FilterList,
  Sort,
  Person,
  PersonAdd,
  Group,
  Download,
  Save,
  Send,
  Schedule
} from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Mock data service (replace with actual backend calls)
const mockDataService = {
  getMembers: () => [
    { 
      id: 1, 
      name: 'John Doe', 
      phoneNumber: '0712345678', 
      accountNumber: '1234567890',
      status: 'Active',
      contributions: {
        shares: 50000,
        welfare: 10000,
        merryGoRound: 20000,
        socialFunds: 5000,
        investmentFund: 30000,
        loanFund: 15000
      }
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      phoneNumber: '0787654321', 
      accountNumber: '0987654321',
      status: 'Pending',
      contributions: {
        shares: 30000,
        welfare: 5000,
        merryGoRound: 15000,
        socialFunds: 3000,
        investmentFund: 20000,
        loanFund: 10000
      }
    }
  ],

  getDisbursementHistory: () => [
    {
      id: 1,
      date: '2024-01-15',
      fundType: 'Shares',
      subType: 'Regular Shares',
      amount: 50000,
      recipient: 'John Doe',
      method: 'Bank Transfer'
    },
    {
      id: 2,
      date: '2024-01-20',
      fundType: 'Welfare Fund',
      subType: 'Medical Support',
      amount: 10000,
      recipient: 'Jane Smith',
      method: 'M-Pesa'
    },
    {
      id: 3,
      date: '2024-01-25',
      fundType: 'Investment Fund',
      subType: 'Group Business',
      amount: 75000,
      recipient: 'Group Account',
      method: 'Direct Investment'
    },
    {
      id: 4,
      date: '2024-02-01',
      fundType: 'Loan Fund',
      subType: 'Business Loans',
      amount: 50000,
      recipient: 'John Doe',
      method: 'Bank Transfer'
    }
  ]
};

const VaultManager = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State Management
  const [activeTab, setActiveTab] = useState(0);
  const [members, setMembers] = useState([]);
  const [disbursementHistory, setDisbursementHistory] = useState([]);
  const [selectedFund, setSelectedFund] = useState(null);
  const [fundDetailsDialogOpen, setFundDetailsDialogOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [disbursementSchedule, setDisbursementSchedule] = useState({
    isScheduled: false,
    scheduledDate: new Date()
  });
  const [disbursementMethod, setDisbursementMethod] = useState('equal');
  const [customAmounts, setCustomAmounts] = useState({});
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    phoneNumber: '',
    accountNumber: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Expanded Contribution Types
  const contributionTypes = [
    { 
      name: 'Shares', 
      icon: <ShowChart />, 
      description: 'Member equity contributions',
      totalAmount: 500000,
      subTypes: [
        { name: 'Regular Shares', amount: 300000 },
        { name: 'Preferred Shares', amount: 200000 }
      ]
    },
    { 
      name: 'Welfare Fund', 
      icon: <Healing />, 
      description: 'Emergency and support fund',
      totalAmount: 250000,
      subTypes: [
        { name: 'Medical Support', amount: 100000 },
        { name: 'Education Support', amount: 75000 },
        { name: 'Emergency Relief', amount: 75000 }
      ]
    },
    { 
      name: 'Merry Go Round', 
      icon: <CurrencyExchange />, 
      description: 'Rotating savings and credit',
      totalAmount: 350000,
      subTypes: [
        { name: 'Monthly Rotation', amount: 200000 },
        { name: 'Quarterly Rotation', amount: 150000 }
      ]
    },
    { 
      name: 'Social Funds', 
      icon: <Group />, 
      description: 'Community and social activities',
      totalAmount: 200000,
      subTypes: [
        { name: 'Celebrations', amount: 75000 },
        { name: 'Community Projects', amount: 125000 }
      ]
    },
    { 
      name: 'Investment Fund', 
      icon: <AccountBalance />, 
      description: 'Collective group investments',
      totalAmount: 750000,
      subTypes: [
        { name: 'Group Business', amount: 400000 },
        { name: 'Real Estate', amount: 250000 },
        { name: 'Stock Investments', amount: 100000 }
      ]
    },
    { 
      name: 'Loan Fund', 
      icon: <CreditCard />, 
      description: 'Internal lending and loan management',
      totalAmount: 450000,
      subTypes: [
        { name: 'Emergency Loans', amount: 150000 },
        { name: 'Business Loans', amount: 200000 },
        { name: 'Personal Loans', amount: 100000 }
      ]
    }
  ];

  // Load initial data
  useEffect(() => {
    setMembers(mockDataService.getMembers());
    setDisbursementHistory(mockDataService.getDisbursementHistory());
  }, []);

  // Member Management
  const handleAddMember = () => {
    if (!newMember.name || !newMember.phoneNumber || !newMember.accountNumber) {
      setSnackbarMessage('Please fill all fields');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const updatedMembers = [...members, {
      ...newMember,
      id: members.length + 1,
      status: 'Pending',
      contributions: {
        shares: 0,
        welfare: 0,
        merryGoRound: 0,
        socialFunds: 0,
        investmentFund: 0,
        loanFund: 0
      }
    }];

    setMembers(updatedMembers);
    setAddMemberDialogOpen(false);
    setNewMember({ name: '', phoneNumber: '', accountNumber: '' });
    setSnackbarMessage('Member added successfully');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  // Handle Fund Card Click
  const handleFundCardClick = (fund) => {
    setSelectedFund(fund);
    setSelectedMembers([]);
    setCustomAmounts({});
    setFundDetailsDialogOpen(true);
  };

  // Toggle Member Selection
  const handleMemberToggle = (member) => {
    setSelectedMembers(prev => 
      prev.includes(member) 
        ? prev.filter(m => m !== member)
        : [...prev, member]
    );
  };

  // Calculate Disbursement Amount
  const calculateDisbursementAmount = (fund) => {
    if (disbursementMethod === 'equal') {
      return selectedMembers.length > 0 
        ? fund.totalAmount / selectedMembers.length 
        : 0;
    }
    return fund.totalAmount;
  };

  // Save Disbursement Configuration
  const handleSaveDisbursement = () => {
    if (!selectedFund || selectedMembers.length === 0) {
      alert('Please select a fund and at least one member');
      return;
    }

    const disbursementRecord = {
      id: disbursementHistory.length + 1,
      fundType: selectedFund.name,
      subType: selectedFund.subTypes[0].name,
      amount: calculateDisbursementAmount(selectedFund),
      recipients: selectedMembers,
      method: 'Bank Transfer',
      date: disbursementSchedule.isScheduled 
        ? disbursementSchedule.scheduledDate.toISOString() 
        : new Date().toISOString(),
      status: disbursementSchedule.isScheduled ? 'Scheduled' : 'Completed'
    };

    setDisbursementHistory(prev => [...prev, disbursementRecord]);
    setFundDetailsDialogOpen(false);
    
    // Reset states
    setSelectedFund(null);
    setSelectedMembers([]);
    setCustomAmounts({});
  };

  // Export Disbursement History to CSV
  const exportToCSV = () => {
    // Convert disbursement history to CSV
    const headers = [
      'Date', 
      'Fund Type', 
      'Sub-Type', 
      'Amount', 
      'Recipients', 
      'Status', 
      'Method'
    ];

    const csvData = disbursementHistory.map(record => [
      new Date(record.date).toLocaleString(),
      record.fundType,
      record.subType,
      `KES ${record.amount.toLocaleString()}`,
      record.recipients.map(r => r.name).join(', '),
      record.status,
      record.method
    ]);

    // Combine headers and data
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => 
        `"${cell.toString().replace(/"/g, '""')}"` // Escape quotes
      ).join(','))
    ].join('\n');

    // Create Blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'disbursement_history.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render Fund Details Dialog
  const renderFundDetailsDialog = () => (
    <Dialog 
      open={fundDetailsDialogOpen} 
      onClose={() => setFundDetailsDialogOpen(false)}
      maxWidth="md"
      fullWidth
    >
      {selectedFund && (
        <>
          <DialogTitle>
            {selectedFund.name} - Fund Management
            <Typography variant="subtitle2" color="textSecondary">
              Total Amount: KES {selectedFund.totalAmount.toLocaleString()}
            </Typography>
          </DialogTitle>
          <DialogContent>
            {/* Disbursement Method Selection */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Disbursement Method</InputLabel>
              <Select
                value={disbursementMethod}
                label="Disbursement Method"
                onChange={(e) => setDisbursementMethod(e.target.value)}
              >
                <MenuItem value="equal">Equal Distribution</MenuItem>
                <MenuItem value="custom">Custom Distribution</MenuItem>
              </Select>
            </FormControl>

            {/* Member Selection */}
            <Typography variant="h6" sx={{ mt: 2 }}>Select Recipients</Typography>
            {members.map((member) => (
              <FormControlLabel
                key={member.id}
                control={
                  <Checkbox
                    checked={selectedMembers.includes(member)}
                    onChange={() => handleMemberToggle(member)}
                  />
                }
                label={`${member.name} (${member.phoneNumber})`}
              />
            ))}

            {/* Scheduled Disbursement */}
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={disbursementSchedule.isScheduled}
                    onChange={(e) => setDisbursementSchedule(prev => ({
                      ...prev,
                      isScheduled: e.target.checked
                    }))}
                  />
                }
                label="Schedule Disbursement"
              />
              {disbursementSchedule.isScheduled && (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="Scheduled Date"
                    value={disbursementSchedule.scheduledDate}
                    onChange={(newValue) => 
                      setDisbursementSchedule(prev => ({
                        ...prev,
                        scheduledDate: newValue
                      }))
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button 
              startIcon={<Save />}
              onClick={handleSaveDisbursement}
              variant="contained"
              color="primary"
            >
              Save Disbursement
            </Button>
            <Button 
              startIcon={<Send />}
              onClick={() => {
                handleSaveDisbursement();
                // Additional logic for instant disbursement
              }}
              variant="contained"
              color="success"
            >
              Disburse Now
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );

  // Render Disbursement History with Export Option
  const renderDisbursementHistory = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Disbursement History</Typography>
        <Button
          startIcon={<Download />}
          variant="outlined"
          color="primary"
          onClick={exportToCSV}
        >
          Export to CSV
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Fund Type</TableCell>
              <TableCell>Sub-Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Recipients</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {disbursementHistory.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{new Date(record.date).toLocaleString()}</TableCell>
                <TableCell>{record.fundType}</TableCell>
                <TableCell>{record.subType}</TableCell>
                <TableCell>KES {record.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Tooltip 
                    title={record.recipients.map(r => r.name).join(', ')}
                  >
                    <Chip 
                      label={`${record.recipients.length} Members`} 
                      size="small" 
                    />
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={record.status} 
                    color={
                      record.status === 'Completed' ? 'success' : 
                      record.status === 'Scheduled' ? 'warning' : 'default'
                    } 
                    size="small" 
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex' }}>
                    <Tooltip title="Edit">
                      <IconButton color="primary" size="small">
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" size="small">
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  // Render Members Table
  const renderMembersTable = () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Account Number</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Total Contributions</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((member) => {
            const totalContributions = Object.values(member.contributions).reduce((a, b) => a + b, 0);
            return (
              <TableRow key={member.id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.phoneNumber}</TableCell>
                <TableCell>{member.accountNumber}</TableCell>
                <TableCell>
                  <Chip 
                    label={member.status} 
                    color={member.status === 'Active' ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    KES {totalContributions.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Tooltip title="Disburse Funds">
                    <IconButton 
                      color="primary" 
                      onClick={() => {
                        setSelectedFund(contributionTypes[0]); // Default to first fund
                        handleFundCardClick(contributionTypes[0]);
                      }}
                    >
                      <MonetizationOn />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 3 } }}>
      <Typography variant="h4" gutterBottom>
        Vault Manager
      </Typography>

      {/* Contribution Types Grid */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {contributionTypes.map((fund) => (
          <Grid item xs={12} sm={6} md={4} key={fund.name}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 2, 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.05)'
                }
              }}
              onClick={() => handleFundCardClick(fund)}
            >
              {fund.icon}
              <Typography variant="h6" sx={{ mt: 2 }}>
                {fund.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {fund.description}
              </Typography>
              <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
                KES {fund.totalAmount.toLocaleString()}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Tabs for Members and Disbursement History */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="fullWidth"
        >
          <Tab label="Members" icon={<Person />} />
          <Tab label="Disbursement History" icon={<MonetizationOn />} />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      {activeTab === 0 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Chama Members</Typography>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<PersonAdd />}
              onClick={() => setAddMemberDialogOpen(true)}
            >
              Add Member
            </Button>
          </Box>
          {renderMembersTable()}
        </Box>
      )}

      {activeTab === 1 && renderDisbursementHistory()}

      {/* Add Member Dialog */}
      <Dialog 
        open={addMemberDialogOpen} 
        onClose={() => setAddMemberDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Add New Member</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            value={newMember.name}
            onChange={(e) => setNewMember({...newMember, name: e.target.value})}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            label="Phone Number"
            value={newMember.phoneNumber}
            onChange={(e) => setNewMember({...newMember, phoneNumber: e.target.value})}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Account Number"
            value={newMember.accountNumber}
            onChange={(e) => setNewMember({...newMember, accountNumber: e.target.value})}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddMemberDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleAddMember} 
            variant="contained" 
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Fund Details Dialog */}
      {renderFundDetailsDialog()}

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default VaultManager;
