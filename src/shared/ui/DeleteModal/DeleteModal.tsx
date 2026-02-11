import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material'
import { Button } from '@shared/ui'

interface DeleteModalProps {
    open: boolean
    onClose: () => void
    entityName: string
    onConfirm: () => void
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ open, onClose, entityName, onConfirm }) => {
    const handleConfirm = () => {
        onConfirm()
        onClose()
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    borderRadius: '16px',
                    padding: '8px',
                    width: '400px',
                },
            }}
        >
            <DialogTitle sx={{ padding: '16px 24px 8px 24px' }}>
                <Typography
                    variant='h6'
                    component='h2'
                    sx={{ fontWeight: 600 }}
                >
                    Delete {entityName}
                </Typography>
            </DialogTitle>
            <DialogContent sx={{ padding: '8px 24px' }}>
                <Typography variant='body1'>Are you sure to delete this {entityName.toLowerCase()}?</Typography>
            </DialogContent>
            <DialogActions sx={{ padding: '8px 24px 16px 24px', gap: '12px' }}>
                <Button
                    onClick={onClose}
                    variant='outlined'
                    size='medium'
                    sx={{ minWidth: '80px' }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirm}
                    variant='contained'
                    size='medium'
                    color='error'
                    sx={{ minWidth: '120px' }}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}
