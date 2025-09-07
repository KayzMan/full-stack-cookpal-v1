import { Heading, Highlight } from '@chakra-ui/react'

import { HomeMealCard } from './HomeMealCard'

export const HomeRandomMeals = () => {
  return (
    <HomeMealCard
      TheHeading={TheHeading}
      endpoint='/api/randomMeals'
      fetchErrorText='Failed to load random meals..'
      queryKey='randomMeals'
      type='randomMeals'
    />
  )
}

const TheHeading = () => {
  return (
    <Heading as={'h1'} fontSize={{ base: 'xl', md: '3xl' }} mb={'4'} px={'8'}>
      <Highlight query={'Random'} styles={{ color: 'appColor' }}>
        Random Meals
      </Highlight>
    </Heading>
  )
}
