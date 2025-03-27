import React, { useState, useEffect } from 'react';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  Box,
  CircularProgress
} from '@mui/material';

// Import components
import Header from './common/Header';
import BookingsPage from './pages/bookings/BookingsPage';
import AccountPage from './pages/account/AccountPage';
import ExercisesPage from './pages/exercises/ExercisesPage';

// Import the API services
import { 
  getPractitioners, 
  getUserData, 
  getExercises, 
  getSiteConfig 
} from './services/api';

// Import theme
import baseTheme from './theme/theme';

// Types
type NavigationOption = 'bookings' | 'account' | 'exercises' | 'login' | 'home';

const App: React.FC = () => {
  // State for current page/route
  const [currentPage, setCurrentPage] = useState<NavigationOption>('bookings');
  const [userName, setUserName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for data from API
  const [userData, setUserData] = useState<any>(null);
  const [practitioners, setPractitioners] = useState<any[]>([]);
  const [exercises, setExercises] = useState<any[]>([]);
  const [themeConfig, setThemeConfig] = useState<any>(null);
  
  // Create dynamic theme based on site configuration
  const theme = React.useMemo(() => {
    // Start with base theme
    let finalTheme = baseTheme;
    
    // If we have theme config from API, override base theme
    if (themeConfig && themeConfig.siteConfiguration && themeConfig.siteConfiguration.colorScheme) {
      const colors = themeConfig.siteConfiguration.colorScheme;
      
      finalTheme = createTheme({
        ...baseTheme,
        palette: {
          ...baseTheme.palette,
          primary: {
            main: colors.primary || baseTheme.palette.primary.main,
            light: colors.secondary || baseTheme.palette.primary.light,
            dark: colors.primary ? `${colors.primary}CC` : baseTheme.palette.primary.dark,
            contrastText: '#FFFFFF',
          },
          secondary: {
            main: colors.accent || baseTheme.palette.secondary.main,
            light: colors.accent ? `${colors.accent}33` : baseTheme.palette.secondary.light,
            dark: colors.accent ? `${colors.accent}CC` : baseTheme.palette.secondary.dark,
            contrastText: colors.text || baseTheme.palette.secondary.contrastText,
          },
          background: {
            default: colors.lightBackground || baseTheme.palette.background.default,
            paper: colors.background || baseTheme.palette.background.paper,
          },
          text: {
            primary: colors.text || baseTheme.palette.text.primary,
            secondary: colors.text ? `${colors.text}99` : baseTheme.palette.text.secondary,
          },
        },
      });
    }
    
    return finalTheme;
  }, [themeConfig]);
  
  // Load all necessary data on component mount
  useEffect(() => {
    const loadAppData = async () => {
      try {
        setLoading(true);
        
        // Load site configuration first to set up theme
        const siteConfigResponse = await getSiteConfig();
        if (siteConfigResponse.success && siteConfigResponse.data) {
          setThemeConfig(siteConfigResponse.data);
        }
        
        // Load user data
        const userDataResponse = await getUserData('user-001'); // In a real app, this would be dynamic
        if (userDataResponse.success && userDataResponse.data.userData) {
          setUserData(userDataResponse.data.userData);
          setUserName(`${userDataResponse.data.userData.firstName}`);
        }
        
        // Load practitioners
        const practitionersResponse = await getPractitioners();
        if (practitionersResponse.success && practitionersResponse.data.practitioners) {
          setPractitioners(practitionersResponse.data.practitioners);
        }
        
        // Load exercises
        const exercisesResponse = await getExercises();
        if (exercisesResponse.success && exercisesResponse.data.exercises) {
          setExercises(exercisesResponse.data.exercises);
        }
        
      } catch (err) {
        console.error('Failed to load application data:', err);
        setError('Failed to load application data. Please refresh the page to try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadAppData();
  }, []);
  
  // Handle navigation between pages
  const handleNavigate = (page: NavigationOption) => {
    setCurrentPage(page);
  };
  
  // Render the appropriate page based on currentPage state
  const renderPage = () => {
    if (loading) {
      return (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}>
          <CircularProgress color="primary" size={60} />
        </Box>
      );
    }
    
    if (error) {
      return (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh', 
          flexDirection: 'column',
          p: 3 
        }}>
          <Box sx={{ 
            backgroundColor: 'error.light', 
            color: 'error.main', 
            p: 3, 
            borderRadius: 2,
            maxWidth: 600,
            textAlign: 'center'
          }}>
            {error}
          </Box>
        </Box>
      );
    }
    
    switch (currentPage) {
      case 'bookings':
        return <BookingsPage practitioners={practitioners} />;
      case 'account':
        return <AccountPage userData={userData} />;
      case 'exercises':
        return <ExercisesPage />;
      case 'home':
        return <BookingsPage practitioners={practitioners} />;
      case 'login':
        // Redirect to bookings page for now
        setCurrentPage('bookings');
        return <BookingsPage practitioners={practitioners} />;
      default:
        return <BookingsPage practitioners={practitioners} />;
    }
  };
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme.palette.background.default,
        width: '100%' // Ensure the app takes full width
      }}>
        {!loading && !error && (
          <Header
            userName={userName}
            currentPage={currentPage}
            onNavigate={handleNavigate}
          />
        )}
        <Box sx={{ flexGrow: 1 }}>
          {renderPage()}
        </Box>
        {!loading && !error && (
          <Box 
            component="footer" 
            sx={{ 
              py: 3, 
              textAlign: 'center',
              bgcolor: theme.palette.background.paper,
              borderTop: `1px solid ${theme.palette.divider}`,
              mt: 4,
              width: '100%' // Ensure footer spans full width
            }}
          >
            <Box 
              sx={{ 
                maxWidth: { xs: '100%', lg: '1800px' }, 
                mx: 'auto', 
                px: { xs: 2, sm: 3, md: 4 },
                color: theme.palette.text.secondary,
                fontSize: '0.875rem'
              }}
            >
              © {new Date().getFullYear()} CalmCompass. All rights reserved.
            </Box>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default App;