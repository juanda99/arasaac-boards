import React, { FC, ReactElement, useState } from 'react'
import dynamic from 'next/dynamic'
import Drawer from '@material-ui/core/Drawer'

const BoardWithNoSSR = dynamic(() => import('../components/Board'), {
  ssr: false,
})

const BoardPage: FC = (): ReactElement => {
  const [dragUrl, setDragUrl] = useState(null) //for dragUrl
  console.log('render  again!')

  const handleDrag = (url) => {
    setDragUrl(url)
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: '',
        paddingLeft: 200,
      }}
    >
      <BoardWithNoSSR dragUrl={dragUrl} />
      <Sidebar onDrag={handleDrag} />

      {/* TODO: Set differente drawers,  see https://codesandbox.io/s/thirsty-ives-zc0ig?from-embed=&file=/layouts/layout-wrapper.js */}
      {/* TODO: implement searchField, we neeed react-intl first! */}
      {/* TODO: drag and drop, see: https://codesandbox.io/s/github/konvajs/site/tree/master/react-demos/drop_image_into_stage?from-embed=&file=/src/index.js:0-874 */}
      {/* TODO: drag to specific poosition, see https://codepen.io/pierrebleroux/pen/gGpvxJ */}
    </div>
  )
}

const Sidebar = ({ onDrag }) => {
  const [openDrawer, toggleDrawer] = React.useState(true)
  const handleToggleDrawer = () => toggleDrawer(!openDrawer)

  return (
    <>
      {/* {!openDrawer && (
        <div
          style={{
            position: 'fixed',
            width: '130px',
            height: '100%',
            top: 0,
          }}
          onMouseOver={handleToggleDrawer}
        />
      )} */}
      <div>
        <img
          alt="lion"
          src="https://static.arasaac.org/pictograms/27509/27509_300.png"
          draggable="true"
          style={{ width: '200px', height: '200px' }}
          onDragStart={(e) => {
            onDrag(e.target.src)
          }}
        />
      </div>
    </>
  )
}

export default BoardPage
