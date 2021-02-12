import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import {
  Page,
  Image,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer'
import { Stage, Layer, Rect, Text, Line, Group } from 'react-konva'

const getHeight = (width: number) => (841.89 / 595.28) * width

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
})
class Board extends Component {
  private stageRef

  state = {
    printView: false,
    width: window.innerWidth,
    height: getHeight(window.innerWidth),
    zoom: 90,
  }

  constructor(props: never) {
    super(props)
    this.stageRef = React.createRef()
  }

  handleWindowResize = (): void => {
    this.setState({
      width: window.innerWidth,
      height: getHeight(window.innerWidth),
    })
  }

  componentDidMount(): void {
    window.addEventListener('resize', this.handleWindowResize)
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.handleWindowResize)
  }

  handlePrint = (): void => this.setState({ printView: true })
  render(): JSX.Element {
    const { printView, width, height, zoom } = this.state
    const zoomWidth = (width * zoom) / 100
    const zoomHeight = (height * zoom) / 100
    const padding = zoomWidth / 20
    const horizontalLines = Math.trunc(zoomHeight / padding)
    const verticalLines = Math.trunc(zoomWidth / padding)
    let MyDoc: JSX.Element
    if (printView) {
      const base64Code = this.stageRef.current.toDataURL()
      MyDoc = (
        <Document>
          <Page size="A4">
            <View>
              <Image src={base64Code} style={styles.img} />
            </View>
          </Page>
        </Document>
      )
    }
    return printView ? (
      <PDFDownloadLink document={MyDoc} fileName="somename.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download now!'
        }
      </PDFDownloadLink>
    ) : (
      <div>
        <Button variant="contained" color="primary" onClick={this.handlePrint}>
          Imprimir
        </Button>
        <div
          style={{
            border: 2,
            borderStyle: 'solid',
            borderColor: '#ddd',
            width: `${zoomWidth}px`,
            margin: '0 auto',
          }}
        >
          <Stage ref={this.stageRef} width={zoomWidth} height={zoomHeight}>
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
                    height,
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
                    width,
                    Math.round((i + 1) * padding) + 0.5,
                  ]}
                  tension={0.5}
                  stroke="#ddd"
                />
              ))}
            </Layer>
          </Stage>
        </div>
      </div>
    )
  }
}

export default Board
