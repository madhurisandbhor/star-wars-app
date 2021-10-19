import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';


const useStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        margin: '2rem auto',
        padding: '1rem',
        width: '80%',
        '@media(max-width: 768px)': {
            width: '90%',
        },
        '& > button': {
            position: 'fixed',
            bottom: '5rem',
            right: '3rem',
            border: `0.1rem solid ${theme.palette.primary.main}`,
            textAlign: 'center',
            lineHeight: 1,
            padding: '1rem',
            outline: 'none',
            borderRadius: '50%',
            background: `${theme.palette.primary.main}11`,
            transition: 'all .5s ease',
            zIndex: 99,
            '&:hover': {
                cursor: 'pointer',
                background: `${theme.palette.primary.main}50`,
            },
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
    visible: {
        opacity: 1,
        transform: 'translateY(-3rem)',
    },
    invisible: {
        opacity: 0,
        transform: 'translateY(3rem)',
    },
}))

export default useStyles;