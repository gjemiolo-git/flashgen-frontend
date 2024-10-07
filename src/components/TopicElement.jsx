import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const TopicElement = ({ topic, index }) => {
    const theme = useTheme();

    return (
        <Paper
            sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: index % 2 === 1 ? theme.palette.action.hover : 'inherit',
            }}
        >
            <Typography variant="h6" gutterBottom>
                {topic.name}
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    component={Link}
                    to={`/topic/${topic.id}`}
                >
                    Explore
                </Button>
            </Box>
        </Paper>
    );
};

export default TopicElement;
