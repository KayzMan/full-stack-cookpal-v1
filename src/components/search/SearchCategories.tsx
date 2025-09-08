import { Box } from '@chakra-ui/react'
import { useState } from 'react'

import { SearchBox } from './SearchBox'

export const SearchCategories = () => {
  const [searchText, setSearchText] = useState('')

  return (
    <Box>
      <SearchBox
        placeholder='Search for categories...'
        value={searchText}
        setValue={setSearchText}
      />
    </Box>
  )
}
