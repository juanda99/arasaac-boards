import React, { useState, useRef, useEffect } from 'react'
import { Image, Transformer } from 'react-konva'
import useImage from 'use-image'

type ImageType = {
  x: number
  y: number
  src: string
}
type Props = {
  image: ImageType
  isSelected: boolean
  gridSize: number
  onSelect: (item: any) => void
  onChange: (item: any) => void
}

const BackgroundImage = ({
  image,
  isSelected,
  onSelect,
  onChange,
}: Props): JSX.Element => {
  const [img] = useImage(image.src, 'Anonymous')
  const [isDragging, setDragging] = useState(false)
  const shapeRef = useRef(null)
  const trRef = useRef(null)
  // const [position, setPosition] = useState({ x: 100, y: 100 })

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current])
    }
  }, [isSelected])

  return (
    <>
      <Image
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        image={img}
        {...image}
        draggable
        // style={isDragging ? { backgroundColor: 'grey' } : ''}
        style={{ backgroundColor: 'blue' }}
        onDragStart={() => {
          setDragging(true)
        }}
        onDragEnd={(e) => {
          image.x = e.target.x()
          image.y = e.target.y()
          setDragging(false)
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()

          // we will reset it back
          node.scaleX(1)
          node.scaleY(1)
          onChange({
            ...image,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          })
        }}
        shadowBlur={isDragging ? 10 : 0}
      />

      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox
            }
            return newBox
          }}
        />
      )}
    </>
  )
}

export default BackgroundImage
