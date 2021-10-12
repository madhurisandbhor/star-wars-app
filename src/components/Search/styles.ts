import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    searchContainer: {
        width: '40%',
        display: 'flex',
        alignItems: 'center',
        '@media(max-width: 480px)': {
            width: '100%',
            marginBottom: '2rem',
        },
    },
    inputRoot: {
        '&&[class*="MuiOutlinedInput-root"] input': {
            fontSize: '1.6rem',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            border: 0,
            outline: 0,
        },
    },
}))

export default useStyles;