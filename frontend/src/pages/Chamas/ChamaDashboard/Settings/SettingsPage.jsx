import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Settings,
  Security,
  Notifications,
  Language,
  Payment,
  Group,
  Schedule,
  AccountBalance,
  Edit as EditIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
  Warning,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';

const SettingsPage = () => {
  const { chamaId } = useParams();
  const [openDelete, setOpenDelete] = useState(false);

  // Mock data - replace with API calls
  const chamaSettings = {
    general: {
      name: 'Investment Chama Group',
      description: 'A group dedicated to growing wealth through various investments',
      currency: 'KES',
      language: 'en',
      timezone: 'Africa/Nairobi',
    },
    security: {
      requireTwoFactor: true,
      allowMemberInvites: true,
      autoApproveMembers: false,
      requireApprovalForWithdrawals: true,
    },
    contributions: {
      minimumAmount: 5000,
      paymentDueDay: 5,
      lateFeePercentage: 5,
      gracePeriodDays: 3,
    },
    meetings: {
      frequency: 'Monthly',
      defaultDay: 'Last Saturday',
      defaultTime: '10:00 AM',
      requireAttendance: true,
      allowVirtual: true,
    },
    notifications: {
      enableEmailNotifications: true,
      enableSMSNotifications: true,
      enablePushNotifications: true,
      reminderDays: 3,
    },
    loans: {
      enableLoans: true,
      minimumMembershipMonths: 3,
      maximumLoanMultiplier: 3,
      interestRate: 10,
      maximumTenureMonths: 12,
    },
  };

  const renderGeneralSettings = () => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Settings sx={{ mr: 1 }} />
          <Typography variant="h6">General Settings</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Chama Name"
              defaultValue={chamaSettings.general.name}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={2}
              defaultValue={chamaSettings.general.description}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Currency</InputLabel>
              <Select
                value={chamaSettings.general.currency}
                label="Currency"
              >
                <MenuItem value="KES">KES - Kenyan Shilling</MenuItem>
                <MenuItem value="USD">USD - US Dollar</MenuItem>
                <MenuItem value="EUR">EUR - Euro</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Language</InputLabel>
              <Select
                value={chamaSettings.general.language}
                label="Language"
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="sw">Swahili</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Timezone</InputLabel>
              <Select
                value={chamaSettings.general.timezone}
                label="Timezone"
              >
                <MenuItem value="Africa/Nairobi">East Africa Time</MenuItem>
                <MenuItem value="UTC">UTC</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderSecuritySettings = () => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Security sx={{ mr: 1 }} />
          <Typography variant="h6">Security Settings</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={chamaSettings.security.requireTwoFactor}
                  color="primary"
                />
              }
              label="Require Two-Factor Authentication for sensitive operations"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={chamaSettings.security.allowMemberInvites}
                  color="primary"
                />
              }
              label="Allow members to invite new members"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={chamaSettings.security.autoApproveMembers}
                  color="primary"
                />
              }
              label="Automatically approve new member applications"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={chamaSettings.security.requireApprovalForWithdrawals}
                  color="primary"
                />
              }
              label="Require approval for withdrawals"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderContributionSettings = () => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Payment sx={{ mr: 1 }} />
          <Typography variant="h6">Contribution Settings</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Minimum Contribution Amount"
              type="number"
              defaultValue={chamaSettings.contributions.minimumAmount}
              InputProps={{
                startAdornment: <Typography sx={{ mr: 1 }}>KES</Typography>,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Payment Due Day"
              type="number"
              defaultValue={chamaSettings.contributions.paymentDueDay}
              helperText="Day of the month when contributions are due"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Late Fee Percentage"
              type="number"
              defaultValue={chamaSettings.contributions.lateFeePercentage}
              InputProps={{
                endAdornment: <Typography sx={{ ml: 1 }}>%</Typography>,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Grace Period"
              type="number"
              defaultValue={chamaSettings.contributions.gracePeriodDays}
              helperText="Number of days after due date before late fee applies"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderMeetingSettings = () => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Schedule sx={{ mr: 1 }} />
          <Typography variant="h6">Meeting Settings</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Meeting Frequency</InputLabel>
              <Select
                value={chamaSettings.meetings.frequency}
                label="Meeting Frequency"
              >
                <MenuItem value="Weekly">Weekly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Quarterly">Quarterly</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Default Meeting Day"
              defaultValue={chamaSettings.meetings.defaultDay}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Default Meeting Time"
              defaultValue={chamaSettings.meetings.defaultTime}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={chamaSettings.meetings.requireAttendance}
                  color="primary"
                />
              }
              label="Require meeting attendance tracking"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={chamaSettings.meetings.allowVirtual}
                  color="primary"
                />
              }
              label="Allow virtual meeting attendance"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderLoanSettings = () => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AccountBalance sx={{ mr: 1 }} />
          <Typography variant="h6">Loan Settings</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={chamaSettings.loans.enableLoans}
                  color="primary"
                />
              }
              label="Enable loan facility"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Minimum Membership Period"
              type="number"
              defaultValue={chamaSettings.loans.minimumMembershipMonths}
              helperText="Months of membership required before loan eligibility"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Maximum Loan Multiplier"
              type="number"
              defaultValue={chamaSettings.loans.maximumLoanMultiplier}
              helperText="Multiple of member's contributions"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Interest Rate"
              type="number"
              defaultValue={chamaSettings.loans.interestRate}
              InputProps={{
                endAdornment: <Typography sx={{ ml: 1 }}>% p.a.</Typography>,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Maximum Loan Tenure"
              type="number"
              defaultValue={chamaSettings.loans.maximumTenureMonths}
              helperText="Maximum loan period in months"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderDangerZone = () => (
    <Card sx={{ bgcolor: 'error.light' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Warning sx={{ mr: 1, color: 'error.main' }} />
          <Typography variant="h6" color="error">Danger Zone</Typography>
        </Box>
        <Typography variant="body2" sx={{ mb: 2 }}>
          These actions are irreversible. Please be certain.
        </Typography>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => setOpenDelete(true)}
        >
          Delete Chama
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">
          Chama Settings
        </Typography>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          sx={{ bgcolor: '#1a237e' }}
        >
          Save Changes
        </Button>
      </Box>

      {renderGeneralSettings()}
      {renderSecuritySettings()}
      {renderContributionSettings()}
      {renderMeetingSettings()}
      {renderLoanSettings()}
      {renderDangerZone()}

      {/* Delete Chama Dialog */}
      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ color: 'error.main' }}>
          Delete Chama
        </DialogTitle>
        <DialogContent>
          <Alert severity="error" sx={{ mb: 2 }}>
            This action cannot be undone. This will permanently delete the Chama,
            all its data, and remove all members.
          </Alert>
          <TextField
            fullWidth
            label="Type CONFIRM to proceed"
            helperText="Please type CONFIRM in all caps to proceed with deletion"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
          >
            Delete Permanently
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SettingsPage;
