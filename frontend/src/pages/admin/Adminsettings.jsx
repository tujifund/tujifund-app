import React from 'react';
import { Paper, Typography, TextField, Button, FormControlLabel, Checkbox, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
// 
import { Link as RouterLink } from 'react-router-dom';
import UserFeedback from './UserFeedback';
import AuditLogs from './AuditLogs';

const Adminsettings = () => {
  const [settings, setSettings] = React.useState({
    siteName: '',
    siteLogo: null,
    adminEmail: '',
    smtpHost: '',
    smtpPort: '',
    smtpUser: '',
    smtpPassword: '',
    maintenanceMode: false,
    passwordPolicy: '',
    twoFactorAuth: false,
    users: [],
    themeColors: [],
    defaultLanguage: '',
    sessionTimeout: '',
    enableWidgets: false,
    apiRateLimit: '',
    dataRetention: '',
    enableIntegrations: false,
    backupFrequency: '',
  });

  const [openUserFeedback, setOpenUserFeedback] = React.useState(false);
  const [openAuditLogs, setOpenAuditLogs] = React.useState(false);

  const [activeComponent, setActiveComponent] = React.useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setSettings({ ...settings, siteLogo: e.target.files[0] });
  };

  const handleColorChange = (color) => {
    setSettings({ ...settings, themeColors: [...settings.themeColors, color.hex] });
  };

  const handleSave = () => {
    // Logic to save settings
    console.log('Settings saved:', settings);
  };

  const viewUserFeedback = () => {
    setActiveComponent('userFeedback');
  };

  const viewAuditLogs = () => {
    setActiveComponent('auditLogs');
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Admin Settings</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Site Name"
            name="siteName"
            value={settings.siteName}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <input type="file" onChange={handleFileChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Admin Email"
            name="adminEmail"
            value={settings.adminEmail}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="SMTP Host"
            name="smtpHost"
            value={settings.smtpHost}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="SMTP Port"
            name="smtpPort"
            value={settings.smtpPort}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="SMTP User"
            name="smtpUser"
            value={settings.smtpUser}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="SMTP Password"
            name="smtpPassword"
            type="password"
            value={settings.smtpPassword}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={settings.maintenanceMode}
                onChange={handleChange}
                name="maintenanceMode"
              />
            }
            label="Maintenance Mode"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Password Policy"
            name="passwordPolicy"
            value={settings.passwordPolicy}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={settings.twoFactorAuth}
                onChange={handleChange}
                name="twoFactorAuth"
              />
            }
            label="Enable Two-Factor Authentication"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSave}>
            Save Settings
          </Button>
        </Grid>
      </Grid>
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Localization and Language Settings</Typography>
      <TextField
        label="Default Language"
        name="defaultLanguage"
        value={settings.defaultLanguage}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Session Timeout Settings</Typography>
      <TextField
        label="Session Timeout (minutes)"
        name="sessionTimeout"
        type="number"
        value={settings.sessionTimeout}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Audit Logs</Typography>
      <Button variant="contained" onClick={() => setOpenAuditLogs(true)}>View Audit Logs</Button>
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Customizable Dashboard Widgets</Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={settings.enableWidgets}
            onChange={handleChange}
            name="enableWidgets"
          />
        }
        label="Enable Customizable Widgets"
      />
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>API Rate Limiting</Typography>
      <TextField
        label="API Rate Limit (requests per minute)"
        name="apiRateLimit"
        type="number"
        value={settings.apiRateLimit}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Data Retention Policies</Typography>
      <TextField
        label="Data Retention Period (days)"
        name="dataRetention"
        type="number"
        value={settings.dataRetention}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Third-Party Integration Management</Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={settings.enableIntegrations}
            onChange={handleChange}
            name="enableIntegrations"
          />
        }
        label="Enable Third-Party Integrations"
      />
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Backup Schedule Settings</Typography>
      <TextField
        label="Backup Frequency (hours)"
        name="backupFrequency"
        type="number"
        value={settings.backupFrequency}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>User Feedback and Support</Typography>
      <Button variant="contained" onClick={() => setOpenUserFeedback(true)}>Manage User Feedback</Button>
      {/* <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Theme and Appearance</Typography>
      <Typography variant="h6" gutterBottom>Pick Theme Colors</Typography>
      <Typography variant="h6" gutterBottom>Selected Colors:</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {settings.themeColors.map((color, index) => (
          <Box key={index} sx={{ width: 50, height: 50, backgroundColor: color, border: '1px solid black', margin: 1 }} />
        ))}
      </Box> */}

      {/* User Feedback Dialog */}
      <Dialog open={openUserFeedback} onClose={() => setOpenUserFeedback(false)}>
        <DialogTitle>User Feedback</DialogTitle>
        <DialogContent>
          <UserFeedback />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUserFeedback(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Audit Logs Dialog */}
      <Dialog open={openAuditLogs} onClose={() => setOpenAuditLogs(false)}>
        <DialogTitle>Audit Logs</DialogTitle>
        <DialogContent>
          <AuditLogs />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAuditLogs(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Adminsettings;
