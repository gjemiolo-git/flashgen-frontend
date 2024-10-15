import React, { useState, useEffect, useRef } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { getTopicList, updateSet } from '../../api/all.js';
import {
    Autocomplete, Container, Typography, Box, TextField, Chip, Button,
} from '@mui/material';
import { FlashcardTable } from '../FlashcardTable/FlashcardTable.jsx';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../redux/slices/authSlice';
import Spinner from '../layout/Spinner.jsx';
import ErrorBoundary from './ErrorBoundary';
import { useNavigate, useParams } from 'react-router-dom';
import { getStudyView } from '../../api/all';

export default function Update() {
    const methods = useForm({
        defaultValues: {
            name: '',
            topics: [],
            flashcards: []
        }
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { control, formState: { errors }, clearErrors, watch, setValue } = methods;
    // eslint-disable-next-line
    const [flashcardSet, setFlashcardSet] = useState(null);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const specsRef = useRef(null);
    const watchedTopics = watch('topics');
    const watchedSpecs = watch('specs');

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const data = await getTopicList(1, 300);
                setTopics(data.topics);
                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch topics:', error);
                dispatch(setMessage({ error: error.data.error }));
                setLoading(false);
            }
        };

        fetchTopics();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchedTopics,]);

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const response = await getStudyView(id);
                const data = await getTopicList();
                setFlashcardSet(response);
                setTopics(data.topics);

                // Update form values
                setValue('name', response.name);
                setValue('topics', response.topics);
                setValue('flashcards', response.flashcards);

                if (specsRef.current) {
                    specsRef.current.focus();
                }

                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch data:', error);
                dispatch(setMessage({ error: error.data.error }));
                setLoading(false);
            }
        };

        fetchForm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await updateSet(id, data);
            if (response && !response.error && response.success) {
                dispatch(setMessage({ success: "Set Updated Successfully" }));
                navigate(`/collection/${response.flashcardSetId}`);
            }
        } catch (error) {
            const message = error.response.data.error;
            dispatch(setMessage({ error: message }));
        } finally {
            setLoading(false);
            navigate(`/collection/${id}`);
        }
    };

    return (
        <Container maxWidth="md">
            {loading ? (<Spinner />) : (
                <>
                    <Typography variant="h4" gutterBottom>
                        Update Flashcard Set
                    </Typography>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: "Name is required" }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Flashcard Set Name"
                                        error={!!error}
                                        helperText={error?.message}
                                        sx={{ mb: 3 }}
                                        margin="normal"
                                    />
                                )}
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

                            <Controller
                                name="specs"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        inputRef={specsRef}
                                        fullWidth
                                        multiline
                                        minRows={1}
                                        maxRows={6}
                                        label="AI Specification"
                                        error={!!error}
                                        helperText={error?.message}
                                        sx={{ mb: 3 }}
                                        margin="normal"
                                    />
                                )}
                            />

                            <ErrorBoundary>
                                <FlashcardTable topics={watchedTopics} specs={watchedSpecs} />
                            </ErrorBoundary>
                            <Box mt={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Button size="large" type="submit" variant="contained" color="primary">
                                    Update Flashcard Set
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
