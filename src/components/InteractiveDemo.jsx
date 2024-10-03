import React, { useState } from 'react';
import {
    Typography,
    Button,
    TextField,
    Paper,
} from '@mui/material';

import Flashcard from './Flashcard';

function InteractiveDemo() {
    const [topic, setTopic] = useState('');
    const [demoCards, setDemoCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState({});

    const handleTopicChange = (event) => {
        setTopic(event.target.value);
    };

    const handleGenerateDemo = () => {
        const fakeDemoCards = [
            { question: `Why is ${topic} important?`, answer: `${topic} is crucial for understanding related concepts.` }
        ];
        setDemoCards(fakeDemoCards);
        setFlippedCards({});
    };

    const handleCardFlip = (index) => {
        setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Try a Quick Demo
            </Typography
            >
            <TextField
                fullWidth
                label="Enter a topic"
                variant="outlined"
                value={topic}
                onChange={handleTopicChange}
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleGenerateDemo}
                disabled={!topic}
                sx={{ mb: 2 }}
            >
                Generate Demo Cards
            </Button>
            {demoCards.map((card, index) => (
                <Flashcard
                    key={index}
                    question={card.question}
                    answer={card.answer}
                    isFlipped={flippedCards[index]}
                    onFlip={() => handleCardFlip(index)}
                />
            ))}
        </Paper>
    );
}

export default InteractiveDemo;
