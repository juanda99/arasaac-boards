import React, { useState, useRef } from 'react'
import RotateIcon from '@material-ui/icons/Rotate90DegreesCcw'
import PrintIcon from '@material-ui/icons/Print'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'
import UndoIcon from '@material-ui/icons/Undo'
import RedoIcon from '@material-ui/icons/Redo'
import uniqueString from 'unique-string'
import Template from './Template'
import URLImage from './URLImage'
import Grid from './Grid'
import { gridSize, imageSize } from './constants'
import { useStrictMode, Stage, Layer } from 'react-konva'
import IconButton from '@material-ui/core/IconButton'

useStrictMode(true)

const debounce = (
  fn: { apply: (arg0: undefined, arg1: IArguments) => void },
  ms: number
) => {
  let timer: ReturnType<typeof setTimeout>
  return (_: any) => {
    clearTimeout(timer)
    timer = setTimeout((_) => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  }
}

const getCanvasDimensions = (
  windowWidth: number,
  windowHeight: number,
  verticalOrientation: boolean
) => {
  const proportion = 841.89 / 595.28
  // A4 vertical vs horizontal
  const height = windowHeight
  const width = height / proportion

  return verticalOrientation
    ? { width, height }
    : { width: height, height: width }
}

const Board: React.FC = ({ dragUrl }) => {
  const stageRef = useRef(null)
  const [zoom, setZoom] = useState(100)
  const [verticalOrientation, toggleOrientation] = useState(true)

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const [images, setImages] = useState([])
  const [selectedId, selectShape] = useState(null)
  const [template, setTemplate] = useState('./cubo.svg')

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage()
    if (clickedOnEmpty) {
      selectShape(null)
    }
  }

  const handleResize = (): void => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight })
  }

  const handleSelectTemplate = (e) => {
    selectShape(null)
    // show template options
  }

  const canvasDimensions = getCanvasDimensions(
    dimensions.width,
    dimensions.height,
    verticalOrientation
  )

  React.useEffect(() => {
    const debouncedHandleResize = debounce(handleResize, 1000)
    window.addEventListener('resize', debouncedHandleResize)
    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  })

  const zoomWidth = (canvasDimensions.width * zoom) / 100
  const zoomHeight = (canvasDimensions.height * zoom) / 100

  return (
    <div>
      <IconButton aria-label="print">
        <PrintIcon />
      </IconButton>
      <IconButton
        aria-label="rotate"
        onClick={() => toggleOrientation(!verticalOrientation)}
      >
        <RotateIcon />
      </IconButton>
      <IconButton aria-label="zoom out" onClick={() => setZoom(zoom - 5)}>
        <ZoomOutIcon />
      </IconButton>
      <IconButton aria-label="zoom in" onClick={() => setZoom(zoom + 5)}>
        <ZoomInIcon />
      </IconButton>
      <IconButton aria-label="undo">
        <UndoIcon />
      </IconButton>
      <IconButton aria-label="redo">
        <RedoIcon />
      </IconButton>

      <div
        style={{
          border: 2,
          borderStyle: 'solid',
          borderColor: '#ddd',
          width: `${zoomWidth}px`,
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
          width={zoomWidth}
          height={zoomHeight}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          scale={{ x: zoom / 100, y: zoom / 100 }}
        >
          <Grid
            height={canvasDimensions.height}
            width={canvasDimensions.width}
            gridSize={gridSize}
          />

          <Layer>
            <Template
              width={canvasDimensions.width}
              height={canvasDimensions.height}
              onClick={handleSelectTemplate}
              template={template}
            />
          </Layer>
          <Layer>
            {images.map((image, index) => (
              <URLImage
                key={`image-${index}`}
                image={image}
                zoom={zoom}
                isSelected={image.id === selectedId}
                gridSize={gridSize}
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
