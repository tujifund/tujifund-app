import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  IconButton,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  ListItemSecondaryAction,
  useTheme,
  useMediaQuery,
  Stack,
  Container,
} from '@mui/material';
import {
  Group,
  TrendingUp,
  AccountBalance,
  Event,
  ChevronRight,
  Add as AddIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Mock data for chamas (similar to ChamasListPage)
  const chamas = [
    {
      id: 1,
      name: 'Intel kwote',
      members: 15,
      balance: 'KES 250,000',
      nextMeeting: '2025-01-20',
      type: 'Investment',
      avatar: '/path/to/avatar1.jpg',
    },
    {
      id: 2,
      name: 'Welfare Kwetu',
      members: 20,
      balance: 'KES 180,000',
      nextMeeting: '2025-01-18',
      type: 'Welfare',
      avatar: '/badge1.webp',
    },
    {
      id: 3,
      name: 'Jamii Savings',
      members: 12,
      balance: 'KES 320,000',
      nextMeeting: '2025-01-25',
      type: 'Business',
      avatar: '/path/to/avatar3.jpg',
    },
  ];

  const handleChamaClick = (chamaId) => {
    navigate(`/ChamaDashboard/${chamaId}/home`);
  };

  const handleCreateChama = () => {
    navigate('/CreateChama');
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ 
        p: { xs: 1, sm: 2, md: 3 },
        width: '100%'
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: 2,
          mb: 3 
        }}>
          <Typography variant={isMobile ? "h5" : "h4"}>
            Dashboard
          </Typography>
          <Button
            variant="contained"
            fullWidth={isMobile}
            startIcon={<AddIcon />}
            onClick={handleCreateChama}
            sx={{ 
              bgcolor: '#1a237e',
              maxWidth: { xs: '100%', sm: 'auto' }
            }}
          >
            Create Chama
          </Button>
        </Box>

        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 1,
                  flexWrap: 'wrap'
                }}>
                  <Group sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography color="textSecondary">Total Chamas</Typography>
                </Box>
                <Typography variant={isMobile ? "h5" : "h4"}>
                  {chamas.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 1,
                  flexWrap: 'wrap'
                }}>
                  <TrendingUp sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography color="textSecondary">Total Investments</Typography>
                </Box>
                <Typography variant={isMobile ? "h5" : "h4"}>
                  KES 750,000
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 1,
                  flexWrap: 'wrap'
                }}>
                  <AccountBalance sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography color="textSecondary">Total Balance</Typography>
                </Box>
                <Typography variant={isMobile ? "h5" : "h4"}>
                  KES 1,250,000
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant={isMobile ? "h6" : "h5"} sx={{ mb: 2 }}>
          My Chamas
        </Typography>

        <Paper elevation={1}>
          <List>
            {chamas.map((chama) => (
              <ListItem
                key={chama.id}
                button
                onClick={() => handleChamaClick(chama.id)}
                divider
                sx={{
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  py: { xs: 2, sm: 1 },
                  px: { xs: 2, sm: 2 }
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  width: { xs: '100%', sm: 'auto' },
                  mb: { xs: 1, sm: 0 }
                }}>
                  <ListItemAvatar>
                    <Avatar
                      src={chama.avatar}
                      alt={chama.name}
                      sx={{ bgcolor: '#1a237e' }}
                    >
                      {chama.name[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {chama.name}
                      </Typography>
                    }
                  />
                </Box>
                
                <Box sx={{ 
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  gap: 1,
                  width: { xs: '100%', sm: 'auto' },
                  ml: { xs: 0, sm: 2 }
                }}>
                  <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    spacing={1}
                    sx={{ 
                      width: { xs: '100%', sm: 'auto' },
                      mb: { xs: 1, sm: 0 }
                    }}
                  >
                    <Chip
                      label={`${chama.members} Members`}
                      size={isMobile ? "medium" : "small"}
                      sx={{ width: { xs: '100%', sm: 'auto' } }}
                    />
                    {/* <Chip
                      label={chama.balance}
                      size={isMobile ? "medium" : "small"}
                      sx={{ width: { xs: '100%', sm: 'auto' } }}
                    /> */}
                  </Stack>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 0.5,
                    width: { xs: '100%', sm: 'auto' }
                  }}>
                    <Event fontSize="small" />
                    <Typography variant="caption" sx={{ fontSize: isMobile ? '0.875rem' : '0.75rem' }}>
                      Next Meeting: {chama.nextMeeting}
                    </Typography>
                  </Box>
                </Box>

                {!isMobile && (
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleChamaClick(chama.id)}>
                      <ChevronRight />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard;
