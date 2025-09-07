import { Center, Heading } from '@chakra-ui/react'

// components...
// import { HorizontalScrollMealCategories } from '@/components/Home/HorizontalScrollMealCategories'
// import { HorizontalScrollLatestMeals } from '@/components/Home/HorizontalScrollLatestMeals'
// import { HorizontalScrollRandomMeals } from '@/components/Home/HorizontalScrollRandomMeals'

export const Home = () => {
  return (
    <>
      <Center>
        <Heading as={'h1'}>Home Page!</Heading>
      </Center>
      {/* <HorizontalScrollLatestMeals />
      <HorizontalScrollMealCategories />
      <HorizontalScrollRandomMeals /> */}
    </>
  )
}
