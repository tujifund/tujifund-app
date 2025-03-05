import React from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const UserFeedback = () => {
  const feedbackData = [
    { id: 1, user: 'User1', feedback: 'Great application!', date: '2025-01-01' },
    { id: 2, user: 'User2', feedback: 'Needs improvement in UI.', date: '2025-01-02' },
  ];

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>User Feedback</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Feedback</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbackData.map((feedback) => (
              <TableRow key={feedback.id}>
                <TableCell>{feedback.id}</TableCell>
                <TableCell>{feedback.user}</TableCell>
                <TableCell>{feedback.feedback}</TableCell>
                <TableCell>{feedback.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UserFeedback;
