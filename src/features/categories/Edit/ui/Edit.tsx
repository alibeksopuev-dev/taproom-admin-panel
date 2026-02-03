import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { skipToken } from '@reduxjs/toolkit/query'
import { categoriesApi } from '@entities/categories'
import {
    Box,
    Button,
    TextField,
    Typography,
    Header,
    CircularProgress,
} from '@shared/ui'
import { Root, FormContainer, ButtonContainer } from './styled'

interface FormValues {
    name: string
    slug: string
}

export const Edit = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const { data: category, isLoading: isFetching } = categoriesApi.useGetCategoryByIdQuery(
        id ? { id } : skipToken
    )
    const [updateCategory, { isLoading: isUpdating }] = categoriesApi.useUpdateCategoryMutation()

    const {
        control,
        handleSubmit,
        reset,
        formState: { isValid, isDirty },
    } = useForm<FormValues>({
        defaultValues: {
            name: '',
            slug: '',
        },
        mode: 'onChange',
    })

    // Populate form when category loads
    useEffect(() => {
        if (category) {
            reset({
                name: category.name,
                slug: category.slug,
            })
        }
    }, [category, reset])

    const onSubmit = async (data: FormValues) => {
        if (!id) return

        try {
            await updateCategory({
                id,
                data: {
                    name: data.name,
                    slug: data.slug,
                },
            }).unwrap()

            navigate(`/categories/${id}`)
        } catch (error) {
            console.error('Failed to update category:', error)
        }
    }

    if (isFetching) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
            </Box>
        )
    }

    if (!category) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Typography color="error">Category not found</Typography>
            </Box>
        )
    }

    return (
        <Box display="flex" flexDirection="column" height="100%" width="100%">
            <Header
                title={`Edit: ${category.name}`}
                action={
                    <Button variant="outlined" onClick={() => navigate(`/categories/${id}`)}>
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
                            onClick={() => navigate(`/categories/${id}`)}
                        >
                            Cancel
                        </Button>
                    </ButtonContainer>
                </Box>
            </Root>
        </Box>
    )
}
