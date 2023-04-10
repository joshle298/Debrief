import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Box, Grid, Card, CardContent, Typography, Fade, Paper, IconButton, styled, CardMedia } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const ScrollingText = styled(Typography)(({ theme }) => ({
  display: 'inline-block',
  whiteSpace: 'nowrap',
  animation: 'scrollingText 50s linear infinite',
  position: 'absolute',
  left: '100%',
  '@keyframes scrollingText': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-100%)' },
  },
}));

const articles = [
  {
    title: 'Experts warn of rising sea levels in coastal cities',
    headline: 'New York Times',
    timestamp: '2023-04-01T10:30:00',
    imageUrl: 'ocean.png',
  },
  {
    title: 'Local brewery wins national award for best IPA',
    headline: 'Reddit',
    timestamp: '2023-04-01T12:15:00',
    imageUrl: 'brewery.png',
  },
  {
    title: 'New study links social media use to increased feelings of loneliness',
    headline: 'Twitter',
    timestamp: '2023-03-31T18:45:00',
    imageUrl: 'social.png',
  },
  {
    title: 'NASA announces plans to launch new mission to study black holes',
    headline: 'Wall Street Journal',
    timestamp: '2023-03-30T16:00:00',
    imageUrl: 'nasa.png',
  },
  {
    title: 'Major tech company hit with massive data breach affecting millions of users',
    headline: 'Hacker News',
    timestamp: '2023-03-29T22:30:00',
    imageUrl: 'tech.png',
  },
  {
    title: 'World leaders gather for summit on climate change and renewable energy',
    headline: 'CNN',
    timestamp: '2023-03-28T20:00:00',
    imageUrl: 'climate.png',
  },
];

const accentColor = '#0F9D58';

function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

function App() {
  const [typewriterText, setTypewriterText] = useState('');
  const [loaded, setLoaded] = useState(false);
  const summaryDebrief = 'The European Union plans to phase out gasoline and diesel cars by 2035 to reduce carbon emissions. Meanwhile, Purdue Pharma has agreed to pay $4.5 billion to settle thousands of lawsuits and dissolve the company over its role in the opioid epidemic. China will launch its first crewed mission to its new space station later this year, while the World Health Organization has called for a temporary halt to COVID-19 vaccine boosters. In sports news, Paris will host the 2024 Summer Olympics, marking the second time the city has hosted the event. These are the latest developments across the world in the fight against climate change, public health, and the pursuit of space exploration and global sporting events.';
  const typingDelay = 50;
  const cursor = useRef(0);

  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleAudioPlay = () => {
    if (!audioPlaying) {
      audioRef.current.play();
      setAudioPlaying(true);
    }
  };
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', () => setAudioPlaying(false));
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', () => setAudioPlaying(false));
      }
    };
  }, [audioRef]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

    useEffect(() => {
    if (loaded) {
      const typewriterTimer = setTimeout(() => {
        setTypewriterText(summaryDebrief.substring(0, cursor.current + 1));
        cursor.current++;
      }, typingDelay);

      if (cursor.current >= summaryDebrief.length) {
        clearTimeout(typewriterTimer);
      }

      return () => clearTimeout(typewriterTimer);
    }
  }, [loaded, typewriterText]);


  const scrollingText = {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    animation: 'scrollingText 10s linear infinite',
    position: 'absolute',
    left: '100%',
    '@keyframes scrollingText': {
      '0%': { transform: 'translateX(0)' },
      '100%': { transform: 'translateX(-100%)' },
    },
  };

  return (
    <Container maxWidth="md">
      <Fade in={loaded} timeout={500}>
        <Box my={4}>
          <Typography variant="h3" component="h1" align="left" gutterBottom sx={{ color: accentColor }}>
            Debrief
          </Typography>
        </Box>
      </Fade>
      <Fade in={loaded} timeout={1000}>
      <Box mb={4}>
        <Paper variant="outlined" sx={{ borderColor: accentColor, padding: 2, minHeight: '100px' }}>
          <Typography variant="body1">{typewriterText}</Typography>
        </Paper>
      </Box>
    </Fade>
    <Fade in={loaded} timeout={1000}>
      <Box mb={4} sx={{ overflow: 'hidden', position: 'relative', border: `1px solid ${accentColor}`, borderRadius: '4px', minHeight: '30px' }}>
        <ScrollingText variant="subtitle1" component="div">
        In recent news, the government has announced a new infrastructure plan aimed at boosting economic growth. The plan is expected to bring about several key improvements to the country's transportation and communication networks. Meanwhile, scientists have made an exciting discovery, having found a new species of rare deep-sea creatures that could provide valuable insights into the ocean's ecology. On the business front, investors are rejoicing as the stock market reaches an all-time high. However, the joy is dampened by the news that a record-breaking heatwave has caused wildfires across several states. These events have prompted world leaders to convene for a climate change summit, where they have vowed to take action to address the growing threat of global warming.
        </ScrollingText>
      </Box>
    </Fade>
    <Grid container spacing={4}>
        {articles.map((article, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Fade in={loaded} timeout={1500 + index * 500}>
              <Card sx={{ borderRadius: '16px', minHeight: '200px' }}>
              <CardMedia
            component="img"
            image={article.imageUrl} // Add this line
            alt={article.title}
            sx={{
              height: '150px',
              borderRadius: '8px', // Add this line for rounded corners
              objectFit: 'cover',
            }}
          />
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: accentColor }}>
                    {article.title}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {article.headline}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(article.timestamp)}
                  </Typography>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>
      <Box mb={4} /> {/* Add this line to create space below the Grid */}
    </Container>
  );
}

export default App;