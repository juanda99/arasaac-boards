import React from 'react'
import useImage from 'use-image'
import { Image } from 'react-konva'
import { defaultHeight, defaultWidth } from './constants'

// TODO:  fix typescript  issues  with  konva types

interface Props {
  onClick: (e: KonvaEventObject<MouseEvent>) => void
  template: string
}

const Template = ({ onClick, template }: Props): JSX.Element => {
  const [image] = useImage(template)
  const handleSelect = (e: KonvaEventObject<MouseEvent>) => onClick(e)
  return (
    <Image
      image={image}
      width={defaultWidth}
      height={defaultHeight}
      onClick={handleSelect}
    />
  )
}

export default Template
