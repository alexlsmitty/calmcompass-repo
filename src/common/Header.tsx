import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  useMediaQuery,
  styled,
  useTheme
} from '@mui/material';
// Import icons
import MenuIcon from '@mui/icons-material/Menu';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LogoutIcon from '@mui/icons-material/Logout';

// Define types for the component props
type NavigationOption = 'bookings' | 'account' | 'exercises' | 'login' | 'home';

interface HeaderProps {
  userName: string;
  currentPage: NavigationOption;
  onNavigate: (page: NavigationOption) => void;
}

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  transition: 'all 0.3s ease',
  width: '100%',
}));

const NavButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  padding: theme.spacing(0.5, 2),
  borderRadius: 25,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  letterSpacing: '0.5px',
  backgroundImage: 'linear-gradient(90deg, #2D6A4F, #74C69D)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
}));

const TopBar = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  padding: theme.spacing(1, 0),
  transition: 'all 0.3s ease',
  width: '100%',
}));

const Header: React.FC<HeaderProps> = ({ userName, currentPage, onNavigate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const handleNavClick = (page: NavigationOption) => {
    onNavigate(page);
    if (drawerOpen) setDrawerOpen(false);
  };

  // Navigation items with icons
  const navItems = [
    { label: 'Bookings', value: 'bookings', icon: <CalendarMonthIcon /> },
    { label: 'My Account', value: 'account', icon: <AccountCircleIcon /> },
    { label: 'Exercises', value: 'exercises', icon: <FitnessCenterIcon /> }
  ];

  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      {/* Welcome bar */}
      <TopBar>
        <Container 
          maxWidth={false} 
          sx={{ 
            width: '100%', 
            px: { xs: 2, sm: 3, md: 4 } 
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            width: '100%'
          }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {isSmall ? `Hi, ${userName}` : `Welcome back ${userName}`}
            </Typography>
            <Button 
              color="inherit" 
              size="small" 
              endIcon={!isSmall && <LogoutIcon />} 
              onClick={() => handleNavClick('login')}
              sx={{ 
                borderRadius: 20,
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.08)'
                }
              }}
            >
              {isSmall ? <LogoutIcon fontSize="small" /> : 'Sign Out'}
            </Button>
          </Box>
        </Container>
      </TopBar>

      {/* Main navigation */}
      <StyledAppBar position="static" color="primary">
        <Container 
          maxWidth={false} 
          sx={{ 
            width: '100%', 
            px: { xs: 1, sm: 2, md: 3, lg: 4 } 
          }}
        >
          <Toolbar disableGutters sx={{ py: 0.5, width: '100%' }}>
            {/* Mobile menu icon */}
            {isMobile && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Logo */}
            <Box sx={{ 
              flexGrow: { xs: 1, md: 0 }, 
              display: 'flex',
              alignItems: 'center'
            }}>
              <LogoText
                variant="h6"
                noWrap
                component="div"
                onClick={() => handleNavClick('home')}
                sx={{ 
                  mr: 2,
                  fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' }
                }}
              >
                CalmCompass
              </LogoText>
            </Box>

            {/* Desktop navigation */}
            {!isMobile && (
              <Box sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                justifyContent: 'center',
                gap: 1 
              }}>
                {navItems.map((item) => (
                  <NavButton
                    key={item.value}
                    color="inherit"
                    onClick={() => handleNavClick(item.value as NavigationOption)}
                    startIcon={item.icon}
                    sx={{ 
                      borderBottom: currentPage === item.value 
                        ? `3px solid ${theme.palette.secondary.main}` 
                        : '3px solid transparent',
                      borderRadius: '20px 20px 0 0',
                      backgroundColor: currentPage === item.value 
                        ? 'rgba(255, 255, 255, 0.15)' 
                        : 'transparent'
                    }}
                  >
                    {item.label}
                  </NavButton>
                ))}
              </Box>
            )}

            {/* Book appointment button */}
            {!isMobile && currentPage !== 'bookings' && (
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={() => handleNavClick('bookings')}
                startIcon={<CalendarMonthIcon />}
                sx={{ 
                  borderRadius: 25,
                  px: 3,
                  boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                  '&:hover': {
                    boxShadow: '0px 6px 12px rgba(0,0,0,0.15)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Book Appointment
              </Button>
            )}
          </Toolbar>
        </Container>
      </StyledAppBar>

      {/* Mobile drawer menu */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: { 
            width: '85%',
            maxWidth: 300,
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
            px: 1
          }
        }}
      >
        <Box sx={{ p: 3 }}>
          <LogoText variant="h6">
            CalmCompass
          </LogoText>
        </Box>
        <Divider />
        <List sx={{ pt: 2 }}>
          {navItems.map((item) => (
            <ListItem key={item.value} disablePadding>
              <ListItemButton
                selected={currentPage === item.value}
                onClick={() => handleNavClick(item.value as NavigationOption)}
                sx={{
                  borderRadius: 8,
                  my: 0.5,
                  backgroundColor: currentPage === item.value 
                    ? `${theme.palette.primary.main}15` 
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: `${theme.palette.primary.main}10`
                  }
                }}
              >
                <Box component="span" sx={{ mr: 2, color: theme.palette.primary.main }}>
                  {item.icon}
                </Box>
                <ListItemText 
                  primary={item.label} 
                  primaryTypographyProps={{ 
                    fontWeight: currentPage === item.value ? 600 : 400 
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ))}

          <Divider sx={{ my: 2 }} />

          {currentPage !== 'bookings' && (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleNavClick('bookings')}
                sx={{ 
                  borderRadius: 8,
                  my: 0.5,
                  backgroundColor: `${theme.palette.secondary.main}15`,
                  '&:hover': {
                    backgroundColor: `${theme.palette.secondary.main}25`
                  }
                }}
              >
                <Box component="span" sx={{ mr: 2, color: theme.palette.secondary.main }}>
                  <CalendarMonthIcon />
                </Box>
                <ListItemText 
                  primary="Book Appointment" 
                  primaryTypographyProps={{ 
                    color: 'secondary',
                    fontWeight: 600
                  }} 
                />
              </ListItemButton>
            </ListItem>
          )}

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleNavClick('login')}
              sx={{ 
                borderRadius: 8,
                my: 0.5
              }}
            >
              <Box component="span" sx={{ mr: 2 }}>
                <LogoutIcon />
              </Box>
              <ListItemText primary="Sign Out" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Header;