import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { organizationsApi } from '@entities/organizations'
import {
    Box,
    Button,
    TextField,
    Typography,
    Header,
    FormControlLabel,
    Switch,
    CircularProgress,
} from '@shared/ui'
import { Root, FormContainer, ButtonContainer, Section, ColorPickerRow, ColorPreview } from './styled'

interface FormValues {
    name: string
    slug: string
    email: string
    phone_number: string
    address: string
    logo_url: string
    primary_color: string
    is_disabled: boolean
}

export const Edit = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const { data: organization, isLoading: isFetching } = organizationsApi.useGetOrganizationByIdQuery(
        { id: id! },
        { skip: !id }
    )
    const [updateOrganization, { isLoading: isUpdating }] = organizationsApi.useUpdateOrganizationMutation()

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { isValid, isDirty },
    } = useForm<FormValues>({
        defaultValues: {
            name: '',
            slug: '',
            email: '',
            phone_number: '',
            address: '',
            logo_url: '',
            primary_color: '#3b82f6',
            is_disabled: false,
        },
        mode: 'onChange',
    })

    const primaryColor = watch('primary_color')

    useEffect(() => {
        if (organization) {
            reset({
                name: organization.name,
                slug: organization.slug,
                email: organization.email ?? '',
                phone_number: organization.phone_number ?? '',
                address: organization.address ?? '',
                logo_url: organization.logo_url ?? '',
                primary_color: organization.primary_color,
                is_disabled: organization.is_disabled,
            })
        }
    }, [organization, reset])

    const onSubmit = async (data: FormValues) => {
        if (!id) return

        try {
            await updateOrganization({
                id,
                data: {
                    name: data.name,
                    slug: data.slug,
                    email: data.email || null,
                    phone_number: data.phone_number || null,
                    address: data.address || null,
                    logo_url: data.logo_url || null,
                    primary_color: data.primary_color,
                    is_disabled: data.is_disabled,
                },
            }).unwrap()

            navigate(`/organizations/${id}`)
        } catch (error) {
            console.error('Failed to update organization:', error)
        }
    }

    if (isFetching) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
            </Box>
        )
    }

    if (!organization) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Typography color="error">Organization not found</Typography>
            </Box>
        )
    }

    return (
        <Box display="flex" flexDirection="column" height="100%" width="100%">
            <Header
                title={`Edit: ${organization.name}`}
            />
            <Root>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    display="flex"
                    flexDirection="column"
                    height="100%"
                >
                    <FormContainer>
                        <Section>
                            <Typography sx={{ fontSize: 18, fontWeight: 600, color: '#f1f5f9' }}>
                                Basic Information
                            </Typography>

                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: 'Name is required' }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="Name *"
                                        error={!!error}
                                        helperText={error?.message}
                                        fullWidth
                                        sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#1e293b' } }}
                                    />
                                )}
                            />

                            <Controller
                                name="slug"
                                control={control}
                                rules={{ required: 'Slug is required' }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="Slug *"
                                        error={!!error}
                                        helperText={error?.message}
                                        fullWidth
                                        sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#1e293b' } }}
                                    />
                                )}
                            />

                            <Controller
                                name="is_disabled"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Switch checked={field.value} onChange={field.onChange} />}
                                        label="Disabled"
                                        sx={{ color: '#f1f5f9' }}
                                    />
                                )}
                            />
                        </Section>

                        <Section>
                            <Typography sx={{ fontSize: 18, fontWeight: 600, color: '#f1f5f9' }}>
                                Contact Information
                            </Typography>

                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Email"
                                        type="email"
                                        fullWidth
                                        sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#1e293b' } }}
                                    />
                                )}
                            />

                            <Controller
                                name="phone_number"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Phone Number"
                                        fullWidth
                                        sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#1e293b' } }}
                                    />
                                )}
                            />

                            <Controller
                                name="address"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Address"
                                        multiline
                                        rows={2}
                                        fullWidth
                                        sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#1e293b' } }}
                                    />
                                )}
                            />
                        </Section>

                        <Section>
                            <Typography sx={{ fontSize: 18, fontWeight: 600, color: '#f1f5f9' }}>
                                Branding
                            </Typography>

                            <Controller
                                name="logo_url"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Logo URL"
                                        fullWidth
                                        sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#1e293b' } }}
                                    />
                                )}
                            />

                            <ColorPickerRow>
                                <Controller
                                    name="primary_color"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Primary Color"
                                            placeholder="#3b82f6"
                                            sx={{ flex: 1, '& .MuiOutlinedInput-root': { backgroundColor: '#1e293b' } }}
                                        />
                                    )}
                                />
                                <ColorPreview color={primaryColor} />
                            </ColorPickerRow>
                        </Section>
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
                        <Button variant="outlined" onClick={() => navigate(`/organizations/${id}`)}>
                            Cancel
                        </Button>
                    </ButtonContainer>
                </Box>
            </Root>
        </Box>
    )
}
