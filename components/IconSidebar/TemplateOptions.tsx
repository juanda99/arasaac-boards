import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
  })
)

const GridOptions = (): JSX.Element => {
  const [showGrid, setShowGrid] = React.useState(true)
  const [gridSize, setGridSize] = React.useState(10)

  const handleGridSize = (gridSize: number) =>
    console.log(`changing grid size to ${gridSize}`)
  const handleShowGrid = (showGrid: boolean) =>
    console.log(`changing  show Grid to ${showGrid}`)
  const gridOptions = [...Array(201).keys()]

  return (
    <div>
      <FormControl component="fieldset">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={showGrid}
                onChange={handleShowGrid}
                name="showGrid"
              />
            }
            label="Show grid"
          />
        </FormGroup>
      </FormControl>
      <Autocomplete
        options={gridOptions}
        getOptionLabel={(option) => `${option}px`}
        value={gridSize}
        onChange={(event: any, newValue: string | null) => {
          handleGridSize(parseInt(newValue))
        }}
        disableClearable={true}
        renderInput={(params) => (
          <TextField {...params} label="Grid size" style={{ width: 140 }} />
        )}
      />
    </div>
  )
}

export default GridOptions
