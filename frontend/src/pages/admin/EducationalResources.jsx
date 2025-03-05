import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
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
  IconButton,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const EducationalResources = () => {
  const [resources, setResources] = useState([
    { id: 1, title: 'Introduction to Chamas', description: 'A guide to understanding chamas.', link: 'http://example.com' },
    { id: 2, title: 'Investment Strategies', description: 'Effective strategies for investing.', link: 'http://example.com' },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', link: '' });

  const handleOpenDialog = (resource = null) => {
    if (resource) {
      setSelectedResource(resource);
      setFormData(resource);
    } else {
      setFormData({ title: '', description: '', link: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedResource(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (selectedResource) {
      setResources((prev) =>
        prev.map((res) => (res.id === selectedResource.id ? { ...res, ...formData } : res))
      );
    } else {
      const newResource = { id: resources.length + 1, ...formData };
      setResources((prev) => [...prev, newResource]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setResources((prev) => prev.filter((res) => res.id !== id));
  };

  return (
    <Box p={3}>
      <Typography variant="h4">Educational Resources</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => handleOpenDialog()}
        sx={{ mt: 2 }}
      >
        Add New Resource
      </Button>
      <Paper elevation={3} sx={{ mt: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Link</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell>{resource.title}</TableCell>
                  <TableCell>{resource.description}</TableCell>
                  <TableCell>
                    <a href={resource.link} target="_blank" rel="noopener noreferrer">{resource.link}</a>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton color="primary" size="small" onClick={() => handleOpenDialog(resource)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" size="small" onClick={() => handleDelete(resource.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add/Edit Resource Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedResource ? 'Edit Resource' : 'Add New Resource'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Link"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedResource ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EducationalResources;