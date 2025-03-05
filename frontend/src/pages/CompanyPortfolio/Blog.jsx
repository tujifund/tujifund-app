import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button, Chip, Stack } from '@mui/material';
import Layout from './Cham-Vault/components/Layout.jsx';
import { AccessTime, Person } from '@mui/icons-material';

const Blog = () => {
  const blogPosts = [
    {
      title: 'The Future of Chama Investment in Kenya',
      description: 'Explore how technology is transforming traditional Chama investment practices and what it means for your group.',
      image: 'https://source.unsplash.com/random/800x600?finance',
      author: 'John Doe',
      date: 'January 27, 2025',
      category: 'Investment',
      readTime: '5 min read'
    },
    {
      title: 'Best Practices for Managing Group Finances',
      description: 'Learn about proven strategies and tools that can help your Chama manage its finances more effectively.',
      image: 'https://source.unsplash.com/random/800x600?business',
      author: 'Jane Smith',
      date: 'January 25, 2025',
      category: 'Management',
      readTime: '7 min read'
    },
    {
      title: 'Digital Security for Chama Groups',
      description: 'Essential cybersecurity tips to protect your Chama\'s financial data and transactions in the digital age.',
      image: 'https://source.unsplash.com/random/800x600?security',
      author: 'Michael Johnson',
      date: 'January 23, 2025',
      category: 'Security',
      readTime: '6 min read'
    },
    {
      title: 'Maximizing Returns on Group Investments',
      description: 'Discover strategies for optimizing your Chama\'s investment portfolio and increasing returns.',
      image: 'https://source.unsplash.com/random/800x600?investment',
      author: 'Sarah Wilson',
      date: 'January 20, 2025',
      category: 'Investment',
      readTime: '8 min read'
    },
    {
      title: 'Understanding Chama Legal Requirements',
      description: 'A comprehensive guide to legal compliance and regulations for Chama groups in Kenya.',
      image: 'https://source.unsplash.com/random/800x600?legal',
      author: 'David Brown',
      date: 'January 18, 2025',
      category: 'Legal',
      readTime: '10 min read'
    },
    {
      title: 'Effective Member Communication Strategies',
      description: 'Tips and tools for maintaining clear and efficient communication within your Chama group.',
      image: 'https://source.unsplash.com/random/800x600?communication',
      author: 'Emily Davis',
      date: 'January 15, 2025',
      category: 'Communication',
      readTime: '4 min read'
    }
  ];

  const categories = ['All', 'Investment', 'Management', 'Security', 'Legal', 'Communication'];

  return (
    <Layout>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ my: 8, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            ChamaVault Blog
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Insights and Updates from the World of Chama Finance
          </Typography>
        </Box>

        {/* Categories */}
        <Box sx={{ mb: 6 }}>
          <Stack 
            direction="row" 
            spacing={2} 
            sx={{ 
              overflowX: 'auto',
              pb: 2,
              '&::-webkit-scrollbar': {
                height: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#888',
                borderRadius: '4px',
                '&:hover': {
                  background: '#555',
                },
              },
            }}
          >
            {categories.map((category) => (
              <Chip 
                key={category}
                label={category}
                clickable
                color={category === 'All' ? 'primary' : 'default'}
                sx={{ 
                  minWidth: 'fit-content',
                  '&:hover': {
                    backgroundColor: (theme) => 
                      category === 'All' 
                        ? theme.palette.primary.dark 
                        : theme.palette.action.hover,
                  }
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* Blog Posts Grid */}
        <Grid container spacing={4}>
          {blogPosts.map((post, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                }
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={post.image}
                  alt={post.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Chip 
                    label={post.category}
                    size="small"
                    color="primary"
                    sx={{ mb: 2 }}
                  />
                  <Typography variant="h5" component="h2" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {post.description}
                  </Typography>
                  <Stack 
                    direction="row" 
                    spacing={2} 
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Person fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {post.author}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AccessTime fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {post.readTime}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {post.date}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    fullWidth
                  >
                    Read More
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Newsletter Section */}
        <Box 
          sx={{ 
            my: 8, 
            p: 4, 
            textAlign: 'center',
            backgroundColor: 'primary.main',
            color: 'white',
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Stay Updated
          </Typography>
          <Typography variant="body1" paragraph>
            Subscribe to our newsletter for the latest insights and updates
          </Typography>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 3 }}
          >
            <Button 
              variant="contained" 
              sx={{ 
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
            >
              Subscribe Now
            </Button>
          </Stack>
        </Box>
      </Container>
    </Layout>
  );
};

export default Blog;
