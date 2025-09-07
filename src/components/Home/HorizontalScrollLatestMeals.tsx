import { Heading, Highlight } from '@chakra-ui/react'

import { HorizontalScrollMealCard } from './HorizontalScrollMealCard'

export const HorizontalScrollLatestMeals = () => {
  return (
    <HorizontalScrollMealCard
      TheHeading={TheHeading}
      endpoint='/api/latestMeals'
      fetchErrorText='Failed to load latest meals..'
      queryKey='latestMealsByCategory'
      type='latestMeals'
    />
  )
}

const TheHeading = () => {
  return (
    <Heading as={'h1'} fontSize={{ base: 'xl', md: '3xl' }} mb={'4'} px={'8'}>
      <Highlight query={'Latest'} styles={{ color: 'appColor' }}>
        Latest Meals
      </Highlight>
    </Heading>
  )
}
