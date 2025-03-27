// src/pages/exercises/ExercisesPage.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  styled,
  useTheme,
  SelectChangeEvent,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RefreshIcon from '@mui/icons-material/Refresh';

// Import the mock API service
import { getExercises } from '../../services/api';

// Define types
interface Exercise {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: number;
  image: string;
  link: string;
}

// Styled components
const RoundedPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease',
}));

const HeaderPaper = styled(Paper)(({ theme }) => ({
  borderRadius: '16px 16px 0 0',
  padding: theme.spacing(4),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const ExerciseCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.12)',
  },
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  borderRadius: 16,
  fontWeight: 500,
  padding: theme.spacing(0.5, 0),
  backgroundColor: theme.palette.secondary.light,
  color: theme.palette.secondary.dark,
}));

const SearchTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 25,
    '& fieldset': {
      borderWidth: 1,
    },
  },
}));

const RoundedSelect = styled(Select)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: 25,
  },
}));

const StartButton = styled(Button)(({ theme }) => ({
  borderRadius: 25,
  fontWeight: 600,
  padding: theme.spacing(1, 3),
  boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0px 8px 16px rgba(0,0,0,0.15)',
    transform: 'translateY(-2px)',
  },
}));

const ExercisesPage: React.FC = () => {
  const theme = useTheme();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch exercises from the mock API
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        const response = await getExercises();
        
        if (response.success && response.data.exercises) {
          setExercises(response.data.exercises);
        } else {
          setError('Failed to load exercises. Please try again later.');
        }
      } catch (err) {
        setError('An error occurred while fetching exercises.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchExercises();
  }, []);
  
  // Get unique categories from exercises
  const categories = ['all', ...Array.from(new Set(exercises.map(ex => ex.category)))];
  
  // Filter exercises based on active category and search query
  const filteredExercises = exercises.filter(exercise => {
    const matchesCategory = activeCategory === 'all' || exercise.category === activeCategory;
    const matchesSearch = exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setActiveCategory(event.target.value as string);
  };
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  const toggleDescription = (id: string) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const resetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
  };

  return (
    <Container maxWidth={false} sx={{ py: 4 }}>
      <HeaderPaper elevation={0}>
        <Typography variant="h4" gutterBottom fontWeight={600}>
          Therapeutic Exercises
        </Typography>
        <Typography variant="subtitle1">
          Discover exercises and tools to support your mental wellness journey
        </Typography>
      </HeaderPaper>
      
      <RoundedPaper sx={{ p: 3, mb: 4, mt: 0 }} elevation={1}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <SearchTextField
              fullWidth
              placeholder="Search exercises by keyword..."
              value={searchQuery}
              onChange={handleSearchChange}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ ml: 1, mr: 0.5, color: theme.palette.text.secondary }} />
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="category-select-label" sx={{ ml: 1 }}>
                  Filter by Category
                </InputLabel>
                <RoundedSelect
                  labelId="category-select-label"
                  id="category-select"
                  value={activeCategory}
                  onChange={handleCategoryChange}
                  label="Filter by Category"
                  startAdornment={
                    <FilterListIcon sx={{ ml: 1, color: theme.palette.primary.main }} />
                  }
                >
                  {categories.map(category => (
                    <MenuItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </MenuItem>
                  ))}
                </RoundedSelect>
              </FormControl>
              
              <IconButton 
                color="primary" 
                onClick={resetFilters} 
                sx={{ 
                  bgcolor: `${theme.palette.primary.main}15`,
                  borderRadius: 2,
                  p: 1
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </RoundedPaper>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : error ? (
        <RoundedPaper sx={{ p: 6, textAlign: 'center' }} elevation={1}>
          <Typography variant="h6" color="error" gutterBottom>
            {error}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={() => window.location.reload()}
            sx={{ 
              mt: 2,
              borderRadius: 25,
              px: 3,
              py: 1
            }}
          >
            Try Again
          </Button>
        </RoundedPaper>
      ) : filteredExercises.length > 0 ? (
        <Grid container spacing={3}>
          {filteredExercises.map(exercise => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={exercise.id}>
              <ExerciseCard>
                <CardMedia
                  component="img"
                  height="200"
                  image={exercise.image}
                  alt={exercise.title}
                  sx={{ objectFit: 'cover' }}
                />
                
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 2
                  }}>
                    <Typography variant="h6" component="h3" fontWeight={600}>
                      {exercise.title}
                    </Typography>
                    <CategoryChip label={exercise.category} size="small" />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {expandedDescriptions[exercise.id] 
                      ? exercise.description 
                      : `${exercise.description.substring(0, 120)}${exercise.description.length > 120 ? '...' : ''}`
                    }
                  </Typography>
                  
                  {exercise.description.length > 120 && (
                    <Button
                      size="small"
                      endIcon={expandedDescriptions[exercise.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      onClick={() => toggleDescription(exercise.id)}
                      sx={{ 
                        mb: 1, 
                        textTransform: 'none',
                        fontWeight: 500,
                        color: theme.palette.primary.main
                      }}
                    >
                      {expandedDescriptions[exercise.id] ? 'Show less' : 'Read more'}
                    </Button>
                  )}
                  
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    color: theme.palette.text.secondary,
                    mt: 2
                  }}>
                    <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">
                      {exercise.duration} minutes
                    </Typography>
                  </Box>
                </CardContent>
                
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <StartButton
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<PlayArrowIcon />}
                    onClick={() => window.open(exercise.link || '#', '_blank')}
                  >
                    Start Exercise
                  </StartButton>
                </CardActions>
              </ExerciseCard>
            </Grid>
          ))}
        </Grid>
      ) : (
        <RoundedPaper sx={{ p: 6, textAlign: 'center' }} elevation={1}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No exercises found matching your criteria.
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Try adjusting your search or filters to find what you're looking for.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={resetFilters}
            sx={{ 
              mt: 2,
              borderRadius: 25,
              px: 3,
              py: 1
            }}
          >
            Reset Filters
          </Button>
        </RoundedPaper>
      )}
    </Container>
  );
};

export default ExercisesPage;