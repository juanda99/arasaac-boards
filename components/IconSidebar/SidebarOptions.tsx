import React from 'react'
import { styled } from '@mui/material/styles'
const drawerWidth = 440

const Drawer = styled('div')(({ theme }) => ({
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
}))

const SidebarOptions = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element | null => (children ? <Drawer>{children}</Drawer> : null)

export default SidebarOptions
