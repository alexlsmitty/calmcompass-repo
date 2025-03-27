import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Card,
  CardMedia,
  CardContent,
  Divider,
  styled,
  useMediaQuery,
  useTheme
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PersonIcon from '@mui/icons-material/Person';

// Define types
interface PractitionerName {
  prefix?: string;
  firstName: string;
  lastName: string;
  credentials?: string;
}

interface Practitioner {
  id: string;
  name: PractitionerName;
  role: string;
  profileImage: string;
}

interface BookingsPageProps {
  practitioners: Practitioner[];
}

// Styled components
const RoundedPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
  height: '100%',
  transition: 'all 0.3s ease',
}));

const HeaderPaper = styled(Paper)(({ theme }) => ({
  borderRadius: '16px 16px 0 0',
  padding: theme.spacing(4),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const PractitionerCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
  },
}));

const ListButtonStyled = styled(ListItemButton)(({ theme }) => ({
  borderRadius: 8,
  margin: theme.spacing(0.5, 1),
  transition: 'all 0.2s ease',
}));

const BookingsPage: React.FC<BookingsPageProps> = ({ practitioners }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedService, setSelectedService] = useState<string | null>(null);

  // List of available services
  const services = [
    { id: 'ind-adult', name: 'Individual Adult Counselling' },
    { id: 'couples', name: 'Couples Counselling' },
    { id: 'adolescent-16-17', name: 'Adolescent Counselling - Age 16 to 17' },
    { id: 'adolescent-12-15', name: 'Adolescent Counselling - Age 12 to 15' },
    { id: 'child', name: 'Child Therapy (11 and under)' },
    { id: 'consultation', name: 'Free Consultation Call' },
    { id: 'assessment', name: 'Adult Assessment' },
    { id: 'emdr-adult', name: 'EMDR Adult' },
    { id: 'emdr-child', name: 'EMDR Child and Adolescent' },
    { id: 'family', name: 'Family Therapy' },
  ];

  // Function to get a formatted name
  const getFormattedName = (name: PractitionerName) => {
    let formattedName = '';
    if (name.prefix) formattedName += `${name.prefix} `;
    formattedName += `${name.firstName} ${name.lastName}`;
    if (name.credentials) formattedName += `, ${name.credentials}`;
    return formattedName;
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <HeaderPaper elevation={0}>
        <Typography variant="h4" gutterBottom fontWeight={600}>
          Book an Appointment
        </Typography>
        <Typography variant="subtitle1">
          Select a service and practitioner to schedule your session
        </Typography>
      </HeaderPaper>

      <Grid container spacing={3} sx={{ mt: 0 }}>
        {/* Service Selection Sidebar */}
        <Grid item xs={12} md={4} lg={3}>
          <RoundedPaper elevation={1}>
            <Box sx={{ 
              p: 2, 
              bgcolor: theme.palette.primary.light, 
              color: theme.palette.primary.contrastText 
            }}>
              <Typography variant="h6" fontWeight={600}>
                Our Services
              </Typography>
            </Box>
            <List component="nav" aria-label="service options" sx={{ p: 1 }}>
              {services.map(service => (
                <ListItem key={service.id} disablePadding>
                  <ListButtonStyled
                    selected={selectedService === service.id}
                    onClick={() => setSelectedService(service.id)}
                    sx={{
                      bgcolor: selectedService === service.id 
                        ? `${theme.palette.primary.main}15` 
                        : 'transparent',
                      '&.Mui-selected': {
                        bgcolor: `${theme.palette.primary.main}15`,
                        '&:hover': {
                          bgcolor: `${theme.palette.primary.main}25`,
                        }
                      }
                    }}
                  >
                    <ListItemText 
                      primary={service.name} 
                      primaryTypographyProps={{ 
                        fontWeight: selectedService === service.id ? 600 : 400 
                      }}
                    />
                  </ListButtonStyled>
                </ListItem>
              ))}
            </List>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Button 
                fullWidth 
                variant="outlined" 
                startIcon={<CalendarMonthIcon />}
                sx={{ 
                  borderRadius: 25,
                  py: 1,
                  fontWeight: 500
                }}
              >
                View Availability by Month
              </Button>
            </Box>
          </RoundedPaper>
        </Grid>

        {/* Main Content Area */}
        <Grid item xs={12} md={8} lg={9}>
          <RoundedPaper elevation={1} sx={{ p: 3 }}>
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ mb: 4, fontWeight: 600 }}
            >
              {selectedService 
                ? services.find(s => s.id === selectedService)?.name 
                : 'Welcome to our online booking site'}
            </Typography>
            
            {selectedService ? (
              <>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3,
                    pb: 2,
                    borderBottom: `1px solid ${theme.palette.divider}`
                  }}
                >
                  <PersonIcon 
                    sx={{ 
                      color: theme.palette.primary.main, 
                      mr: 1, 
                      fontSize: 28 
                    }} 
                  />
                  <Typography variant="h6" color="primary" fontWeight={500}>
                    Choose Your Practitioner
                  </Typography>
                </Box>
                
                <Grid container spacing={3}>
                  {practitioners?.map(practitioner => (
                    <Grid item xs={12} sm={6} md={6} lg={4} key={practitioner.id}>
                      <PractitionerCard>
                        <CardMedia
                          component="img"
                          height="200"
                          image={practitioner.profileImage || "https://via.placeholder.com/300x200"}
                          alt={`${practitioner.name.firstName} ${practitioner.name.lastName}`}
                          sx={{ objectFit: 'cover' }}
                        />
                        <CardContent>
                          <Typography 
                            variant="h6" 
                            component="div" 
                            gutterBottom
                            fontWeight={600}
                          >
                            {getFormattedName(practitioner.name)}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ mb: 2 }}
                          >
                            {practitioner.role}
                          </Typography>
                          <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            startIcon={<EventNoteIcon />}
                            sx={{ 
                              borderRadius: 25,
                              py: 1,
                              fontWeight: 500,
                              boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                              '&:hover': {
                                boxShadow: '0px 6px 12px rgba(0,0,0,0.15)',
                              }
                            }}
                          >
                            Check Availability
                          </Button>
                        </CardContent>
                      </PractitionerCard>
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : (
              <Box 
                sx={{ 
                  py: 8, 
                  textAlign: 'center',
                  bgcolor: theme.palette.background.default,
                  borderRadius: 4
                }}
              >
                <Typography variant="body1" paragraph color="text.secondary">
                  Please select a service from the menu to continue with booking.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Our practitioners offer a variety of specialized services to meet your needs.
                </Typography>
              </Box>
            )}
          </RoundedPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookingsPage;