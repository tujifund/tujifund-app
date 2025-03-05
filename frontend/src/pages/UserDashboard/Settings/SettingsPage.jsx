import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Checkbox,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Snackbar,
  FormHelperText,
} from '@mui/material';
import {
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Payment as PaymentIcon,
  Help as HelpIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';

const SettingsPage = () => {
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  });
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    accountNumber: '',
    accountHolderName: '',
    branchCode: '',
    mpesaNumber: '',
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [showMobilePin, setShowMobilePin] = useState(false);
  const [otpVerification, setOtpVerification] = useState(false);
  const [otp, setOtp] = useState('');

  // Mock data - replace with actual API data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+254 712 345 678',
    role: 'Chairperson',
  };

  const banksList = [
    'Equity Bank',
    'KCB Bank',
    'Co-operative Bank',
    'Standard Chartered',
    'ABSA Bank',
    'Family Bank',
    'I&M Bank',
    'DTB Bank',
  ];

  const handleNotificationChange = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleBankDetailsChange = (field) => (event) => {
    setErrors((prev) => ({ ...prev, [field]: '' }));
    setBankDetails((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleConsentChange = (event) => {
    setBankDetails((prev) => ({
      ...prev,
      consent: event.target.checked,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const hasMpesa = !!bankDetails.mpesaNumber;
    const hasBankDetails = !!(bankDetails.bankName || bankDetails.accountNumber || bankDetails.accountHolderName || bankDetails.branchCode);
    
    // Validate M-Pesa if provided or if no bank details are provided
    if (hasMpesa) {
      if (!/^\+254\d{9}$/.test(bankDetails.mpesaNumber)) {
        newErrors.mpesaNumber = 'Invalid M-Pesa number format (should be +254XXXXXXXXX)';
      }
    }

    // Validate bank details if any bank field is provided or if no M-Pesa is provided
    if (hasBankDetails) {
      if (!bankDetails.bankName) {
        newErrors.bankName = 'Bank name is required when providing bank details';
      }
      
      if (!bankDetails.accountNumber) {
        newErrors.accountNumber = 'Account number is required when providing bank details';
      } else if (!/^\d{10,16}$/.test(bankDetails.accountNumber)) {
        newErrors.accountNumber = 'Invalid account number format';
      }
      
      if (!bankDetails.accountHolderName) {
        newErrors.accountHolderName = 'Account holder name is required when providing bank details';
      }
      
      if (!bankDetails.branchCode) {
        newErrors.branchCode = 'Branch code is required when providing bank details';
      }
    }

    // If neither M-Pesa nor complete bank details are provided
    if (!hasMpesa && !hasBankDetails) {
      newErrors.general = 'Please provide either M-Pesa number or complete bank details';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveBankDetails = async () => {
    if (!bankDetails.consent) {
      setSnackbar({
        open: true,
        message: 'Please provide consent to store your payment details',
        severity: 'error'
      });
      return;
    }

    // Check if at least one payment method is provided
    const hasMpesa = !!bankDetails.mpesaNumber;
    const hasBankDetails = !!(bankDetails.bankName && bankDetails.accountNumber && bankDetails.accountHolderName && bankDetails.branchCode);

    if (!hasMpesa && !hasBankDetails) {
      setSnackbar({
        open: true,
        message: 'Please provide either M-Pesa number or complete bank details',
        severity: 'error'
      });
      return;
    }

    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: errors.general || 'Please correct the errors in the form',
        severity: 'error'
      });
      return;
    }

    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch('/api/payment-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...bankDetails,
          paymentMethod: bankDetails.mpesaNumber ? 'mpesa' : 'bank'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save payment details');
      }

      setSnackbar({
        open: true,
        message: 'Payment details saved successfully!',
        severity: 'success'
      });

      // Reset form after successful save
      setBankDetails({
        bankName: '',
        accountNumber: '',
        accountHolderName: '',
        branchCode: '',
        mpesaNumber: '',
        consent: false,
      });
    } catch (error) {
      console.error('Error saving payment details:', error);
      setSnackbar({
        open: true,
        message: 'Failed to save payment details. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleSaveBankDetailsOld = () => {
    if (!bankDetails.consent) {
      alert('Please provide consent to store your bank details');
      return;
    }
    setOtpVerification(true);
  };

  const handleVerifyOTP = () => {
    setOtpVerification(false);
    alert('Bank details saved successfully!');
  };

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 },
      maxWidth: 1200,
      mx: 'auto',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
          mb: { xs: 3, sm: 4 },
          color: '#1a237e',
          fontWeight: 600
        }}
      >
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Account Settings - Full width on mobile, half width on larger screens */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            height: '100%',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'box-shadow 0.3s ease-in-out',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
            }
          }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 3,
                borderBottom: '2px solid #e0e0e0',
                pb: 1
              }}>
                <SecurityIcon sx={{ mr: 1, color: '#1a237e' }} />
                <Typography variant="h6" sx={{ color: '#1a237e' }}>
                  Account Settings
                </Typography>
              </Box>
              <TextField 
                label="Full Name" 
                variant="outlined" 
                fullWidth 
                defaultValue={user.name} 
                size="small" 
                sx={{ mb: 1 }}
              />
              <TextField 
                label="Email" 
                variant="outlined" 
                fullWidth 
                defaultValue={user.email} 
                size="small" 
                sx={{ mb: 1 }}
              />
              <TextField 
                label="Phone Number" 
                variant="outlined" 
                fullWidth 
                defaultValue={user.phone} 
                size="small" 
                sx={{ mb: 1 }}
              />
              <TextField 
                label="Role" 
                variant="outlined" 
                fullWidth 
                defaultValue={user.role} 
                disabled 
                size="small" 
                sx={{ mb: 2 }}
              />
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
              >
                Save Changes
              </Button>
              <br />
              <br />
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                href="/admin"
              >
                Check Changes
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Payment Settings - Full width on mobile, half width on larger screens */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            height: '100%',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'box-shadow 0.3s ease-in-out',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
            }
          }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 3,
                borderBottom: '2px solid #e0e0e0',
                pb: 1
              }}>
                <PaymentIcon sx={{ mr: 1, color: '#1a237e' }} />
                <Typography variant="h6" sx={{ color: '#1a237e' }}>
                  Payment Settings
                </Typography>
              </Box>
              <Alert severity="info" sx={{ mb: 2 }}>
                Your payment information is encrypted and secure
              </Alert>

              <Alert severity="info" sx={{ mb: 2 }}>
                Please provide either M-Pesa details or bank account details. Both are not required.
              </Alert>

              <TextField
                label="M-Pesa Number"
                variant="outlined"
                fullWidth
                size="small"
                value={bankDetails.mpesaNumber}
                onChange={handleBankDetailsChange('mpesaNumber')}
                error={!!errors.mpesaNumber}
                helperText={errors.mpesaNumber}
                placeholder="+254XXXXXXXXX"
                sx={{ mb: 2 }}
              />

              <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="textSecondary">OR</Typography>
              </Divider>

              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>Bank Name</InputLabel>
                <Select
                  value={bankDetails.bankName}
                  onChange={handleBankDetailsChange('bankName')}
                  label="Bank Name"
                  error={!!errors.bankName}
                >
                  {banksList.map((bank) => (
                    <MenuItem key={bank} value={bank}>{bank}</MenuItem>
                  ))}
                </Select>
                {errors.bankName && (
                  <FormHelperText error>{errors.bankName}</FormHelperText>
                )}
              </FormControl>

              <TextField
                label="Account Number"
                variant="outlined"
                fullWidth
                size="small"
                value={bankDetails.accountNumber}
                onChange={handleBankDetailsChange('accountNumber')}
                error={!!errors.accountNumber}
                helperText={errors.accountNumber}
                sx={{ mb: 2 }}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              />

              <TextField
                label="Account Holder Name"
                variant="outlined"
                fullWidth
                size="small"
                value={bankDetails.accountHolderName}
                onChange={handleBankDetailsChange('accountHolderName')}
                error={!!errors.accountHolderName}
                helperText={errors.accountHolderName}
                sx={{ mb: 2 }}
              />

              <TextField
                label="Branch Code"
                variant="outlined"
                fullWidth
                size="small"
                value={bankDetails.branchCode}
                onChange={handleBankDetailsChange('branchCode')}
                error={!!errors.branchCode}
                helperText={errors.branchCode}
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <Tooltip title="Branch code can be found on your checkbook or bank statement">
                      <IconButton edge="end"><HelpIcon /></IconButton>
                    </Tooltip>
                  ),
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={bankDetails.consent}
                    onChange={handleConsentChange}
                  />
                }
                label="I consent to securely store my bank details and authorize the app to use them for Chama payments"
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSaveBankDetails}
                disabled={!bankDetails.consent}
              >
                Save Payment Method
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Settings - Full width on mobile, half width on larger screens */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            height: '100%',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'box-shadow 0.3s ease-in-out',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
            }
          }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 3,
                borderBottom: '2px solid #e0e0e0',
                pb: 1
              }}>
                <NotificationsIcon sx={{ mr: 1, color: '#1a237e' }} />
                <Typography variant="h6" sx={{ color: '#1a237e' }}>
                  Notification Settings
                </Typography>
              </Box>
              <FormControlLabel 
                control={<Checkbox checked={notifications.email} onChange={() => handleNotificationChange('email')} />} 
                label="Email Notifications" 
              />
              <FormControlLabel 
                control={<Checkbox checked={notifications.push} onChange={() => handleNotificationChange('push')} />} 
                label="Push Notifications" 
              />
              <FormControlLabel 
                control={<Checkbox checked={notifications.sms} onChange={() => handleNotificationChange('sms')} />} 
                label="SMS Notifications" 
              />
              <Button variant="contained" color="primary" fullWidth>
                Update Notification Settings
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Language Settings - Full width on mobile, half width on larger screens */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            height: '100%',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'box-shadow 0.3s ease-in-out',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
            }
          }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 3,
                borderBottom: '2px solid #e0e0e0',
                pb: 1
              }}>
                <LanguageIcon sx={{ mr: 1, color: '#1a237e' }} />
                <Typography variant="h6" sx={{ color: '#1a237e' }}>
                  Language & Region
                </Typography>
              </Box>
              <TextField 
                select 
                label="Language" 
                variant="outlined" 
                fullWidth 
                defaultValue="en" 
                size="small" 
                sx={{ mb: 1 }}
              >
                <option value="en">English</option>
                <option value="sw">Swahili</option>
              </TextField>
              <TextField 
                select 
                label="Time Zone" 
                variant="outlined" 
                fullWidth 
                defaultValue="eat" 
                size="small" 
                sx={{ mb: 1 }}
              >
                <option value="eat">East Africa Time (EAT)</option>
                <option value="gmt">GMT</option>
              </TextField>
              <TextField 
                select 
                label="Currency" 
                variant="outlined" 
                fullWidth 
                defaultValue="kes" 
                size="small"
              >
                <option value="kes">Kenyan Shilling (KES)</option>
                <option value="usd">US Dollar (USD)</option>
              </TextField>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* OTP Verification Dialog */}
      <Dialog open={otpVerification} onClose={() => setOtpVerification(false)}>
        <DialogTitle>Verify Bank Details</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            We've sent a verification code to your registered phone number and email.
            Please enter it below to confirm your bank details.
          </Typography>
          <TextField
            label="Enter OTP"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOtpVerification(false)}>Cancel</Button>
          <Button onClick={handleVerifyOTP} variant="contained" color="primary">
            Verify
          </Button>
        </DialogActions>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField 
            fullWidth 
            type="password" 
            label="Current Password" 
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField 
            fullWidth 
            type="password" 
            label="New Password" 
            sx={{ mb: 2 }}
          />
          <TextField 
            fullWidth 
            type="password" 
            label="Confirm New Password"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={() => setOpenPasswordDialog(false)}
            sx={{ bgcolor: '#1a237e' }}
          >
            Update Password
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SettingsPage;
