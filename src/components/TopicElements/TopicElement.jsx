import React from 'react';
import { Paper, Typography, Button, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';

const TopicElement = ({ topic, index, onDelete }) => {
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
                position: 'relative',
            }}
        >
            {topic.isCreator && (
                <IconButton
                    aria-label="delete"
                    onClick={() => onDelete(topic.id)}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            )}
            <Typography variant="h6" gutterBottom>
                {topic.name}
            </Typography>
            <Typography variant="h7" gutterBottom>
                <Typography variant="h7" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>{topic.setCount}</Typography> Flashcard Sets
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
