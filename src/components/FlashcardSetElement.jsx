import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const FlashcardSetElement = ({ set, onDelete, index }) => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        p: 2,
        backgroundColor: index % 2 === 1 ? theme.palette.action.hover : 'inherit',
      }}
    >
      <Typography variant="h6">{set.name}</Typography>
      <Typography color="text.secondary">
        {set.cardCount} cards
      </Typography>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ width: '10%' }} /> {/*Spacer*/}
        <Button
          variant="contained"
          component={Link}
          to={`/collection/${set.id}`}
        >
          Study Now
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => onDelete(set.id)}
        >
          Delete
        </Button>
      </Box>
    </Paper>
  );
};

export default FlashcardSetElement;