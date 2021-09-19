import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
    loading: {
        '&&[class*="MuiCircularProgress-colorPrimary"]': {
            color:  '#673ab7',
        }
    }
}))

export default useStyles;