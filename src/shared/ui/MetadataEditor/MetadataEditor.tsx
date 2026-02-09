import { Control, Controller, useFieldArray } from 'react-hook-form'
import { TextField, IconButton, Button, Typography } from '@mui/material'
import { Plus, Delete } from '@shared/ui/icons'
import styled from 'styled-components'

const MetadataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const MetadataRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    align-items: center;
    
    & > div {
      width: 100%;
    }
  }
`

export interface MetadataEntry {
    key: string
    value: string
}

interface MetadataEditorProps {
    control: Control<any>
    name: string
}

export const MetadataEditor = ({ control, name }: MetadataEditorProps) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    })

    return (
        <MetadataContainer>
            {fields.length === 0 && (
                <Typography sx={{ color: '#9ca3af', fontSize: 14 }}>
                    No metadata entries. Click "Add Metadata" to add custom fields.
                </Typography>
            )}

            {fields.map((field, index) => (
                <MetadataRow key={field.id}>
                    <Controller
                        name={`${name}.${index}.key`}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Key"
                                placeholder="e.g., ibu, abv, region"
                                sx={{
                                    flex: 1,
                                    width: '100%',
                                    '& .MuiOutlinedInput-root': { backgroundColor: '#1e293b' }
                                }}
                            />
                        )}
                    />
                    <Controller
                        name={`${name}.${index}.value`}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Value"
                                placeholder="e.g., 24, 5.5%, France"
                                sx={{
                                    flex: 1,
                                    width: '100%',
                                    '& .MuiOutlinedInput-root': { backgroundColor: '#1e293b' }
                                }}
                            />
                        )}
                    />
                    <IconButton
                        onClick={() => remove(index)}
                        sx={{
                            flexGrow: 0,
                        }}
                    >
                        <Delete color="#ef4444" />
                    </IconButton>
                </MetadataRow>
            ))}

            <Button
                variant="outlined"
                startIcon={<Plus color="#774CFF" />}
                onClick={() => append({ key: '', value: '' })}
                sx={{ alignSelf: 'flex-start' }}
            >
                Add Metadata
            </Button>
        </MetadataContainer>
    )
}
