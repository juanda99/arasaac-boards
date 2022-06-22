import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

// const drawerWidth = 240

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     appBar: {
//       zIndex: theme.zIndex.drawer + 1,
//       transition: theme.transitions.create(['width', 'margin'], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//       }),
//     },
//     appBarShift: {
//       marginLeft: drawerWidth,
//       width: `calc(100% - ${drawerWidth}px)`,
//       transition: theme.transitions.create(['width', 'margin'], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//     },
//     menuButton: {
//       marginRight: 36,
//     },
//     hide: {
//       display: 'none',
//     },
//     toolbar: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'flex-end',
//       padding: theme.spacing(0, 1),
//       // necessary for content to be below app bar
//       ...theme.mixins.toolbar,
//     },
//     content: {
//       flexGrow: 1,
//       padding: theme.spacing(3),
//     },
//   })
// )

type Props = {
  onToggle?: () => void
  showMenu?: boolean
}

const IconSidebar = ({ onToggle, showMenu = true }: Props): JSX.Element => {
  // const classes = useStyles()

  const handleToggle = () => onToggle()

  return (
    <AppBar position="fixed">
      <Toolbar>
        {showMenu && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleToggle}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" noWrap>
          ARASAAC app
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default IconSidebar
