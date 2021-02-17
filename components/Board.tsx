import React, { useState, useRef } from 'react'
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty'
import RotateIcon from '@material-ui/icons/Rotate90DegreesCcw'
import PrintIcon from '@material-ui/icons/Print'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'
import DownloadIcon from '@material-ui/icons/GetApp'
import UndoIcon from '@material-ui/icons/Undo'
import RedoIcon from '@material-ui/icons/Redo'
import {
  Page,
  Image as PDFImage,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer'
import { Stage, Layer, Rect, Text, Line, Image, Group } from 'react-konva'
import useImage from 'use-image'
import IconButton from '@material-ui/core/IconButton'

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

const URLImage = ({ image }) => {
  const [img] = useImage(image.src, 'Anonymous')
  const [isDragging, setDragging] = useState(false)
  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
      width={200}
      height={200}
      draggable
      onDragStart={() => {
        setDragging(true)
      }}
      onDragEnd={(e) => {
        setDragging(false)
        console.log(
          `move existing image to new cooordinates ${JSON.stringify(image)}`
        )
      }}
      shadowBlur={isDragging ? 10 : 0}
      // I will use offset to set origin to the center of the image
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
    />
  )
}

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
})

// const getDimensions = (verticalOrientation: boolean) => {
//   const proportion = verticalOrientation ? 841.89 / 595.28 : 595.28 / 841.89 // A4 vertical vs horizontal
//   let width = window.innerWidth
//   let height = proportion * width
//   if (height > window.innerHeight) {
//     height = window.innerHeight
//     width = height / proportion
//   }
//   return { width, height }
// }

const getCanvasDimensions = (
  windowWidth: number,
  windowHeight: number,
  verticalOrientation: boolean
) => {
  const proportion = 841.89 / 595.28
  // A4 vertical vs horizontal
  const height = windowHeight - 150
  const width = height / proportion

  return verticalOrientation
    ? { width, height }
    : { width: height, height: width }
}

const Board: React.FC = ({ dragUrl }) => {
  const stageRef = useRef()
  const [printView, setPrintView] = useState(false)
  const [zoom, setZoom] = useState(100)
  const [verticalOrientation, toggleOrientation] = useState(true)

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  // const dragUrl = React.useRef()
  const [images, setImages] = React.useState([])

  // const handleResize = (): void => {
  //   setDimensions(getDimensions(verticalOrientation))
  // }

  const handleResize = (): void => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight })
  }

  const canvasDimensions = getCanvasDimensions(
    dimensions.width,
    dimensions.height,
    verticalOrientation
  )

  const handlePrint = (): void => setPrintView(true)

  React.useEffect(() => {
    const debouncedHandleResize = debounce(handleResize, 1000)
    window.addEventListener('resize', debouncedHandleResize)
    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  })

  const zoomWidth = (canvasDimensions.width * zoom) / 100
  const zoomHeight = (canvasDimensions.height * zoom) / 100
  const padding = 50 // zoomWidth / 5
  const horizontalLines = Math.trunc(zoomHeight / padding)
  const verticalLines = Math.trunc(zoomWidth / padding)
  let MyDoc: JSX.Element
  if (printView) {
    const base64Code = stageRef.current.toDataURL()
    MyDoc = (
      <Document>
        <Page size="A4" orientation="landscape">
          <View>
            <PDFImage src={base64Code} style={styles.img} />
          </View>
        </Page>
      </Document>
    )
  }
  console.log(dimensions)
  console.log('render  again!!!!!!!!!!!!!!!!!!!!!')
  return (
    <div>
      {printView ? (
        <PDFDownloadLink document={MyDoc} fileName="somename.pdf">
          {({ blob, url, loading, error }) =>
            loading ? (
              <IconButton aria-label="wait" onClick={handlePrint}>
                <HourglassEmptyIcon />
              </IconButton>
            ) : (
              <IconButton aria-label="download" onClick={handlePrint}>
                <DownloadIcon />
              </IconButton>
            )
          }
        </PDFDownloadLink>
      ) : (
        <IconButton aria-label="rotate" onClick={handlePrint}>
          <PrintIcon />
        </IconButton>
      )}

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
          //  add element to specifics coordinates
          // register event position
          stageRef.current.setPointersPositions(e)

          setImages(
            images.concat([
              {
                ...stageRef.current.getPointerPosition(),
                src: dragUrl,
              },
            ])
          )
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <Stage ref={stageRef} width={zoomWidth} height={zoomHeight}>
          <Layer>
            <Text text="Try click on rect" />
            <Rect
              x={20}
              y={20}
              width={50}
              height={50}
              color={'green'}
              shadowBlur={5}
            />
          </Layer>
          <Layer>
            {[...Array(verticalLines).keys()].map((i) => (
              <Line
                key={`line-vertical-${i}`}
                points={[
                  Math.round((i + 1) * padding) + 0.5,
                  0,
                  Math.round((i + 1) * padding) + 0.5,
                  dimensions.height,
                ]}
                tension={0.5}
                stroke="#ddd"
              />
            ))}
            {[...Array(horizontalLines).keys()].map((i) => (
              <Line
                key={`line-horizontal-${i}`}
                points={[
                  0,
                  Math.round((i + 1) * padding) + 0.5,
                  dimensions.width,
                  Math.round((i + 1) * padding) + 0.5,
                ]}
                tension={0.5}
                stroke="#ddd"
              />
            ))}
          </Layer>
          <Layer>
            {images.map((image, index) => {
              return <URLImage key={`image-${index}`} image={image} />
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  )
}

export default Board
