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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Check as CheckIcon,
  Close as CloseIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

const mockWithdrawals = [
  {
    id: 1,
    clientName: 'John Doe',
    accountType: 'Individual - Normal',
    LoanType: 'Instant',
    LoanAmount: 100000,
    Reasonfortheloan: 'for Health emergency',
    SuportingDocument:'LoanAttachment.dox',
    Guarantors: 'Lidya, Jackob, Hudson',
    InterestRate:'5%',
    MaximumDuration:'3 months',
    requestDate: '2025-01-20',
    DateOfLoanReturn:'2025-06-15',
    status: 'Pending',
    phone: '+254700000001',
    email: 'john@example.com',
    InterestAmount: 1000,
    LoanReturnDate: '2025-06-15',
  },
  {
    id: 2,
    clientName: 'Investment Group A',
    accountType: 'Group',
    LoanType: 'Digital',
    LoanAmount: '600000',
    Reasonfortheloan: 'for Investment',
    Guarantors: 'Lidya, Jackob, Hudson',
    SuportingDocument:'LoanAttachment.dox',
    requestDate: '2025-01-21',
    status: 'Pending Member Approval',
    phone: '+254700000002',
    email: 'groupa@example.com',
    withdrawalType: 'Interest',
    InterestAmount: 1500,
    LoanReturnDate: '2024-12-05',
  },
];

function WithdrawalRequests() {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [approvalDialog, setApprovalDialog] = useState(false);
  const [approvalNote, setApprovalNote] = useState('');

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setApprovalDialog(true);
  };

  const handleApprove = () => {
    handleAuthorization(selectedRequest.id);
    setApprovalDialog(false);
  };

  const handleReject = () => {
    handleDeny(selectedRequest.id);
    setApprovalDialog(false);
  };

  const handleAuthorization = (id) => {
    // Logic to authorize withdrawal
    console.log('Authorizing withdrawal for ID:', id);
  };

  const handleDeny = (id) => {
    // Logic to deny withdrawal
    console.log('Denying withdrawal for ID:', id);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" color="primary">
              Pending Requests
            </Typography>
            <Typography variant="h4">15</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" color="primary">
              Total Loans Requested
            </Typography>
            <Typography variant="h4">$25,000</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" color="primary">
              Requests Requiring Action
            </Typography>
            <Typography variant="h4">8</Typography>
          </Paper>
        </Grid>

        {/* VaultLoan Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              VaultLoan Requests
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Client Name</TableCell>
                    <TableCell>Account Type</TableCell>
                    <TableCell>Amount ($)</TableCell>
                    <TableCell>Request Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockWithdrawals.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.clientName}</TableCell>
                      <TableCell>{request.accountType}</TableCell>
                      <TableCell>KSH-{request.LoanAmount}</TableCell>
                      <TableCell>{request.requestDate}</TableCell>
                      <TableCell>
                        <Chip
                          label={request.status}
                          color={request.status === 'Pending' ? 'warning' : 'info'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleViewRequest(request)}
                        >
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Approval Dialog */}
      <Dialog
        open={approvalDialog}
        onClose={() => setApprovalDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedRequest && (
          <>
            <DialogTitle>
              Review Withdrawal Request
              <IconButton
                onClick={() => setApprovalDialog(false)}
                sx={{ position: 'absolute', right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Client Name
                  </Typography>
                  <Typography variant="body1">{selectedRequest.clientName}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Account Type
                  </Typography>
                  <Typography variant="body1">{selectedRequest.accountType}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Loan Type
                  </Typography>
                  <Typography variant="body1">{selectedRequest.LoanType}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Loan Amount
                  </Typography>
                  <Typography variant="body1">${selectedRequest.LoanAmount}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Reason For The Loan
                  </Typography>
                  <Typography variant="body1">{selectedRequest.Reasonfortheloan}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Guarantor
                  </Typography>
                  <Typography variant="body1">{selectedRequest.Guarantors}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Suporting Document
                  </Typography>
                  <Typography variant="body1">{selectedRequest.SuportingDocument}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Date of Request
                  </Typography>
                  <Typography variant="body1">{selectedRequest.requestDate}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Interest Amount
                  </Typography>
                  <Typography variant="body1">${selectedRequest.InterestAmount}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                  Interest Rate
                  </Typography>
                  <Typography variant="body1">{selectedRequest.InterestRate}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Date of loan Return 
                  </Typography>
                  <Typography variant="body1">{selectedRequest.DateOfLoanReturn}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Maximum Duration
                  </Typography>
                  <Typography variant="body1">{selectedRequest.MaximumDuration}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Contact Information
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <IconButton size="small" color="primary">
                      <PhoneIcon />
                    </IconButton>
                    <Typography variant="body2">{selectedRequest.phone}</Typography>
                    <IconButton size="small" color="primary">
                      <EmailIcon />
                    </IconButton>
                    <Typography variant="body2">{selectedRequest.email}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Approval/Rejection Note"
                    value={approvalNote}
                    onChange={(e) => setApprovalNote(e.target.value)}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleReject}
                variant="outlined"
                color="error"
                startIcon={<CloseIcon />}
              >
                Reject
              </Button>
              <Button
                onClick={handleApprove}
                variant="contained"
                color="success"
                startIcon={<CheckIcon />}
              >
                Approve
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
}

export default WithdrawalRequests;
