import React, { useState, useRef, useEffect } from 'react';
import {
    Container,
    Typography,
    Button,
    Box,
    useTheme,
    List,
    ListItem,
    ListItemButton,
    ListItemText
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FlipIcon from '@mui/icons-material/Flip';
import Flashcard from './Flashcard';

const StudyDashboard = ({ flashcardSet }) => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const theme = useTheme();
    const containerRef = useRef(null);
    const [containerHeight, setContainerHeight] = useState(0);
    const updateUrl = `/collection/${flashcardSet.id}/update`;

    useEffect(() => {
        const updateHeight = () => {
            if (containerRef.current) {
                setContainerHeight(containerRef.current.offsetHeight);
            }
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    const handleNextCard = () => {
        if (currentCardIndex < flashcardSet.flashcards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
            setIsFlipped(false);
        }
    };

    const handlePreviousCard = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex(currentCardIndex - 1);
            setIsFlipped(false);
        }
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleCardSelect = (index) => {
        setCurrentCardIndex(index);
        setIsFlipped(false);
    };

    const currentCard = flashcardSet.flashcards[currentCardIndex];

    const NavigationButtons = () => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
            <Button
                variant="contained"
                startIcon={<ArrowBackIcon />}
                onClick={handlePreviousCard}
                disabled={currentCardIndex === 0}
                sx={{ bgcolor: theme.palette.primary.main }}
            >
                Previous
            </Button>
            <Button
                variant="contained"
                onClick={handleFlip}
                startIcon={<FlipIcon />}
                sx={{ bgcolor: theme.palette.secondary.main }}
            >
                Flip
            </Button>
            <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={handleNextCard}
                disabled={currentCardIndex === flashcardSet.flashcards.length - 1}
                sx={{ bgcolor: theme.palette.primary.main }}
            >
                Next
            </Button>
        </Box>
    );

    return (
        <Container ref={containerRef} maxWidth="lg" sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
                <Box sx={{ width: '25%', overflowY: 'auto', pr: 2, borderRight: 1, borderColor: 'divider' }}>
                    <List>
                        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', my: 3 }}>
                            {flashcardSet.name}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center', my: 1 }}>
                            {flashcardSet.topics[0].name}
                        </Typography>
                        {flashcardSet.flashcards.map((card, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton
                                    selected={currentCardIndex === index}
                                    onClick={() => handleCardSelect(index)}
                                >
                                    <ListItemText primary={`Card ${index + 1}`} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box sx={{ width: '75%', display: 'flex', flexDirection: 'column', pl: 2, overflow: 'hidden' }}>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', my: 3 }}>
                        {flashcardSet.name}
                    </Typography>
                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
                        {flashcardSet.topics[0].name}
                    </Typography>
                    {flashcardSet.isCreator && (
                        <Button variant="outlined" color="info" component={Link} to={updateUrl}>
                            Edit
                        </Button>
                    )}
                    <NavigationButtons />
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        <Flashcard
                            question={currentCard.frontContent}
                            answer={currentCard.backContent}
                            isFlipped={isFlipped}
                            onFlip={handleFlip}
                            containerHeight={containerHeight}
                        />
                    </Box>
                    <NavigationButtons />
                    <Typography variant="body2" sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
                        Card {currentCardIndex + 1} of {flashcardSet.flashcards.length}
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default StudyDashboard;
