import React, { useState, createContext } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
// import Drawer from '@material-ui/core/Drawer'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import IconSidebar from 'components/IconSidebar'
import { TemplateItem } from 'components/SingleLineGrid'
import templateData from 'data/templateData'

const BoardWithNoSSR = dynamic(() => import('components/Board'), {
  ssr: false,
})

export const DragImageContext = createContext(undefined)

const useStyles = makeStyles(() =>
  createStyles({
    main: {
      display: 'flex',
    },
  })
)

const BoardPage = (): JSX.Element => {
  const classes = useStyles()
  const [dragUrl, setDragUrl] = useState(null) //for dragUrl
  const [template, setTemplate] = useState(templateData[0])
  const handleDrag = (url: string): void => {
    setDragUrl(url)
  }

  const handleClick = (template: TemplateItem) => setTemplate(template)

  return (
    <div className={classes.main} id="pipipi">
      <Head>
        <title>My page</title>
      </Head>
      <DragImageContext.Provider value={handleDrag}>
        <IconSidebar />
      </DragImageContext.Provider>
      <BoardWithNoSSR dragUrl={dragUrl} template={template} />

      {/*  */}
      <div
        style={{
          display: 'flex',
          justifyContent: '',
          paddingLeft: 200,
        }}
      >
        {/* TODO: Set differente drawers,  see https://codesandbox.io/s/thirsty-ives-zc0ig?from-embed=&file=/layouts/layout-wrapper.js */}
        {/* TODO: implement searchField, we neeed react-intl first! */}
        {/* TODO: drag and drop, see: https://codesandbox.io/s/github/konvajs/site/tree/master/react-demos/drop_image_into_stage?from-embed=&file=/src/index.js:0-874 */}
        {/* TODO: drag to specific poosition, see https://codepen.io/pierrebleroux/pen/gGpvxJ */}
      </div>
    </div>
  )
}

export default BoardPage
