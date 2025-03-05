import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Snackbar,
  Alert,
} from '@mui/material';

const CreateChama = () => {
  const [chamaName, setChamaName] = useState('');
  const [chamaDescription, setChamaDescription] = useState('');
  const [chamaType, setChamaType] = useState('');
  const [chamaRules, setChamaRules] = useState('');
  const [chamaIcon, setChamaIcon] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to create a new Chama goes here
    setSnackbarMessage('Chama created successfully!');
    setOpenSnackbar(true);
    // Reset form fields
    setChamaName('');
    setChamaDescription('');
    setChamaType('');
    setChamaRules('');
    setChamaIcon(null);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create New Chama
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Chama Name"
          fullWidth
          required
          value={chamaName}
          onChange={(e) => setChamaName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          required
          value={chamaDescription}
          onChange={(e) => setChamaDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Chama Type</InputLabel>
          <Select
            value={chamaType}
            onChange={(e) => setChamaType(e.target.value)}
          >
            <MenuItem value="savings">Savings</MenuItem>
            <MenuItem value="investment">Investment</MenuItem>
            <MenuItem value="Welafare">Welfare</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Currency</InputLabel>
          <Select
            value={chamaType}
            onChange={(e) => setChamaType(e.target.value)}
          >
            <MenuItem value="USD">USD $</MenuItem>
            <MenuItem value="KSH">KSH</MenuItem>
            <MenuItem value="Euro">Euro £</MenuItem>
            <MenuItem value="Nyra">Nyra ₦</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Chama Rules"
          fullWidth
          multiline
          rows={4}
          required
          value={chamaRules}
          onChange={(e) => setChamaRules(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" component="label" sx={{ mb: 2 }}>
          Upload Chama Icon
          <input
            type="file"
            hidden
            onChange={(e) => setChamaIcon(e.target.files[0])}
          />
          <br />
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Create Chama
        </Button>
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateChama;
