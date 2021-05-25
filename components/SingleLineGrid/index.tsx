import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
      justifyContent: 'center',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    img: {
      '&:hover, &:focus': {
        border: '5px solid #333333;',
      },
      width: '200px',
      height: '150px',
    },
  })
)

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

export type TemplateItem = {
  src: string
  img: string
  desc: string
  landscape: boolean
  gridSize: number
  imageSize: number
}
type Props = {
  data: TemplateItem[]
  onClick: (item: TemplateItem) => void
}

const SingleLineGridList = ({ data, onClick }: Props): JSX.Element => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={10}>
        {data.map((item) => (
          <GridListTile key={item.desc}>
            <img
              className={classes.img}
              src={item.img}
              alt={item.desc}
              onClick={() => onClick(item)}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

export default SingleLineGridList
