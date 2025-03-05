import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
} from '@mui/material';
import {
  Close as CloseIcon,
} from '@mui/icons-material';

const HelpDialog = ({ open, onClose }) => {
  const [feedback, setFeedback] = useState('');

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleFeedbackSubmit = () => {
    console.log('Feedback submitted:', feedback);
    setFeedback('');
    onClose(); // Close dialog after submission
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">Help</Typography>
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>FAQs</Typography>
        <Accordion>
          <AccordionSummary>How do I reset my password?</AccordionSummary>
          <AccordionDetails>
            <Typography>
              To reset your password, go to the login page and click on "Forgot Password?". Follow the instructions sent to your email.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>How do I contact support?</AccordionSummary>
          <AccordionDetails>
            <Typography>
              You can contact support at support@example.com or call +1 234 567 8901.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>Where can I find user guides?</AccordionSummary>
          <AccordionDetails>
            <Typography>
              User guides are available on our website under the "Help" section.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Feedback</Typography>
        <TextField
          label="Your Feedback"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          value={feedback}
          onChange={handleFeedbackChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleFeedbackSubmit}
          sx={{ mt: 2 }}
        >
          Submit Feedback
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
