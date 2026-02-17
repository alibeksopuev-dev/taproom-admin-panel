import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '@shared/lib'
import { signInThunk, selectAuthLoading, selectAuthError } from '@entities/session'
import { authApi } from '@entities/session/api'
import { Button, TextField, Box, CircularProgress, Typography } from '@shared/ui'

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width:100%;
  min-width: 300px;
`

const ErrorText = styled.div`
  color: #ef4444;
  font-size: 14px;
  text-align: center;
`

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #6b7280;
  font-size: 13px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #374151;
  }
`

interface LoginFormData {
    email: string
    password: string
}

export const LoginForm = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const loading = useAppSelector(selectAuthLoading)
    const error = useAppSelector(selectAuthError)
    const [googleLoading, setGoogleLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>()

    const onSubmit = async (data: LoginFormData) => {
        const result = await dispatch(signInThunk(data))
        if (signInThunk.fulfilled.match(result)) {
            navigate('/menu-categories')
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            setGoogleLoading(true)
            await authApi.signInWithGoogle()
        } catch {
            setGoogleLoading(false)
        }
    }

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#f1f5f9' }}>
                    Menu Admin
                </Typography>
                <Typography sx={{ color: '#9ca3af', mt: 1 }}>
                    Sign in to manage your menu
                </Typography>
            </Box>

            {/* Email/password */}
            <TextField
                label="Email"
                type="email"
                fullWidth
                {...register('email', {
                    required: 'Email is required',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                    },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={loading}
            />

            <TextField
                label="Password"
                type="password"
                fullWidth
                {...register('password', {
                    required: 'Password is required',
                    minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                    },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                disabled={loading}
            />

            {error && <ErrorText>{error}</ErrorText>}

            <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{ py: 1.5 }}
            >
                {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>

            <Divider>or</Divider>

            {/* Google OAuth */}
            <Button
                type="button"
                variant="outlined"
                fullWidth
                disabled={googleLoading || loading}
                onClick={handleGoogleSignIn}
                sx={{
                    py: 1.5,
                    borderColor: '#374151',
                    color: '#e2e8f0',
                    textTransform: 'none',
                    fontSize: 15,
                    fontWeight: 500,
                    '&:hover': { borderColor: '#4b5563', bgcolor: '#1f293740' },
                }}
                startIcon={
                    googleLoading ? (
                        <CircularProgress size={20} />
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                    )
                }
            >
                Sign in with Google
            </Button>
        </FormContainer>
    )
}

