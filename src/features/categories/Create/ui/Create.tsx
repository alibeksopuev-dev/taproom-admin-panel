import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { categoriesApi } from '@entities/categories'
import { selectUser } from '@entities/session'
import {
    Box,
    Button,
    TextField,
    Typography,
    Header,
} from '@shared/ui'
import { Root, FormContainer, ButtonContainer } from './styled'

interface FormValues {
    name: string
    slug: string
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
    const [createCategory, { isLoading }] = categoriesApi.useCreateCategoryMutation()
    const user = useSelector(selectUser)

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
        },
        mode: 'onChange',
    })

    // Auto-generate slug from name
    const nameValue = watch('name')
    useEffect(() => {
        if (nameValue) {
            setValue('slug', generateSlug(nameValue))
        }
    }, [nameValue, setValue])

    const onSubmit = async (data: FormValues) => {
        if (!user?.id) return

        try {
            await createCategory({
                organization_id: user.id,
                name: data.name,
                slug: data.slug,
            }).unwrap()

            navigate('/categories')
        } catch (error) {
            console.error('Failed to create category:', error)
        }
    }

    return (
        <Box display="flex" flexDirection="column" height="100%" width="100%">
            <Header
                title="Create Category"
                action={
                    <Button variant="outlined" onClick={() => navigate('/categories')}>
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
                        <Typography sx={{ fontSize: 18, fontWeight: 600, color: '#f1f5f9' }}>
                            Category Information
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
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: '#1e293b',
                                        },
                                    }}
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
                                    helperText={error?.message || 'Auto-generated from name'}
                                    fullWidth
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: '#1e293b',
                                        },
                                    }}
                                />
                            )}
                        />
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
                            onClick={() => navigate('/categories')}
                        >
                            Cancel
                        </Button>
                    </ButtonContainer>
                </Box>
            </Root>
        </Box>
    )
}
