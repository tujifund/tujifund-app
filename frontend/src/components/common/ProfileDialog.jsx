import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Grid,
  Divider,
  useTheme,
  useMediaQuery,
  Avatar,
  Paper,
  Chip,
  Link,
} from '@mui/material';
import {
  Close as CloseIcon,
  Business,
  Person,
  Email,
  Phone,
  Language,
  WcOutlined,
  Category,
  LocationOn,
  Star,
} from '@mui/icons-material';

const ProfileDialog = ({ open, onClose, user = {} }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Mock user data - replace with actual user data
  const userData = {
    businessName: 'ABC Company',
    loginName: 'Sila Majore',
    registrationDate: '17/05/2013',
    email: 'noreply@cyclos.org',
    mobilePhone: '+92 333 9912991',
    landlinePhone: '+31 77 907 7801',
    website: 'www.abc.com',
    gender: 'Female',
    businessType: 'Technical',
    references: 6,
    address: {
      street: 'Oude char',
      city: 'Turkana',
      region: 'Turkana',
      country: 'Kenya',
    },
    location: {
      lat: 52.092876,
      lng: 5.104480
    },
    ...user
  };

  const ProfileItem = ({ icon, label, value, link }) => (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
      <Box sx={{ mr: 2, color: 'primary.main', mt: 0.5 }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" display="block">
          {label}
        </Typography>
        {link ? (
          <Link href={link} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
            <Typography color="primary">{value}</Typography>
          </Link>
        ) : (
          <Typography>{value}</Typography>
        )}
      </Box>
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">My Profile</Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  margin: '0 auto',
                  mb: 2,
                  bgcolor: 'primary.main',
                }}
              >
                {userData.businessName[0]}
              </Avatar>
              <Typography variant="h6">{userData.businessName}</Typography>
              <Typography variant="body2" color="text.secondary">
                {userData.businessType}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Chip
                  icon={<Star />}
                  label={`${userData.references} References`}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <ProfileItem
              icon={<Person />}
              label="Login name"
              value={userData.loginName}
            />
            <ProfileItem
              icon={<Business />}
              label="Business name"
              value={userData.businessName}
            />
            <ProfileItem
              icon={<Email />}
              label="E-mail"
              value={userData.email}
              link={`mailto:${userData.email}`}
            />
            <ProfileItem
              icon={<Phone />}
              label="Mobile phone"
              value={userData.mobilePhone}
              link={`tel:${userData.mobilePhone}`}
            />
            <ProfileItem
              icon={<Phone />}
              label="Land-line phone"
              value={userData.landlinePhone}
              link={`tel:${userData.landlinePhone}`}
            />
            <ProfileItem
              icon={<Language />}
              label="Website"
              value={userData.website}
              link={`https://${userData.website}`}
            />
            <ProfileItem
              icon={<WcOutlined />}
              label="Gender"
              value={userData.gender}
            />
            <ProfileItem
              icon={<Category />}
              label="Business type"
              value={userData.businessType}
            />
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                <LocationOn sx={{ mr: 1, verticalAlign: 'middle' }} />
                Location
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Address
                </Typography>
                <Typography>{userData.address.street}</Typography>
                <Typography>
                  {userData.address.city}, {userData.address.region}
                </Typography>
                <Typography>{userData.address.country}</Typography>
              </Box>
              
              {/* Map Container */}
              <Box
                sx={{
                  width: '100%',
                  height: 400,
                  bgcolor: 'background.default',
                  borderRadius: 1,
                  overflow: 'hidden',
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(
                    `${userData.address.street}, ${userData.address.city}, ${userData.address.country}`
                  )}`}
                  allowFullScreen
                />
              </Box>
            </Paper>

            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Activity Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                    <Typography variant="h4" color="primary">3</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Chamas
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                    <Typography variant="h4" color="primary">12</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Investments
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
