import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const FlashCard = styled(Paper)(({ theme }) => ({
    perspective: '1000px',
    transition: 'transform 0.6s',
    transformStyle: 'preserve-3d',
    position: 'relative',
    width: '100%',
    height: '150px',
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    boxShadow: theme.palette.mode === 'dark'
        ? '0 0 15px rgba(255, 255, 255, 0.1)'
        : '0 0 15px rgba(0, 0, 0, 0.1)',
}));

const CardSide = styled(Box)(({ theme }) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    overflow: 'auto',
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
    fontSize: 'clamp(14px, 4vw, 24px)',
    textAlign: 'center',
    wordBreak: 'break-word',
    fontWeight: 600,
    color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
    textShadow: theme.palette.mode === 'dark'
        ? '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
        : '-1px -1px 0 #FFF, 1px -1px 0 #FFF, -1px 1px 0 #FFF, 1px 1px 0 #FFF',
}));

const IconWrapper = styled(Box)(({ theme, position }) => ({
    position: 'absolute',
    color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
    ...(position === 'topLeft' && { top: theme.spacing(2), left: theme.spacing(2) }),
    ...(position === 'topRight' && { top: theme.spacing(2), right: theme.spacing(2) }),
    ...(position === 'bottomLeft' && { bottom: theme.spacing(2), left: theme.spacing(2) }),
    ...(position === 'bottomRight' && { bottom: theme.spacing(2), right: theme.spacing(2) }),
    opacity: 0.6,
}));

function Flashcard({ question, answer, isFlipped, onFlip }) {
    return (
        <FlashCard
            onClick={onFlip}
            sx={{
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
        >
            <CardFront>
                <IconWrapper position="topLeft"><QuestionMarkIcon fontSize="small" /></IconWrapper>
                <IconWrapper position="topRight"><SchoolIcon fontSize="small" /></IconWrapper>
                <IconWrapper position="bottomLeft"><MenuBookIcon fontSize="small" /></IconWrapper>
                <IconWrapper position="bottomRight"><QuestionMarkIcon fontSize="small" /></IconWrapper>
                <CardContent>{question}</CardContent>
            </CardFront>
            <CardBack>
                <IconWrapper position="topLeft"><LightbulbIcon fontSize="small" /></IconWrapper>
                <IconWrapper position="topRight"><SchoolIcon fontSize="small" /></IconWrapper>
                <IconWrapper position="bottomLeft"><MenuBookIcon fontSize="small" /></IconWrapper>
                <IconWrapper position="bottomRight"><LightbulbIcon fontSize="small" /></IconWrapper>
                <CardContent>{answer}</CardContent>
            </CardBack>
        </FlashCard>
    );
}

export default Flashcard;