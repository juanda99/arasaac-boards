import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
// import Drawer from '@material-ui/core/Drawer'
import Sidebar from 'containers/Sidebar'
import IconSidebar from 'components/IconSidebar'
import SingleLineGrid, { TemplateItem } from 'components/SingleLineGrid'
import templateData from 'data/templateData'

const BoardWithNoSSR = dynamic(() => import('../components/Board'), {
  ssr: false,
})

const BoardPage = (): JSX.Element => {
  const [dragUrl, setDragUrl] = useState(null) //for dragUrl
  const [template, setTemplate] = useState(templateData[0])
  const handleDrag = (url: string): void => {
    setDragUrl(url)
  }

  const handleClick = (template: TemplateItem) => setTemplate(template)

  return (
    <div>
      <Head>
        <title>My page</title>
      </Head>
      <IconSidebar />
      <SingleLineGrid data={templateData} onClick={handleClick} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: '',
          paddingLeft: 200,
        }}
      >
        {/* <Sidebar onDrag={handleDrag} /> */}
        <BoardWithNoSSR dragUrl={dragUrl} template={template} />
        {/* TODO: Set differente drawers,  see https://codesandbox.io/s/thirsty-ives-zc0ig?from-embed=&file=/layouts/layout-wrapper.js */}
        {/* TODO: implement searchField, we neeed react-intl first! */}
        {/* TODO: drag and drop, see: https://codesandbox.io/s/github/konvajs/site/tree/master/react-demos/drop_image_into_stage?from-embed=&file=/src/index.js:0-874 */}
        {/* TODO: drag to specific poosition, see https://codepen.io/pierrebleroux/pen/gGpvxJ */}
      </div>
    </div>
  )
}

export default BoardPage
