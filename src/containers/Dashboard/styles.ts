import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    wrapper: {
        margin: '2rem auto',
        padding: '1rem',
        width: '80%',
    },
    noResult: {
        textAlign: 'center',
        color: 'red',
        marginTop: '0.8rem',
    },
    loadMore: {
        visibility: 'hidden',
    },
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
            fontSize: '1.2rem',
        },
    },
}))

export default useStyles;