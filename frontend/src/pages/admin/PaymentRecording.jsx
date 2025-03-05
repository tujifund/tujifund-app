import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Chip,
} from '@mui/material';
import {
  Payment as PaymentIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

const mockPayments = [
  {
    id: 1,
    clientName: 'John Doe',
    accountType: 'Individual - Normal',
    paymentType: 'Interest',
    amount: 250,
    date: '2025-01-22',
    status: 'Pending Verification',
  },
  {
    id: 2,
    clientName: 'Investment Group A',
    accountType: 'Group',
    paymentType: 'Principal',
    amount: 5000,
    date: '2025-01-21',
    status: 'Verified',
  },
];

function PaymentRecording() {
  const [selectedClient, setSelectedClient] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [paymentDialog, setPaymentDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [verificationDialog, setVerificationDialog] = useState(false);

  const handleRecordPayment = () => {
    setPaymentDialog(true);
  };

  const handleConfirmPayment = () => {
    // Implement payment recording logic
    setPaymentDialog(false);
  };

  const verifyPayment = (id) => {
    // Logic to verify payment
    console.log('Verifying payment for ID:', id);
  };

  const handleVerification = (payment) => {
    verifyPayment(payment.id);
    setSelectedPayment(payment);
    setVerificationDialog(true);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Payment Recording Form */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Record New Payment
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Select Client</InputLabel>
                  <Select
                    value={selectedClient}
                    onChange={(e) => setSelectedClient(e.target.value)}
                  >
                    <MenuItem value="client1">John Doe</MenuItem>
                    <MenuItem value="client2">Investment Group A</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Payment Type</InputLabel>
                  <Select
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                  >
                    <MenuItem value="interest">Interest Payment</MenuItem>
                    <MenuItem value="principal">Principal Return</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  InputProps={{
                    startAdornment: <Typography>$</Typography>,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Payment Date"
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  startIcon={<PaymentIcon />}
                  onClick={handleRecordPayment}
                  disabled={!selectedClient || !paymentType || !amount || !paymentDate}
                >
                  Record Payment
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Payment History */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Recent Payments
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Client Name</TableCell>
                    <TableCell>Account Type</TableCell>
                    <TableCell>Payment Type</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.clientName}</TableCell>
                      <TableCell>{payment.accountType}</TableCell>
                      <TableCell>{payment.paymentType}</TableCell>
                      <TableCell>${payment.amount}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>
                        <Chip
                          label={payment.status}
                          color={payment.status === 'Verified' ? 'success' : 'warning'}
                          size="small"
                          icon={payment.status === 'Verified' ? <CheckCircleIcon /> : <WarningIcon />}
                        />
                      </TableCell>
                      <TableCell>
                        {payment.status === 'Pending Verification' && (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleVerification(payment)}
                          >
                            Verify
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Payment Confirmation Dialog */}
      <Dialog
        open={paymentDialog}
        onClose={() => setPaymentDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Payment Details</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Client</Typography>
              <Typography variant="body1">John Doe</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Payment Type</Typography>
              <Typography variant="body1">{paymentType === 'interest' ? 'Interest Payment' : 'Principal Return'}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Amount</Typography>
              <Typography variant="body1">${amount}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Payment Date</Typography>
              <Typography variant="body1">{paymentDate}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleConfirmPayment}>
            Confirm & Record
          </Button>
        </DialogActions>
      </Dialog>

      {/* Verification Dialog */}
      <Dialog
        open={verificationDialog}
        onClose={() => setVerificationDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Payment Verification</DialogTitle>
        <DialogContent dividers>
          {selectedPayment && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Payment Details</Typography>
                <Box sx={{ mt: 1 }}>
                  <Typography>Client: {selectedPayment.clientName}</Typography>
                  <Typography>Amount: ${selectedPayment.amount}</Typography>
                  <Typography>Date: {selectedPayment.date}</Typography>
                  <Typography>Type: {selectedPayment.paymentType}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Verification Notes"
                  placeholder="Add any notes about the payment verification..."
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVerificationDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => setVerificationDialog(false)}
            startIcon={<CheckCircleIcon />}
          >
            Confirm Verification
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default PaymentRecording;
