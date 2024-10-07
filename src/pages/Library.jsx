import React, { useEffect, useState } from 'react';
import { Container, Typography, Pagination, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import TopicElement from '../components/TopicElement';
import { topicCreate, getTopicList, deleteTopic } from '../api/auth';
import CreateTopicDialog from '../components/CreateTopicDialog';
import Spinner from '../components/Spinner';
import { useDispatch } from 'react-redux';
import { setMessage } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 15;

export default function Library() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [topics, setTopics] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await getTopicList(page, ITEMS_PER_PAGE);
                setTopics(response.data.topics);
                console.log(response.data.topics)
                setTotalPages(response.data.totalPages);
                setLoading(false);
            } catch (error) {
                console.log(error);
                dispatch(setMessage({ error: error.response.data.error }));
                navigate('/logout');
            }
        };

        fetchTopics();
    }, [navigate, dispatch, page, refreshTrigger]);

    const handleDelete = async (topicId) => {
        try {
            await deleteTopic(topicId); // Assuming you have a deleteTopic function
            setRefreshTrigger(prev => prev + 1);
        } catch (error) {
            dispatch(setMessage({ error: error.response?.data?.error || 'Failed to delete topic' }));
        }
    };


    const handleCreateTopic = async (topicName) => {
        try {
            await topicCreate(topicName);
            // Refresh the topic list after creating a new topic
            const response = await getTopicList(1, ITEMS_PER_PAGE);
            setTopics(response.data.topics);
            setTotalPages(response.data.totalPages);
            setPage(1);
        } catch (error) {
            dispatch(setMessage({ error: error.response.data.error }));
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
                Topic Library
            </Typography>
            <Button
                variant="contained"
                onClick={() => setIsCreateDialogOpen(true)}
                sx={{ mb: 2 }}
            >
                Create New Topic
            </Button>

            {topics.length === 0 ? (
                <TopicElement
                    topic={{
                        name: 'No Topics Available',
                        description: 'There are no topics in the library yet.',
                        id: 'create-topic'
                    }}
                />
            ) : (
                <>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        sx={{ mt: 3, mb: 3, display: 'flex', justifyContent: 'center' }}
                    />
                    <Grid container spacing={3}>
                        {topics.map((topic, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={topic.id}>
                                <TopicElement key={topic.id} topic={topic} index={index} onDelete={handleDelete} />
                            </Grid>
                        ))}
                    </Grid>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        sx={{
                            mt: 3, display: 'flex', justifyContent

                                : 'center'
                        }}
                    />
                </>
            )}
            <CreateTopicDialog
                open={isCreateDialogOpen}
                onClose={() => setIsCreateDialogOpen(false)}
                onCreateTopic={handleCreateTopic}
            />
        </Container>
    );
}
