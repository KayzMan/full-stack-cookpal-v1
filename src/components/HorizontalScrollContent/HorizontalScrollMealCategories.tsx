import { Heading, Flex, Box, Highlight, IconButton } from '@chakra-ui/react'
import { MdNavigateNext } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { HorizontalScrollMealCard } from './HorizontalScrollMealCard'

export const HorizontalScrollMealCategories = () => {
  return (
    <HorizontalScrollMealCard
      TheHeading={TheHeading}
      endpoint='/api/mealCategories'
      fetchErrorText='Failed to fetch meal categories...'
      queryKey='allCategories'
      type='categories'
    />
  )
}

const TheHeading = () => {
  return (
    <Heading as={'h1'} fontSize={{ base: 'xl', md: '3xl' }} mb={'4'} px={'8'}>
      <Flex alignItems={'center'} gap={'4'}>
        <Box>
          <Highlight query={'Meal'} styles={{ color: 'appColor' }}>
            Meal Categories
          </Highlight>
        </Box>

        <Link to={'/mealCategories'}>
          <IconButton
            variant={'surface'}
            color={'appColor'}
            size={{ base: 'xs', md: 'md' }}
            rounded={'full'}
          >
            <MdNavigateNext />
          </IconButton>
        </Link>
      </Flex>
    </Heading>
  )
}
