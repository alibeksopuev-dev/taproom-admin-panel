import React from 'react'
import { useNavigate } from 'react-router-dom'
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
    FileUploadInput,
    CircularProgress,
} from '@shared/ui'
import { Root, FormContainer, ButtonContainer, Section } from './styled'

interface FormValues {
    name: string
    slug: string
    email: string
    phone_number: string
    address: string
    logo_url: string
    primary_color: string
    is_disabled: boolean
    id: string
}

const generateSlug = (name: string): string => {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
}

export const Create = () => {
    const navigate = useNavigate()
    const [createOrganization, { isLoading }] = organizationsApi.useCreateOrganizationMutation()
    const [isUploading, setIsUploading] = React.useState(false)

    const {
        control,
        handleSubmit,
        setValue,
        formState: { isValid },
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
            id: '',
        },
        mode: 'onChange',
    })



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

    const onSubmit = async (data: FormValues) => {
        try {
            const result = await createOrganization({
                name: data.name,
                slug: data.slug,
                email: data.email || null,
                phone_number: data.phone_number || null,
                address: data.address || null,
                logo_url: data.logo_url || null,
                primary_color: data.primary_color,
                is_disabled: data.is_disabled,
                id: data.id || undefined,
            }).unwrap()

            navigate(`/organizations/${result.id}`)
        } catch (error) {
            console.error('Failed to create organization:', error)
        }
    }

    return (
        <Box display="flex" flexDirection="column" height="100%" width="100%">
            <Header
                title="Create Organization"
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
                                        onChange={(e) => {
                                            field.onChange(e)
                                            setValue('slug', generateSlug(e.target.value))
                                        }}
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
                                name="id"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="User ID"
                                        placeholder="Enter user ID to attach"
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
                            disabled={!isValid || isLoading}
                            sx={{ minWidth: 120 }}
                        >
                            {isLoading ? 'Creating...' : 'Create'}
                        </Button>
                        <Button variant="outlined" onClick={() => navigate('/organizations')}>
                            Cancel
                        </Button>
                    </ButtonContainer>
                </Box>
            </Root>
        </Box>
    )
}
