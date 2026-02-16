import MuiAutocomplete, { AutocompleteProps as MuiAutocompleteProps } from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { ForwardedRef, forwardRef } from 'react'

type AutocompleteProps<T> = Omit<MuiAutocompleteProps<T, false, false, false>, 'renderInput'> & {
    label?: string
    placeholder?: string
}

const BaseAutocomplete = <T,>(
    { label, placeholder, ...rest }: AutocompleteProps<T>,
    ref: ForwardedRef<HTMLSelectElement>,
) => {
    return (
        <MuiAutocomplete
            {...rest}
            ref={ref}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    placeholder={placeholder}
                    size="small"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '#1e293b',
                            color: '#f1f5f9',
                            borderRadius: '8px',
                            '& fieldset': { borderColor: '#334155' },
                            '&:hover fieldset': { borderColor: '#774CFF' },
                            '&.Mui-focused fieldset': { borderColor: '#774CFF' },
                        },
                        '& .MuiInputLabel-root': { color: '#94a3b8' },
                        '& .MuiInputLabel-root.Mui-focused': { color: '#774CFF' },
                        '& .MuiSvgIcon-root': { color: '#94a3b8' },
                    }}
                />
            )}
            slotProps={{
                paper: {
                    sx: {
                        backgroundColor: '#1e293b',
                        color: '#f1f5f9',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        mt: 0.5,
                    },
                },
            }}
        />
    )
}

export const Autocomplete = forwardRef(BaseAutocomplete) as <T>(
    props: AutocompleteProps<T> & { ref?: ForwardedRef<HTMLSelectElement> },
) => React.ReactElement | null
