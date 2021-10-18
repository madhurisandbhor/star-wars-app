import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        margin: '1rem auto',
       
        '@media(max-width: 480px)': {
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
    },
    right: {
        width: '30%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '@media (max-width: 1024px) and (min-width:480px)': {
            width: '40%',
        },
        '@media(max-width: 480px)': {
            width: '100%',
        },
        '& > a':{
            marginLeft: '1rem',
        }
    },
}))

export default useStyles;