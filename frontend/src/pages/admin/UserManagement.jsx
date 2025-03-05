import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const roles = ['Admin', 'User', 'Viewer'];

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', role: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const addUser = () => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setNewUser({ name: '', role: '' });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>User Management</Typography>
      <TextField
        label="Name"
        name="name"
        value={newUser.name}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Role</InputLabel>
        <Select
          name="role"
          value={newUser.role}
          onChange={handleChange}
        >
          {roles.map((role) => (
            <MenuItem key={role} value={role}>{role}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" onClick={addUser}>Add User</Button>
      <TableContainer sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UserManagement;
