import React from 'react'
import GridList from '@mui/material/GridList'
import GridListTile from '@mui/material/GridListTile'
import { styled } from '@mui/material/styles'

const StyledDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  justifyContent: 'center',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper
}))


const StyledImg = styled('img')({
  ':hover, :focus:' {
    border: '5px solid #333333'
  },
  width: 200,
  height: 150
});


/*
  Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
  transform: translateZ(0),
*/

const StyledGridList = styled(GridList)({
  flexwrap: 'nowrap',
  transform: 'translateZ(0)'
});


// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({

//     gridList: {
//       flexWrap: 'nowrap',
//       // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
//       transform: 'translateZ(0)',
//     },
//     title: {
//       color: theme.palette.primary.light,
//     },
//     img: {

//     },
//   })
// )

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
;<div
  css={css`
    padding: 32px;
    background-color: hotpink;
    font-size: 24px;
    border-radius: 4px;
    &:hover {
      color: ${color};
    }
  `}
></div>

const SingleLineGridList = ({ data, onClick }: Props): JSX.Element => {
  return (
    <StyledDiv>
      <StyledGridList cols={10}>
        {data.map((item) => (
          <GridListTile key={item.desc}>
            <StyledImg
              src={item.img}
              alt={item.desc}
              onClick={() => onClick(item)}
            />
          </GridListTile>
        ))}
      </StyledGridList>
    </StyledDiv>
  )
}

export default SingleLineGridList
