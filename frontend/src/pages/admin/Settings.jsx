import React from 'react';
import { Container, Typography, Grid, TextField, Button } from '@mui/material';

const MassiveSettings = () => {
  const handleSaveSettings = () => {
    // Logic to save settings
    console.log('Settings saved!');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Massive Settings
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Setting 1"
            variant="outlined"
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Setting 2"
            variant="outlined"
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Setting 3"
            variant="outlined"
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Setting 4"
            variant="outlined"
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveSettings}
          >
            Save Settings
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MassiveSettings;
