import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Tab,
  Tabs,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  Search as SearchIcon,
  PlayCircleOutline as PlayIcon,
  Article as ArticleIcon,
  Quiz as QuizIcon,
} from '@mui/icons-material';

const LearningPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with actual API data
  const resources = {
    courses: [
      {
        id: 1,
        title: 'Financial Management Basics',
        description: 'Learn the fundamentals of financial management for chamas',
        thumbnail: 'https://example.com/course1.jpg',
        duration: '2 hours',
        progress: 60,
        type: 'course',
      },
      {
        id: 2,
        title: 'Investment Strategies',
        description: 'Advanced investment strategies for group savings',
        thumbnail: 'https://example.com/course2.jpg',
        duration: '1.5 hours',
        progress: 30,
        type: 'course',
      },
    ],
    articles: [
      {
        id: 1,
        title: 'Understanding Chama Governance',
        description: 'Best practices for managing your chama effectively',
        readTime: '10 min',
        type: 'article',
      },
      {
        id: 2,
        title: 'Risk Management in Group Investments',
        description: 'How to minimize risks in group investments',
        readTime: '15 min',
        type: 'article',
      },
    ],
    quizzes: [
      {
        id: 1,
        title: 'Financial Literacy Quiz',
        description: 'Test your knowledge of basic financial concepts',
        questions: 10,
        type: 'quiz',
      },
      {
        id: 2,
        title: 'Investment Knowledge Test',
        description: 'Assess your understanding of investment principles',
        questions: 15,
        type: 'quiz',
      },
    ],
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const getResourcesByType = () => {
    switch (currentTab) {
      case 0:
        return resources.courses;
      case 1:
        return resources.articles;
      case 2:
        return resources.quizzes;
      default:
        return [];
    }
  };

  const ResourceCard = ({ resource }) => {
    const getIcon = () => {
      switch (resource.type) {
        case 'course':
          return <PlayIcon />;
        case 'article':
          return <ArticleIcon />;
        case 'quiz':
          return <QuizIcon />;
        default:
          return null;
      }
    };

    return (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {resource.thumbnail && (
          <CardMedia
            component="img"
            height="140"
            image={resource.thumbnail}
            alt={resource.title}
          />
        )}
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            {getIcon()}
            <Typography variant="h6" component="div" sx={{ ml: 1 }}>
              {resource.title}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {resource.description}
          </Typography>
          <Box sx={{ mt: 'auto' }}>
            {resource.type === 'course' && (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" sx={{ mr: 1 }}>
                    Progress: {resource.progress}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Duration: {resource.duration}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={resource.progress}
                  sx={{ mb: 2 }}
                />
              </>
            )}
            {resource.type === 'article' && (
              <Chip
                label={`${resource.readTime} read`}
                size="small"
                sx={{ mt: 1 }}
              />
            )}
            {resource.type === 'quiz' && (
              <Chip
                label={`${resource.questions} questions`}
                size="small"
                sx={{ mt: 1 }}
              />
            )}
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, bgcolor: '#1a237e' }}
            >
              {resource.type === 'course'
                ? 'Continue Learning'
                : resource.type === 'article'
                ? 'Read Article'
                : 'Take Quiz'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Learning Resources
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Courses" />
          <Tab label="Articles" />
          <Tab label="Quizzes" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {getResourcesByType().map((resource) => (
          <Grid item xs={12} sm={6} md={4} key={resource.id}>
            <ResourceCard resource={resource} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LearningPage;
