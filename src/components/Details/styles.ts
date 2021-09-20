import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        margin: '2rem auto',
        '& > a': {
            textAlign: "center",
            textDecoration: "none",
            margin: "1rem 0",
        },
    },
    card: {
        width: "60%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        margin: "auto",
        padding: "2rem",
    },
    title: {
        textAlign: 'center',
        margin: 'auto',
        padding: '1rem',
        color:  theme.palette.primary.main,
        fontSize: '2.4rem',
    },
    details: {
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.5rem',
        fontSize: '1.6rem',
        padding: '0.5rem',
        margin: '1rem auto',
    },
    label: {
        textAlign: 'right',
        fontWeight: 600,
        opacity: '0.7',
        '&::after': {
            content: '":"',
        },
    },
    labelValue: {
        textAlign: 'left',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    divider: {
        width: '60%',
    },
}))

export default useStyles;