import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Paper, Alert, Select, MenuItem, InputLabel, FormControl, InputAdornment, FormControlLabel, Checkbox } from '@mui/material';

const countryCodes = [
  { code: 'AF', name: 'Afghanistan (+93)' },
  { code: 'AL', name: 'Albania (+355)' },
  { code: 'DZ', name: 'Algeria (+213)' },
  { code: 'AD', name: 'Andorra (+376)' },
  { code: 'AO', name: 'Angola (+244)' },
  { code: 'AG', name: 'Antigua and Barbuda (+1-268)' },
  { code: 'AR', name: 'Argentina (+54)' },
  { code: 'AM', name: 'Armenia (+374)' },
  { code: 'AU', name: 'Australia (+61)' },
  { code: 'AT', name: 'Austria (+43)' },
  { code: 'AZ', name: 'Azerbaijan (+994)' },
  { code: 'BS', name: 'Bahamas (+1-242)' },
  { code: 'BH', name: 'Bahrain (+973)' },
  { code: 'BD', name: 'Bangladesh (+880)' },
  { code: 'BB', name: 'Barbados (+1-246)' },
  { code: 'BY', name: 'Belarus (+375)' },
  { code: 'BE', name: 'Belgium (+32)' },
  { code: 'BZ', name: 'Belize (+501)' },
  { code: 'BJ', name: 'Benin (+229)' },
  { code: 'BT', name: 'Bhutan (+975)' },
  { code: 'BO', name: 'Bolivia (+591)' },
  { code: 'BA', name: 'Bosnia and Herzegovina (+387)' },
  { code: 'BW', name: 'Botswana (+267)' },
  { code: 'BR', name: 'Brazil (+55)' },
  { code: 'BN', name: 'Brunei (+673)' },
  { code: 'BG', name: 'Bulgaria (+359)' },
  { code: 'BF', name: 'Burkina Faso (+226)' },
  { code: 'BI', name: 'Burundi (+257)' },
  { code: 'CV', name: 'Cabo Verde (+238)' },
  { code: 'KH', name: 'Cambodia (+855)' },
  { code: 'CM', name: 'Cameroon (+237)' },
  { code: 'CA', name: 'Canada (+1)' },
  { code: 'CF', name: 'Central African Republic (+236)' },
  { code: 'TD', name: 'Chad (+235)' },
  { code: 'CL', name: 'Chile (+56)' },
  { code: 'CN', name: 'China (+86)' },
  { code: 'CO', name: 'Colombia (+57)' },
  { code: 'KM', name: 'Comoros (+269)' },
  { code: 'CG', name: 'Congo (Congo-Brazzaville) (+242)' },
  { code: 'CR', name: 'Costa Rica (+506)' },
  { code: 'HR', name: 'Croatia (+385)' },
  { code: 'CU', name: 'Cuba (+53)' },
  { code: 'CY', name: 'Cyprus (+357)' },
  { code: 'CZ', name: 'Czech Republic (+420)' },
  { code: 'CD', name: 'Democratic Republic of the Congo (+243)' },
  { code: 'DK', name: 'Denmark (+45)' },
  { code: 'DJ', name: 'Djibouti (+253)' },
  { code: 'DM', name: 'Dominica (+1-767)' },
  { code: 'DO', name: 'Dominican Republic (+1-809)' },
  { code: 'EC', name: 'Ecuador (+593)' },
  { code: 'EG', name: 'Egypt (+20)' },
  { code: 'SV', name: 'El Salvador (+503)' },
  { code: 'GQ', name: 'Equatorial Guinea (+240)' },
  { code: 'ER', name: 'Eritrea (+291)' },
  { code: 'EE', name: 'Estonia (+372)' },
  { code: 'SZ', name: 'Eswatini (+268)' },
  { code: 'ET', name: 'Ethiopia (+251)' },
  { code: 'FJ', name: 'Fiji (+679)' },
  { code: 'FI', name: 'Finland (+358)' },
  { code: 'FR', name: 'France (+33)' },
  { code: 'GA', name: 'Gabon (+241)' },
  { code: 'GM', name: 'Gambia (+220)' },
  { code: 'GE', name: 'Georgia (+995)' },
  { code: 'DE', name: 'Germany (+49)' },
  { code: 'GH', name: 'Ghana (+233)' },
  { code: 'GR', name: 'Greece (+30)' },
  { code: 'GD', name: 'Grenada (+1-473)' },
  { code: 'GT', name: 'Guatemala (+502)' },
  { code: 'GN', name: 'Guinea (+224)' },
  { code: 'GW', name: 'Guinea-Bissau (+245)' },
  { code: 'GY', name: 'Guyana (+592)' },
  { code: 'HT', name: 'Haiti (+509)' },
  { code: 'HN', name: 'Honduras (+504)' },
  { code: 'HU', name: 'Hungary (+36)' },
  { code: 'IS', name: 'Iceland (+354)' },
  { code: 'IN', name: 'India (+91)' },
  { code: 'ID', name: 'Indonesia (+62)' },
  { code: 'IR', name: 'Iran (+98)' },
  { code: 'IQ', name: 'Iraq (+964)' },
  { code: 'IE', name: 'Ireland (+353)' },
  { code: 'IL', name: 'Israel (+972)' },
  { code: 'IT', name: 'Italy (+39)' },
  { code: 'JM', name: 'Jamaica (+1-876)' },
  { code: 'JP', name: 'Japan (+81)' },
  { code: 'JO', name: 'Jordan (+962)' },
  { code: 'KZ', name: 'Kazakhstan (+7)' },
  { code: 'KE', name: 'Kenya (+254)' },
  { code: 'KI', name: 'Kiribati (+686)' },
  { code: 'KP', name: 'Korea, North (+850)' },
  { code: 'KR', name: 'Korea, South (+82)' },
  { code: 'XK', name: 'Kosovo (+383)' },
  { code: 'KW', name: 'Kuwait (+965)' },
  { code: 'KG', name: 'Kyrgyzstan (+996)' },
  { code: 'LA', name: 'Laos (+856)' },
  { code: 'LV', name: 'Latvia (+371)' },
  { code: 'LB', name: 'Lebanon (+961)' },
  { code: 'LS', name: 'Lesotho (+266)' },
  { code: 'LR', name: 'Liberia (+231)' },
  { code: 'LY', name: 'Libya (+218)' },
  { code: 'LI', name: 'Liechtenstein (+423)' },
  { code: 'LT', name: 'Lithuania (+370)' },
  { code: 'LU', name: 'Luxembourg (+352)' },
  { code: 'MG', name: 'Madagascar (+261)' },
  { code: 'MW', name: 'Malawi (+265)' },
  { code: 'MY', name: 'Malaysia (+60)' },
  { code: 'MV', name: 'Maldives (+960)' },
  { code: 'ML', name: 'Mali (+223)' },
  { code: 'MT', name: 'Malta (+356)' },
  { code: 'MH', name: 'Marshall Islands (+692)' },
  { code: 'MR', name: 'Mauritania (+222)' },
  { code: 'MU', name: 'Mauritius (+230)' },
  { code: 'MX', name: 'Mexico (+52)' },
  { code: 'FM', name: 'Micronesia (+691)' },
  { code: 'MD', name: 'Moldova (+373)' },
  { code: 'MC', name: 'Monaco (+377)' },
  { code: 'MN', name: 'Mongolia (+976)' },
  { code: 'ME', name: 'Montenegro (+382)' },
  { code: 'MA', name: 'Morocco (+212)' },
  { code: 'MZ', name: 'Mozambique (+258)' },
  { code: 'MM', name: 'Myanmar (Burma) (+95)' },
  { code: 'NA', name: 'Namibia (+264)' },
  { code: 'NR', name: 'Nauru (+674)' },
  { code: 'NP', name: 'Nepal (+977)' },
  { code: 'NL', name: 'Netherlands (+31)' },
  { code: 'NZ', name: 'New Zealand (+64)' },
  { code: 'NI', name: 'Nicaragua (+505)' },
  { code: 'NE', name: 'Niger (+227)' },
  { code: 'NG', name: 'Nigeria (+234)' },
  { code: 'MK', name: 'North Macedonia (+389)' },
  { code: 'NO', name: 'Norway (+47)' },
  { code: 'OM', name: 'Oman (+968)' },
  { code: 'PK', name: 'Pakistan (+92)' },
  { code: 'PW', name: 'Palau (+680)' },
  { code: 'PA', name: 'Panama (+507)' },
  { code: 'PG', name: 'Papua New Guinea (+675)' },
  { code: 'PY', name: 'Paraguay (+595)' },
  { code: 'PE', name: 'Peru (+51)' },
  { code: 'PH', name: 'Philippines (+63)' },
  { code: 'PL', name: 'Poland (+48)' },
  { code: 'PT', name: 'Portugal (+351)' },
  { code: 'QA', name: 'Qatar (+974)' },
  { code: 'RO', name: 'Romania (+40)' },
  { code: 'RU', name: 'Russia (+7)' },
  { code: 'RW', name: 'Rwanda (+250)' },
  { code: 'KN', name: 'Saint Kitts and Nevis (+1-869)' },
  { code: 'LC', name: 'Saint Lucia (+1-758)' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines (+1-784)' },
  { code: 'WS', name: 'Samoa (+685)' },
  { code: 'SM', name: 'San Marino (+378)' },
  { code: 'ST', name: 'Sao Tome and Principe (+239)' },
  { code: 'SA', name: 'Saudi Arabia (+966)' },
  { code: 'SN', name: 'Senegal (+221)' },
  { code: 'RS', name: 'Serbia (+381)' },
  { code: 'SC', name: 'Seychelles (+248)' },
  { code: 'SL', name: 'Sierra Leone (+232)' },
  { code: 'SG', name: 'Singapore (+65)' },
  { code: 'SK', name: 'Slovakia (+421)' },
  { code: 'SI', name: 'Slovenia (+386)' },
  { code: 'SB', name: 'Solomon Islands (+677)' },
  { code: 'SO', name: 'Somalia (+252)' },
  { code: 'ZA', name: 'South Africa (+27)' },
  { code: 'SS', name: 'South Sudan (+211)' },
  { code: 'ES', name: 'Spain (+34)' },
  { code: 'LK', name: 'Sri Lanka (+94)' },
  { code: 'SD', name: 'Sudan (+249)' },
  { code: 'SR', name: 'Suriname (+597)' },
  { code: 'SE', name: 'Sweden (+46)' },
  { code: 'CH', name: 'Switzerland (+41)' },
  { code: 'SY', name: 'Syria (+963)' },
  { code: 'TW', name: 'Taiwan (+886)' },
  { code: 'TJ', name: 'Tajikistan (+992)' },
  { code: 'TZ', name: 'Tanzania (+255)' },
  { code: 'TH', name: 'Thailand (+66)' },
  { code: 'TL', name: 'Timor-Leste (+670)' },
  { code: 'TG', name: 'Togo (+228)' },
  { code: 'TO', name: 'Tonga (+676)' },
  { code: 'TT', name: 'Trinidad and Tobago (+1-868)' },
  { code: 'TN', name: 'Tunisia (+216)' },
  { code: 'TR', name: 'Turkey (+90)' },
  { code: 'TM', name: 'Turkmenistan (+993)' },
  { code: 'TV', name: 'Tuvalu (+688)' },
  { code: 'UG', name: 'Uganda (+256)' },
  { code: 'UA', name: 'Ukraine (+380)' },
  { code: 'AE', name: 'United Arab Emirates (+971)' },
  { code: 'GB', name: 'United Kingdom (+44)' },
  { code: 'US', name: 'United States of America (+1)' },
  { code: 'UY', name: 'Uruguay (+598)' },
  { code: 'UZ', name: 'Uzbekistan (+998)' },
  { code: 'VU', name: 'Vanuatu (+678)' },
  { code: 'VA', name: 'Vatican City (+39)' },
  { code: 'VE', name: 'Venezuela (+58)' },
  { code: 'VN', name: 'Vietnam (+84)' },
  { code: 'YE', name: 'Yemen (+967)' },
  { code: 'ZM', name: 'Zambia (+260)' },
  { code: 'ZW', name: 'Zimbabwe (+263)' },
];

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    username: '',
    email: '',
    phone: '',
    country: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
  });
  const [countryCode, setCountryCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Update country code when country is selected
    if (name === 'country') {
      const selectedCountry = countryCodes.find(country => country.code === value);
      setCountryCode(selectedCountry ? selectedCountry.name.split(' ')[1].slice(1, -1) : '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      // Simulate login success
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
            Chama Vault
          </Typography>
          <br />
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Create Account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField margin="normal" required fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
            <TextField margin="normal" required fullWidth label="Surname" name="surname" value={formData.surname} onChange={handleChange} />
            <TextField margin="normal" required fullWidth label="Username" name="username" value={formData.username} onChange={handleChange} />
            <TextField margin="normal" required fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <FormControl sx={{ minWidth: 120 }} margin="normal">
                <InputLabel>Country</InputLabel>
                <Select name="country" value={formData.country} onChange={handleChange}>
                  {countryCodes.map((country) => (
                    <MenuItem key={country.code} value={country.code}>{country.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Phone Number"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                sx={{ marginLeft: 2 }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">{countryCode}</InputAdornment>,
                }}
              />
            </Box>

            <TextField margin="normal" required fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
            <TextField margin="normal" required fullWidth label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.agreedToTerms}
                  onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                  color="primary"
                />
              }
              label={
                <span>
                  I have read and agree to the <Link to="/terms">terms and conditions</Link> and the <Link to="/privacy-policy">privacy policy</Link>.
                </span>
              }
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={!formData.agreedToTerms || loading}>
              Create Account
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="primary">
                  Already have an account? Log In
                </Typography>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;