import React from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';


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
  </Stage>
)

export default Board
