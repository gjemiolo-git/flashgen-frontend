import React from 'react';
import {
    Typography,
    Button,
    Container,
    useMediaQuery,
    useTheme,
    Box,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FlashOnIcon from '@mui/icons-material/FlashOn';

export default function Home() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 64px - 100px)', // Subtracting AppBar height and approximate footer height
                textAlign: 'center',
                py: 4,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <FlashOnIcon sx={{ fontSize: 40, mr: 1 }} color="primary" />
                <Typography variant={isMobile ? "h3" : "h2"} component="h1">
                    FlashGen
                </Typography>
            </Box>
            <Typography variant={isMobile ? "h6" : "h5"} component="h2" gutterBottom>
                Generate Smart Flashcards in Seconds
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ maxWidth: '600px', mb: 4 }}>
                FlashGen uses advanced AI to create personalized flashcards for any topic.
                Boost your learning efficiency, retain information better, and ace your exams with ease.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    component={RouterLink}
                    to="/register"
                    size="large"
                >
                    Get Started
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    component={RouterLink}
                    to="/demo"
                    size="large"
                >
                    Try Demo
                </Button>
            </Box>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Why FlashGen?
                </Typography>
                <Typography variant="body2" paragraph>
                    • AI-powered card generation for any subject
                </Typography>
                <Typography variant="body2" paragraph>
                    • Customizable difficulty levels
                </Typography>
                <Typography variant="body2" paragraph>
                    • Track your progress and focus on weak areas
                </Typography>
                <Typography variant="body2">
                    • Seamless integration with popular learning platforms
                </Typography>
            </Box>
        </Container>
    );
}
