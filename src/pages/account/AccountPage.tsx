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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Divider,
  styled,
  useTheme
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HistoryIcon from '@mui/icons-material/History';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ContactsIcon from '@mui/icons-material/Contacts';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReceiptIcon from '@mui/icons-material/Receipt';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LockIcon from '@mui/icons-material/Lock';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import ShareIcon from '@mui/icons-material/Share';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import CancelIcon from '@mui/icons-material/Cancel';
import ReplayIcon from '@mui/icons-material/Replay';
import AddIcon from '@mui/icons-material/Add';

// Types
interface Appointment {
  id: string;
  date: string;
  time: string;
  service: string;
  practitioner: string;
}

interface AppointmentHistoryItem extends Omit<Appointment, 'time'> {
  status: 'Completed' | 'Cancelled' | 'Rescheduled';
}

interface WaitListRequest {
  id: string;
  service: string;
  client: string;
  availability: string;
}

interface UserData {
  prefix?: string;
  firstName: string;
  lastName: string;
  appointments: Appointment[];
  appointmentHistory: AppointmentHistoryItem[];
  waitListRequests: WaitListRequest[];
}

interface AccountPageProps {
  userData: UserData;
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

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 12,
  marginBottom: theme.spacing(3),
  boxShadow: 'none',
  border: `1px solid ${theme.palette.divider}`,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 20,
  padding: theme.spacing(0.5, 2),
  textTransform: 'none',
  fontWeight: 500,
}));

const ListButtonStyled = styled(ListItemButton)(({ theme }) => ({
  borderRadius: 8,
  margin: theme.spacing(0.5, 1),
  transition: 'all 0.2s ease',
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  borderRadius: 12,
  fontWeight: 500,
}));

