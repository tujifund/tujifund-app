import React from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const AuditLogs = () => {
  const logsData = [
    { id: 1, action: 'User1 logged in', date: '2025-01-01' },
    { id: 2, action: 'User2 updated settings', date: '2025-01-02' },
  ];

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Audit Logs</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logsData.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.id}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AuditLogs;
