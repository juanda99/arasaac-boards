import React, { FC, ReactElement } from 'react'
import { Layer, Line } from 'react-konva'

interface Props {
  width: number
  height: number
  gridSize: number
}

const Grid: FC<Props> = ({ width, height, gridSize }): ReactElement => {
  const horizontalLines = Math.trunc(height / gridSize)
  const verticalLines = Math.trunc(width / gridSize)

  return (
    <Layer>
      {[...Array(verticalLines).keys()].map((i) => (
        <Line
          key={`line-vertical-${i}`}
          strokeWidth={1}
          points={[
            Math.round((i + 1) * gridSize),
            0,
            Math.round((i + 1) * gridSize),
            height,
          ]}
          stroke="#ddd"
        />
      ))}
      {[...Array(horizontalLines).keys()].map((i) => (
        <Line
          key={`line-horizontal-${i}`}
          strokeWidth={1}
          points={[
            0,
            Math.round((i + 1) * gridSize),
            width,
            Math.round((i + 1) * gridSize),
          ]}
          stroke="#ddd"
        />
      ))}
    </Layer>
  )
}
export default Grid
