import React from 'react';
import { Button, Box, useTheme } from '@mui/material';
import { Add, Refresh } from '@mui/icons-material';

const AddFlashcardButton = ({ onAdd, onFetch }) => {
    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex', gap: 2, mt: 2, mb: 2 }}>
            <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={onAdd}
                sx={{
                    color: theme.palette.primary.main,
                    '&:hover': {
                        color: theme.palette.primary.dark,
                    },
                }}
            >
                Add Flashcard
            </Button>
            <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={onFetch}
                sx={{
                    color: theme.palette.secondary.main,
                    '&:hover': {
                        color: theme.palette.secondary.dark,
                    },
                }}
            >
                Fetch Flashcards
            </Button>
        </Box>
    );
};

export default AddFlashcardButton;
