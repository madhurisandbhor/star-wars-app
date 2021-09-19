import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    wrapper: {
        margin: '1.8rem 0',
        padding: '1rem',
    },
    noResult: {
        textAlign: 'center',
        color: 'red',
        marginTop: '0.8rem',
    },
    loadMore: {
        visibility: 'hidden',
    }
}))

export default useStyles;