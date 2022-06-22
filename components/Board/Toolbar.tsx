import React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
//  import RotateIcon from '@md/Rotate90DegreesCcw'
import PrintIcon from '@mui/icons-material/Print'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import ZoomOutIcon from '@mui/icons-material/ZoomOut'
import UndoIcon from '@mui/icons-material/Undo'
import RedoIcon from '@mui/icons-material/Redo'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/system'

const StyledDiv = styled('div')({
  position: 'fixed',
  top: 70,
  left: 400,
  margin: '0 auto',
  display: 'flex',
})

const zoomOptions = [...Array(201).keys()].filter(
  (item) => item % 5 === 0 && item > 45
)

type Props = {
  pictoSize: number
  gridSize: number
  zoom: number
  changeZoom: (zoom: number) => void
  changePictoSize: (size: number) => void
  changeGridSize: (size: number) => void
}

const Toolbar = ({
  pictoSize,
  gridSize,
  zoom,
  changeZoom,
  changePictoSize,
  changeGridSize,
}: Props): JSX.Element => {
  // const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   changeZoom(event.target.value as number)
  // }

  return (
    // TODO  GRID SIZE, GRID COLOR, REMOVE GRID, IMAGE SIZE, ADJUST TO GRID
    <StyledDiv>
      <IconButton aria-label="print">
        <PrintIcon />
      </IconButton>
      {/* <IconButton
        aria-label="rotate"
        onClick={() => toggleOrientation(!verticalOrientation)}
      >
        <RotateIcon />
      </IconButton> */}
      <IconButton aria-label="zoom out" onClick={() => changeZoom(zoom - 5)}>
        <ZoomOutIcon />
      </IconButton>
      <IconButton aria-label="zoom in" onClick={() => changeZoom(zoom + 5)}>
        <ZoomInIcon />
      </IconButton>

      <Autocomplete
        options={zoomOptions}
        getOptionLabel={(option) => `${option}%`}
        value={zoom}
        onChange={(event: any, newValue: string | null) => {
          changeZoom(parseInt(newValue))
        }}
        disableClearable={true}
        renderInput={(params) => (
          <TextField {...params} label="Zoom" style={{ width: 70 }} />
        )}
      />

      {/* <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        inputProps={{
          maxLength: 10,
          size: 10,
          height. 
        }}
        value={zoom}
        
      >
        {[...Array(201).keys()].map((item) => (
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        ))}
      </Select> */}

      <IconButton aria-label="undo">
        <UndoIcon />
      </IconButton>
      <IconButton aria-label="redo">
        <RedoIcon />
      </IconButton>
    </StyledDiv>
  )
}

export default Toolbar
