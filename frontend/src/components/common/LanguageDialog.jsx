import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
} from '@mui/material';
import {
  Close as CloseIcon,
} from '@mui/icons-material';

const LanguageDialog = ({ open, onClose, languages, onSelect }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">Select Language</Typography>
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <List>
          {languages.map((language) => (
            <ListItem button key={language.code} onClick={() => onSelect(language)}>
              <ListItemText primary={language.name} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageDialog;
