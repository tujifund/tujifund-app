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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  PriorityHigh as PriorityHighIcon,
  Event as EventIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';

const NoticeboardPage = () => {
  const [openNewNotice, setOpenNewNotice] = useState(false);
  const [noticeType, setNoticeType] = useState('announcement');

  // Mock data - replace with actual API data
  const notices = [
    {
      id: 1,
      type: 'announcement',
      title: 'Annual General Meeting',
      content: 'The AGM will be held on January 20th, 2025',
      priority: 'high',
      date: '2025-01-12',
    },
    {
      id: 2,
      type: 'event',
      title: 'Investment Workshop',
      content: 'Join us for an investment workshop with industry experts',
      priority: 'medium',
      date: '2025-01-15',
    },
    {
      id: 3,
      type: 'task',
      title: 'Submit Financial Reports',
      content: 'All members to submit their financial reports by end of week',
      priority: 'low',
      date: '2025-01-18',
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getNoticeIcon = (type) => {
    switch (type) {
      case 'announcement':
        return <PriorityHighIcon />;
      case 'event':
        return <EventIcon />;
      case 'task':
        return <AssignmentIcon />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Noticeboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenNewNotice(true)}
          sx={{ bgcolor: '#1a237e' }}
        >
          New Notice
        </Button>
      </Box>

      <Grid container spacing={3}>
        {notices.map((notice) => (
          <Grid item xs={12} md={4} key={notice.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ mr: 1 }}>{getNoticeIcon(notice.type)}</Box>
                  <Typography variant="h6" component="div">
                    {notice.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {notice.content}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
                  <Chip
                    label={notice.priority.toUpperCase()}
                    color={getPriorityColor(notice.priority)}
                    size="small"
                  />
                  <Typography variant="caption" color="text.secondary">
                    {notice.date}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openNewNotice} onClose={() => setOpenNewNotice(false)}>
        <DialogTitle>New Notice</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Notice Type</InputLabel>
              <Select
                value={noticeType}
                label="Notice Type"
                onChange={(e) => setNoticeType(e.target.value)}
              >
                <MenuItem value="announcement">Announcement</MenuItem>
                <MenuItem value="event">Event</MenuItem>
                <MenuItem value="task">Task</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Title"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Content"
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                label="Priority"
                defaultValue="medium"
              >
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Date"
              type="date"
              defaultValue="2025-01-12"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewNotice(false)}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: '#1a237e' }}>
            Post Notice
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NoticeboardPage;
