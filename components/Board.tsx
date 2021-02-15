import React, { useState, useRef } from 'react'
import Button from '@material-ui/core/Button'
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

const getHeight = (width: number) => (841.89 / 595.28) * width

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

const Board: React.FC = ({ dragUrl }) => {
  const stageRef = useRef()
  const [printView, setPrintView] = useState(false)
  const [zoom] = useState(90)
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: getHeight(window.innerWidth),
  })

  console.log(dragUrl, '***77*******************************')

  // const dragUrl = React.useRef()
  const [images, setImages] = React.useState([])

  const handleResize = (): void => {
    setDimensions({
      width: window.innerWidth,
      height: getHeight(window.innerWidth),
    })
  }

  const handlePrint = (): void => setPrintView(true)

  React.useEffect(() => {
    const debouncedHandleResize = debounce(handleResize, 1000)
    window.addEventListener('resize', debouncedHandleResize)
    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  })

  const zoomWidth = (dimensions.width * zoom) / 100
  const zoomHeight = (dimensions.height * zoom) / 100
  const padding = zoomWidth / 20
  const horizontalLines = Math.trunc(zoomHeight / padding)
  const verticalLines = Math.trunc(zoomWidth / padding)
  let MyDoc: JSX.Element
  if (printView) {
    const base64Code = stageRef.current.toDataURL()
    MyDoc = (
      <Document>
        <Page size="A4">
          <View>
            <PDFImage src={base64Code} style={styles.img} />
          </View>
        </Page>
      </Document>
    )
  }
  return (
    <div>
      {printView ? (
        <PDFDownloadLink document={MyDoc} fileName="somename.pdf">
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download now!'
          }
        </PDFDownloadLink>
      ) : (
        <Button variant="contained" color="primary" onClick={handlePrint}>
          Imprimir
        </Button>
      )}

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
          // add image
          console.log(e, '9999999999', dragUrl)
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
            {images.map((image) => {
              return <URLImage image={image} />
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  )
}

export default Board
