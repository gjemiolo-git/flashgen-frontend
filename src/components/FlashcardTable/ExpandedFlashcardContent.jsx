import React, { useRef, useEffect, useCallback } from 'react';
import { Box, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

const ExpandedFlashcardContent = React.memo(({ index, isExpanded }) => {
    const { register } = useFormContext();
    const frontInputRef = useRef(null);

    useEffect(() => {
        if (isExpanded && frontInputRef.current) {
            frontInputRef.current.focus();
        }
    }, [isExpanded]);

    const handleInputChange = useCallback((e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
    }, []);

    return (
        <Box margin={1}>
            <TextField
                label="Front"
                {...register(`flashcards.${index}.front`)}
                fullWidth
                multiline
                minRows={1}
                maxRows={6}
                inputProps={{ maxLength: 200 }}
                variant="outlined"
                margin="normal"
                inputRef={frontInputRef}
                onChange={handleInputChange}
            />
            <TextField
                label="Back"
                {...register(`flashcards.${index}.back`)}
                fullWidth
                multiline
                minRows={1}
                maxRows={6}
                inputProps={{ maxLength: 200 }}
                variant="outlined"
                margin="normal"
                onChange={handleInputChange}
            />
        </Box>
    );
});

export default ExpandedFlashcardContent;
