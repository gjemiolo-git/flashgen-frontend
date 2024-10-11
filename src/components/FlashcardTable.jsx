import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Table, TableBody, TableContainer, Paper, Box } from '@mui/material';
import FlashcardTableHeader from './FlashcardTable/FlashcardTableHeader';
import FlashcardRow from './FlashcardTable/FlashcardRow';
import AddFlashcardButton from './FlashcardTable/AddFlashcardButton';
import { fetchNewFlashcards } from '../api/auth';
import Spinner from './Spinner';
import { useDispatch } from 'react-redux';
import { setMessage } from '../redux/slices/authSlice';
import 'resize-observer-polyfill';

export const FlashcardTable = ({ topics, specs }) => {
    const dispatch = useDispatch();
    const { control, getValues } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "flashcards"
    });

    const [expandedRow, setExpandedRow] = useState(null);
    const [keepExpanded, setKeepExpanded] = useState(false);
    const frontInputRefs = useRef([]);

    const handleAddFlashcard = (front = '', back = '') => {
        append({ frontContent: front, backContent: back });
        const newIndex = fields.length;
        setExpandedRow(newIndex);
    };

    const handleFetchFlashcard = async (count) => {
        try {
            const existingFlashcards = getValues("flashcards")
                .map(f => ({ frontContent: f.frontContent, backContent: f.backContent }));
            const data = {
                topics, specs, number: count,
                existingFlashcards
            }
            const response = await fetchNewFlashcards(data);
            if (response.flashcards) {
                response.flashcards.forEach(f => handleAddFlashcard(f.frontContent, f.backContent))
            }
            console.log(response.flashcards);
        } catch (error) {
            dispatch(setMessage({ error: error.response?.data?.error || 'Failed to delete topic' }));
        }
    }

    const handleRowClick = (index) => {
        setExpandedRow(prevExpanded => prevExpanded === index ? null : index);
    };

    const handleKeepExpandedToggle = useCallback((event) => {
        const isChecked = event.target.checked;
        setKeepExpanded(isChecked);
        if (isChecked) {
            setExpandedRow(null);
        }
    }, []);

    useEffect(() => {
        if (expandedRow !== null) {
            requestAnimationFrame(() => {
                const input = frontInputRefs.current[expandedRow];
                if (input) {
                    input.focus();
                    input.setSelectionRange(input.value.length, input.value.length);
                }
            });
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
                <Spinner />
                <AddFlashcardButton onAdd={handleAddFlashcard} onFetch={handleFetchFlashcard} />
            </TableContainer>
        </Box>
    );
}
