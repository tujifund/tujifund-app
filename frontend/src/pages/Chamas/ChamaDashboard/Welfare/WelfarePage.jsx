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
  Rating,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Alert,
  Avatar,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Favorite,
  MonetizationOn,
  People,
  Assessment,
  Visibility,
  History,
  LocalHospital,
  School,
  Celebration,
  FamilyRestroom,
  Receipt,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useParams } from 'react-router-dom';

const WelfarePage = () => {
  const { chamaId } = useParams();
  const [currentTab, setCurrentTab] = useState(0);
  const [openContribution, setOpenContribution] = useState(false);
  const [openClaim, setOpenClaim] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock data - replace with API calls
  const welfareStats = {
    totalFund: 500000,
    totalContributions: 750000,
    totalClaims: 250000,
    activeMembers: 25,
    pendingClaims: 3,
    lastContribution: '2025-01-01',
    monthlyContribution: 2000,
  };

  const claims = [
    {
      id: 1,
      member: 'John Doe',
      type: 'Medical',
      amount: 50000,
      date: '2025-01-01',
      status: 'Approved',
      description: 'Hospital bills for surgery',
      attachments: 2,
      urgency: 'High',
    },
    {
      id: 2,
      member: 'Jane Smith',
      type: 'Education',
      amount: 30000,
      date: '2025-01-02',
      status: 'Pending',
      description: 'School fees for children',
      attachments: 1,
      urgency: 'Medium',
    },
  ];

  const contributions = [
    {
      id: 1,
      member: 'John Doe',
      amount: 2000,
      date: '2025-01-01',
      status: 'Paid',
      paymentMethod: 'M-PESA',
    },
    {
      id: 2,
      member: 'Jane Smith',
      amount: 2000,
      date: '2025-01-01',
      status: 'Pending',
      paymentMethod: 'Bank Transfer',
    },
  ];

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const getClaimTypeIcon = (type) => {
    switch (type) {
      case 'Medical':
        return <LocalHospital />;
      case 'Education':
        return <School />;
      case 'Celebration':
        return <Celebration />;
      case 'Family':
        return <FamilyRestroom />;
      default:
        return <Favorite />;
    }
  };

  const renderWelfareStats = () => (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <MonetizationOn sx={{ color: 'primary.main', mr: 1 }} />
              <Typography color="textSecondary">Total Fund</Typography>
            </Box>
            <Typography variant="h4">
              KES {welfareStats.totalFund.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <People sx={{ color: 'primary.main', mr: 1 }} />
              <Typography color="textSecondary">Active Members</Typography>
            </Box>
            <Typography variant="h4">
              {welfareStats.activeMembers}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Assessment sx={{ color: 'primary.main', mr: 1 }} />
              <Typography color="textSecondary">Pending Claims</Typography>
            </Box>
            <Typography variant="h4">
              {welfareStats.pendingClaims}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Receipt sx={{ color: 'primary.main', mr: 1 }} />
              <Typography color="textSecondary">Monthly Contribution</Typography>
            </Box>
            <Typography variant="h4">
              KES {welfareStats.monthlyContribution.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderClaims = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Member</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Urgency</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {claims.map((claim) => (
            <TableRow key={claim.id}>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ mr: 1 }}>{claim.member[0]}</Avatar>
                  {claim.member}
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {getClaimTypeIcon(claim.type)}
                  <Typography sx={{ ml: 1 }}>{claim.type}</Typography>
                </Box>
              </TableCell>
              <TableCell>KES {claim.amount.toLocaleString()}</TableCell>
              <TableCell>{claim.date}</TableCell>
              <TableCell>{claim.description}</TableCell>
              <TableCell>
                <Rating
                  value={claim.urgency === 'High' ? 3 : claim.urgency === 'Medium' ? 2 : 1}
                  readOnly
                  max={3}
                  icon={<Favorite fontSize="inherit" />}
                  emptyIcon={<Favorite fontSize="inherit" />}
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={claim.status}
                  color={
                    claim.status === 'Approved'
                      ? 'success'
                      : claim.status === 'Pending'
                      ? 'warning'
                      : 'error'
                  }
                  size="small"
                />
              </TableCell>
              <TableCell>
                <IconButton color="primary">
                  <Visibility />
                </IconButton>
                <IconButton color="primary">
                  <History />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderContributions = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Member</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contributions.map((contribution) => (
            <TableRow key={contribution.id}>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ mr: 1 }}>{contribution.member[0]}</Avatar>
                  {contribution.member}
                </Box>
              </TableCell>
              <TableCell>KES {contribution.amount.toLocaleString()}</TableCell>
              <TableCell>{contribution.date}</TableCell>
              <TableCell>{contribution.paymentMethod}</TableCell>
              <TableCell>
                <Chip
                  label={contribution.status}
                  color={contribution.status === 'Paid' ? 'success' : 'warning'}
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

  const renderClaimForm = () => (
    <Box sx={{ mt: 2 }}>
      <Alert severity="info" sx={{ mb: 2 }}>
        Available Fund Balance: KES {welfareStats.totalFund.toLocaleString()}
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
          <FormControl fullWidth>
            <InputLabel>Claim Type</InputLabel>
            <Select>
              <MenuItem value="medical">Medical</MenuItem>
              <MenuItem value="education">Education</MenuItem>
              <MenuItem value="celebration">Celebration</MenuItem>
              <MenuItem value="family">Family Support</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Amount"
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Claim Date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Urgency Level</InputLabel>
            <Select>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
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
          <Button
            variant="outlined"
            component="label"
            fullWidth
          >
            Upload Supporting Documents
            <input
              type="file"
              hidden
              multiple
            />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">
          Welfare Fund
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<MonetizationOn />}
            onClick={() => setOpenContribution(true)}
            sx={{ mr: 1, bgcolor: '#1a237e' }}
          >
            Make Contribution
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenClaim(true)}
            sx={{ bgcolor: '#1a237e' }}
          >
            New Claim
          </Button>
        </Box>
      </Box>

      {renderWelfareStats()}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Claims" />
          <Tab label="Contributions" />
          <Tab label="Rules & Benefits" />
        </Tabs>
      </Box>

      {currentTab === 0 && renderClaims()}
      {currentTab === 1 && renderContributions()}
      {currentTab === 2 && (
        <Typography>Rules and benefits documentation coming soon...</Typography>
      )}

      {/* New Claim Dialog */}
      <Dialog
        open={openClaim}
        onClose={() => setOpenClaim(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Submit New Claim</DialogTitle>
        <DialogContent>
          {renderClaimForm()}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenClaim(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: '#1a237e' }}
          >
            Submit Claim
          </Button>
        </DialogActions>
      </Dialog>

      {/* Make Contribution Dialog */}
      <Dialog
        open={openContribution}
        onClose={() => setOpenContribution(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Make Contribution</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
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
                  label="Amount"
                  type="number"
                  defaultValue={welfareStats.monthlyContribution}
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Contribution Date"
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
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenContribution(false)}>
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
    </Box>
  );
};

export default WelfarePage;
