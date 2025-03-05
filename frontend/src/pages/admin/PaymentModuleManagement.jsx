import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Tabs,
  Tab,
  FormControlLabel,
  Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CreditCardIcon from '@mui/icons-material/CreditCard';

// Mock data - replace with API calls
const mockPaymentMethods = {
  mpesa: {
    id: 1,
    name: 'M-PESA',
    type: 'MOBILE_MONEY',
    config: {
      consumerKey: '**********************',
      consumerSecret: '**********************',
      paybillNumber: '123456',
      callbackUrl: 'https://api.chamavault.com/callbacks/mpesa',
      enabled: true,
    },
    status: 'ACTIVE',
  },
  bank: {
    id: 2,
    name: 'Bank Transfer',
    type: 'BANK',
    config: {
      bankName: 'KCB Bank',
      accountNumber: '1234567890',
      branchCode: '001',
      swiftCode: 'KCBLKENX',
      enabled: true,
    },
    status: 'ACTIVE',
  },
  card: {
    id: 3,
    name: 'Card Payments',
    type: 'CARD',
    config: {
      merchantId: '**********************',
      apiKey: '**********************',
      webhookSecret: '**********************',
      enabled: false,
    },
    status: 'INACTIVE',
  },
};

const mockTransactions = [
  {
    id: 1,
    date: '2025-01-21',
    chamaName: 'Investment Kings',
    amount: 2500,
    method: 'M-PESA',
    reference: 'MPESA123456',
    status: 'SUCCESS',
  },
  {
    id: 2,
    date: '2025-01-21',
    chamaName: 'Wealth Creators',
    amount: 5000,
    method: 'Bank Transfer',
    reference: 'BANK789012',
    status: 'PENDING',
  },
];

const PaymentModuleManagement = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [openConfigDialog, setOpenConfigDialog] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [configForm, setConfigForm] = useState({});

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleOpenConfig = (method, type) => {
    setSelectedMethod({ ...method, type });
    setConfigForm(method.config);
    setOpenConfigDialog(true);
  };

  const handleCloseConfig = () => {
    setOpenConfigDialog(false);
    setSelectedMethod(null);
  };

  const handleSaveConfig = () => {
    // API call to save configuration
    setPaymentMethods({
      ...paymentMethods,
      [selectedMethod.type.toLowerCase()]: {
        ...paymentMethods[selectedMethod.type.toLowerCase()],
        config: configForm,
      },
    });
    handleCloseConfig();
  };

  const handleToggleMethod = (type) => {
    const method = paymentMethods[type.toLowerCase()];
    setPaymentMethods({
      ...paymentMethods,
      [type.toLowerCase()]: {
        ...method,
        config: {
          ...method.config,
          enabled: !method.config.enabled,
        },
        status: !method.config.enabled ? 'ACTIVE' : 'INACTIVE',
      },
    });
  };

  const renderPaymentMethods = () => (
    <Grid container spacing={3}>
      {/* M-PESA Configuration */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <PhoneAndroidIcon color="primary" />
              <Typography variant="h6">M-PESA</Typography>
              <Box flexGrow={1} />
              <FormControlLabel
                control={
                  <Switch
                    checked={paymentMethods.mpesa.config.enabled}
                    onChange={() => handleToggleMethod('MPESA')}
                  />
                }
                label=""
              />
            </Box>
            <Divider />
            <Box mt={2}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Paybill: {paymentMethods.mpesa.config.paybillNumber}
              </Typography>
              <Button
                variant="outlined"
                startIcon={<SettingsIcon />}
                onClick={() => handleOpenConfig(paymentMethods.mpesa, 'MPESA')}
                fullWidth
              >
                Configure
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Bank Transfer Configuration */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <AccountBalanceIcon color="primary" />
              <Typography variant="h6">Bank Transfer</Typography>
              <Box flexGrow={1} />
              <FormControlLabel
                control={
                  <Switch
                    checked={paymentMethods.bank.config.enabled}
                    onChange={() => handleToggleMethod('BANK')}
                  />
                }
                label=""
              />
            </Box>
            <Divider />
            <Box mt={2}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Account: {paymentMethods.bank.config.accountNumber}
              </Typography>
              <Button
                variant="outlined"
                startIcon={<SettingsIcon />}
                onClick={() => handleOpenConfig(paymentMethods.bank, 'BANK')}
                fullWidth
              >
                Configure
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Card Payments Configuration */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <CreditCardIcon color="primary" />
              <Typography variant="h6">Card Payments</Typography>
              <Box flexGrow={1} />
              <FormControlLabel
                control={
                  <Switch
                    checked={paymentMethods.card.config.enabled}
                    onChange={() => handleToggleMethod('CARD')}
                  />
                }
                label=""
              />
            </Box>
            <Divider />
            <Box mt={2}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Merchant ID: {paymentMethods.card.config.merchantId}
              </Typography>
              <Button
                variant="outlined"
                startIcon={<SettingsIcon />}
                onClick={() => handleOpenConfig(paymentMethods.card, 'CARD')}
                fullWidth
              >
                Configure
              </Button>
            </Box>
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
            <TableCell>Chama Name</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Method</TableCell>
            <TableCell>Reference</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.chamaName}</TableCell>
              <TableCell>KES {transaction.amount}</TableCell>
              <TableCell>{transaction.method}</TableCell>
              <TableCell>{transaction.reference}</TableCell>
              <TableCell>
                <Chip
                  label={transaction.status}
                  color={transaction.status === 'SUCCESS' ? 'success' : 'warning'}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderConfigDialog = () => {
    if (!selectedMethod) return null;

    const configFields = {
      MPESA: [
        { name: 'consumerKey', label: 'Consumer Key', type: 'password' },
        { name: 'consumerSecret', label: 'Consumer Secret', type: 'password' },
        { name: 'paybillNumber', label: 'Paybill Number', type: 'text' },
        { name: 'callbackUrl', label: 'Callback URL', type: 'text' },
      ],
      BANK: [
        { name: 'bankName', label: 'Bank Name', type: 'text' },
        { name: 'accountNumber', label: 'Account Number', type: 'text' },
        { name: 'branchCode', label: 'Branch Code', type: 'text' },
        { name: 'swiftCode', label: 'SWIFT Code', type: 'text' },
      ],
      CARD: [
        { name: 'merchantId', label: 'Merchant ID', type: 'text' },
        { name: 'apiKey', label: 'API Key', type: 'password' },
        { name: 'webhookSecret', label: 'Webhook Secret', type: 'password' },
      ],
    };

    return (
      <Dialog open={openConfigDialog} onClose={handleCloseConfig} maxWidth="sm" fullWidth>
        <DialogTitle>{`Configure ${selectedMethod.name}`}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            {configFields[selectedMethod.type].map((field) => (
              <TextField
                key={field.name}
                label={field.label}
                type={field.type}
                value={configForm[field.name] || ''}
                onChange={(e) =>
                  setConfigForm({ ...configForm, [field.name]: e.target.value })
                }
                fullWidth
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfig}>Cancel</Button>
          <Button onClick={handleSaveConfig} variant="contained" color="primary">
            Save Configuration
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Payment Module Management
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Payment Methods" icon={<PaymentIcon />} iconPosition="start" />
          <Tab label="Transactions" icon={<AccountBalanceIcon />} iconPosition="start" />
        </Tabs>
      </Box>

      {currentTab === 0 && renderPaymentMethods()}
      {currentTab === 1 && renderTransactions()}
      {renderConfigDialog()}
    </Box>
  );
};

export default PaymentModuleManagement;