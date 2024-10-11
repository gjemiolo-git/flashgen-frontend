import React, { useEffect, useState } from 'react';
import { Container, Typography, Pagination } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate, useParams } from 'react-router-dom';
import { getTopicDashboard } from '../api/auth';
import Spinner from '../components/Spinner';
import { useDispatch } from 'react-redux';
import { setMessage } from '../redux/slices/authSlice';
import FlashcardSetElement from '../components/FlashcardSetElement';
import { deleteSet } from '../api/auth';

const ITEMS_PER_PAGE = 5;

export default function TopicDashboard() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [flashcardSets, setFlashcardSets] = useState([]);
    const [topic, setTopic] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTopicDashboard(id, page, ITEMS_PER_PAGE);
                setFlashcardSets(data.flashcardSets);
                console.log(data);
                setTopic(data.topics[0]);
                setTotalPages(data.totalPages);
                if (page > totalPages) { handlePageChange(1) };
                setLoading(false);
            } catch (error) {
                console.error('Error fetching topic data:', error);
                dispatch(setMessage({ error: error.message || 'An error occurred' }));
                navigate('/dashboard');
            }
        };

        fetchData();
    }, [id, navigate, dispatch, page, refreshTrigger]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const onDelete = async (sId) => {
        try {
            await deleteSet(sId);
            console.log('Ondelete triggered for ', sId)
            setRefreshTrigger(prev => prev + 1);
        } catch (error) {
            dispatch(setMessage({ error: error.response?.data?.error || 'Failed to delete topic' }));
        }
    }

    if (loading) return <Spinner />;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {topic && (
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}
                >
                    {topic.name}
                </Typography>
            )}

            {flashcardSets.length === 0 ? (
                <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
                    There are no flashcard sets for this topic yet.
                </Typography>
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
                                <FlashcardSetElement set={set} topic={topic} onDelete={onDelete} />
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
