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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Receipt,
  AccountBalance,
  Payment,
  CreditCard,
  AttachMoney,
  History,
  Assessment,
  CheckCircle,
  Warning,
  Info,
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useParams } from 'react-router-dom';

const BillingPage = () => {
  const { chamaId } = useParams();
  const [openPayment, setOpenPayment] = useState(false);
  const [openMethod, setOpenMethod] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock data - replace with API calls
  const billingStats = {
    totalBilled: 1000000,
    totalPaid: 750000,
    outstanding: 250000,
    nextBilling: '2025-02-01',
    billingCycle: 'Monthly',
    defaultAmount: 5000,
  };

  const transactions = [
    {
      id: 1,
      date: '2025-01-01',
      description: 'Monthly Subscription',
      amount: 5000,
      status: 'Paid',
      method: 'M-PESA',
      reference: 'MPE123456789',
    },
    {
      id: 2,
      date: '2025-01-01',
      description: 'Late Payment Fee',
      amount: 500,
      status: 'Pending',
      method: 'Bank Transfer',
      reference: 'BT987654321',
    },
  ];

  const paymentMethods = [
    {
      id: 1,
      type: 'M-PESA',
      number: '254712345678',
      primary: true,
    },
    {
      id: 2,
      type: 'Bank Account',
      number: '**** 1234',
      bank: 'KCB Bank',
      primary: false,
    },
  ];

  const renderBillingStats = () => (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Receipt sx={{ color: 'primary.main', mr: 1 }} />
              <Typography color="textSecondary">Total Billed</Typography>
            </Box>
            <Typography variant="h4">
              KES {billingStats.totalBilled.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CheckCircle sx={{ color: 'success.main', mr: 1 }} />
              <Typography color="textSecondary">Total Paid</Typography>
            </Box>
            <Typography variant="h4" color="success.main">
              KES {billingStats.totalPaid.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Warning sx={{ color: 'error.main', mr: 1 }} />
              <Typography color="textSecondary">Outstanding</Typography>
            </Box>
            <Typography variant="h4" color="error.main">
              KES {billingStats.outstanding.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Info sx={{ color: 'primary.main', mr: 1 }} />
              <Typography color="textSecondary">Next Billing</Typography>
            </Box>
            <Typography variant="h4">
              {billingStats.nextBilling}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {billingStats.billingCycle} cycle
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderTransactions = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>Reference</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>KES {transaction.amount.toLocaleString()}</TableCell>
              <TableCell>{transaction.method}</TableCell>
              <TableCell>{transaction.reference}</TableCell>
              <TableCell>
                <Chip
                  label={transaction.status}
                  color={transaction.status === 'Paid' ? 'success' : 'warning'}
                  size="small"
                />
              </TableCell>
              <TableCell>
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

  const renderPaymentMethods = () => (
    <List>
      {paymentMethods.map((method) => (
        <React.Fragment key={method.id}>
          <ListItem>
            <ListItemIcon>
              {method.type === 'M-PESA' ? <Payment /> : <AccountBalance />}
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle1">
                    {method.type}
                  </Typography>
                  {method.primary && (
                    <Chip
                      label="Primary"
                      size="small"
                      color="primary"
                      sx={{ ml: 1 }}
                    />
                  )}
                </Box>
              }
              secondary={
                <Box>
                  <Typography variant="body2">
                    {method.number}
                  </Typography>
                  {method.bank && (
                    <Typography variant="caption" color="textSecondary">
                      {method.bank}
                    </Typography>
                  )}
                </Box>
              }
            />
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">
            Billing & Payments
          </Typography>
          <Box>
            <Button
              variant="contained"
              startIcon={<Payment />}
              onClick={() => setOpenPayment(true)}
              sx={{ mr: 1, bgcolor: '#1a237e' }}
            >
              Make Payment
            </Button>
            <Button
              variant="contained"
              startIcon={<CreditCard />}
              onClick={() => setOpenMethod(true)}
              sx={{ bgcolor: '#1a237e' }}
            >
              Add Chama Account
            </Button>
          </Box>
        </Box>

        {renderBillingStats()}

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Transaction History
                </Typography>
                {renderTransactions()}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">
                    Chama Accounts
                  </Typography>
                </Box>
                {renderPaymentMethods()}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Make Payment Dialog */}
        <Dialog
          open={openPayment}
          onClose={() => setOpenPayment(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Make Payment</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Amount"
                    type="number"
                    defaultValue={billingStats.defaultAmount}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Payment Method</InputLabel>
                    <Select>
                      <MenuItem value="mpesa">M-PESA (**** 5678)</MenuItem>
                      <MenuItem value="bank">KCB Bank (**** 1234)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <DatePicker
                    label="Payment Date"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Notes"
                    multiline
                    rows={3}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPayment(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: '#1a237e' }}
            >
              Make Payment
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Payment Method Dialog */}
        <Dialog
          open={openMethod}
          onClose={() => setOpenMethod(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add Chama Account</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Payment Method Type</InputLabel>
                    <Select>
                      <MenuItem value="mpesa">M-PESA</MenuItem>
                      <MenuItem value="bank">Bank Account</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number / Account Number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bank Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Branch"
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenMethod(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: '#1a237e' }}
            >
              Add Method
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default BillingPage;
