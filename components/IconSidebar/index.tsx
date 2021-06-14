import React from 'react'
import clsx from 'clsx'
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AppHeader from 'components/AppHeader'
import GridOnIcon from '@material-ui/icons/GridOn'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import TextFieldsIcon from '@material-ui/icons/TextFields'

import FontOptions from './FontOptions'
import PictogramOptions from './PictogramOptions'
import TemplateOptions from './TemplateOptions'
import UploadOptions from './UploadOptions'

export const TEMPLATE = 'TEMPLATE'
export const PICTOGRAM = 'PICTOGRAM'
export const TEXT = 'TEXT'
export const UPLOAD_FILE = 'UPLOAD_FILE'

import SidebarOptions from './SidebarOptions'
import MenuItems from './MenuItems'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      // flexDirection: 'column',
      // maxWidth: '300px',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
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
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
)

const IconSidebar = (): JSX.Element => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const [currentMenu, setCurrentMenu] = React.useState(null)

  // const handleDrawerOpen = () => {
  //   setOpen(true)
  // }

  // const handleDrawerClose = () => {
  //   setOpen(false)
  // }

  const handleToggleDrawer = () => setOpen(!open)

  // const Component = currentMenu
  //   ? MenuItems.filter((item) => item.type === currentMenu).map(
  //       (item) => item.Component
  //     )[0]()
  //   : null

  return (
    <div className={classes.root}>
      <AppHeader onToggle={handleToggleDrawer} />
      <Drawer
        variant="permanent"
        id="pppppppp"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <Divider />
        <List style={{ marginTop: '56px' }}>
          <ListItem
            button
            key={TEMPLATE}
            selected={currentMenu === TEMPLATE}
            onClick={() => {
              currentMenu === TEMPLATE
                ? setCurrentMenu(null)
                : setCurrentMenu(TEMPLATE)
            }}
          >
            <ListItemIcon>
              <GridOnIcon />
            </ListItemIcon>
            <ListItemText primary={TEMPLATE} />
          </ListItem>
          <ListItem
            button
            key={PICTOGRAM}
            selected={currentMenu === PICTOGRAM}
            onClick={() => {
              currentMenu === PICTOGRAM
                ? setCurrentMenu(null)
                : setCurrentMenu(PICTOGRAM)
            }}
          >
            <ListItemIcon>
              <PhotoLibraryIcon />
            </ListItemIcon>
            <ListItemText primary={PICTOGRAM} />
          </ListItem>

          <ListItem
            button
            key={TEXT}
            selected={currentMenu === TEXT}
            onClick={() => {
              currentMenu === TEXT ? setCurrentMenu(null) : setCurrentMenu(TEXT)
            }}
          >
            <ListItemIcon>
              <TextFieldsIcon />
            </ListItemIcon>
            <ListItemText primary={TEXT} />
          </ListItem>

          <ListItem
            button
            key={UPLOAD_FILE}
            selected={currentMenu === UPLOAD_FILE}
            onClick={() => {
              currentMenu === UPLOAD_FILE
                ? setCurrentMenu(null)
                : setCurrentMenu(UPLOAD_FILE)
            }}
          >
            <ListItemIcon>
              <CloudUploadIcon />
            </ListItemIcon>
            <ListItemText primary={UPLOAD_FILE} />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <SidebarOptions>
        {currentMenu === TEMPLATE && <TemplateOptions />}
        {currentMenu === PICTOGRAM && <PictogramOptions />}
        {currentMenu === TEXT && <FontOptions />}
        {currentMenu === UPLOAD_FILE && <UploadOptions />}
      </SidebarOptions>
    </div>
  )
}

export default IconSidebar
