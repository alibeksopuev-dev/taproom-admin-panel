import { useState, useEffect, useCallback } from 'react'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'

interface SearchInputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    debounceMs?: number
}

export const SearchInput = ({
    value,
    onChange,
    placeholder = 'Search...',
    debounceMs = 500,
}: SearchInputProps) => {
    const [localValue, setLocalValue] = useState(value)

    // Sync local value with prop value
    useEffect(() => {
        setLocalValue(value)
    }, [value])

    // Debounced onChange
    useEffect(() => {
        const timer = setTimeout(() => {
            if (localValue !== value) {
                onChange(localValue)
            }
        }, debounceMs)

        return () => clearTimeout(timer)
    }, [localValue, debounceMs, onChange, value])

    const handleClear = useCallback(() => {
        setLocalValue('')
        onChange('')
    }, [onChange])

    return (
        <TextField
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            placeholder={placeholder}
            size="small"
            fullWidth
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon sx={{ color: '#9ca3af' }} />
                    </InputAdornment>
                ),
                endAdornment: localValue && (
                    <InputAdornment position="end">
                        <IconButton
                            size="small"
                            onClick={handleClear}
                            sx={{ color: '#9ca3af' }}
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            sx={{
                '& .MuiOutlinedInput-root': {
                    backgroundColor: '#0f172a',
                    color: '#f1f5f9',
                    '& fieldset': {
                        borderColor: '#334155',
                    },
                    '&:hover fieldset': {
                        borderColor: '#475569',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#774CFF',
                    },
                },
                '& .MuiInputBase-input::placeholder': {
                    color: '#64748b',
                    opacity: 1,
                },
            }}
        />
    )
}
