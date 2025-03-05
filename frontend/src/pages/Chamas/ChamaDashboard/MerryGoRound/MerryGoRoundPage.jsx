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
  ListItemSecondaryAction,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useParams } from 'react-router-dom';

const MerryGoRoundPage = () => {
  const { chamaId } = useParams();
  const [currentTab, setCurrentTab] = useState(0);
  const [openNewCycle, setOpenNewCycle] = useState(false);
  const [openContribution, setOpenContribution] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock data - replace with API calls
  const mgrStats = {
    totalCycles: 5,
    activeCycles: 2,
    totalContributed: 250000,
    nextDisbursement: '2025-01-15',
    nextRecipient: 'John Doe',
    contributionAmount: 5000,
  };

  const cycles = [
    {
      id: 1,
      name: 'Cycle 2025 Q1',
      startDate: '2025-01-01',
      endDate: '2025-03-31',
      frequency: 'Monthly',
      amount: 5000,
      status: 'Active',
      members: [
        { name: 'John Doe', position: 1, received: true },
        { name: 'Jane Smith', position: 2, received: false },
        { name: 'Bob Wilson', position: 3, received: false },
      ],
      currentPosition: 1,
      totalMembers: 3,
    },
    {
      id: 2,
      name: 'Cycle 2025 Q2',
      startDate: '2025-04-01',
      endDate: '2025-06-30',
      frequency: 'Monthly',
      amount: 5000,
      status: 'Pending',
      members: [
        { name: 'Alice Brown', position: 1, received: false },
        { name: 'Charlie Davis', position: 2, received: false },
        { name: 'Eve Wilson', position: 3, received: false },
      ],
      currentPosition: 0,
      totalMembers: 3,
    },
  ];

  const contributions = [
    {
      id: 1,
      member: 'John Doe',
      cycle: 'Cycle 2025 Q1',
      amount: 5000,
      date: '2025-01-01',
      status: 'Paid',
    },
    {
      id: 2,
      member: 'Jane Smith',
      cycle: 'Cycle 2025 Q1',
      amount: 5000,
      date: '2025-01-01',
      status: 'Pending',
    },
  ];

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleNewCycle = () => {
    setSelectedCycle(null);
    setOpenNewCycle(true);
  };

  const renderMGRStats = () => (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Loop sx={{ color: 'primary.main', mr: 1 }} />
              <Typography color="textSecondary">Active Cycles</Typography>
            </Box>
            <Typography variant="h4">
              {mgrStats.activeCycles} / {mgrStats.totalCycles}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Payment sx={{ color: 'success.main', mr: 1 }} />
              <Typography color="textSecondary">Total Contributed</Typography>
            </Box>
            <Typography variant="h4" color="success.main">
              KES {mgrStats.totalContributed.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Info sx={{ color: 'info.main', mr: 1 }} />
              <Typography color="textSecondary">Next Disbursement</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h6">{mgrStats.nextRecipient}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {mgrStats.nextDisbursement}
                </Typography>
              </Box>
              <Chip
                label={`KES ${mgrStats.contributionAmount.toLocaleString()}`}
                color="primary"
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderCycleForm = () => (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Cycle Name"
            defaultValue={selectedCycle?.name}
          />
        </Grid>
        <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Select Members</InputLabel>
                  <Select>
                    <MenuItem value="john">John Doe</MenuItem>
                    <MenuItem value="jane">Jane Smith</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Select Order</InputLabel>
                  <Select>
                    <MenuItem value="john">Auto Generate </MenuItem>
                    <MenuItem value="jane">Order by Name("alpherbetical")</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
        <Grid item xs={12} md={6}>
          <DatePicker
            label="Start Date"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DatePicker
            label="End Date"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Contribution Amount"
            type="number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Frequency</InputLabel>
            <Select defaultValue="monthly">
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="quarterly">Quarterly</MenuItem>
              <MenuItem value="annualy">annualy</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );

  const renderCycles = () => (
    <Grid container spacing={3}>
      {cycles.map((cycle) => (
        <Grid item xs={12} key={cycle.id}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">{cycle.name}</Typography>
                <Box>
                  <Chip
                    label={cycle.status}
                    color={cycle.status === 'Active' ? 'success' : 'warning'}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <IconButton size="small" onClick={() => setOpenContribution(true)}>
                    <Payment />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSelectedCycle(cycle);
                      setOpenNewCycle(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Cycle Details
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <CalendarToday fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Duration"
                        secondary={`${cycle.startDate} - ${cycle.endDate}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Payment fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Contribution Amount"
                        secondary={`KES ${cycle.amount.toLocaleString()} ${cycle.frequency}`}
                      />
                    </ListItem>
                  </List>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Member Order
                  </Typography>
                  <Timeline>
                    {cycle.members.map((member, index) => (
                      <TimelineItem key={index}>
                        <TimelineSeparator>
                          <TimelineDot
                            color={member.received ? 'success' : 'grey'}
                            variant={member.received ? 'filled' : 'outlined'}
                          />
                          {index < cycle.members.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                              {member.name[0]}
                            </Avatar>
                            <Typography>{member.name}</Typography>
                            {cycle.currentPosition === member.position && (
                              <Chip
                                label="Current"
                                color="primary"
                                size="small"
                                sx={{ ml: 1 }}
                              />
                            )}
                          </Box>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderContributions = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Member</TableCell>
            <TableCell>Cycle</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
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
              <TableCell>{contribution.cycle}</TableCell>
              <TableCell>KES {contribution.amount.toLocaleString()}</TableCell>
              <TableCell>{contribution.date}</TableCell>
              <TableCell>
                <Chip
                  label={contribution.status}
                  color={contribution.status === 'Paid' ? 'success' : 'warning'}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <IconButton color="primary">
                  <Info />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">
            Merry Go Round
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleNewCycle}
            sx={{ bgcolor: '#1a237e' }}
          >
            Create New Cycle
          </Button>
        </Box>

        {renderMGRStats()}

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab label="Active Cycles" />
            <Tab label="Contributions" />
            <Tab label="History" />
          </Tabs>
        </Box>

        {currentTab === 0 && renderCycles()}
        {currentTab === 1 && renderContributions()}
        {currentTab === 2 && <Typography>History view coming soon...</Typography>}

        {/* New Cycle Dialog */}
        <Dialog
          open={openNewCycle}
          onClose={() => setOpenNewCycle(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {selectedCycle ? 'Edit Cycle' : 'Create New Cycle'}
          </DialogTitle>
          <DialogContent>
            {renderCycleForm()}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenNewCycle(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: '#1a237e' }}
            >
              {selectedCycle ? 'Save Changes' : 'Create Cycle'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Record Contribution Dialog */}
        <Dialog
          open={openContribution}
          onClose={() => setOpenContribution(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Record Contribution</DialogTitle>
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <DatePicker
                    label="Date"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
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
              Record Payment
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default MerryGoRoundPage;
