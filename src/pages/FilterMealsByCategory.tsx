import { Flex, Text } from '@chakra-ui/react'
import { GridMealCards } from '@/components/GridMealCards'
import { useParams } from 'react-router-dom'
import { TransparentHeading } from '@/components/TransparentHeading'

export const FilterMealsByCategory = () => {
  const params = useParams()

  return (
    <GridMealCards
      TheHeading={() => <TheHeading params={params} />}
      currentPageText={params.c || ''}
      categoryText={params.c || ''}
      endpoint={`/api/filterMealsByCategory?c=${params.c}`}
      queryKey='mealsByCategory'
      queryParams={{ c: params.c }}
      fetchErrorText={'Failed to load meals by category...'}
      type='filterMeals'
    />
  )
}

const TheHeading = ({ params }: { params: { c?: string } }) => {
  return (
    <TransparentHeading>
      <Flex alignItems={'center'} gap={'2'}>
        <Text>Meals,</Text>
        <Text color={'appColor'}>
          {'by '}
          {params.c || ''}
        </Text>
      </Flex>
    </TransparentHeading>
  )
}
