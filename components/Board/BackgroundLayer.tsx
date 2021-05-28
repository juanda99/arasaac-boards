import React from 'react'
import { Layer, Rect } from 'react-konva'

type Props = {
  width: number
  height: number
  color: string
}
const BackgroundLayer = ({ color, width, height }: Props): JSX.Element => {
  return (
    <Layer>
      <Rect fill={color} width={width} height={height} />
    </Layer>
  )
}

export default BackgroundLayer
