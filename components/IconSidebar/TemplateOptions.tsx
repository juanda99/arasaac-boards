import React from 'react'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

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
