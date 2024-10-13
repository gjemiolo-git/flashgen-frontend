import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    CircularProgress,
    Box
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { getStudyView } from '../api/auth';
import StudyDashboard from '../components/StudyDashboard';

const StudyView = () => {
    const [flashcardSet, setFlashcardSet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchFlashcardSet = async () => {
            try {
                const response = await getStudyView(id);
                console.log(response);
                setFlashcardSet(response);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchFlashcardSet();
    }, [id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md">
                <Typography color="error" variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
                    {error}
                </Typography>
            </Container>
        );
    }

    if (!flashcardSet || flashcardSet.flashcards.length === 0) {
        return (
            <Container maxWidth="md">
                <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
                    No flashcards available in this set.
                </Typography>
            </Container>
        );
    }

    return (
        <Box sx={{ py: 4 }}>
            <StudyDashboard flashcardSet={flashcardSet} />
        </Box>
    );
};

export default StudyView;
