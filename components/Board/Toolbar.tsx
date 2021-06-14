import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
//  import RotateIcon from '@material-ui/icons/Rotate90DegreesCcw'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import PrintIcon from '@material-ui/icons/Print'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'
import UndoIcon from '@material-ui/icons/Undo'
import RedoIcon from '@material-ui/icons/Redo'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolBar: {
      position: 'fixed',
      top: '70px',
      left: '400px',
      margin: '0 auto',
      display: 'flex',
    },
  })
)

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
  const classes = useStyles()
  // const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   changeZoom(event.target.value as number)
  // }

  return (
    // TODO  GRID SIZE, GRID COLOR, REMOVE GRID, IMAGE SIZE, ADJUST TO GRID
    <div className={classes.toolBar}>
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
    </div>
  )
}

export default Toolbar
