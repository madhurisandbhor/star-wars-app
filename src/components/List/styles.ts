import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    wrapper: {
        width: "80%",
        margin: "0 auto",
    },
    list: {
        display: "flex",
        flexFlow: "row wrap",
    },
    card: {
        transition: '0.3s',
        flex: '0 0 23%',
        margin: '0.5rem',
        height: '15rem',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        position: 'relative',
        '&:hover': {
            boxShadow: '0 0.8rem 1.6rem 0 rgba(0, 0, 0, 0.2)',
            transform: 'scale(1.02)',
            cursor: 'pointer',
        },
        '@media(max-width: 768px) and (min-width:480px)': {
            flex: '0 0 47%',
            height: '12.5rem',
        },
        '@media(max-width: 480px)': {
            flex: '0 0 98%',
        },
    },
    name: {
        textAlign: 'center',
        margin: 'auto',
        padding: '0.3rem',
        color: '#4511bf',
        '@media (max-width: 768px)': {
            padding: 0,
        },
    },
    details: {
        display: 'flex',
        '& > div': {
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem 0.8rem',
            fontSize: '1.2rem',
            opacity: '0.8',
            padding: '0.5rem',
            margin: 'auto',
        },
    },
    label: {
        textAlign: 'right',
        '&::after': {
            content: '":"',
        },
    },
    labelValue: {
        textAlign: 'left',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
}))

export default useStyles;