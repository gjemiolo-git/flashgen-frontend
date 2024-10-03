import React from 'react';
import {
    Container,
    Paper,
    Typography,
    Button,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    // This would typically come from an API call or state management
    const flashcardCollections = [
        { id: 1, name: 'Machine Learning Basics', cardCount: 20 },
        { id: 2, name: 'React Hooks', cardCount: 15 },
        { id: 3, name: 'GraphQL Fundamentals', cardCount: 25 },
    ];

    return (
        <>
            <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Your Flashcard Collections
                </Typography>
                <Grid container spacing={3}>
                    {flashcardCollections.map((collection) => (
                        <Grid size={12} key={collection.id}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6">{collection.name}</Typography>
                                <Typography color="text.secondary">
                                    {collection.cardCount} cards
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{ mt: 2 }}
                                    component={Link}
                                    to={`/collection/${collection.id}`}
                                >
                                    Study Now
                                </Button>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}
