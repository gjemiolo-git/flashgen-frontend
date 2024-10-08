import React, { useState, useEffect } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { getTopicList } from '../api/auth';
import {
    Autocomplete, Container, Typography, Box, TextField, Chip, Button,
} from '@mui/material';
import { FlashcardTable } from '../components/FlashcardTable';

export default function Create() {
    const methods = useForm({
        defaultValues: {
            name: '',
            topics: [],
            flashcards: []
        }
    });
    const { control, register, handleSubmit, formState: { errors }, setValue, clearErrors, watch } = methods;
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const data = await getTopicList();
                setTopics(data.topics);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch topics:', error);
                setLoading(false);
            }
        };

        fetchTopics();
    }, []);

    const onSubmit = (data) => {
        console.log({ payload: data });
        // Here you would typically send this data to your backend
    };

    return (
        <Container maxWidth="md">
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
                        label="Quiz Specification"
                        {...register("specs", { required: "Specification is required" })}
                        sx={{ mb: 3 }}
                        error={!!errors.specs}
                        helperText={errors.specs?.message}
                        margin="normal"
                    />

                    <FlashcardTable />
                    <Box mt={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Button size="large" type="submit" variant="contained" color="primary">
                            Save Flashcard Set
                        </Button>
                    </Box>
                </form>
            </FormProvider>
        </Container>
    );
}
