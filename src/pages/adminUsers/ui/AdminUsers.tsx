import { useState } from 'react'
import styled from 'styled-components'
import {
    Box,
    Typography,
    Button,
    IconButton,
    TextField,
    Select,
    MenuItem,
    Chip,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import {
    useGetAdminUsersQuery,
    useAddAdminUserMutation,
    useRemoveAdminUserMutation,
} from '@entities/adminUsers'
import type { AdminUserRole } from '@entities/adminUsers'

const Root = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px;
    border-bottom: 1px solid #1e293b;
`

const Content = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 0;
`

const UserRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    border-bottom: 1px solid #1e293b;
    &:hover {
        background-color: #1e293b;
    }
`

const SUPER_ADMIN_EMAIL = 'alibeksopuev@gmail.com'

export const AdminUsers = () => {
    const { data: users = [], isLoading } = useGetAdminUsersQuery()
    const [addUser] = useAddAdminUserMutation()
    const [removeUser] = useRemoveAdminUserMutation()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [email, setEmail] = useState('')
    const [role, setRole] = useState<AdminUserRole>('admin')
    const [displayName, setDisplayName] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleAdd = async () => {
        if (!email.trim()) return
        setIsSubmitting(true)
        try {
            await addUser({
                email: email.trim().toLowerCase(),
                role,
                display_name: displayName.trim() || undefined,
            }).unwrap()
            setDialogOpen(false)
            setEmail('')
            setRole('admin')
            setDisplayName('')
        } catch {
            alert('Failed to add user. They may already exist.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleRemove = async (id: string, userEmail: string) => {
        if (userEmail === SUPER_ADMIN_EMAIL) return
        if (!confirm(`Remove ${userEmail} from admin access?`)) return
        try {
            await removeUser({ id }).unwrap()
        } catch {
            alert('Failed to remove user.')
        }
    }

    if (isLoading) {
        return (
            <Root>
                <Box display="flex" justifyContent="center" alignItems="center" flex={1}>
                    <CircularProgress />
                </Box>
            </Root>
        )
    }

    return (
        <Root>
            <Header>
                <Typography variant="h6" sx={{ color: '#f1f5f9', fontWeight: 600 }}>
                    Admin Users
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<PersonAddIcon />}
                    onClick={() => setDialogOpen(true)}
                    sx={{
                        bgcolor: '#774CFF',
                        '&:hover': { bgcolor: '#6a3de8' },
                        textTransform: 'none',
                        fontWeight: 600,
                    }}
                >
                    Add User
                </Button>
            </Header>

            <Content>
                {users.map((user) => (
                    <UserRow key={user.id}>
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                <Typography sx={{ color: '#f1f5f9', fontWeight: 500 }}>
                                    {user.display_name || user.email}
                                </Typography>
                                <Chip
                                    label={user.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                                    size="small"
                                    sx={{
                                        bgcolor: user.role === 'super_admin' ? '#7c3aed' : '#334155',
                                        color: '#f1f5f9',
                                        fontSize: 11,
                                        fontWeight: 600,
                                    }}
                                />
                            </Box>
                            {user.display_name && (
                                <Typography sx={{ color: '#94a3b8', fontSize: 13 }}>
                                    {user.email}
                                </Typography>
                            )}
                            <Typography sx={{ color: '#64748b', fontSize: 12, mt: 0.5 }}>
                                Added {new Date(user.created_at).toLocaleDateString()}
                            </Typography>
                        </Box>
                        {user.email !== SUPER_ADMIN_EMAIL && (
                            <IconButton
                                onClick={() => handleRemove(user.id, user.email)}
                                sx={{ color: '#ef4444' }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </UserRow>
                ))}

                {users.length === 0 && (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                        <Typography sx={{ color: '#94a3b8' }}>
                            No admin users yet. Add one to get started.
                        </Typography>
                    </Box>
                )}
            </Content>

            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                PaperProps={{
                    sx: { bgcolor: '#1e293b', minWidth: 360 },
                }}
            >
                <DialogTitle sx={{ color: '#f1f5f9' }}>Add Admin User</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        required
                        type="email"
                        placeholder="partner@example.com"
                        sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#0f172a' } }}
                    />
                    <TextField
                        label="Display Name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        fullWidth
                        placeholder="Optional"
                        sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#0f172a' } }}
                    />
                    <Select
                        value={role}
                        onChange={(e) => setRole(e.target.value as AdminUserRole)}
                        fullWidth
                        sx={{ backgroundColor: '#0f172a' }}
                    >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="super_admin">Super Admin</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button
                        onClick={() => setDialogOpen(false)}
                        sx={{ color: '#94a3b8', textTransform: 'none' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAdd}
                        variant="contained"
                        disabled={!email.trim() || isSubmitting}
                        sx={{
                            bgcolor: '#774CFF',
                            '&:hover': { bgcolor: '#6a3de8' },
                            textTransform: 'none',
                            fontWeight: 600,
                        }}
                    >
                        {isSubmitting ? <CircularProgress size={20} /> : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Root>
    )
}
