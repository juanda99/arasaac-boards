import React, { useState, useRef } from 'react'
//  import RotateIcon from '@material-ui/icons/Rotate90DegreesCcw'
import PrintIcon from '@material-ui/icons/Print'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'
import UndoIcon from '@material-ui/icons/Undo'
import RedoIcon from '@material-ui/icons/Redo'
import uniqueString from 'unique-string'
import { TEMPLATES_URL } from 'utils/index'
import Template from './Template'
import { TemplateItem } from '../SingleLineGrid'
import URLImage from './URLImage'
import Grid from './Grid'
import BackgroundLayer from './BackgroundLayer'
import { Stage, Layer } from 'react-konva'
import IconButton from '@material-ui/core/IconButton'
import { Toolbar } from 'components/Board'

// const debounce = (
//   fn: { apply: (arg0: undefined, arg1: IArguments) => void },
//   ms: number
// ) => {
//   let timer: ReturnType<typeof setTimeout>
//   return (_: any) => {
//     clearTimeout(timer)
//     timer = setTimeout((_) => {
//       timer = null
//       fn.apply(this, arguments)
//     }, ms)
//   }
// }

// const getCanvasDimensions = (
//   windowWidth: number,
//   windowHeight: number,
//   verticalOrientation: boolean
// ) => {
//   const proportion = 841.89 / 595.28
//   // A4 vertical vs horizontal
//   const height = windowHeight
//   const width = height / proportion

//   return verticalOrientation
//     ? { width, height }
//     : { width: height, height: width }
// }

type BoardProps = {
  dragUrl: string
  template: TemplateItem
}

const Board = ({ dragUrl, template }: BoardProps): JSX.Element => {
  const stageRef = useRef(null)
  const [zoom, setZoom] = useState(100)
  // const [verticalOrientation, toggleOrientation] = useState(true)

  // const [dimensions, setDimensions] = useState({
  //   // width: window.innerWidth,
  //   // height: window.innerHeight,
  //   width: 280,
  //   height: 280,
  // })

  const [images, setImages] = useState([])
  const [selectedId, selectShape] = useState(null)
  const [backgroundColor, setBackgroundColor] = useState('red')

  const defaultWidth = template.landscape ? 891 : 630
  const defaultHeight = template.landscape ? 630 : 891
  const defaultGridSize = template.gridSize
  const imageSize = template.imageSize
  const gridSize = (defaultGridSize * zoom) / 100
  const width = (defaultWidth * zoom) / 100
  const height = (defaultHeight * zoom) / 100

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage()
    if (clickedOnEmpty) {
      selectShape(null)
    }
  }

  // const handleResize = (): void => {
  //   setDimensions({ width: window.innerWidth, height: window.innerHeight })
  // }

  const handleSelectTemplate = (e) => {
    selectShape(null)
    // show template options
  }

  // const canvasDimensions = getCanvasDimensions(
  //   dimensions.width,
  //   dimensions.height,
  //   verticalOrientation
  // )

  // React.useEffect(() => {
  //   const debouncedHandleResize = debounce(handleResize, 1000)
  //   window.addEventListener('resize', debouncedHandleResize)
  //   return () => {
  //     window.removeEventListener('resize', debouncedHandleResize)
  //   }
  // })

  // const zoomWidth = (canvasDimensions.width * zoom) / 100
  // const zoomHeight = (canvasDimensions.height * zoom) / 100

  // const zoomWidth = (dimensions.width * zoom) / 100
  // const zoomHeight = (dimensions.height * zoom) / 100

  // when image is loaded we need to cache the shape
  // React.useEffect(() => {
  //   if (gridRef) {
  //     console.log(gridRef)
  //     gridRef.current.cache()
  //   }
  // }, [zoom])

  // const height = (630 * zoom) / 100
  // const width = template.landscape
  //   ? (891 * zoom) / 100
  //   : (height * (630 / 891) * zoom) / 100

  const handleZoom = (zoom: number): void => setZoom(zoom)

  return (
    <div style={{ margin: '0  auto', paddingTop: '150px' }}>
      <Toolbar zoom={zoom} changeZoom={handleZoom} />

      <div
        style={{
          border: 2,
          borderStyle: 'solid',
          borderColor: '#ddd',
          width: `${width}px`,
          margin: '0 auto',
        }}
        onDrop={(e) => {
          e.preventDefault()
          // register event position
          stageRef.current.setPointersPositions(e)
          //  add images
          const position = stageRef.current.getPointerPosition()
          position.x =
            Math.round((position.x - imageSize / 2) / gridSize) * gridSize
          position.y =
            Math.round((position.y - imageSize / 2) / gridSize) * gridSize
          setImages(
            images.concat([
              {
                ...position,
                src: dragUrl,
                id: uniqueString(),
                width: imageSize,
                height: imageSize,
              },
            ])
          )
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <Stage
          ref={stageRef}
          width={width}
          height={height}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          scale={{ x: zoom / 100, y: zoom / 100 }}
        >
          {!!backgroundColor && (
            <BackgroundLayer
              color={backgroundColor}
              width={defaultWidth}
              height={defaultHeight}
            />
          )}
          <Grid
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            defaultGridSize={defaultGridSize}
          />
          <Layer>
            <Template
              onClick={handleSelectTemplate}
              template={`${TEMPLATES_URL}${template.src}`}
              width={defaultWidth}
              height={defaultHeight}
            />
          </Layer>
          <Layer>
            {images.map((image, index) => (
              <URLImage
                key={`image-${index}`}
                image={image}
                isSelected={image.id === selectedId}
                gridSize={defaultGridSize}
                onSelect={() => {
                  selectShape(image.id)
                }}
                onChange={(newAttrs) => {
                  const cloneImages = images.slice()
                  cloneImages[index] = newAttrs
                  setImages(cloneImages)
                }}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  )
}

export default Board
