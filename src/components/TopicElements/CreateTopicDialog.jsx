import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const CreateTopicDialog = ({ open, onClose, onCreateTopic }) => {
    const [topicName, setTopicName] = useState('');

    const handleCreate = () => {
        if (topicName.trim()) {
            onCreateTopic(topicName);
            setTopicName('');
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Create New Topic</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="topicName"
                    label="Topic Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={topicName}
                    onChange={(e) => setTopicName(e.target.value)}
                    multiline
                    rows={3}
                    sx={{ my: 2 }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleCreate} variant="contained">Create</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateTopicDialog;
