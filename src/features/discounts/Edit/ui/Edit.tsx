import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { skipToken } from '@reduxjs/toolkit/query'
import { discountsApi } from '@entities/discounts'
import {
    Box,
    Button,
    TextField,
    Typography,
    Header,
    CircularProgress,
    FormControlLabel,
    Switch,
} from '@shared/ui'
import { Root, FormContainer, ButtonContainer } from './styled'
import { supabase } from '@shared/api/supabase'

interface FormValues {
    discount_percent: number
    label: string
    is_active: boolean
}

export const Edit = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [userDisplay, setUserDisplay] = useState<string>('Loading...')

    const { data: discount, isLoading: isFetching } = discountsApi.useGetDiscountByIdQuery(
        id ? { id } : skipToken
    )
    const [updateDiscount, { isLoading: isUpdating }] = discountsApi.useUpdateDiscountMutation()

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { isValid, isDirty },
    } = useForm<FormValues>({
        defaultValues: {
            discount_percent: 10,
            label: '',
            is_active: true,
        },
        mode: 'onChange',
    })

    useEffect(() => {
        if (discount) {
            reset({
                discount_percent: discount.discount_percent,
                label: discount.label || '',
                is_active: discount.is_active,
            })

            // Fetch user info for display purposes
            const fetchUser = async () => {
                const { data } = await supabase
                    .from('profiles')
                    .select('email, display_name')
                    .eq('id', discount.user_id)
                    .single()

                if (data) {
                    setUserDisplay(data.email || data.display_name || discount.user_id)
                } else {
                    setUserDisplay(discount.user_id)
                }
            }
            fetchUser()
        }
    }, [discount, reset])

    const onSubmit = async (data: FormValues) => {
        if (!id) return

        try {
            await updateDiscount({
                id,
                discount_percent: Number(data.discount_percent),
                label: data.label,
                is_active: data.is_active,
            }).unwrap()

            navigate(`/discounts`)
        } catch (error) {
            console.error('Failed to update discount:', error)
        }
    }

    if (isFetching || !discount) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Box display="flex" flexDirection="column" height="100%" width="100%">
            <Header title={`Edit Discount`} />
            <Root>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    display="flex"
                    flexDirection="column"
                    height="100%"
                >
                    <FormContainer>
                        <Typography sx={{ fontSize: 18, fontWeight: 600, color: '#f1f5f9' }}>
                            Discount details
                        </Typography>

                        <TextField
                            label="Customer"
                            value={userDisplay}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#1e293b',
                                },
                            }}
                        />

                        <Controller
                            name="discount_percent"
                            control={control}
                            rules={{
                                required: 'Discount percentage is required',
                                min: { value: 1, message: 'Minimum is 1%' },
                                max: { value: 100, message: 'Maximum is 100%' },
                            }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    type="number"
                                    label="Discount Percentage *"
                                    error={!!error}
                                    helperText={error?.message}
                                    fullWidth
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: '#1e293b',
                                        },
                                    }}
                                />
                            )}
                        />

                        <Controller
                            name="label"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label="Label (optonal)"
                                    placeholder="e.g. VIP, Regular, Staff"
                                    error={!!error}
                                    helperText={error?.message}
                                    fullWidth
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: '#1e293b',
                                        },
                                    }}
                                />
                            )}
                        />

                        <Controller
                            name="is_active"
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={field.value}
                                            onChange={(e) => field.onChange(e.target.checked)}
                                        />
                                    }
                                    label="Active"
                                    sx={{ color: '#f1f5f9' }}
                                />
                            )}
                        />

                        <Box display="flex" gap={1} flexWrap="wrap">
                            {[5, 10, 15, 20].map((preset) => (
                                <Button
                                    key={preset}
                                    variant="outlined"
                                    size="small"
                                    onClick={() => setValue('discount_percent', preset, { shouldValidate: true, shouldDirty: true })}
                                    sx={{ minWidth: 'auto' }}
                                >
                                    {preset}%
                                </Button>
                            ))}
                        </Box>

                    </FormContainer>

                    <ButtonContainer>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!isValid || !isDirty || isUpdating}
                            sx={{ minWidth: 120 }}
                        >
                            {isUpdating ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/discounts')}
                        >
                            Cancel
                        </Button>
                    </ButtonContainer>
                </Box>
            </Root>
        </Box>
    )
}
