import { Container, Box, Paper, CircularProgress, Typography } from '@mui/material';
export default function Spinner() {
    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h5">
                        Loading...
                    </Typography>
                    <CircularProgress />
                </Box>
            </Paper>
        </Container>
    )
}