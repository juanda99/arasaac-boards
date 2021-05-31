import React, { useContext } from 'react'
import { DragImageContext } from 'pages/boards/[template]'
const PictogramOptions = (): JSX.Element => {
  const handleDrag = useContext(DragImageContext)
  return (
    <div>
      <p>Prueba pictogramas </p>
      <img
        alt="lion"
        src="https://static.arasaac.org/pictograms/27509/27509_300.png"
        draggable="true"
        style={{ width: '100px', height: '100px' }}
        onDragStart={(e) => {
          handleDrag(e.target.src)
        }}
      />
    </div>
  )
}

export default PictogramOptions
