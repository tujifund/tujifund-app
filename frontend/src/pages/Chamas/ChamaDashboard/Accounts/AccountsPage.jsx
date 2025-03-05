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
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccountBalance,
  TrendingUp,
  TrendingDown,
  Payment,
  Receipt,
  AttachMoney,
  MoneyOff,
  AccountBalanceWallet,
  Description,
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { useParams } from 'react-router-dom';

const AccountsPage = () => {
  const { chamaId } = useParams();
  const [currentTab, setCurrentTab] = useState(0);
  const [openNewTransaction, setOpenNewTransaction] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [openStatement, setOpenStatement] = useState(false);
  const [transactionType, setTransactionType] = useState('income');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock data - replace with API calls
  const accountStats = {
    totalBalance: 750000,
    totalIncome: 1000000,
    totalExpenses: 250000,
    pendingPayments: 50000,
  };

  const transactions = [
    {
      id: 1,
      date: '2025-01-12',
      type: 'income',
      category: 'Member Contribution',
      description: 'Monthly Contribution',
      amount: 5000,
      member: 'John Doe',
      status: 'Completed',
    },
    {
      id: 2,
      date: '2025-01-11',
      type: 'expense',
      category: 'Administrative',
      description: 'Office Rent',
      amount: 15000,
      member: 'System',
      status: 'Completed',
    },
  ];

  const categories = {
    income: [
      'Member Contribution',
      'Loan Repayment',
      'Interest Income',
      'Penalties',
      'Other Income',
    ],
    expense: [
      'Administrative',
      'Loan Disbursement',
      'Bank Charges',
      'Events',
      'Other Expenses',
    ],
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleNewTransaction = (type) => {
    setTransactionType(type);
    setSelectedTransaction(null);
    setOpenNewTransaction(true);
  };

  const renderAccountStats = () => (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AccountBalance sx={{ color: 'primary.main', mr: 1 }} />
              <Typography color="textSecondary">Total Balance</Typography>
            </Box>
            <Typography variant="h4">
              KES {accountStats.totalBalance.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TrendingUp sx={{ color: 'success.main', mr: 1 }} />
              <Typography color="textSecondary">Total Income</Typography>
            </Box>
            <Typography variant="h4" color="success.main">
              KES {accountStats.totalIncome.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TrendingDown sx={{ color: 'error.main', mr: 1 }} />
              <Typography color="textSecondary">Total Expenses</Typography>
            </Box>
            <Typography variant="h4" color="error.main">
              KES {accountStats.totalExpenses.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Payment sx={{ color: 'warning.main', mr: 1 }} />
              <Typography color="textSecondary">Pending Payments</Typography>
            </Box>
            <Typography variant="h4" color="warning.main">
              KES {accountStats.pendingPayments.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderTransactionForm = () => (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select defaultValue="">
              {categories[transactionType].map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Amount"
            type="number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Payment Method</InputLabel>
            <Select defaultValue="">
              <MenuItem value="mpesa">M-PESA</MenuItem>
              <MenuItem value="bank">Bank Transfer</MenuItem>
              <MenuItem value="cash">Cash</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Reference Number"
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderTransactions = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Member</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                <Chip
                  label={transaction.category}
                  size="small"
                  color={transaction.type === 'income' ? 'success' : 'error'}
                />
              </TableCell>
              <TableCell>{transaction.member}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {transaction.type === 'income' ? (
                    <TrendingUp sx={{ color: 'success.main', mr: 1 }} />
                  ) : (
                    <TrendingDown sx={{ color: 'error.main', mr: 1 }} />
                  )}
                  KES {transaction.amount.toLocaleString()}
                </Box>
              </TableCell>
              <TableCell>
                <Chip
                  label={transaction.status}
                  color={transaction.status === 'Completed' ? 'success' : 'warning'}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => {
                    setSelectedTransaction(transaction);
                    setOpenNewTransaction(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton color="primary">
                  <Receipt />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderFinancialReports = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Balance Sheet
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <AccountBalanceWallet />
                </ListItemIcon>
                <ListItemText
                  primary="Total Assets"
                  secondary={`KES ${(accountStats.totalBalance + accountStats.pendingPayments).toLocaleString()}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <MoneyOff />
                </ListItemIcon>
                <ListItemText
                  primary="Total Liabilities"
                  secondary={`KES ${accountStats.pendingPayments.toLocaleString()}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AttachMoney />
                </ListItemIcon>
                <ListItemText
                  primary="Net Worth"
                  secondary={`KES ${accountStats.totalBalance.toLocaleString()}`}
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Income Statement
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <TrendingUp color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Total Revenue"
                  secondary={`KES ${accountStats.totalIncome.toLocaleString()}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <TrendingDown color="error" />
                </ListItemIcon>
                <ListItemText
                  primary="Total Expenses"
                  secondary={`KES ${accountStats.totalExpenses.toLocaleString()}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AccountBalance />
                </ListItemIcon>
                <ListItemText
                  primary="Net Income"
                  secondary={`KES ${(accountStats.totalIncome - accountStats.totalExpenses).toLocaleString()}`}
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">
          Accounts
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<TrendingUp />}
            onClick={() => handleNewTransaction('income')}
            sx={{ mr: 1, bgcolor: '#1a237e' }}
          >
            Record Income
          </Button>
          <Button
            variant="contained"
            startIcon={<TrendingDown />}
            onClick={() => handleNewTransaction('expense')}
            sx={{ mr: 1, bgcolor: '#1a237e' }}
          >
            Record Expense
          </Button>
          <Button
            variant="contained"
            startIcon={<Description />}
            onClick={() => setOpenStatement(true)}
            sx={{ bgcolor: '#1a237e' }}
          >
            Generate Statement
          </Button>
        </Box>
      </Box>

      {renderAccountStats()}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Transactions" />
          <Tab label="Financial Reports" />
        </Tabs>
      </Box>

      {currentTab === 0 ? renderTransactions() : renderFinancialReports()}

      {/* New Transaction Dialog */}
      <Dialog
        open={openNewTransaction}
        onClose={() => setOpenNewTransaction(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedTransaction
            ? 'Edit Transaction'
            : `Record ${transactionType === 'income' ? 'Income' : 'Expense'}`}
        </DialogTitle>
        <DialogContent>
          {renderTransactionForm()}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewTransaction(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: '#1a237e' }}
          >
            {selectedTransaction ? 'Save Changes' : 'Record Transaction'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Generate Statement Dialog */}
      <Dialog
        open={openStatement}
        onClose={() => setOpenStatement(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Generate Statement</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
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
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="End Date"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Statement Type</InputLabel>
                  <Select defaultValue="all">
                    <MenuItem value="all">All Transactions</MenuItem>
                    <MenuItem value="income">Income Only</MenuItem>
                    <MenuItem value="expense">Expenses Only</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStatement(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: '#1a237e' }}
          >
            Generate PDF
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountsPage;
