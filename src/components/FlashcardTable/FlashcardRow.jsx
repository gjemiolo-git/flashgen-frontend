import React, { useCallback } from 'react';
import { TableRow, TableCell, IconButton, Typography, Collapse, Grid } from '@mui/material';
import { Remove } from '@mui/icons-material';
import ExpandedFlashcardContent from './ExpandedFlashcardContent';
import { useFormContext } from 'react-hook-form';

const FlashcardRow = ({ index, expandedRow, keepExpanded, onRowClick, onRemove }) => {
    const { getValues } = useFormContext();

    const formatContent = useCallback((content, maxLength = 20) => {
        if (content.length === 0) return `${index + 1}. (Empty flashcard)`;
        content = `${index + 1}. ` + (content || '');
        if (content.length <= maxLength) return content;
        return content.substring(0, maxLength) + '...'
    }, [index]);

    const handleRowClick = useCallback(() => {
        if (!keepExpanded) {
            onRowClick(index);
        }
    }, [keepExpanded, onRowClick, index]);

    const handleRemove = useCallback((e) => {
        e.stopPropagation();
        onRemove(index);
    }, [onRemove, index]);

    const frontContent = getValues(`flashcards.${index}.frontContent`);

    return (
        <React.Fragment>
            <TableRow
                onClick={handleRowClick}
                style={{ cursor: keepExpanded ? 'default' : 'pointer' }}
            >
                <TableCell sx={{ width: '100%' }}>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item xs={10} sm={11}>
                            <Typography noWrap>
                                {formatContent(frontContent)}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} sm={1}>
                            <IconButton onClick={handleRemove}>
                                <Remove />
                            </IconButton>
                        </Grid>
                    </Grid>
                </TableCell>
            </TableRow>


            <TableRow>
                <TableCell colSpan={2} style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse in={keepExpanded || expandedRow === index} timeout="auto" unmountOnExit>
                        <ExpandedFlashcardContent
                            index={index}
                            isExpanded={keepExpanded || expandedRow === index}
                        />
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

export default React.memo(FlashcardRow);
