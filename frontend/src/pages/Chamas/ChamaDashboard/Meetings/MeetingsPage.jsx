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
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Checkbox,
  Divider,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Event as EventIcon,
  Schedule as ScheduleIcon,
  People as PeopleIcon,
  Description as DescriptionIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';

const MeetingsPage = () => {
  const { chamaId } = useParams();
  const [currentTab, setCurrentTab] = useState(0);
  const [openNewMeeting, setOpenNewMeeting] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [openAttendance, setOpenAttendance] = useState(false);
  const [openMinutes, setOpenMinutes] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock data - replace with API calls
  const meetings = [
    {
      id: 1,
      title: 'Monthly General Meeting',
      date: '2025-01-15T14:00',
      location: 'Virtual Meeting',
      status: 'Upcoming',
      agenda: [
        'Previous minutes review',
        'Financial report',
        'New member applications',
        'Loan applications review',
      ],
      attendees: 12,
      totalMembers: 15,
    },
    {
      id: 2,
      title: 'Emergency Meeting',
      date: '2025-01-10T10:00',
      location: 'Office Boardroom',
      status: 'Upcoming',
      agenda: [
        'Investment opportunity discussion',
        'Budget allocation',
      ],
      attendees: 14,
      totalMembers: 15,
      minutes: 'Discussion about new investment opportunity...',
    },
  ];

  const members = [
    { id: 1, name: 'John Doe', role: 'Chairperson', status: 'Present' },
    { id: 2, name: 'Jane Smith', role: 'Treasurer', status: 'Absent' },
    { id: 3, name: 'Bob Wilson', role: 'Secretary', status: 'Present' },
  ];

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleNewMeeting = () => {
    setSelectedMeeting(null);
    setOpenNewMeeting(true);
  };

  const handleEditMeeting = (meeting) => {
    setSelectedMeeting(meeting);
    setOpenNewMeeting(true);
  };

  const renderMeetingForm = () => (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Meeting Title"
            defaultValue={selectedMeeting?.title}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Date & Time"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Location"
            defaultValue={selectedMeeting?.location}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Agenda Items"
            multiline
            rows={4}
            placeholder="Enter agenda items (one per line)"
            defaultValue={selectedMeeting?.agenda?.join('\n')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Additional Notes"
            multiline
            rows={2}
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderMinutesForm = () => (
    <Box sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Meeting Minutes"
        multiline
        rows={10}
        defaultValue={selectedMeeting?.minutes}
      />
    </Box>
  );

  const renderAttendanceForm = () => (
    <List>
      {members.map((member) => (
        <ListItem key={member.id}>
          <ListItemIcon>
            <Checkbox defaultChecked={member.status === 'Present'} />
          </ListItemIcon>
          <ListItemIcon>
            <Avatar>{member.name[0]}</Avatar>
          </ListItemIcon>
          <ListItemText
            primary={member.name}
            secondary={member.role}
          />
          <Chip
            label={member.status}
            color={member.status === 'Present' ? 'success' : 'error'}
            size="small"
          />
        </ListItem>
      ))}
    </List>
  );

  const renderUpcomingMeetings = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Meeting</TableCell>
            <TableCell>Date & Time</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Agenda</TableCell>
            <TableCell>Attendance</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meetings.map((meeting) => (
            <TableRow key={meeting.id}>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EventIcon sx={{ mr: 1, color: 'primary.main' }} />
                  {meeting.title}
                </Box>
              </TableCell>
              <TableCell>
                {new Date(meeting.date).toLocaleString()}
              </TableCell>
              <TableCell>{meeting.location}</TableCell>
              <TableCell>
                <List dense>
                  {meeting.agenda.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </TableCell>
              <TableCell>
                {meeting.attendees}/{meeting.totalMembers}
              </TableCell>
              <TableCell>
                <Chip
                  label={meeting.status}
                  color={meeting.status === 'Upcoming' ? 'primary' : 'success'}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => handleEditMeeting(meeting)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={() => {
                    setSelectedMeeting(meeting);
                    setOpenAttendance(true);
                  }}
                >
                  <PeopleIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={() => {
                    setSelectedMeeting(meeting);
                    setOpenMinutes(true);
                  }}
                >
                  <DescriptionIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderMeetingHistory = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Past Meetings
        </Typography>
        <List>
          {meetings
            .filter((meeting) => meeting.status === 'Completed')
            .map((meeting) => (
              <React.Fragment key={meeting.id}>
                <ListItem>
                  <ListItemIcon>
                    <EventIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={meeting.title}
                    secondary={`${new Date(meeting.date).toLocaleString()} - ${meeting.location}`}
                  />
                  
                  <Button
                    size="small"
                    startIcon={<DescriptionIcon />}
                    onClick={() => {
                      setSelectedMeeting(meeting);
                      setOpenMinutes(true);
                    }}
                  >
                    View Minutes
                  </Button>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
        </List>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">
          Meetings
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNewMeeting}
          sx={{ bgcolor: '#1a237e' }}
        >
          Schedule Meeting
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Upcoming Meetings" />
          <Tab label="Meeting History" />
        </Tabs>
      </Box>

      {currentTab === 0 ? renderUpcomingMeetings() : renderMeetingHistory()}

      {/* Schedule Meeting Dialog */}
      <Dialog
        open={openNewMeeting}
        onClose={() => setOpenNewMeeting(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedMeeting ? 'Edit Meeting' : 'Schedule New Meeting'}
        </DialogTitle>
        <DialogContent>
          {renderMeetingForm()}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewMeeting(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: '#1a237e' }}
          >
            {selectedMeeting ? 'Save Changes' : 'Schedule Meeting'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Attendance Dialog */}
      <Dialog
        open={openAttendance}
        onClose={() => setOpenAttendance(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Mark Attendance</DialogTitle>
        <DialogContent>
          {renderAttendanceForm()}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAttendance(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: '#1a237e' }}
          >
            Save Attendance
          </Button>
        </DialogActions>
      </Dialog>

      {/* Minutes Dialog */}
      <Dialog
        open={openMinutes}
        onClose={() => setOpenMinutes(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Meeting Minutes</DialogTitle>
        <DialogContent>
          {renderMinutesForm()}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMinutes(false)}>
            Close
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: '#1a237e' }}
          >
            Save Minutes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MeetingsPage;
