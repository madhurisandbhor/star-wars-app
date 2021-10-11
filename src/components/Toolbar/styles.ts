import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        '@media (max-width: 1024px) and (min-width:480px)': {
            flexDirection: 'row',
        },
        '@media(max-width: 768px)': {
            flexDirection: 'column',
            justifyContent: 'center',
        },
    },
    downloadBtn: {
        '&&[class*="MuiButton-outlined"]': {
            // fontSize: '1.2rem',
        },
    },
    outlinedInput: {
        '&&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input': {
            padding: '0',
        },
    }
}))

export default useStyles;