import {
    Typography,
    Button,
    Container,
    useMediaQuery,
    useTheme,
    Box,
    Paper
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link as RouterLink } from 'react-router-dom';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import SchoolIcon from '@mui/icons-material/School';
import TimelineIcon from '@mui/icons-material/Timeline';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import InteractiveDemo from '../static/InteractiveDemo';

function Home() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={3} sx={{
                        minHeight: 500,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 2
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <FlashOnIcon sx={{ fontSize: 40, mr: 1 }} color="primary" />
                            <Typography variant={isMobile ? "h3" : "h2"} component="h1">
                                {process.env.REACT_APP_NAME}
                            </Typography>
                        </Box>
                        <Typography variant={isMobile ? "h6" : "h5"} component="h2" gutterBottom>
                            Generate Smart Flashcards in Seconds
                        </Typography>
                        <Typography variant="body1" gutterBottom sx={{ mb: 4 }}>
                            {process.env.REACT_APP_NAME} uses advanced AI to create personalized flashcards for any topic.
                            Boost your learning efficiency, retain information better, and ace your exams with ease.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
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
                                to="/library"
                                size="large"
                            >
                                Full Demo
                            </Button>
                        </Box>
                        <Typography variant="h6" gutterBottom>
                            Why {process.env.REACT_APP_NAME}?
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <SchoolIcon sx={{ mr: 1 }} color="primary" />
                            <Typography variant="body2">
                                AI-powered card generation for any subject
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <TimelineIcon sx={{ mr: 1 }} color="primary" />
                            <Typography variant="body2">
                                Track your progress and focus on weak areas
                            </Typography>
                        </Box>
                        <Box sx={{
                            display:
                                'flex', alignItems: 'center', mb: 1
                        }}>
                            <EmojiObjectsIcon sx={{ mr: 1 }} color="primary" />
                            <Typography variant="body2">
                                Customizable difficulty levels for optimal learning
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper
                        elevation={3}
                        sx={{
                            minHeight: 500,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            p: 2
                        }}
                    >
                        <Typography variant="h5" gutterBottom>
                            Interactive Demo
                        </Typography>
                        <Box sx={{ width: '100%', height: '100%', }}>
                            <InteractiveDemo />
                        </Box>
                        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                            Explore our interactive demo to see the power of LLM-assisted learning in action.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Home;  