import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import {
  Page,
  PDFViewer,
  Image,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer'
import { Stage, Layer, Rect, Text, Line, Group } from 'react-konva'

const padding = 40
const height = 600
const width = 3000

const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const data = b64Data.replace('data:image/png;base64,', '')
  const byteCharacters = atob(data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}
class Board extends Component {
  private stageRef
  state = {
    printView: false,
  }
  constructor(props: never) {
    super(props)
    this.stageRef = React.createRef()
  }

  handlePrint = (): void => this.setState({ printView: true })
  render(): JSX.Element {
    const { printView } = this.state
    let canvasImg: HTMLInputElement
    let MyDoc: JSX.Element
    if (printView) {
      const base64Code = this.stageRef.current.toDataURL()
      console.log(base64Code)
      const data = b64toBlob(base64Code, 'image/png')
      canvasImg = <Image src={base64Code} />
      MyDoc = (
        <Document>
          <Page>
            <View>{canvasImg}</View>
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
        <Stage
          ref={this.stageRef}
          width={window.innerWidth}
          height={window.innerHeight}
        >
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
            {[...Array(1000).keys()].map((i) => (
              <Group key={i}>
                <Line
                  key={`line-vertical-${i}`}
                  points={[
                    Math.round(i * padding) + 0.5,
                    0,
                    Math.round(i * padding) + 0.5,
                    height,
                  ]}
                  tension={0.5}
                  stroke="#ddd"
                />
                <Line
                  key={`line-horizontal-${i}`}
                  points={[
                    0,
                    Math.round(i * padding) + 0.5,
                    width,
                    Math.round(i * padding) + 0.5,
                  ]}
                  tension={0.5}
                  stroke="#ddd"
                />
              </Group>
            ))}
          </Layer>
        </Stage>
      </div>
    )
  }
}

export default Board
