import React, { useEffect, useState } from 'react';
import { Container, Typography, Pagination } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import { fetchProtectedInfo, deleteSet } from '../../api/all';
import Spinner from '../layout/Spinner';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../redux/slices/authSlice';
import FlashcardSetElement from '../FlashcardElements/FlashcardSetElement';

const ITEMS_PER_PAGE = 5;

export default function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [flashcardSets, setFlashcardSets] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchProtectedInfo(page, ITEMS_PER_PAGE);
                setFlashcardSets(data.flashcardSets);
                setTotalPages(data.totalPages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching protected info:', error);
                dispatch(setMessage({ error: error.message || 'An error occurred' }));
                navigate('/logout');
            }

        };

        fetchData();
    }, [navigate, dispatch, page, refreshTrigger]);

    const onDelete = async (sId) => {
        try {
            await deleteSet(sId);
            dispatch(setMessage({ info: 'Deletion successful' }));
            setRefreshTrigger(prev => prev + 1);
        } catch (error) {
            dispatch(setMessage({ error: error.response?.data?.error || 'Failed to delete topic' }));
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    if (loading) return <Spinner />;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    textAlign: 'center',
                    fontWeight: 'bold'
                }}
            >
                Your Flashcard Sets
            </Typography>

            {flashcardSets.length === 0 ? (
                <FlashcardSetElement
                    set={{
                        name: 'No Flashcard Sets',
                        cardCount: 'You haven\'t created any flashcard sets yet.',
                        id: 'create-flashcard-set'
                    }}
                />
            ) : (
                <>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
                    />
                    <Grid container spacing={3}>
                        {flashcardSets.map((set, index) => (
                            <Grid size={{ xs: 12 }} key={set.id}>
                                <FlashcardSetElement set={set} index={index} onDelete={onDelete} />
                            </Grid>
                        ))}
                    </Grid>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
                    />
                </>
            )}
        </Container>
    );
}
