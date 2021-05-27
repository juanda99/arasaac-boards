import React from 'react'
import clsx from 'clsx'
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import GridOnIcon from '@material-ui/icons/GridOn'

const drawerWidth = 440

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      backgroundColor: '#eee',
      zIndex: 900,
      marginLeft: 0,
      marginTop: 0,
      height: '100vh',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
  })
)

const FontSidebar = (): JSX.Element => {
  const classes = useStyles()
  const theme = useTheme()
  return (
    <div className={classes.drawer} id="ppppppp">
      <p>Selecciona tipo de texto</p>
    </div>
  )
}

export default FontSidebar
