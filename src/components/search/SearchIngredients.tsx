import { Box } from '@chakra-ui/react'
import { useState } from 'react'

import { SearchBox } from './SearchBox'

export const SearchIngredients = () => {
  const [searchText, setSearchText] = useState('')

  return (
    <Box>
      <SearchBox
        placeholder='Search for ingredients...'
        value={searchText}
        setValue={setSearchText}
      />
    </Box>
  )
}
