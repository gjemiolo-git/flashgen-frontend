import React, { useRef, useEffect, useState } from 'react';
import { Paper, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const FlashCard = styled(Paper)(({ theme }) => ({
    perspective: '1000px',
    transition: 'transform 0.5s',
    transformStyle: 'preserve-3d',
    position: 'relative',
    width: '100%',
    height: '100%',
    minHeight: '150px',
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    boxShadow: theme.palette.mode === 'dark'
        ? '0 0 15px rgba(255, 255, 255, 0.1)'
        : '0 0 15px rgba(0, 0, 0, 0.1)',
}));

const CardSide = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
}));

const CardFront = styled(CardSide)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark'
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
}));

const CardBack = styled(CardSide)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark'
        ? theme.palette.secondary.dark
        : theme.palette.secondary.light,
    transform: 'rotateY(180deg)',
}));

const CardContent = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    wordBreak: 'break-word',
    fontWeight: 600,
    color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
    textShadow: theme.palette.mode === 'dark'
        ? '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
        : '-1px -1px 0 #FFF, 1px -1px 0 #FFF, -1px 1px 0 #FFF, 1px 1px 0 #FFF',
    maxWidth: '90%',
    maxHeight: '90%',
    overflowY: 'auto',
    padding: theme.spacing(2),
}));

const IconWrapper = styled(Box)(({ theme, position }) => ({
    position: 'absolute',
    color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
    ...(position === 'topLeft' && { top: '2%', left: '2%' }),
    ...(position === 'topRight' && { top: '2%', right: '2%' }),
    ...(position === 'bottomLeft' && { bottom: '2%', left: '2%' }),
    ...(position === 'bottomRight' && { bottom: '2%', right: '2%' }),
    opacity: 0.6,
    fontSize: 'clamp(16px, 3vw, 24px)',  // Responsive icon size
}));

function Flashcard({ question, answer, isFlipped, onFlip, containerHeight }) {
    const cardRef = useRef(null);
    const frontContentRef = useRef(null);
    const backContentRef = useRef(null);
    const [aspectRatio, setAspectRatio] = useState(1.5);
    const [fontSize, setFontSize] = useState('16px');

    useEffect(() => {
        const updateSizes = () => {
            if (cardRef.current && frontContentRef.current && backContentRef.current) {
                const cardWidth = cardRef.current.offsetWidth;
                const cardHeight = cardRef.current.offsetHeight;
                setAspectRatio(cardWidth / cardHeight);

                const frontLength = question.length;
                const backLength = answer.length;
                const maxLength = Math.max(frontLength, backLength);

                // Adjust card size based on content length
                const baseSize = Math.sqrt(maxLength) * 10; // Adjust this multiplier as needed*
                const newHeight = Math.max(cardHeight, baseSize);
                cardRef.current.style.height = `${newHeight}px`;

                // Calculate font size based on card dimensions and content length
                const newFontSize = Math.min(
                    cardWidth / Math.sqrt(maxLength),
                    newHeight / Math.sqrt(maxLength),
                    32 // Maximum font size
                );
                setFontSize(`${newFontSize}px`);
            }
        };

        updateSizes();
        window.addEventListener('resize', updateSizes);
        return () => window.removeEventListener('resize', updateSizes);
    }, [question, answer, containerHeight]);

    return (
        <FlashCard
            ref={cardRef}
            onClick={onFlip}
            sx={{
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                aspectRatio: aspectRatio,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '90%',
                maxHeight: '90%',
            }}
        >
            <CardFront>
                <IconWrapper position="topLeft"><QuestionMarkIcon /></IconWrapper>
                <IconWrapper position="topRight"><SchoolIcon /></IconWrapper>
                <IconWrapper position="bottomLeft"><MenuBookIcon /></IconWrapper>
                <IconWrapper position="bottomRight"><QuestionMarkIcon /></IconWrapper>
                <CardContent ref={frontContentRef} style={{ fontSize }}>{question}</CardContent>
            </CardFront>
            <CardBack>
                <IconWrapper position="topLeft"><LightbulbIcon /></IconWrapper>
                <IconWrapper position="topRight"><SchoolIcon /></IconWrapper>
                <IconWrapper position="bottomLeft"><MenuBookIcon /></IconWrapper>
                <IconWrapper position="bottomRight"><LightbulbIcon /></IconWrapper>
                <CardContent ref={backContentRef} style={{ fontSize }}>{answer}</CardContent>
            </CardBack>
        </FlashCard>
    );
}

export default Flashcard;
