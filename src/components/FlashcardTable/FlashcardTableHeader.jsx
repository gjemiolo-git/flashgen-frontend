import React from 'react';
import { Box, Typography, Switch, FormControlLabel } from '@mui/material';

const FlashcardTableHeader = ({ keepExpanded, onKeepExpandedToggle }) => (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} mt={2}>
        <Box>
            <Typography variant="h6" gutterBottom>
                Flashcard List
            </Typography>
        </Box>
        <Box>
            <FormControlLabel
                control={<Switch checked={keepExpanded} onChange={onKeepExpandedToggle} />}
                label="Keep All Fields Expanded"
            />
        </Box>
    </Box>
);

export default FlashcardTableHeader;