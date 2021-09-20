import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '6.5rem',
        margin: 'auto',
        padding: '0 2rem',
        boxShadow: '0 0.4rem 0.8rem 0 rgba(0, 0, 0, 0.2)',
        background: '#ffffff',
        '& > ul': {
            listStyle: 'none',
            '& > li > a': {
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                '& > p:first-child': {
                    textTransform: 'uppercase',
                    fontSize: '2.4rem',
                    color: '#000000',
                    display: 'block',
                    fontWeight: 'bold',
                },
                '& > p:last-child': {
                    color:  theme.palette.primary.main,
                    marginTop: '-0.5rem',
                },
            },
            '@media(max-width: 768px)': {
                marginLeft: 0,
            },
        },
        '@media(max-width: 768px)': {
            flexDirection: 'column',
            padding: '0.5rem',
            alignItems: 'center',
            justifyContent: 'space-around',
        }
    },
}))

export default useStyles;