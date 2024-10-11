import React from 'react';
import { Paper, Typography, Button, Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';

const FlashcardSetElement = ({ set, topic, onDelete }) => {
  const topics = topic?.name || set.topics?.map(t => t.name).join(", ") || "No topics";
  const isCreateSet = set.id === 'create-flashcard-set';

  return (
    <Paper sx={{ p: 2, backgroundColor: set.id % 2 === 1 ? 'action.hover' : 'inherit' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h6">{set.name}</Typography>
          <Typography variant="body2">{topics}</Typography>
          {!isCreateSet && (
            <Box display="flex" alignItems="center" mt={1}>
              <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {set.isCreator ? 'Created by you' : `Created by ${set.creator}`}
              </Typography>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={2}>
          {!isCreateSet && (
            <Typography color="text.secondary">
              <Typography component="span" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                {set.cardCount}
              </Typography> cards
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="contained"
              component={Link}
              to={isCreateSet ? '/library' : `/collection/${set.id}`}
            >
              {isCreateSet ? 'View Library' : 'Study Now'}
            </Button>
            {isCreateSet && (
              <Button variant="contained" component={Link} to="/create">
                Create Now
              </Button>
            )}
            {set.isCreator && !isCreateSet && (
              <Button variant="outlined" color="error" onClick={() => onDelete(set.id)}>
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
