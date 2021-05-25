import React, { useState } from 'react'
import dynamic from 'next/dynamic'
// import Drawer from '@material-ui/core/Drawer'
import Sidebar from '../containers/Sidebar'
import SingleLineGrid, { TemplateItem } from '../components/SingleLineGrid'

const BoardWithNoSSR = dynamic(() => import('../components/Board'), {
  ssr: false,
})

const templateData = [
  {
    img:
      'https://static.canva.com/marketplace/contextualThumbnails/presentation%401x.png',
    desc: 'Cubo',
    src: 'cubo.svg',
    landscape: false,
    gridSize: 191,
    imageSize: 191,
  },
  {
    img:
      'https://static.canva.com/marketplace/contextualThumbnails/infographic%401x.png',
    desc: 'Lamina',
    src: 'lamina3.svg',
    landscape: true,
    gridSize: 200,
    imageSize: 100,
  },
  {
    img:
      'https://static.canva.com/marketplace/contextualThumbnails/presentation%401x.png',
    desc: 'Cubo',
    src: 'cubo.svg',
    landscape: false,
    gridSize: 191,
    imageSize: 191,
  },
  {
    img:
      'https://static.canva.com/marketplace/contextualThumbnails/infographic%401x.png',
    desc: 'Lamina',
    src: 'lamina3.svg',
    landscape: true,
    gridSize: 200,
    imageSize: 100,
  },
  {
    img:
      'https://static.canva.com/marketplace/contextualThumbnails/presentation%401x.png',
    desc: 'Cubo',
    src: 'cubo.svg',
    landscape: false,
    gridSize: 191,
    imageSize: 191,
  },
  {
    img:
      'https://static.canva.com/marketplace/contextualThumbnails/infographic%401x.png',
    desc: 'Lamina',
    src: 'lamina3.svg',
    landscape: true,
    gridSize: 200,
    imageSize: 100,
  },
  {
    img:
      'https://static.canva.com/marketplace/contextualThumbnails/presentation%401x.png',
    desc: 'Cubo',
    src: 'cubo.svg',
    landscape: false,
    gridSize: 191,
    imageSize: 191,
  },
  {
    img:
      'https://static.canva.com/marketplace/contextualThumbnails/infographic%401x.png',
    desc: 'Lamina',
    src: 'lamina3.svg',
    landscape: true,
    gridSize: 200,
    imageSize: 100,
  },
  {
    img:
      'https://static.canva.com/marketplace/contextualThumbnails/presentation%401x.png',
    desc: 'Cubo',
    src: 'cubo.svg',
    landscape: false,
    gridSize: 191,
    imageSize: 191,
  },
  {
    img:
      'https://static.canva.com/marketplace/contextualThumbnails/infographic%401x.png',
    desc: 'Lamina',
    src: 'lamina3.svg',
    landscape: true,
    gridSize: 200,
    imageSize: 100,
  },
  {
    img:
      'https://static.canva.com/marketplace/contextualThumbnails/presentation%401x.png',
    desc: 'Cubo',
    src: 'cubo.svg',
    landscape: false,
    gridSize: 191,
    imageSize: 191,
  },
  {
    img:
      'https://static.canva.com/marketplace/contextualThumbnails/infographic%401x.png',
    desc: 'Lamina',
    src: 'lamina3.svg',
    landscape: true,
    gridSize: 200,
    imageSize: 100,
  },
]

const BoardPage = (): JSX.Element => {
  const [dragUrl, setDragUrl] = useState(null) //for dragUrl
  const [template, setTemplate] = useState(templateData[0])
  const handleDrag = (url: string): void => {
    setDragUrl(url)
  }

  const handleClick = (template: TemplateItem) => setTemplate(template)

  console.log(template, templateData[0], '*******999')

  return (
    <div>
      <SingleLineGrid data={templateData} onClick={handleClick} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: '',
          paddingLeft: 200,
        }}
      >
        <Sidebar onDrag={handleDrag} />
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
