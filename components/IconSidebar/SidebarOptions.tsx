import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
const drawerWidth = 440

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      position: 'fixed',
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      backgroundColor: theme.palette.action.selected,
      zIndex: 900,
      paddingTop: theme.spacing(8),
      paddingLeft: theme.spacing(12),
      minHeight: '100vh',
      //  height: '100%',
    },
  })
)

const SidebarOptions = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const classes = useStyles()
  return children ? <div className={classes.drawer}>{children}</div> : null
}

export default SidebarOptions
