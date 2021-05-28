import React from 'react'
import useImage from 'use-image'
import { Image, useStrictMode } from 'react-konva'
import Konva from 'konva'

// TODO:  fix typescript  issues  with  konva types

interface Props {
  onClick: (e: Konva.KonvaEventObject<MouseEvent>) => void
  template: string
  width: number
  height: number
}

const Template = ({ onClick, template, width, height }: Props): JSX.Element => {
  useStrictMode(true)
  const [image] = useImage(template)
  const handleSelect = (e: Konva.KonvaEventObject<MouseEvent>) => onClick(e)
  return (
    <Image image={image} width={width} height={height} onClick={handleSelect} />
  )
}

export default Template
