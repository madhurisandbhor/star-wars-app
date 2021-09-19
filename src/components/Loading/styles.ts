import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
    loading: {
        '&&[class*="MuiCircularProgress-colorPrimary"]': {
            color:  theme.palette.primary.main,
        }
    }
}))

export default useStyles;