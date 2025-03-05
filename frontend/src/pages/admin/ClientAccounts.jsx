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
  TextField,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Block as BlockIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const mockClients = [
  {
    id: 1,
    name: 'John Doe',
    type: 'Individual - Normal',
    phone: '+254700000001',
    email: 'john@example.com',
    status: 'Active',
    idNumber: 'ID123456',
    totalChama: 5,
    pendingVerification: false,
  },
  {
    id: 2,
    name: 'Investment Group A',
    type: 'Group',
    phone: '+254700000002',
    email: 'groupa@example.com',
    status: 'Pending Verification',
    idNumber: 'GRP123456',
    TotalMembers: '100',
    pendingVerification: true,
  },
  {
    id: 3,
    name: 'Jane Doe',
    type: 'Individual - Locked',
    phone: '+254700000003',
    email: 'jane@example.com',
    status: 'Active',
    idNumber: 'ID789012',
    totalChama: '5',
    pendingVerification: false,
  },
];

function ClientAccounts() {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [detailsDialog, setDetailsDialog] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleViewDetails = (client) => {
    setSelectedClient(client);
    setDetailsDialog(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Pending Verification':
        return 'warning';
      case 'Suspended':
        return 'error';
      default:
        return 'default';
    }
  };

  const getAccountTypeLabel = (type) => {
    switch (type) {
      case 'Individual - Normal':
        return 'Individual - Normal';
      case 'Individual - Locked':
        return 'Individual - Locked';
      case 'Group':
        return 'Group';
      default:
        return 'Unknown';
    }
  };

  const filterAccounts = () => {
    let filteredClients = mockClients.filter((client) => {
      const searchMatch =
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.idNumber.toLowerCase().includes(searchTerm.toLowerCase());

      switch (tabValue) {
        case 0: // All Clients
          return searchMatch;
        case 1: // Individual Normal Accounts
          return searchMatch && client.type === 'Individual - Normal';
        case 2: // Individual Locked Accounts
          return searchMatch && client.type === 'Individual - Locked';
        case 3: // Group Accounts
          return searchMatch && client.type === 'Group';
        case 4: // Pending Verification
          return searchMatch && client.pendingVerification;
        default:
          return false;
      }
    });

    return filteredClients;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Client Management Header */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="All Clients" />
                <Tab label="Individual Normal" />
                <Tab label="Individual Locked" />
                <Tab label="Chama(s)" />
                <Tab label="Pending Verification" />
              </Tabs>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search by name, email, or ID number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Client List */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Account Type</TableCell>
                    <TableCell>Contact</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Total Chamas</TableCell>
                    <TableCell>Total Members</TableCell>
                    <TableCell>Verification</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filterAccounts().map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>
                        <Typography variant="subtitle2">{client.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {client.email}
                        </Typography>
                      </TableCell>
                      <TableCell>{getAccountTypeLabel(client.type)}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton size="small" color="primary">
                            <PhoneIcon />
                          </IconButton>
                          <IconButton size="small" color="primary">
                            <EmailIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={client.status}
                          color={getStatusColor(client.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{client.totalChama}</TableCell>
                      <TableCell>{client.TotalMembers}</TableCell>
                      <TableCell>
                        {client.pendingVerification ? (
                          <Chip
                            icon={<WarningIcon />}
                            label="Pending"
                            color="warning"
                            size="small"
                          />
                        ) : (
                          <Chip
                            icon={<CheckCircleIcon />}
                            label="Verified"
                            color="success"
                            size="small"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleViewDetails(client)}
                          >
                            View Details
                          </Button>
                          {client.pendingVerification && (
                            <Button size="small" variant="contained" color="success">
                              Verify
                            </Button>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Client Details Dialog */}
      <Dialog
        open={detailsDialog}
        onClose={() => setDetailsDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedClient && (
          <>
            <DialogTitle>
              Account Details - {selectedClient.name}
              <IconButton
                onClick={() => setDetailsDialog(false)}
                sx={{ position: 'absolute', right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Phone Number
                    </Typography>
                    <Typography>{selectedClient.phone}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      ID Number
                    </Typography>
                    <Typography>{selectedClient.idNumber}</Typography>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Account Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" color="text.secondary">
                    <Typography>{selectedClient.TotalMembers}</Typography>
                    </Typography>
                    <Typography>{selectedClient.totalChama}</Typography>
                  </Grid>
                </Grid>
              </Box>

              {selectedClient.pendingVerification && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Verification Actions
                  </Typography>
                  <Button variant="contained" color="success" sx={{ mr: 1 }}>
                    Approve Account
                  </Button>
                  <Button variant="contained" color="error">
                    Reject Account
                  </Button>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetailsDialog(false)}>Close</Button>
              <Button variant="contained" color="primary">
                Edit Details
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
}

export default ClientAccounts;
