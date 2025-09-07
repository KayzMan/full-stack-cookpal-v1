import { Flex, Highlight } from '@chakra-ui/react'
import { GridMealCards } from '@/components/GridMealCards'
import { MdOutlineFastfood } from 'react-icons/md'
import { TransparentHeading } from '@/components/TransparentHeading'

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
    <TransparentHeading>
      <Flex alignItems={'center'} gap={'1'} color={'appColor'}>
        <MdOutlineFastfood style={{ marginRight: '0.5em' }} />
        <Highlight query={'Categories'} styles={{ color: 'InfoText' }}>
          Meal Categories
        </Highlight>
      </Flex>
    </TransparentHeading>
  )
}
