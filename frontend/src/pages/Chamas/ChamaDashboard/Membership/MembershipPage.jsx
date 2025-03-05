import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
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
  Paper,
  IconButton,
  Avatar,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';

const MembershipPage = () => {
  const [openAddMember, setOpenAddMember] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);

  // Mock data - replace with API calls
  const members = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Chairperson',
      email: 'john@example.com',
      phone: '+254 712 345 678',
      joinDate: '2024-01-01',
      status: 'Active',
      contributions: 50000,
      loans: 20000,
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Treasurer',
      email: 'jane@example.com',
      phone: '+254 723 456 789',
      joinDate: '2024-01-01',
      status: 'Active',
      contributions: 45000,
      loans: 0,
    },
  ];

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setOpenAddMember(true);
  };

  const memberRoles = [
    'Chairperson',
    'Secretary',
    'Treasurer',
    'Member',
  ];

  const renderMemberForm = () => (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full Name"
            defaultValue={selectedMember?.name}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              label="Role"
              defaultValue={selectedMember?.role || 'Member'}
            >
              {memberRoles.map((role) => (
                <MenuItem key={role} value={role}>{role}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            defaultValue={selectedMember?.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone Number"
            type="tel"
            defaultValue={selectedMember?.phone}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={() => setOpenAddMember(false)}>
            {selectedMember ? 'Update Member' : 'Add Member'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

  const renderMemberList = () => (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h6">Members List</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Member</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Join Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Contributions</TableCell>
                  <TableCell>Outstanding Loans</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2 }}>{member.name[0]}</Avatar>
                        {member.name}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={member.role}
                        color={member.role === 'Chairperson' ? 'primary' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <MailIcon fontSize="small" sx={{ mr: 1 }} />
                          {member.email}
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
                          {member.phone}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{member.joinDate}</TableCell>
                    <TableCell>
                      <Chip
                        label={member.status}
                        color={member.status === 'Active' ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      KES {member.contributions.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      KES {member.loans.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditMember(member)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Grid>
  );

  const renderInvitations = () => (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Send Invitations
            </Typography>
            <TextField
              fullWidth
              label="Email Addresses"
              multiline
              rows={4}
              placeholder="Enter email addresses separated by commas"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              startIcon={<MailIcon />}
              sx={{ bgcolor: '#1a237e' }}
            >
              Send Invitations
            </Button>
          </Box>
          
          <Typography variant="h6" gutterBottom>
            Pending Invitations
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Sent Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>newmember@example.com</TableCell>
                  <TableCell>2025-01-12</TableCell>
                  <TableCell>
                    <Chip label="Pending" color="warning" size="small" />
                  </TableCell>
                  <TableCell>
                    <Button size="small">Resend</Button>
                    <Button size="small" color="error">
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Membership Management
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setSelectedMember(null);
              setOpenAddMember(true);
            }}
            sx={{ bgcolor: '#1a237e', mb: 3 }}
          >
            Add Member
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={currentTab} onChange={handleTabChange}>
              <Tab label="Members" />
              <Tab label="Invitations" />
            </Tabs>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {currentTab === 0 ? renderMemberList() : renderInvitations()}
        </Grid>
      </Grid>
      {/* Add/Edit Member Dialog */}
      <Dialog
        open={openAddMember}
        onClose={() => setOpenAddMember(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedMember ? 'Edit Member' : 'Add New Member'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {renderMemberForm()}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddMember(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: '#1a237e' }}
          >
            {selectedMember ? 'Save Changes' : 'Add Member'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MembershipPage;
