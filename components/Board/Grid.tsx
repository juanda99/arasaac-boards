import React from 'react'
import { Layer, Line, useStrictMode } from 'react-konva'
import { defaultHeight, defaultWidth, defaultGridSize } from './constants'

const Grid = (): JSX.Element => {
  useStrictMode(true)
  const horizontalLines = Math.trunc(defaultHeight / defaultGridSize)
  const verticalLines = Math.trunc(defaultWidth / defaultGridSize)

  return (
    <Layer>
      {[...Array(verticalLines).keys()].map((i) => (
        <Line
          key={`line-vertical-${i}`}
          strokeWidth={1}
          points={[
            Math.round((i + 1) * defaultGridSize),
            0,
            Math.round((i + 1) * defaultGridSize),
            defaultHeight,
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
            Math.round((i + 1) * defaultGridSize),
            defaultWidth,
            Math.round((i + 1) * defaultGridSize),
          ]}
          stroke="#ddd"
        />
      ))}
    </Layer>
  )
}
export default Grid
