import React from 'react';
import { Paper, Typography, Button, Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';

const FlashcardSetElement = ({ set, topic, onDelete }) => {
  console.log(set)
  const theme = useTheme();
  const topics = topic ? topic.name : (set.topics ? (set.topics.length > 0 ? set.topics.map(t => t.name).join(", ") : "No topics") : "Topics not available");

  return (
    <Paper
      sx={{
        p: 2,
        backgroundColor: set.id % 2 === 1 ? theme.palette.action.hover : 'inherit',
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <Typography variant="h6">{set.name}</Typography>
          <Typography variant="body2">{topics}</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box display="flex" alignItems="center">
            <PersonIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
            <Typography variant="body2" color="text.secondary">
              Created by {set.creator}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography color="text.secondary">
            <Typography variant="h7" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>{set.cardCount}</Typography> cards
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="contained"
              component={Link}
              to={`/collection/${set.id}`}
            >
              Study Now
            </Button>
            {set.isCreator && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => onDelete(set.id)}
              >
                Delete
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FlashcardSetElement;
