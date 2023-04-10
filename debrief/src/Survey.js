import React, { useState, useRef } from 'react';
import { Button, Card, CardContent, CardActions, CardMedia, Grid, Typography, Container } from '@mui/material';
import { Box } from '@mui/system';
import Component2 from './News';

const mediaItems = [
  // Replace these with real data from APIs
  { id: 1, source: 'Tech Crunch', imageUrl: 'techcrunch.png', title: 'beacon Power Services raises $2.7M to improve electricity access for sub-Saharan African cities', createdYear: 2021 },
  { id: 2, source: 'Wired', imageUrl: 'wired.png', title: 'This Week: Vulcan Leak offers a postwar Playbook. Russian Attack, Biden Spyware executive order, and a hacking campaign against Exxon Mobil', createdYear: 2021 },
  { id: 3, source: 'Medium', imageUrl: 'medium.png', title: 'Visual Programming with Elixir, Learning to Write with Binary Parsers', createdYear: 2021 },
  { id: 4, source: 'New York Times', imageUrl: 'nytimes.png', title: 'Trumps indictment and Whats next. The fallout will be widespread with ramifactions for the 2024 presidential race, policymaking and more.', createdYear: 2021 },
  { id: 5, source: 'Reddit', imageUrl: 'reddit.png', title: 'The Supreme Court’s Ginni Thomas problem is bigger than legal ethics Unaccountable donors are mainstreaming her favorite conspiracy theories, which demonize fellow Americans.', createdYear: 2021 },
  { id: 6, source: 'Twitter', imageUrl: 'Tweet1.png', title: 'The most disturbing set of data on America that I have encountered in a long time. This transcends politics. This is especially scary remembering that demographics were the best early warning on the collapse of the USSR. Why are Americans dying so young? ', createdYear: 2021 },
  { id: 7, source: 'Citizen', imageUrl: 'Citizen.png', title: 'Smokle cloud rising from building fire', createdYear: 2021 },
  { id: 8, source: 'Twitter', imageUrl: 'Tweet2.png', title: 'Generate videos with nothing but words. If you can say it, now you can see it. Introducing, Text to Video. With Gen-2', createdYear: 2021 },
  { id: 9, source: 'Github', imageUrl: 'github.png', title: 'Make loading weights 10-100x faster #613This is a breaking change thats going to give us three benefits:Your inference commands should load 100x faster. You may be able to safely load models 2x larger You can run many concurrent inference processes This was accomplished by changing the file format so we can mmap() weights directly into memory without having to read() or copy them', createdYear: 2021 },
];

function PrecedingPage() {
  const [likedItems, setLikedItems] = useState([]);
  const [dislikedItems, setDislikedItems] = useState([]);
  const [showComponent2, setShowComponent2] = useState(false);
  const component2Ref = useRef(null);

  const handleItemClick = (item, action) => {
    if (action === 'like') {
      if (likedItems.includes(item.title)) {
        setLikedItems((prevState) => prevState.filter((title) => title !== item.title));
      } else {
        setLikedItems((prevState) => [...prevState, item.title]);
        setDislikedItems((prevState) => prevState.filter((title) => title !== item.title));
      }
    } else if (action === 'dislike') {
      if (dislikedItems.includes(item.title)) {
        setDislikedItems((prevState) => prevState.filter((title) => title !== item.title));
      } else {
        setDislikedItems((prevState) => [...prevState, item.title]);
        setLikedItems((prevState) => prevState.filter((title) => title !== item.title));
      }
    }
  };

  const handleSubmit = () => {
    setShowComponent2(true);
    // Add a check to make sure the ref is not null before scrolling
    if (component2Ref.current) {
      component2Ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <Container>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4">Media Preferences</Typography>
      </Box>
      <Grid container spacing={2}>
        {mediaItems.map((item) => {
          const isLiked =
          likedItems.includes(item.title);
          const isDisliked = dislikedItems.includes(item.title);
          return (
            <Grid key={item.id} item xs={4} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  width="500"
                  image={`${process.env.PUBLIC_URL}/${item.imageUrl}`}
                  alt={item.title}
                  sx={{
                    filter: isLiked
                      ? 'brightness(1.5) sepia(1) hue-rotate(90deg) saturate(3) brightness(0.8)'
                      : isDisliked
                      ? 'brightness(1.5) sepia(1) hue-rotate(-90deg) saturate(1000%) brightness(0.8)'
                      : '',
                  }}
                />
                <CardContent>
                  <Typography variant="body2">Source: {item.source}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleItemClick(item, 'like')}>
                    Like
                  </Button>
                  <Button size="small" onClick={() => handleItemClick(item, 'dislike')}>
                    Dislike
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Box textAlign="center" mt={4}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit Preferences
        </Button>
      </Box>
      {showComponent2 && (
        <div ref={component2Ref}>
          <Component2 />
        </div>
      )}
      <Box mb={4} /> {/* Add this line to create space below the Grid */}
    </Container>
  );
}

export default PrecedingPage;