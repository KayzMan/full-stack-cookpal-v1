import { Center, Flex, Heading, Highlight } from '@chakra-ui/react'
import { GridMealCards } from '@/components/GridMealCards'
import { MdOutlineFastfood } from 'react-icons/md'

export const MealCategories = () => {
  return (
    <GridMealCards
      TheHeading={() => <TheHeading />}
      currentPageText={'Meal Categories'}
      endpoint='/api/mealCategories'
      queryKey='mealCategories'
      fetchErrorText={'Failed to load meal categories...'}
      type='mealCategories'
    />
  )
}

const TheHeading = () => {
  return (
    <Center mb={'10'}>
      <Heading as={'h1'} fontSize={{ base: '2xl', md: '5xl' }}>
        <Flex alignItems={'center'} gap={'1'} color={'appColor'}>
          <MdOutlineFastfood style={{ marginRight: '0.5em' }} />
          <Highlight query={'Categories'} styles={{ color: 'InfoText' }}>
            Meal Categories
          </Highlight>
        </Flex>
      </Heading>
    </Center>
  )
}
