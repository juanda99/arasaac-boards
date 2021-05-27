import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
const drawerWidth = 440

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      backgroundColor: theme.palette.action.selected,
      zIndex: 900,
      marginLeft: 0,
      marginTop: 0,
      height: '100vh',
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
