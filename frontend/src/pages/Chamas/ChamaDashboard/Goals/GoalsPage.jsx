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
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Flag,
  Timeline,
  TrendingUp,
  CheckCircle,
  Group,
  Assessment,
  CalendarToday,
  MonetizationOn,
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useParams } from 'react-router-dom';

const GoalsPage = () => {
  const { chamaId } = useParams();
  const [openNewGoal, setOpenNewGoal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock data - replace with API calls
  const goals = [
    {
      id: 1,
      title: 'Real Estate Investment',
      description: 'Purchase commercial property in CBD',
      target: 10000000,
      current: 7500000,
      deadline: '2025-12-31',
      status: 'In Progress',
      category: 'Investment',
      milestones: [
        { title: 'Location Research', completed: true },
        { title: 'Fund Collection', completed: true },
        { title: 'Property Viewing', completed: false },
        { title: 'Purchase Agreement', completed: false },
      ],
    },
    {
      id: 2,
      title: 'Emergency Fund',
      description: 'Build emergency fund for members',
      target: 1000000,
      current: 250000,
      deadline: '2025-06-30',
      status: 'In Progress',
      category: 'Savings',
      milestones: [
        { title: 'Initial Fund Setup', completed: true },
        { title: 'First Quarter Target', completed: false },
        { title: 'Mid-year Review', completed: false },
      ],
    },
  ];

  const goalStats = {
    totalGoals: goals.length,
    completedGoals: goals.filter(g => g.status === 'Completed').length,
    totalTargetAmount: goals.reduce((sum, g) => sum + g.target, 0),
    totalCurrentAmount: goals.reduce((sum, g) => sum + g.current, 0),
  };

  const renderGoalStats = () => (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Flag sx={{ color: 'primary.main', mr: 1 }} />
              <Typography color="textSecondary">Active Goals</Typography>
            </Box>
            <Typography variant="h4">
              {goalStats.totalGoals}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CheckCircle sx={{ color: 'primary.main', mr: 1 }} />
              <Typography color="textSecondary">Completed Goals</Typography>
            </Box>
            <Typography variant="h4">
              {goalStats.completedGoals}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TrendingUp sx={{ color: 'primary.main', mr: 1 }} />
              <Typography color="textSecondary">Total Target</Typography>
            </Box>
            <Typography variant="h4">
              KES {goalStats.totalTargetAmount.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Assessment sx={{ color: 'primary.main', mr: 1 }} />
              <Typography color="textSecondary">Current Progress</Typography>
            </Box>
            <Typography variant="h4">
              {Math.round((goalStats.totalCurrentAmount / goalStats.totalTargetAmount) * 100)}%
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderGoalForm = () => (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Goal Title"
            defaultValue={selectedGoal?.title}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            defaultValue={selectedGoal?.description}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Target Amount"
            type="number"
            defaultValue={selectedGoal?.target}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DatePicker
            label="Deadline"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select defaultValue={selectedGoal?.category || 'investment'}>
              <MenuItem value="investment">Investment</MenuItem>
              <MenuItem value="savings">Savings</MenuItem>
              <MenuItem value="property">Property</MenuItem>
              <MenuItem value="business">Business</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Milestones (comma-separated)"
            multiline
            rows={3}
            helperText="Enter key milestones to track progress"
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderGoalsList = () => (
    <Grid container spacing={3}>
      {goals.map((goal) => (
        <Grid item xs={12} key={goal.id}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {goal.title}
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    {goal.description}
                  </Typography>
                </Box>
                <Box>
                  <Chip
                    label={goal.status}
                    color={goal.status === 'Completed' ? 'success' : 'primary'}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSelectedGoal(goal);
                      setOpenNewGoal(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Progress
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(goal.current / goal.target) * 100}
                      sx={{ mb: 1, height: 10, borderRadius: 5 }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="textSecondary">
                        Current: KES {goal.current.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Target: KES {goal.target.toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CalendarToday fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      Deadline: {goal.deadline}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Milestones
                  </Typography>
                  <List dense>
                    {goal.milestones.map((milestone, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircle
                            color={milestone.completed ? 'success' : 'disabled'}
                            fontSize="small"
                          />
                        </ListItemIcon>
                        <ListItemText primary={milestone.title} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">
            Chama Goals
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setSelectedGoal(null);
              setOpenNewGoal(true);
            }}
            sx={{ bgcolor: '#1a237e' }}
          >
            New Goal
          </Button>
        </Box>

        {renderGoalStats()}
        {renderGoalsList()}

        {/* New/Edit Goal Dialog */}
        <Dialog
          open={openNewGoal}
          onClose={() => setOpenNewGoal(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {selectedGoal ? 'Edit Goal' : 'Create New Goal'}
          </DialogTitle>
          <DialogContent>
            {renderGoalForm()}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenNewGoal(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: '#1a237e' }}
            >
              {selectedGoal ? 'Save Changes' : 'Create Goal'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default GoalsPage;
