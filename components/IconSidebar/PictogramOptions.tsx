import { useState } from 'react'
import Stack from '@mui/material/Stack'
import { useKeywords } from 'utils/hooks'
import SearchBox from 'components/SearchBox'
import PictogramList from 'components/PictogramList'

const PictogramOptions = (): JSX.Element => {
  const [keyword, setKeyword] = useState<string>('')

  const { keywords } = useKeywords('es')
  function handleChange(keyword: string) {
    setKeyword(keyword)
    // eslint-disable-next-line no-console
    console.log('handleChange keywords!!!!!')
  }

  return (
    <Stack spacing={2} mt={5}>
      <SearchBox
        value={keyword}
        label="prueba"
        options={keywords}
        onChange={handleChange}
      />
      <p>Prueba pictogramas </p>
      {keyword && <PictogramList keyword={keyword} language="es" />}
    </Stack>
  )
}

export default PictogramOptions
