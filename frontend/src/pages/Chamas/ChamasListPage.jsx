import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Chip,
  Avatar,
  Divider,
  TextField,
  InputAdornment,
  MenuItem,
  Menu,
  ListItemIcon,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExitToApp as LeaveIcon,
  Share as ShareIcon,
  People as PeopleIcon,
  AccountBalance as AccountBalanceIcon,
  Sort as SortIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ChamasListPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedChama, setSelectedChama] = useState(null);
  const [actionAnchorEl, setActionAnchorEl] = useState(null);
  const [confirmLeaveDialog, setConfirmLeaveDialog] = useState(false);

  // Mock data - replace with API call
  const chamas = [
    {
      id: 1,
      name: 'Intel Kwote',
      type: 'Investment',
      members: 15,
      role: 'Chairperson',
      avatar: 'I',
      color: '#1a237e',
      lastActivity: '2 hours ago',
      nextMeeting: '2024-01-15',
    },
    {
      id: 2,
      name: 'Jamii Savings',
      type: 'Savings',
      members: 20,
      role: 'Treasurer',
      avatar: 'S',
      color: '#0d47a1',
      lastActivity: '1 day ago',
      nextMeeting: '2024-01-18',
    },
    {
      id: 3,
      name: 'Welfare Kwetu',
      type: 'Welfare',
      members: 30,
      role: 'Member',
      avatar: 'W',
      color: '#2962ff',
      lastActivity: '3 days ago',
      nextMeeting: '2024-01-20',
    },
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleActionClick = (event, chama) => {
    setSelectedChama(chama);
    setActionAnchorEl(event.currentTarget);
  };

  const handleActionClose = () => {
    setActionAnchorEl(null);
  };

  const handleChamaClick = (chamaId) => {
    navigate(`/ChamaDashboard/${chamaId}/home`);
  };

  const handleCreateChama = () => {
    navigate('/CreateChama');
  };


  const handleLeaveChama = () => {
    setConfirmLeaveDialog(true);
    handleActionClose();
  };

  const handleConfirmLeave = () => {
    // Add leave chama logic
    setConfirmLeaveDialog(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);
  };

  const filteredChamas = chamas.filter((chama) =>
    chama.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: 2 }}>
      {/* Header */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            My Chamas
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateChama}
            sx={{ 
              bgcolor: '#1a237e',
            }}
          >
            Create New Chama
          </Button>
        </Grid>
      </Grid>

      {/* Search and Filters */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={8}>
          <TextField
            placeholder="Search chamas..."
            value={searchTerm}
            onChange={handleSearch}
            variant="outlined"
            size="small"
            sx={{ flexGrow: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            startIcon={<SortIcon />}
            onClick={handleSortClick}
            variant="outlined"
            size="small"
            sx={{ mr: 1 }}
          >
            Sort
          </Button>
          <Button
            startIcon={<FilterIcon />}
            onClick={handleFilterClick}
            variant="outlined"
            size="small"
          >
            Filter
          </Button>
        </Grid>
      </Grid>

      {/* Chamas Grid */}
      <Grid container spacing={3}>
        {filteredChamas.map((chama) => (
          <Grid item xs={12} sm={6} md={4} key={chama.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
                cursor: 'pointer',
              }}
              onClick={() => handleChamaClick(chama.id)}
            >
              <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: chama.color,
                      width: 56,
                      height: 56,
                      mr: 2,
                    }}
                  >
                    {chama.avatar}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" noWrap>
                      {chama.name}
                    </Typography>
                    <Chip
                      label={chama.role}
                      size="small"
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleActionClick(e, chama);
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Members
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <PeopleIcon fontSize="small" />
                      {chama.members}
                    </Typography>
                  </Grid>
                  {/* <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Balance
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AccountBalanceIcon fontSize="small" />
                      {formatCurrency(chama.balance)}
                    </Typography>
                  </Grid> */}
                </Grid>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Last Activity: {chama.lastActivity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Next Meeting: {chama.nextMeeting}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Sort Menu */}
      <Menu
        anchorEl={sortAnchorEl}
        open={Boolean(sortAnchorEl)}
        onClose={handleSortClose}
      >
        <MenuItem onClick={handleSortClose}>Name (A-Z)</MenuItem>
        <MenuItem onClick={handleSortClose}>Name (Z-A)</MenuItem>
        <MenuItem onClick={handleSortClose}>Balance (High-Low)</MenuItem>
        <MenuItem onClick={handleSortClose}>Balance (Low-High)</MenuItem>
        <MenuItem onClick={handleSortClose}>Members (High-Low)</MenuItem>
        <MenuItem onClick={handleSortClose}>Members (Low-High)</MenuItem>
      </Menu>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
      >
        <MenuItem onClick={handleFilterClose}>All Types</MenuItem>
        <MenuItem onClick={handleFilterClose}>Investment</MenuItem>
        <MenuItem onClick={handleFilterClose}>Savings</MenuItem>
        <MenuItem onClick={handleFilterClose}>Welfare</MenuItem>
        <Divider />
        <MenuItem onClick={handleFilterClose}>All Roles</MenuItem>
        <MenuItem onClick={handleFilterClose}>Chairperson</MenuItem>
        <MenuItem onClick={handleFilterClose}>Treasurer</MenuItem>
        <MenuItem onClick={handleFilterClose}>Secretary</MenuItem>
        <MenuItem onClick={handleFilterClose}>Member</MenuItem>
      </Menu>

      {/* Action Menu */}
      <Menu
        anchorEl={actionAnchorEl}
        open={Boolean(actionAnchorEl)}
        onClose={handleActionClose}
      >
        <MenuItem onClick={handleActionClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={handleActionClose}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          Share
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLeaveChama} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <LeaveIcon fontSize="small" color="error" />
          </ListItemIcon>
          Leave Chama
        </MenuItem>
      </Menu>

      {/* Confirm Leave Dialog */}
      <Dialog
        open={confirmLeaveDialog}
        onClose={() => setConfirmLeaveDialog(false)}
      >
        <DialogTitle>Leave Chama?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to leave {selectedChama?.name}? <b>This action cannot be undone</b>.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmLeaveDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmLeave} color="error">
            Leave
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChamasListPage;
