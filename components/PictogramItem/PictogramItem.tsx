import { useContext } from 'react'
import Paper from '@mui/material/Paper'
import { Pictogram } from 'utils/types'
import { DragImageContext } from 'pages/boards/[template]'

interface Props {
  pictogram: Pictogram
}

const PictogramItem = ({ pictogram }: Props): JSX.Element => {
  const handleDrag = useContext(DragImageContext)
  const { _id, keywords } = pictogram
  const src = `https://static.arasaac.org/pictograms/${_id}/${_id}_300.png`
  const alt = keywords.length ? keywords[0]?.keyword : ''

  return (
    <Paper>
      <img
        alt={alt}
        src={src}
        draggable="true"
        style={{ width: '100px', height: '100px' }}
        onDragStart={(e) => {
          handleDrag(e.target.src)
        }}
      />
    </Paper>
  )
}

export default PictogramItem
