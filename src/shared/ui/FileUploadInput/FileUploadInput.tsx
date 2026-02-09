import { Box, Typography } from '@mui/material'
import { Upload } from '@shared/ui/icons'
import styled from 'styled-components'

const UploadLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #1e293b;
  border: 2px dashed #475569;
  color: #94a3b8;
  padding: 24px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s;
  width: 100%;
  
  &:hover {
    background-color: #0f172a;
    border-color: #774CFF;
    color: #774CFF;
  }
  
  input {
    display: none;
  }
`

interface FileUploadInputProps {
    onChange: (file: File) => void
    accept?: string
    maxSize?: string
}

export const FileUploadInput = ({ onChange, accept = 'image/*', maxSize = '5MB' }: FileUploadInputProps) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            onChange(file)
        }
    }

    return (
        <UploadLabel>
            <Upload color="#774CFF" width={24} height={24} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#94a3b8' }}>Upload image</Typography>
                <Typography sx={{ fontSize: 12, color: '#64748b' }}>Max size: {maxSize}</Typography>
            </Box>
            <input
                type="file"
                accept={accept}
                onChange={handleFileChange}
            />
        </UploadLabel>
    )
}
