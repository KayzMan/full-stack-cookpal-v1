import { Box } from '@chakra-ui/react'
import { useState } from 'react'

import { SearchBox } from './SearchBox'

export const SearchAreas = () => {
  const [searchText, setSearchText] = useState('')
  return (
    <Box>
      <SearchBox
        placeholder='Search for areas...'
        value={searchText}
        setValue={setSearchText}
      />
    </Box>
  )
}
