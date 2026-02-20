import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { discountsApi } from '@entities/discounts'
import { selectUser } from '@entities/session'
import { supabase } from '@shared/api/supabase'
import { Autocomplete, Box, Button, TextField, Typography, Header } from '@shared/ui'
import MenuItem from '@mui/material/MenuItem'
import { Root, FormContainer, ButtonContainer } from './styled'

interface FormValues {
    user_id: string
    discount_percent: number
    label: string
}

interface UserOption {
    id: string
    display_name: string | null
    phone: string | null
}

export const Create = () => {
    const navigate = useNavigate()
    const [createDiscount, { isLoading }] = discountsApi.useCreateDiscountMutation()
    const user = useSelector(selectUser)
    const [userOptions, setUserOptions] = useState<UserOption[]>([])
    const [searchUserQuery, setSearchUserQuery] = useState('')
    const [isSearching, setIsSearching] = useState(false)

    const {
        control,
        handleSubmit,
        setValue,
        formState: { isValid },
    } = useForm<FormValues>({
        defaultValues: {
            user_id: '',
            discount_percent: 10,
            label: '',
        },
        mode: 'onChange',
    })

    useEffect(() => {
        const fetchUsers = async () => {
            setIsSearching(true)
            try {
                let query = supabase.from('profiles').select('id, phone, display_name').limit(20)

                if (searchUserQuery) {
                    query = query.or(`phone.ilike.%${searchUserQuery}%,display_name.ilike.%${searchUserQuery}%`)
                }

                const { data, error } = await query
                if (!error && data) {
                    setUserOptions(data as UserOption[])
                }
            } catch (error) {
                console.error('Failed to search users:', error)
            } finally {
                setIsSearching(false)
            }
        }

        const timer = setTimeout(fetchUsers, 300)
        return () => clearTimeout(timer)
    }, [searchUserQuery])

    const onSubmit = async (data: FormValues) => {
        if (!user?.id) return

        try {
            await createDiscount({
                user_id: data.user_id,
                organization_id: 'dbd4b576-8e6b-474f-b04e-a983b414fa5f',
                discount_percent: Number(data.discount_percent),
                label: data.label,
                is_active: true,
            }).unwrap()

            navigate('/discounts')
        } catch (error) {
            console.error('Failed to create discount:', error)
        }
    }

    return (
        <Box display="flex" flexDirection="column" height="100%" width="100%">
            <Header title="Add Discount" />
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

                        <Controller
                            name="user_id"
                            control={control}
                            rules={{ required: 'User is required' }}
                            render={({ field }) => {
                                const selectedOption = userOptions.find(u => u.id === field.value) || null

                                return (
                                    <Autocomplete
                                        options={userOptions}
                                        value={selectedOption}
                                        loading={isSearching}
                                        onInputChange={(_, value) => setSearchUserQuery(value)}
                                        onChange={(_, newValue: UserOption | null) => {
                                            field.onChange(newValue?.id || '')
                                        }}
                                        getOptionLabel={(option) => option.display_name || option.phone || option.id}
                                        label="Customer (Search by name/phone) *"
                                        isOptionEqualToValue={(option, val) => option.id === val.id}
                                        renderOption={(props, option) => (
                                            <MenuItem {...props} key={option.id}>
                                                <Box>
                                                    <Typography variant="body1">{option.display_name || 'No Name'}</Typography>
                                                    {option.phone && (
                                                        <Typography variant="body2" color="text.secondary">
                                                            {option.phone}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </MenuItem>
                                        )}
                                    />
                                )
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

                        <Box display="flex" gap={1} flexWrap="wrap">
                            {[5, 10, 15, 20].map((preset) => (
                                <Button
                                    key={preset}
                                    variant="outlined"
                                    size="small"
                                    onClick={() => setValue('discount_percent', preset, { shouldValidate: true })}
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
                            disabled={!isValid || isLoading}
                            sx={{ minWidth: 120 }}
                        >
                            {isLoading ? 'Creating...' : 'Create'}
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
