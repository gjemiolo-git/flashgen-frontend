import React, { useState, useEffect } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { getTopicList, flashcardSetCreate } from '../../api/all';
import {
    Autocomplete, Container, Typography, Box, TextField, Chip, Button,
} from '@mui/material';
import { FlashcardTable } from '../FlashcardTable/FlashcardTable';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../redux/slices/authSlice';
import Spinner from '../layout/Spinner';
import ErrorBoundary from './ErrorBoundary';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Create() {
    const methods = useForm({
        defaultValues: {
            name: '',
            topics: [],
            flashcards: []
        }
    });
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const { control, register, formState: { errors }, clearErrors, watch, setValue } = methods;
    const [topicsLoaded, setTopicsLoaded] = useState(false);
    const [topics, setTopics] = useState([]);
    const topicId = queryParams.get('tId');
    const watchedTopics = watch('topics');
    const watchedSpecs = watch('specs');

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const data = await getTopicList();
                setTopics(data.topics);
                setLoading(false);
                setTopicsLoaded(true);
            } catch (error) {
                console.log('Failed to fetch topics:', error);
                dispatch(setMessage({ error: error.data.error }));
                setLoading(false);
            }
        };

        fetchTopics();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchedTopics]);

    useEffect(() => {
        if (topics && topics.length > 0 && topicId) {
            const desiredTopic = topics.find(t => t.id === parseInt(topicId, 10));
            if (desiredTopic) {
                setValue('topics', [desiredTopic]);
            } else {
                console.log(`No topic found with id ${topicId}`);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topicsLoaded, topicId]);


    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await flashcardSetCreate(data);
            setLoading(false)
            if (response && !response.error && response.success) {
                dispatch(setMessage({ success: "Set Created Successfully" }));
                navigate(`/collection/${response.flashcardSetId}`);
            }
        } catch (error) {
            const message = error.response.data.error;
            dispatch(setMessage({ error: message }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md">
            {loading ? (<Spinner />) : (
                <>
                    <Typography variant="h4" gutterBottom>
                        Create New Flashcard Set
                    </Typography>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <TextField
                                fullWidth
                                label="Flashcard Set Name"
                                {...register("name", { required: "Name is required" })}
                                sx={{ mb: 3 }}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                margin="normal"
                            />

                            <Controller
                                name="topics"
                                control={control}
                                rules={{ required: "Topics are required" }}
                                render={({ field: { onChange, value } }) => (
                                    <Autocomplete
                                        multiple
                                        options={topics.filter(topic => !value.some(v => v.id === topic.id))}
                                        value={value || []}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Select Topics"
                                                error={!!errors.topics}
                                                helperText={errors.topics?.message}
                                                sx={{ mb: 3 }}
                                                margin="normal"
                                            />
                                        )}
                                        renderTags={(value, getTagProps) =>
                                            value.map((option, index) => {
                                                const { key, ...otherProps } = getTagProps({ index });
                                                return <Chip key={key} label={option.name} {...otherProps} />;
                                            })
                                        }
                                        onChange={(_, newValue) => {
                                            onChange(newValue);
                                            if (newValue.length > 0) {
                                                clearErrors("topics");
                                            }
                                        }}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                    />
                                )}
                            />

                            <TextField
                                fullWidth
                                multiline
                                minRows={1}
                                maxRows={6}
                                label="AI Specification"
                                {...register("specs")}
                                sx={{ mb: 3 }}
                                error={!!errors.specs}
                                helperText={errors.specs?.message}
                                margin="normal"
                            />

                            <ErrorBoundary>
                                <FlashcardTable topics={watchedTopics} specs={watchedSpecs} />
                            </ErrorBoundary>
                            <Box mt={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Button size="large" type="submit" variant="contained" color="primary">
                                    Save Flashcard Set
                                </Button>
                            </Box>
                        </form>
                    </FormProvider>
                </>
            )
            }
        </Container>
    );
}
