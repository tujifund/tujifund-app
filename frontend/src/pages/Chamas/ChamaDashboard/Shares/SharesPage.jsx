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
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Loop,
  Person,
  CalendarToday,
  Payment,
  Check,
  Warning,
  Info,
  SwapHoriz,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useParams } from 'react-router-dom';

const SharesPage = () => {
  const { chamaId } = useParams();
  const [currentTab, setCurrentTab] = useState(0);
  const [openBuyShares, setOpenBuyShares] = useState(false);
  const [openSellShares, setOpenSellShares] = useState(false);
  const [openDividends, setOpenDividends] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock data - replace with API calls
  const shareStats = {
    totalShares: 1000,
    shareValue: 1000,
    totalValue: 1000000,
    availableShares: 200,
    dividendsPaid: 50000,
    lastDividendDate: '2024-12-31',
    sharePrice: {
      current: 1000,
      previous: 950,
      change: 5.26,
    },
  };

  const memberShares = [
    {
      id: 1,
      member: 'John Doe',
      shares: 100,
      value: 100000,
      purchaseDate: '2024-01-01',
      dividendsEarned: 5000,
      lastTransaction: '2025-01-01',
    },
    {
      id: 2,
      member: 'Jane Smith',
      shares: 150,
      value: 150000,
      purchaseDate: '2024-01-01',
      dividendsEarned: 7500,
      lastTransaction: '2025-01-01',
    },
  ];

  const shareTransactions = [
    {
      id: 1,
      date: '2025-01-01',
      member: 'John Doe',
      type: 'Buy',
      shares: 50,
      pricePerShare: 1000,
      totalAmount: 50000,
      status: 'Completed',
    },
    {
      id: 2,
      date: '2025-01-02',
      member: 'Jane Smith',
      type: 'Sell',
      shares: 20,
      pricePerShare: 1000,
      totalAmount: 20000,
      status: 'Pending',
    },
  ];

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const renderShareStats = () => (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Loop sx={{ color: 'primary.main', mr: 1 }} />
              <Typography color="textSecondary">Share Price</Typography>
            </Box>
            <Typography variant="h4">
              KES {shareStats.sharePrice.current.toLocaleString()}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              {shareStats.sharePrice.change >= 0 ? (
                <Info sx={{ color: 'success.main', mr: 1 }} />
              ) : (
                <Warning sx={{ color: 'error.main', mr: 1 }} />
              )}
              <Typography
                color={shareStats.sharePrice.change >= 0 ? 'success.main' : 'error.main'}
              >
                {shareStats.sharePrice.change}%
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Person sx={{ color: 'primary.main', mr: 1 }} />
              <Typography color="textSecondary">Total Value</Typography>
            </Box>
            <Typography variant="h4">
              KES {shareStats.totalValue.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Payment sx={{ color: 'primary.main', mr: 1 }} />
              <Typography color="textSecondary">Available Shares</Typography>
            </Box>
            <Typography variant="h4">
              {shareStats.availableShares.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Check sx={{ color: 'primary.main', mr: 1 }} />
              <Typography color="textSecondary">Dividends Paid</Typography>
            </Box>
            <Typography variant="h4">
              KES {shareStats.dividendsPaid.toLocaleString()}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Last paid: {shareStats.lastDividendDate}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderShareHoldings = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Member</TableCell>
            <TableCell>Shares Owned</TableCell>
            <TableCell>Current Value</TableCell>
            <TableCell>Purchase Date</TableCell>
            <TableCell>Dividends Earned</TableCell>
            <TableCell>Last Transaction</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {memberShares.map((holding) => (
            <TableRow key={holding.id}>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ mr: 1 }}>{holding.member[0]}</Avatar>
                  {holding.member}
                </Box>
              </TableCell>
              <TableCell>{holding.shares.toLocaleString()}</TableCell>
              <TableCell>KES {holding.value.toLocaleString()}</TableCell>
              <TableCell>{holding.purchaseDate}</TableCell>
              <TableCell>KES {holding.dividendsEarned.toLocaleString()}</TableCell>
              <TableCell>{holding.lastTransaction}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => setOpenBuyShares(true)}
                >
                  <SwapHoriz />
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={() => setOpenSellShares(true)}
                >
                  <SwapHoriz sx={{ transform: 'rotate(180deg)' }} />
                </IconButton>
                <IconButton color="primary">
                  <CalendarToday />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderTransactions = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Member</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Shares</TableCell>
            <TableCell>Price per Share</TableCell>
            <TableCell>Total Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shareTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.member}</TableCell>
              <TableCell>
                <Chip
                  label={transaction.type}
                  color={transaction.type === 'Buy' ? 'success' : 'error'}
                  size="small"
                />
              </TableCell>
              <TableCell>{transaction.shares}</TableCell>
              <TableCell>KES {transaction.pricePerShare.toLocaleString()}</TableCell>
              <TableCell>KES {transaction.totalAmount.toLocaleString()}</TableCell>
              <TableCell>
                <Chip
                  label={transaction.status}
                  color={transaction.status === 'Completed' ? 'success' : 'warning'}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <IconButton color="primary">
                  <Visibility />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderShareForm = (type) => (
    <Box sx={{ mt: 2 }}>
      <Alert severity="info" sx={{ mb: 2 }}>
        Current Share Price: KES {shareStats.sharePrice.current.toLocaleString()}
        <br />
        Available Shares: {shareStats.availableShares.toLocaleString()}
      </Alert>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Member</InputLabel>
            <Select>
              <MenuItem value="john">John Doe</MenuItem>
              <MenuItem value="jane">Jane Smith</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Number of Shares"
            type="number"
            helperText={`Total Amount: KES ${(0 * shareStats.sharePrice.current).toLocaleString()}`}
          />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Transaction Date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Payment Method</InputLabel>
            <Select>
              <MenuItem value="mpesa">M-PESA</MenuItem>
              <MenuItem value="bank">Bank Transfer</MenuItem>
              <MenuItem value="cash">Cash</MenuItem>
            </Select>
          </FormControl>
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
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">
          Shares Management
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<SwapHoriz />}
            onClick={() => setOpenBuyShares(true)}
            sx={{ mr: 1, bgcolor: '#1a237e' }}
          >
            Buy Shares
          </Button>
          <Button
            variant="contained"
            startIcon={<SwapHoriz sx={{ transform: 'rotate(180deg)' }} />}
            onClick={() => setOpenSellShares(true)}
            sx={{ mr: 1, bgcolor: '#1a237e' }}
          >
            Sell Shares
          </Button>
          <Button
            variant="contained"
            startIcon={<Check />}
            onClick={() => setOpenDividends(true)}
            sx={{ bgcolor: '#1a237e' }}
          >
            Declare Dividends
          </Button>
        </Box>
      </Box>

      {renderShareStats()}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Share Holdings" />
          <Tab label="Transactions" />
          <Tab label="Dividend History" />
        </Tabs>
      </Box>

      {currentTab === 0 && renderShareHoldings()}
      {currentTab === 1 && renderTransactions()}
      {currentTab === 2 && <Typography>Dividend history coming soon...</Typography>}

      {/* Buy Shares Dialog */}
      <Dialog
        open={openBuyShares}
        onClose={() => setOpenBuyShares(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Buy Shares</DialogTitle>
        <DialogContent>
          {renderShareForm('buy')}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBuyShares(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: '#1a237e' }}
          >
            Buy Shares
          </Button>
        </DialogActions>
      </Dialog>

      {/* Sell Shares Dialog */}
      <Dialog
        open={openSellShares}
        onClose={() => setOpenSellShares(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Sell Shares</DialogTitle>
        <DialogContent>
          {renderShareForm('sell')}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSellShares(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: '#1a237e' }}
          >
            Sell Shares
          </Button>
        </DialogActions>
      </Dialog>

      {/* Declare Dividends Dialog */}
      <Dialog
        open={openDividends}
        onClose={() => setOpenDividends(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Declare Dividends</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Dividend Amount per Share"
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Declaration Date"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
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
          <Button onClick={() => setOpenDividends(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: '#1a237e' }}
          >
            Declare Dividends
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SharesPage;
