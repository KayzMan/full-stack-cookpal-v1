import { Box } from '@chakra-ui/react'

// components...
import { HomeMealCategories } from '@/components/Home/HomeMealCategories'
import { HomeLatestMeals } from '@/components/Home/HomeLatestMeals.tsx'

export const Home = () => {
  return (
    <Box my={'4'}>
      <HomeLatestMeals />
      <HomeMealCategories />
    </Box>
  )
}
