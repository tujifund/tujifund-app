import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

    return (
        <Box sx={{ textAlign: 'center', mt: 5, p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
            <Typography variant="h4">404 <br /> Page Not Found</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>The page you are looking for does not exist.</Typography>
            <Button variant="outlined" onClick={() => navigate('/')}>Go to Home</Button>
        </Box>
    );
}

export default NotFound;
