import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
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
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Send as SendIcon,
  Email as EmailIcon,
  Sms as SmsIcon,
  History as HistoryIcon,
} from '@mui/icons-material';

const mockRecipients = [
  { id: 1, name: 'John Doe', type: 'Individual', contact: '+254700000001' },
  { id: 2, name: 'Investment Group A', type: 'Group', contact: 'Multiple Contacts' },
];

const mockNotificationHistory = [
  {
    id: 1,
    type: 'Interest Payment',
    recipients: 'All Individual Accounts',
    sentDate: '2025-01-22',
    status: 'Sent',
    method: 'Email & SMS',
  },
  {
    id: 2,
    type: 'Withdrawal Approval',
    recipients: 'Investment Group A',
    sentDate: '2025-01-21',
    status: 'Sent',
    method: 'SMS',
  },
];

function Notifications() {
  const [notificationType, setNotificationType] = useState('');
  const [recipientType, setRecipientType] = useState('all');
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [message, setMessage] = useState('');
  const [sendViaEmail, setSendViaEmail] = useState(true);
  const [sendViaSMS, setSendViaSMS] = useState(true);
  const [recipientDialog, setRecipientDialog] = useState(false);
  const [previewDialog, setPreviewDialog] = useState(false);

  const sendNotification = (recipient) => {
    // Logic to send notification
    console.log('Sending notification to:', recipient);
  };

  const handleSendNotification = () => {
    // Logic to handle sending notifications
    mockRecipients.forEach(recipient => sendNotification(recipient));
    setPreviewDialog(true);
  };

  const handleConfirmSend = () => {
    // Implement notification sending logic
    setPreviewDialog(false);
  };

  const notificationTemplates = {
    interestPayment: 'Dear {name}, your interest payment of ${amount} has been processed and will be credited to your account within 24 hours.',
    withdrawalApproval: 'Dear {name}, your withdrawal request for ${amount} has been approved. The funds will be transferred on {date}.',
    depositConfirmation: 'Dear {name}, we have received your deposit of ${amount}. It will start earning interest from {date}.',
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Notification Composer */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Send Notification
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Notification Type</InputLabel>
                  <Select
                    value={notificationType}
                    onChange={(e) => setNotificationType(e.target.value)}
                  >
                    <MenuItem value="interestPayment">Interest Payment</MenuItem>
                    <MenuItem value="withdrawalApproval">Withdrawal Approval</MenuItem>
                    <MenuItem value="depositConfirmation">Deposit Confirmation</MenuItem>
                    <MenuItem value="custom">Custom Message</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Recipient Type</InputLabel>
                  <Select
                    value={recipientType}
                    onChange={(e) => setRecipientType(e.target.value)}
                  >
                    <MenuItem value="all">All Clients</MenuItem>
                    <MenuItem value="individual">Individual Accounts</MenuItem>
                    <MenuItem value="group">Group Accounts</MenuItem>
                    <MenuItem value="specific">Specific Recipients</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {recipientType === 'specific' && (
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    onClick={() => setRecipientDialog(true)}
                  >
                    Select Recipients ({selectedRecipients.length} selected)
                  </Button>
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  // helperText="Use {name}, {amount}, {date} as placeholders"
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sendViaEmail}
                        onChange={(e) => setSendViaEmail(e.target.checked)}
                      />
                    }
                    label="Send via Email"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sendViaSMS}
                        onChange={(e) => setSendViaSMS(e.target.checked)}
                      />
                    }
                    label="Send via SMS"
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  startIcon={<SendIcon />}
                  onClick={handleSendNotification}
                  disabled={!message || (!sendViaEmail && !sendViaSMS)}
                >
                  Send Notification
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Notification History */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Notification History
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>Recipients</TableCell>
                    <TableCell>Sent Date</TableCell>
                    <TableCell>Method</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockNotificationHistory.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell>{notification.type}</TableCell>
                      <TableCell>{notification.recipients}</TableCell>
                      <TableCell>{notification.sentDate}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {notification.method.includes('Email') && (
                            <EmailIcon color="primary" fontSize="small" />
                          )}
                          {notification.method.includes('SMS') && (
                            <SmsIcon color="primary" fontSize="small" />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={notification.status}
                          color={notification.status === 'Sent' ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Button size="small" startIcon={<HistoryIcon />}>
                          View Details
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

      {/* Recipient Selection Dialog */}
      <Dialog
        open={recipientDialog}
        onClose={() => setRecipientDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Select Recipients</DialogTitle>
        <DialogContent dividers>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Contact</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockRecipients.map((recipient) => (
                  <TableRow key={recipient.id}>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell>{recipient.name}</TableCell>
                    <TableCell>{recipient.type}</TableCell>
                    <TableCell>{recipient.contact}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRecipientDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setRecipientDialog(false)}>
            Confirm Selection
          </Button>
        </DialogActions>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog
        open={previewDialog}
        onClose={() => setPreviewDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Preview Notification</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle2" gutterBottom>
            Recipients: {recipientType === 'specific' ? selectedRecipients.length + ' selected' : recipientType}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Delivery Method: {sendViaEmail && sendViaSMS ? 'Email & SMS' : sendViaEmail ? 'Email' : 'SMS'}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Message:
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, mt: 1 }}>
            <Typography>{message}</Typography>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleConfirmSend} color="primary">
            Confirm & Send
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Notifications;
