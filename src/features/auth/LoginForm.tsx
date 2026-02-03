import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '@shared/lib'
import { signInThunk, selectAuthLoading, selectAuthError } from '@entities/session'
import { Button, TextField, Box, CircularProgress, Typography } from '@shared/ui'

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 400px;
`

const ErrorText = styled.div`
  color: #ef4444;
  font-size: 14px;
  text-align: center;
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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>()

    const onSubmit = async (data: LoginFormData) => {
        const result = await dispatch(signInThunk(data))
        if (signInThunk.fulfilled.match(result)) {
            navigate('/categories')
        }
    }

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#f1f5f9' }}>
                    🍺 Taproom Admin
                </Typography>
                <Typography sx={{ color: '#9ca3af', mt: 1 }}>
                    Sign in to manage your menu
                </Typography>
            </Box>

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
        </FormContainer>
    )
}
