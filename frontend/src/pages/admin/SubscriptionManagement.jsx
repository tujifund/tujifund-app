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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

// Mock data - replace with API calls
const mockSubscriptionPlans = [
  {
    id: 1,
    name: 'Basic',
    price: 1000,
    duration: 'MONTHLY',
    features: ['Up to 50 members', 'Basic reporting', 'Email support'],
    status: 'ACTIVE',
  },
  {
    id: 2,
    name: 'Premium',
    price: 2500,
    duration: 'MONTHLY',
    features: ['Up to 200 members', 'Advanced reporting', '24/7 support', 'Custom modules'],
    status: 'ACTIVE',
  },
];

const SubscriptionManagement = () => {
  const [plans, setPlans] = useState(mockSubscriptionPlans);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [planForm, setPlanForm] = useState({
    name: '',
    price: '',
    duration: 'MONTHLY',
    features: [],
  });

  const handleOpenDialog = (plan = null) => {
    if (plan) {
      setPlanForm(plan);
    } else {
      setPlanForm({
        name: '',
        price: '',
        duration: 'MONTHLY',
        features: [],
      });
    }
    setSelectedPlan(plan);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPlan(null);
  };

  const handleSavePlan = () => {
    if (selectedPlan) {
      setPlans(plans.map(p => p.id === selectedPlan.id ? { ...planForm, id: p.id } : p));
    } else {
      setPlans([...plans, { ...planForm, id: plans.length + 1, status: 'ACTIVE' }]);
    }
    handleCloseDialog();
  };

  const handleDeletePlan = (id) => {
    setPlans(plans.filter(plan => plan.id !== id));
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>Subscription Management</Typography>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>Add New Plan</Button>

      <Grid container spacing={3} mt={3}>
        {plans.map((plan) => (
          <Grid item xs={12} md={6} key={plan.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{plan.name}</Typography>
                <Typography>Price: KES {plan.price}</Typography>
                <Typography>Duration: {plan.duration}</Typography>
                <Typography>Features:</Typography>
                <ul>
                  {plan.features.map((feature, index) => <li key={index}>{feature}</li>)}
                </ul>
                <Chip label={plan.status} color={plan.status === 'ACTIVE' ? 'success' : 'default'} />
                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <IconButton onClick={() => handleOpenDialog(plan)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => handleDeletePlan(plan.id)}><DeleteIcon /></IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedPlan ? 'Edit Plan' : 'New Subscription Plan'}</DialogTitle>
        <DialogContent>
          <TextField label="Plan Name" value={planForm.name} onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })} fullWidth />
          <TextField label="Price (KES)" type="number" value={planForm.price} onChange={(e) => setPlanForm({ ...planForm, price: e.target.value })} fullWidth />
          <TextField label="Duration" value={planForm.duration} onChange={(e) => setPlanForm({ ...planForm, duration: e.target.value })} fullWidth />
          <TextField label="Features (comma separated)" value={planForm.features.join(', ')} onChange={(e) => setPlanForm({ ...planForm, features: e.target.value.split(',').map(f => f.trim()) })} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSavePlan} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubscriptionManagement;