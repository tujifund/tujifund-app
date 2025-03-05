import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Button,
} from '@mui/material';
import {
  Send as SendIcon,
  VideoCall as VideoCallIcon,
  AttachFile as AttachFileIcon,
} from '@mui/icons-material';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');

  // Mock data - replace with actual API data
  const chats = [
    {
      id: 1,
      name: 'Investment Group A',
      lastMessage: 'Next meeting is on Friday',
      time: '10:30 AM',
      unread: 2,
    },
    {
      id: 2,
      name: 'Savings Group B',
      lastMessage: 'Payment received',
      time: '09:15 AM',
      unread: 0,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: 'John Doe',
      content: 'Hello everyone!',
      time: '10:00 AM',
      isSelf: false,
    },
    {
      id: 2,
      sender: 'You',
      content: 'Hi John, how are you?',
      time: '10:01 AM',
      isSelf: true,
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add message sending logic here
      setMessage('');
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Chat
      </Typography>

      <Grid container spacing={2} sx={{ height: 'calc(100vh - 180px)' }}>
        {/* Chat List */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ height: '100%', overflow: 'auto' }}>
            <List>
              {chats.map((chat) => (
                <React.Fragment key={chat.id}>
                  <ListItem
                    button
                    selected={selectedChat === chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    <ListItemAvatar>
                      <Avatar>{chat.name[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={chat.name}
                      secondary={chat.lastMessage}
                      primaryTypographyProps={{
                        fontWeight: chat.unread ? 'bold' : 'normal',
                      }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <Typography variant="caption" color="textSecondary">
                        {chat.time}
                      </Typography>
                      {chat.unread > 0 && (
                        <Box
                          sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            borderRadius: '50%',
                            width: 20,
                            height: 20,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mt: 0.5,
                          }}
                        >
                          {chat.unread}
                        </Box>
                      )}
                    </Box>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Chat Messages */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6">
                      {chats.find((c) => c.id === selectedChat)?.name}
                    </Typography>
                    <Box>
                      <IconButton color="primary">
                        <VideoCallIcon />
                      </IconButton>
                      <Button
                        variant="contained"
                        startIcon={<VideoCallIcon />}
                        sx={{ ml: 1, bgcolor: '#1a237e' }}
                      >
                        Start Meeting
                      </Button>
                    </Box>
                  </Box>
                </Box>

                {/* Messages */}
                <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                  {messages.map((msg) => (
                    <Box
                      key={msg.id}
                      sx={{
                        display: 'flex',
                        justifyContent: msg.isSelf ? 'flex-end' : 'flex-start',
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: '70%',
                          bgcolor: msg.isSelf ? 'primary.main' : 'grey.100',
                          color: msg.isSelf ? 'white' : 'text.primary',
                          borderRadius: 2,
                          p: 2,
                        }}
                      >
                        <Typography variant="subtitle2">{msg.sender}</Typography>
                        <Typography>{msg.content}</Typography>
                        <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                          {msg.time}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* Message Input */}
                <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                  <Grid container spacing={1}>
                    <Grid item>
                      <IconButton color="primary">
                        <AttachFileIcon />
                      </IconButton>
                    </Grid>
                    <Grid item xs>
                      <TextField
                        fullWidth
                        placeholder="Type a message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleSendMessage();
                          }
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <IconButton
                        color="primary"
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                      >
                        <SendIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h6" color="textSecondary">
                  Select a chat to start messaging
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatPage;
