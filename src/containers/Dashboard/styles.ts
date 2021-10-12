import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    wrapper: {
        margin: '2rem auto',
        padding: '1rem',
        width: '80%',
        '@media(max-width: 768px)': {
            width: '90%',
        },
    },
    noResult: {
        textAlign: 'center',
        color: 'red',
        marginTop: '0.8rem',
    },
    loadMore: {
        visibility: 'hidden',
    },
    alertRoot: {
        width: '50%',
        margin: 'auto',
        '@media(max-width: 768px)': {
            width: '100%',
        },
    },
}))

export default useStyles;