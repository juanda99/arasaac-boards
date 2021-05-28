import { createMuiTheme } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8BC151',
    },
    secondary: {
      main: '#81388d',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        color: 'white',
      },
    },
  },
})

export default theme
