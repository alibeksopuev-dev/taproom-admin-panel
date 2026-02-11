import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Controller, useForm, useFieldArray } from 'react-hook-form'
import { skipToken } from '@reduxjs/toolkit/query'
import { menuItemsApi } from '@entities/menuItems'
import { categoriesApi } from '@entities/categories'
import { uploadMedia } from '@entities/media'
import {
    Box,
    Button,
    TextField,
    Typography,
    Header,
    MenuItem,
    FormControlLabel,
    Switch,
    IconButton,
    CircularProgress,
    DeleteModal,
    MetadataEditor,
    Chip,
    FileUploadInput,
} from '@shared/ui'
import type { MetadataEntry } from '@shared/ui'
import { Plus, Delete } from '@shared/ui/icons'
import { Root, FormContainer, ButtonContainer, Section, PricesContainer, PriceRow } from './styled'

interface PriceInput {
    size: string
    price: number
}

interface FormValues {
    name: string
    description: string
    category_id: string
    subcategory: string
    image_url: string
    is_disabled: boolean
    prices: PriceInput[]
    metadata: MetadataEntry[]
}

export const Edit = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const { data: menuItem, isLoading: isFetching } = menuItemsApi.useGetMenuItemByIdQuery(
        id ? { id } : skipToken
    )
    const { data: categoriesData } = categoriesApi.useGetCategoriesQuery({ limit: 100, offset: 0 })
    const [updateMenuItem, { isLoading: isUpdating }] = menuItemsApi.useUpdateMenuItemMutation()
    const [deleteMenuItem] = menuItemsApi.useDeleteMenuItemMutation()

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isUploading, setIsUploading] = useState(false)

    const {
        control,
        handleSubmit,
        reset,
        formState: { isValid, isDirty },
        setValue,
        watch,
    } = useForm<FormValues>({
        defaultValues: {
            name: '',
            description: '',
            category_id: '',
            subcategory: '',
            image_url: '',
            is_disabled: false,
            prices: [{ size: '', price: 0 }],
            metadata: [],
        },
        mode: 'onChange',
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'prices',
    })

    const metadata = watch('metadata')

    // Add preset metadata field
    const addPresetField = (key: string, value: string = '') => {
        const existing = metadata.find(m => m.key === key)
        if (!existing) {
            setValue('metadata', [...metadata, { key, value }])
        }
    }

    useEffect(() => {
        if (menuItem) {
            // Convert metadata object to array
            const metadataArray: MetadataEntry[] = menuItem.metadata
                ? Object.entries(menuItem.metadata).map(([key, value]) => ({
                    key,
                    value: String(value)
                }))
                : []

            reset({
                name: menuItem.name,
                description: menuItem.description ?? '',
                category_id: menuItem.category_id ?? '',
                subcategory: menuItem.subcategory ?? '',
                image_url: menuItem.image_url ?? '',
                is_disabled: menuItem.is_disabled,
                prices: menuItem.prices?.length ? menuItem.prices.map(p => ({ size: p.size, price: p.price })) : [{ size: '', price: 0 }],
                metadata: metadataArray,
            })
        }
    }, [menuItem, reset])

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
        if (!id) return

        try {
            const validPrices = data.prices.filter(p => p.size && p.price > 0)

            // Convert metadata array to object
            const metadataObject: Record<string, unknown> = {}
            data.metadata.forEach(entry => {
                if (entry.key && entry.value) {
                    metadataObject[entry.key] = entry.value
                }
            })

            await updateMenuItem({
                id,
                data: {
                    name: data.name,
                    description: data.description || null,
                    category_id: data.category_id || null,
                    subcategory: data.subcategory || null,
                    image_url: data.image_url || null,
                    is_disabled: data.is_disabled,
                    prices: validPrices,
                    metadata: metadataObject,
                },
            }).unwrap()

            navigate(`/menu-items/${id}`)
        } catch (error) {
            console.error('Failed to update menu item:', error)
        }
    }

    const handleDelete = async () => {
        if (!id) return
        try {
            await deleteMenuItem({ id }).unwrap()
            navigate('/menu-items')
        } catch (error) {
            console.error('Failed to delete menu item:', error)
        }
    }

    if (isFetching) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
            </Box>
        )
    }

    if (!menuItem) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Typography color="error">Menu item not found</Typography>
            </Box>
        )
    }

    return (
        <Box display="flex" flexDirection="column" height="100%" width="100%">
            <Header
                title={`Edit: ${menuItem.name}`}
                action={
                    <Box display="flex" gap="12px">
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => setIsDeleteModalOpen(true)}
                        >
                            Delete
                        </Button>
                    </Box>
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
                                        sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#1e293b' } }}
                                    />
                                )}
                            />

                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Description"
                                        multiline
                                        rows={3}
                                        fullWidth
                                        sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#1e293b' } }}
                                    />
                                )}
                            />

                            <Controller
                                name="category_id"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        select
                                        label="Category"
                                        fullWidth
                                        sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#1e293b' } }}
                                    >
                                        <MenuItem value="">None</MenuItem>
                                        {categoriesData?.items.map((cat) => (
                                            <MenuItem key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />

                            <Controller
                                name="subcategory"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Subcategory"
                                        fullWidth
                                        sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#1e293b' } }}
                                    />
                                )}
                            />

                            <Controller
                                name="image_url"
                                control={control}
                                render={({ field }) => (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#f1f5f9' }}>
                                            Product Image
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
                                                alt="Product preview"
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
                                            label="Image URL"
                                            placeholder="Or enter image URL manually"
                                            fullWidth
                                            sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#1e293b' } }}
                                        />
                                    </Box>
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
                                Prices
                            </Typography>

                            <PricesContainer>
                                {fields.map((field, index) => (
                                    <PriceRow key={field.id}>
                                        <Controller
                                            name={`prices.${index}.size`}
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    label="Size"
                                                    placeholder="e.g., 0.5L"
                                                    sx={{ flex: 1, '& .MuiOutlinedInput-root': { backgroundColor: '#1e293b' } }}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name={`prices.${index}.price`}
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    type="string"
                                                    label="Price (VND)"
                                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                                    sx={{ flex: 1, '& .MuiOutlinedInput-root': { backgroundColor: '#1e293b' } }}
                                                />
                                            )}
                                        />
                                        <IconButton onClick={() => remove(index)} disabled={fields.length === 1}>
                                            <Delete color="#ef4444" />
                                        </IconButton>
                                    </PriceRow>
                                ))}
                                <Button
                                    variant="outlined"
                                    startIcon={<Plus color="#774CFF" />}
                                    onClick={() => append({ size: '', price: 0 })}
                                    sx={{ alignSelf: 'flex-start' }}
                                >
                                    Add Price
                                </Button>
                            </PricesContainer>
                        </Section>

                        <Section>
                            <Typography sx={{ fontSize: 18, fontWeight: 600, color: '#f1f5f9' }}>
                                Metadata
                            </Typography>
                            <Typography sx={{ fontSize: 14, color: '#9ca3af', mb: 1 }}>
                                Add custom metadata like IBU, ABV for beers or region, country for wines
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                                <Typography sx={{ fontSize: 12, color: '#9ca3af', width: '100%', mb: 0.5 }}>Quick add:</Typography>
                                <Chip label="+ ibu" size="small" onClick={() => addPresetField('ibu')} sx={{ cursor: 'pointer' }} />
                                <Chip label="+ abv" size="small" onClick={() => addPresetField('abv')} sx={{ cursor: 'pointer' }} />
                                <Chip label="+ region" size="small" onClick={() => addPresetField('region')} sx={{ cursor: 'pointer' }} />
                                <Chip label="+ country" size="small" onClick={() => addPresetField('country')} sx={{ cursor: 'pointer' }} />
                                <Chip label="+ grapeVariety" size="small" onClick={() => addPresetField('grapeVariety')} sx={{ cursor: 'pointer' }} />
                                <Chip label="+ brewery" size="small" onClick={() => addPresetField('brewery')} sx={{ cursor: 'pointer' }} />
                                <Chip label="+ origin" size="small" onClick={() => addPresetField('origin')} sx={{ cursor: 'pointer' }} />
                            </Box>
                            <MetadataEditor control={control} name="metadata" />
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
                        <Button variant="outlined" onClick={() => navigate(`/menu-items/${id}`)}>
                            Cancel
                        </Button>
                    </ButtonContainer>
                </Box>
            </Root>
            <DeleteModal
                open={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                entityName="Menu Item"
                onConfirm={handleDelete}
            />
        </Box>
    )
}
