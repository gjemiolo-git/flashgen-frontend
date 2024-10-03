import React from 'react';
import { Typography } from '@mui/material';
import BoxedText from '../layout/BoxedText';

function About() {

    return (
        <BoxedText>
            <Typography variant="h4" gutterBottom color="primary">
                About {process.env.REACT_APP_NAME}
            </Typography>
            <Typography component="p" sx={{ mb: 2 }}>
                {process.env.REACT_APP_NAME} is a cutting-edge application designed to revolutionize the way you learn and memorize information. Our mission is to make learning faster, more efficient, and more enjoyable for students, professionals, and lifelong learners alike.
            </Typography>
            <Typography component="p" sx={{ mb: 2 }}>
                Using advanced AI technology, {process.env.REACT_APP_NAME} creates smart flashcards tailored to your learning needs. Whether you're studying for an exam, learning a new language, or expanding your professional knowledge, {process.env.REACT_APP_NAME} is here to help you achieve your goals.
            </Typography>
            <Typography component="p" sx={{ mb: 2 }}>
                Our team of dedicated developers and education experts are constantly working to improve {process.env.REACT_APP_NAME}, ensuring that you have access to the most effective learning tools available.
            </Typography>
            <Typography component="p" sx={{ mb: 2 }}>
                Thank you for choosing {process.env.REACT_APP_NAME}. We're excited to be part of your learning journey!
            </Typography>
        </BoxedText>
    );
}

export default About;
