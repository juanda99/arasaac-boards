import React, { FC, ReactElement } from 'react'
import useImage from 'use-image'
import { Image } from 'react-konva'

// TODO:  fix typescript  issus  with  konva types

interface Props {
  width: number
  height: number
  onClick: (e: KonvaEventObject<MouseEvent>) => void
  template: string
}

const Template: FC<Props> = ({
  width,
  height,
  onClick,
  template,
}): ReactElement => {
  const [image] = useImage(template)
  const handleSelect = (e: KonvaEventObject<MouseEvent>) => onClick(e)
  return (
    <Image image={image} width={width} height={height} onClick={handleSelect} />
  )
}

export default Template
