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
}))

export default useStyles;