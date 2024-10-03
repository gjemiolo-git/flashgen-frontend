import React from 'react';
import { Typography } from '@mui/material';
import BoxedText from '../layout/BoxedText';

function TermsOfService() {
    return (
        <BoxedText>
            <Typography variant="h4" gutterBottom color="primary">
                Terms of Service
            </Typography>
            <Typography component="p" sx={{ mb: 2 }}>
                By accessing the website for FlashGen, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
            </Typography>
            <Typography component="p" sx={{ mb: 2 }}>
                If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
            </Typography>
            <Typography component="p" sx={{ mb: 2 }}>
                The materials on FlashGen's website are provided on an 'as is' basis. FlashGen makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </Typography>
        </BoxedText>
    );
}

export default TermsOfService;
