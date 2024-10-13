import React, { useState } from 'react';
import { Button, Box, useTheme, CircularProgress, TextField } from '@mui/material';
import { Add, Refresh } from '@mui/icons-material';

const AddFlashcardButton = ({ onAdd, onFetch, isFetching, specs }) => {
    const theme = useTheme();
    const [fetchCount, setFetchCount] = useState(1);

    const handleFetch = async () => {
        await onFetch(fetchCount);
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
            mb: 2
        }}>
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

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                    type="number"
                    value={fetchCount}
                    onChange={(e) => setFetchCount(Math.min(Math.max(1, parseInt(e.target.value) || 1), 5))}
                    inputProps={{ min: 1, max: 5 }}
                    size="small"
                    sx={{
                        '& input': { textAlign: 'center' }
                    }}
                />
                <Button
                    variant="outlined"
                    startIcon={isFetching ? <CircularProgress size={20} /> : <Refresh />}
                    onClick={handleFetch}
                    disabled={isFetching || !specs}
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
        </Box>
    );
};

export default AddFlashcardButton;
