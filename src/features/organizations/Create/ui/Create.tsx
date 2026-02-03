import { useNavigate } from 'react-router-dom'
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

    const {
        control,
        handleSubmit,
        watch,
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

    const primaryColor = watch('primary_color')

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
                action={
                    <Button variant="outlined" onClick={() => navigate('/organizations')}>
                        Cancel
                    </Button>
                }
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
