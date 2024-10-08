import React, { useRef, useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Table, TableBody, TableContainer, Paper, Box } from '@mui/material';
import FlashcardTableHeader from './FlashcardTable/FlashcardTableHeader';
import FlashcardRow from './FlashcardTable/FlashcardRow';
import AddFlashcardButton from './FlashcardTable/AddFlashcardButton';

export const FlashcardTable = () => {
    const { control, getValues } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "flashcards"
    });

    const [expandedRow, setExpandedRow] = React.useState(null);
    const [keepExpanded, setKeepExpanded] = React.useState(false);
    const frontInputRefs = useRef([]);

    const handleAddFlashcard = () => {
        append({ front: '', back: '' });
        const newIndex = fields.length;
        setExpandedRow(newIndex);
    };

    const handleRowClick = (index) => {
        setExpandedRow(prevExpanded => prevExpanded === index ? null : index);
    };

    const handleKeepExpandedToggle = (event) => {
        setKeepExpanded(event.target.checked);
        if (event.target.checked) {
            setExpandedRow(null);
        }
    };

    useEffect(() => {
        if (expandedRow !== null) {
            setTimeout(() => {
                const input = frontInputRefs.current[expandedRow];
                if (input) {
                    input.focus();
                    input.setSelectionRange(input.value.length, input.value.length);
                }
            }, 100);
        }
    }, [expandedRow]);

    return (
        <Box>
            <FlashcardTableHeader
                keepExpanded={keepExpanded}
                onKeepExpandedToggle={handleKeepExpandedToggle}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {fields.map((field, index) => (
                            <FlashcardRow
                                key={field.id}
                                index={index}
                                expandedRow={expandedRow}
                                keepExpanded={keepExpanded}
                                onRowClick={handleRowClick}
                                onRemove={() => remove(index)}
                                getValues={getValues}
                            />
                        ))}
                    </TableBody>
                </Table>
                <AddFlashcardButton onAdd={handleAddFlashcard} />
            </TableContainer>
        </Box>
    );
}
