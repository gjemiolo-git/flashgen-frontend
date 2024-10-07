import React, { useState } from 'react';
import { Container, Typography, Pagination } from '@mui/material';
import Grid from '@mui/material/Grid2';
import TopicElement from '../components/TopicElement'; // Assume this component exists

const ITEMS_PER_PAGE = 15; // 3 topics per row, 3 rows per page

const topicsData = [
    { "name": "Space and Earth 🌍🚀" },
    { "name": "Animals and Plants 🦁🌳" },
    { "name": "Human Body and Health 🫀🩺" },
    { "name": "Weather and Environment 🌦️♻️" },
    { "name": "Oceans and Sea Life 🌊🐠" },
    { "name": "Dinosaurs and Fossils 🦖🦕" },
    { "name": "Inventions and Technology 💡⚡" },
    { "name": "Rocks and Minerals 🪨💎" },
    { "name": "Food and Nutrition 🍎🥕" },
    { "name": "Machines and Transportation 🚗🚂" },
    { "name": "Insects and Small Creatures 🐝🐛" },
    { "name": "Science and Energy 🧪⚡" },
    { "name": "Nature and Ecosystems 🏞️🌿" },
    { "name": "Physics and Chemistry ⚖️🧪" }
];

export default function Library() {
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(topicsData.length / ITEMS_PER_PAGE);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const paginatedTopics = topicsData.slice(
        (page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    textAlign: 'center',
                    fontWeight: 'bold'
                }}
            >
                Topic Library
            </Typography>

            {topicsData.length === 0 ? (
                <TopicElement
                    topic={{
                        name: 'No Topics Available',
                        description: 'There are no topics in the library yet.',
                        id: 'create-topic'
                    }}
                />
            ) : (
                <>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        sx={{ mt: 3, mb: 3, display: 'flex', justifyContent: 'center' }}
                    />
                    <Grid container spacing={3}>
                        {paginatedTopics.map((topic, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                                <TopicElement topic={topic} index={index} />
                            </Grid>
                        ))}
                    </Grid>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
                    />
                </>
            )}
        </Container>
    );
}