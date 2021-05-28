/* eslint no-mixed-operators: 0 */
import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { CirclePicker, ChromePicker } from 'react-color'

type Props = {
  color: string
  colors: string[]
  onChooseColor: (text: string) => void
}

const ColorPicker = ({ color, colors, onChooseColor }: Props): JSX.Element => {
  const [showMoreColors, setShowMoreColors] = useState(false)

  const handleColorChange = ({ hex }) => onChooseColor(hex)

  const handleClick = () => setShowMoreColors(true)

  return showMoreColors ? (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ChromePicker color={color} onChangeComplete={handleColorChange} />
      </div>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '20', width: '100%' }}
        onClick={handleClick}
      >
        Ver menos colores
        {/* <FormattedMessage {...messages.showLessColors} /> */}
      </Button>
    </div>
  ) : (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CirclePicker
          color={color}
          colors={colors}
          onChangeComplete={handleColorChange}
          width={300}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '20', width: '100%' }}
        onClick={handleClick}
      >
        Ver más colores
        {/* <FormattedMessage {...messages.showLessColors} /> */}
      </Button>
    </div>
  )
}

export default ColorPicker