const AccountPage: React.FC<AccountPageProps> = ({ userData }) => {
  const theme = useTheme();
  const [activeSection, setActiveSection] = useState<string>('appointments');
  
  const accountSections = [
    { id: 'appointments', name: 'Upcoming Appointments', icon: <CalendarMonthIcon /> },
    { id: 'history', name: 'Appointment History', icon: <HistoryIcon /> },
    { id: 'waitlist', name: 'Wait List Requests', icon: <EventAvailableIcon /> },
    { id: 'forms', name: 'Intake Forms', icon: <InsertDriveFileIcon /> },
    { id: 'documents', name: 'Documents', icon: <InsertDriveFileIcon /> },
    { id: 'contact', name: 'Contact Info', icon: <ContactsIcon /> },
    { id: 'payment', name: 'Credit Cards on File', icon: <CreditCardIcon /> },
    { id: 'balance', name: 'Pay Balance', icon: <AttachMoneyIcon /> },
    { id: 'receipts', name: 'Receipts', icon: <ReceiptIcon /> },
    { id: 'notifications', name: 'Notifications & Reminders', icon: <NotificationsIcon /> },
    { id: 'password', name: 'Username / Password', icon: <LockIcon /> },
    { id: 'family', name: 'Family Members', icon: <FamilyRestroomIcon /> },
    { id: 'social', name: 'Google, Facebook & Twitter', icon: <ShareIcon /> },
    { id: 'timezone', name: 'Time Zone', icon: <AccessTimeIcon /> },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'appointments':
        return <UpcomingAppointments appointments={userData.appointments} />;
      case 'history':
        return <AppointmentHistory history={userData.appointmentHistory} />;
      case 'waitlist':
        return <WaitList requests={userData.waitListRequests} />;
      default:
        return (
          <Box 
            sx={{ 
              py: 8, 
              textAlign: 'center',
              bgcolor: theme.palette.background.default,
              borderRadius: 4
            }}
          >
            <Typography variant="body1" color="text.secondary">
              This section is under development.
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <HeaderPaper elevation={0}>
        <Typography variant="h4" gutterBottom fontWeight={600}>
          {userData ? `${userData.prefix || ''} ${userData.firstName} ${userData.lastName}` : 'My Account'}
        </Typography>
        <Typography variant="subtitle1">
          Manage your appointments and account information
        </Typography>
      </HeaderPaper>

      <Grid container spacing={3} sx={{ mt: 0 }}>
        {/* Account Navigation Sidebar */}
        <Grid item xs={12} md={4} lg={3}>
          <RoundedPaper elevation={1}>
            <Box sx={{ 
              p: 2, 
              bgcolor: theme.palette.primary.light, 
              color: theme.palette.primary.contrastText 
            }}>
              <Typography variant="h6" fontWeight={600}>
                My Account
              </Typography>
            </Box>
            <List component="nav" aria-label="account sections" sx={{ p: 1 }}>
              {accountSections.map(section => (
                <ListItem key={section.id} disablePadding>
                  <ListButtonStyled
                    selected={activeSection === section.id}
                    onClick={() => setActiveSection(section.id)}
                    sx={{
                      bgcolor: activeSection === section.id 
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
                    <Box component="span" sx={{ mr: 2, color: theme.palette.primary.main }}>
                      {section.icon}
                    </Box>
                    <ListItemText 
                      primary={section.name} 
                      primaryTypographyProps={{ 
                        fontWeight: activeSection === section.id ? 600 : 400 
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
                variant="contained" 
                color="primary"
                startIcon={<CalendarMonthIcon />}
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
                Book an Appointment
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
              {accountSections.find(s => s.id === activeSection)?.name}
            </Typography>
            
            {renderContent()}
          </RoundedPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

// Component for Upcoming Appointments section
const UpcomingAppointments: React.FC<{ appointments: Appointment[] }> = ({ appointments }) => {
  const theme = useTheme();
  
  return (
    <Box>
      {appointments && appointments.length > 0 ? (
        <StyledTableContainer>
          <Table aria-label="upcoming appointments table">
            <TableHead sx={{ bgcolor: theme.palette.background.default }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Time</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Service</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Practitioner</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{appointment.service}</TableCell>
                  <TableCell>{appointment.practitioner}</TableCell>
                  <TableCell>
                    <ActionButton
                      startIcon={<EditCalendarIcon />}
                      variant="text"
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      Reschedule
                    </ActionButton>
                    <ActionButton
                      startIcon={<CancelIcon />}
                      variant="text"
                      color="error"
                      size="small"
                    >
                      Cancel
                    </ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      ) : (
        <Box 
          sx={{ 
            py: 6, 
            textAlign: 'center',
            bgcolor: theme.palette.background.default,
            borderRadius: 4,
            mb: 3
          }}
        >
          <Typography variant="body1" paragraph color="text.secondary">
            You don't have any upcoming appointments.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CalendarMonthIcon />}
            sx={{ 
              borderRadius: 25,
              py: 1,
              px: 3,
              fontWeight: 500
            }}
          >
            Book an Appointment
          </Button>
        </Box>
      )}

      {appointments && appointments.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<CalendarMonthIcon />}
            sx={{ 
              borderRadius: 25,
              py: 1,
              px: 3
            }}
          >
            Subscribe to your calendar
          </Button>
        </Box>
      )}
    </Box>
  );
};

// Component for Appointment History section
const AppointmentHistory: React.FC<{ history: AppointmentHistoryItem[] }> = ({ history }) => {
  const theme = useTheme();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return {
          bg: theme.palette.success.light,
          color: theme.palette.success.dark
        };
      case 'Cancelled':
        return {
          bg: theme.palette.error.light,
          color: theme.palette.error.dark
        };
      case 'Rescheduled':
        return {
          bg: theme.palette.info.light,
          color: theme.palette.info.dark
        };
      default:
        return {
          bg: theme.palette.grey[200],
          color: theme.palette.grey[800]
        };
    }
  };

  return (
    <Box>
      {history && history.length > 0 ? (
        <StyledTableContainer>
          <Table aria-label="appointment history table">
            <TableHead sx={{ bgcolor: theme.palette.background.default }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Service</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Practitioner</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((appointment) => {
                const statusColors = getStatusColor(appointment.status);
                return (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.service}</TableCell>
                    <TableCell>{appointment.practitioner}</TableCell>
                    <TableCell>
                      <StatusChip
                        label={appointment.status}
                        size="small"
                        sx={{ 
                          bgcolor: statusColors.bg,
                          color: statusColors.color
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <ActionButton
                        startIcon={<ReplayIcon />}
                        variant="text"
                        color="primary"
                        size="small"
                      >
                        Book Again
                      </ActionButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </StyledTableContainer>
      ) : (
        <Box 
          sx={{ 
            py: 6, 
            textAlign: 'center',
            bgcolor: theme.palette.background.default,
            borderRadius: 4
          }}
        >
          <Typography variant="body1" color="text.secondary">
            You don't have any appointment history.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

// Component for Wait List section
const WaitList: React.FC<{ requests: WaitListRequest[] }> = ({ requests }) => {
  const theme = useTheme();
  
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" paragraph>
          You will receive wait list notifications via Email.
          <Button 
            color="primary" 
            sx={{ ml: 1, borderRadius: 20, textTransform: 'none' }}
          >
            Update your notification preferences
          </Button>
        </Typography>
      </Box>

      {requests && requests.length > 0 ? (
        <StyledTableContainer>
          <Table aria-label="wait list requests table">
            <TableHead sx={{ bgcolor: theme.palette.background.default }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Service</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Client</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Availability</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.service}</TableCell>
                  <TableCell>{request.client}</TableCell>
                  <TableCell>{request.availability}</TableCell>
                  <TableCell>
                    <ActionButton
                      startIcon={<CancelIcon />}
                      variant="text"
                      color="error"
                      size="small"
                    >
                      Remove
                    </ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      ) : (
        <Box 
          sx={{ 
            py: 6, 
            textAlign: 'center',
            bgcolor: theme.palette.background.default,
            borderRadius: 4,
            mb: 3
          }}
        >
          <Typography variant="body1" paragraph color="text.secondary">
            You don't have any wait list requests.
          </Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ 
            borderRadius: 25,
            py: 1,
            px: 3,
            fontWeight: 500,
            boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
            '&:hover': {
              boxShadow: '0px 6px 12px rgba(0,0,0,0.15)',
            }
          }}
        >
          Add a Wait List Request
        </Button>
      </Box>
    </Box>
  );
};

export default AccountPage;