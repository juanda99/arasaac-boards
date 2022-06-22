import { useState, useEffect } from 'react'
import { usePictograms } from 'utils/hooks'
import LoadingProgress from 'components/LoadingProgress'
import PictogramItem from 'components/PictogramItem'
import { styled } from '@mui/material/styles'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Pictogram } from 'utils/types'

const List = styled('ul')({
  listStyleType: 'none',
  display: 'flex',
  width: '340px',
  flexWrap: 'wrap',
  paddingLeft: 0,
})

const ListItem = styled('li')({
  padding: '5px',
})

interface Props {
  keyword: string
  language: string
}

const PictogramList = ({ keyword, language }: Props): JSX.Element => {
  const [numPictos, setNumPictos] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(false)
  const { pictograms, isLoading, isError } = usePictograms(keyword, language)

  useEffect(() => {
    console.log(pictograms, numPictos, '8888889999999')
    numPictos && setHasMore(pictograms.length > numPictos)
  }, [pictograms, numPictos])

  useEffect(() => {
    console.log(pictograms, '9999999')
    pictograms && setNumPictos(20)
  }, [pictograms])

  const fetchMoreData = () => {
    setNumPictos((numPictos) => numPictos + 20)
  }

  const visiblePictos = pictograms ? pictograms.slice(0, numPictos) : []

  return (
    <>
      {isLoading && <LoadingProgress />}
      {isError && <p>{isError}</p>}
      {numPictos ? (
        <List>
          <InfiniteScroll
            dataLength={numPictos}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            height={400}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {visiblePictos.map((pictogram) => (
              <ListItem key={pictogram._id}>
                <PictogramItem pictogram={pictogram} />
              </ListItem>
            ))}
          </InfiniteScroll>
        </List>
      ) : (
        <p>No se han encontrado pictogramas</p>
      )}
    </>
  )
}

export default PictogramList
