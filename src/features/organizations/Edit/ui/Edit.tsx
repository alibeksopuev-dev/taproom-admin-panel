import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { organizationsApi } from '@entities/organizations'
import { uploadMedia } from '@entities/media'
import {
    Box,
    Button,
    TextField,
    Typography,
    Header,
    FormControlLabel,
    Switch,

    CircularProgress,
    FileUploadInput,
} from '@shared/ui'
import { Root, FormContainer, ButtonContainer, Section } from './styled'

interface FormValues {
    name: string
    slug: string
    email: string
    phone_number: string
    address: string
    logo_url: string
    is_disabled: boolean
}

export const Edit = () => {
    const { id } = useParams<{ id: string }>()

    const handleFileUpload = async (file: File, onSuccess: (url: string) => void) => {
        setIsUploading(true)
        try {
            const result = await uploadMedia({ file })
            onSuccess(result.publicUrl)
        } catch (error) {
            console.error('Upload failed:', error)
            alert('Failed to upload image. Please try again.')
        } finally {
            setIsUploading(false)
        }
    }

    const navigate = useNavigate()

    const { data: organization, isLoading: isFetching } = organizationsApi.useGetOrganizationByIdQuery(
        { id: id! },
        { skip: !id }
    )
    const [updateOrganization, { isLoading: isUpdating }] = organizationsApi.useUpdateOrganizationMutation()
    const [isUploading, setIsUploading] = React.useState(false)

    const {
        control,
        handleSubmit,
        reset,
        formState: { isValid, isDirty },
    } = useForm<FormValues>({
        defaultValues: {
            name: '',
            slug: '',
            email: '',
            phone_number: '',
            address: '',
            logo_url: '',
            is_disabled: false,
        },
        mode: 'onChange',
    })

    useEffect(() => {
        if (organization) {
            reset({
                name: organization.name,
                slug: organization.slug,
                email: organization.email ?? '',
                phone_number: organization.phone_number ?? '',
                address: organization.address ?? '',
                logo_url: organization.logo_url ?? '',
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
                                        control={<Switch checked={!field.value} onChange={(e) => field.onChange(!e.target.checked)} />}
                                        label="Enabled"
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
                                Logo
                            </Typography>

                            <Controller
                                name="logo_url"
                                control={control}
                                render={({ field }) => (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#f1f5f9' }}>
                                            Organization Logo
                                        </Typography>
                                        {isUploading ? (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3, bgcolor: '#1e293b', borderRadius: 1 }}>
                                                <CircularProgress size={20} />
                                                <Typography sx={{ color: '#94a3b8', fontSize: 14 }}>
                                                    Uploading image...
                                                </Typography>
                                            </Box>
                                        ) : (
                                            <FileUploadInput
                                                onChange={(file) => handleFileUpload(file, field.onChange)}
                                            />
                                        )}
                                        {field.value && !isUploading && (
                                            <Box
                                                component="img"
                                                src={field.value}
                                                alt="Logo preview"
                                                onClick={() => field.value && window.open(field.value, '_blank')}
                                                sx={{
                                                    width: 128,
                                                    height: 128,
                                                    objectFit: 'cover',
                                                    border: '2px solid #475569',
                                                    borderRadius: 1,
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        opacity: 0.8,
                                                    },
                                                }}
                                            />
                                        )}
                                        <TextField
                                            {...field}
                                            value={field.value || ''}
                                            label="Logo URL"
                                            placeholder="Or enter logo URL manually"
                                            fullWidth
                                            sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#1e293b' } }}
                                        />
                                    </Box>
                                )}
                            />
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
