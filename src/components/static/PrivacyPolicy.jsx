import React from 'react';
import { Typography } from '@mui/material';
import BoxedText from '../layout/BoxedText';

function PrivacyPolicy() {
    return (
        <BoxedText>
            <Typography variant="h4" gutterBottom color="primary">
                Privacy Policy
            </Typography>
            <Typography component="p" sx={{ mb: 2 }}>
                Your privacy is important to us. It is {process.env.REACT_APP_NAME}'s policy to respect your privacy regarding any information we may collect from you across our website.
            </Typography>
            <Typography component="p" sx={{ mb: 2 }}>
                We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we're collecting it and how it will be used.
            </Typography>
            <Typography component="p" sx={{ mb: 2 }}>
                We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we'll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
            </Typography>
            <Typography component="p" sx={{ mb: 2 }}>
                We don't share any personally identifying information publicly or with third-parties, except when required to by law.
            </Typography>
        </BoxedText>
    );
}

export default PrivacyPolicy;
