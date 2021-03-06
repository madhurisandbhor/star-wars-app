import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
    list: {
        margin: '2rem 0',
        display: 'grid',
        justifyContent: 'center',
        gridTemplateColumns: 'repeat(4,1fr)',
        gridAutoFlow: 'row',
        gridGap: '2rem',
        '@media (max-width: 1024px) and (min-width:480px)': {
            gridTemplateColumns: 'repeat(2,1fr)',
        },
        '@media(max-width: 480px)': {
            gridTemplateColumns: '1fr',
        },
    },
    card: {
        transition: '0.3s',
        height: '15rem',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        position: 'relative',
        '&:hover': {
            boxShadow: '0 0.8rem 1.6rem 0 rgba(0, 0, 0, 0.2)',
            transform: 'scale(1.02)',
            cursor: 'pointer',
        },
        '@media (max-width: 1024px) and (min-width:480px)': {
            flex: '0 0 40%',
            height: '12rem',
            padding: '1rem',
        },
        '@media(max-width: 480px)': {
            flex: '0 0 98%',
        },
    },
    name: {
        textAlign: 'center',
        margin: 'auto',
        padding: '0.3rem',
        color: theme.palette.primary.main,
        fontSize: '1.8rem',
    },
    details: {
        display: 'flex',
        '& > div': {
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem 0.8rem',
            opacity: '0.9',
            padding: '0.5rem',
            margin: 'auto',
            fontSize: '1.4rem',
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
        fontWeight: 'bold',
        opacity: 0.8,
    },
    buttonIcons: {
        textAlign: "end",
        width: "100%",
        position: "absolute",
        right: "0.8rem",
        top: "0.8rem",
        zIndex: 99,
    },
    svg: {
        width: "2.4rem",
        height: "2.4rem",
    },
}))

export default useStyles;