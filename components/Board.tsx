import React from 'react'
import { Stage, Layer, Rect, Text, Line, Group } from 'react-konva'

const padding = 40
const height = 600
const width = 3000

const Board = (): JSX.Element => (
  <Stage width={window.innerWidth} height={window.innerHeight}>
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
      {[...Array(1000).keys()].map((i) => {
        console.log(
          Math.round(i * padding) + 0.5,
          '****************************************************'
        )
        return (
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
        )
      })}
    </Layer>
  </Stage>
)

export default Board
