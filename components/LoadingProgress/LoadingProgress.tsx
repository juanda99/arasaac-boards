import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
const LoadingProgress = (): JSX.Element => (
  <Box
    sx={{
      height: 300,
    }}
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <CircularProgress />
  </Box>
)

export default LoadingProgress
