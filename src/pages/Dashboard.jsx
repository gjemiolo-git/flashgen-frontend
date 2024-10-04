import React, { useEffect, useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    Button,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProtectedInfo } from '../api/auth';
import Spinner from '../components/Spinner';

export default function Dashboard() {
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [protectedData, setProtectedData] = useState('');

    useEffect(() => {
        let isMounted = true;

        const fetchDataSafely = async () => {
            try {
                const { data } = await fetchProtectedInfo();
                if (isMounted) {
                    console.log(data);
                    setProtectedData(data.info);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                if (isMounted) {
                    navigate('/logout');
                }
            }
        };

        fetchDataSafely();

        return () => {
            isMounted = false;
        };
    }, [navigate]);


    const flashcardCollections = [
        { id: 1, name: 'Machine Learning Basics', cardCount: 20 },
        { id: 2, name: 'React Hooks', cardCount: 15 },
        { id: 3, name: 'GraphQL Fundamentals', cardCount: 25 },
    ];

    return loading ? (<Spinner />)
        : (
            <>
                <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        {protectedData}
                    </Typography>
                    <Grid container spacing={3}>
                        {flashcardCollections.map((collection) => (
                            <Grid size={12} key={collection.id}>
                                <Paper sx={{ p: 2 }}>
                                    <Typography variant="h6">{collection.name}</Typography>
                                    <Typography color="text.secondary">
                                        {collection.cardCount} cards
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        sx={{ mt: 2 }}
                                        component={Link}
                                        to={`/collection/${collection.id}`}
                                    >
                                        Study Now
                                    </Button>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </>
        );
}
