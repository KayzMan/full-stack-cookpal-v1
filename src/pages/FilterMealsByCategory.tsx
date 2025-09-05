import { Center, Flex, Heading, Text } from '@chakra-ui/react'
import { GridMealCards } from '@/components/GridMealCards'
import { useParams } from 'react-router-dom'

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
    <Center
      mb={'12'}
      position={{ base: 'relative', lg: 'sticky' }}
      top={{ base: 0, lg: '6' }}
      zIndex={{ base: 0, lg: '1000' }}
    >
      <Heading as={'h1'} fontSize={{ base: '2xl', md: '4xl' }}>
        <Flex alignItems={'center'} gap={'2'}>
          <Text>Meals,</Text>
          <Text color={'appColor'}>
            {'by '}
            {params.c || ''}
          </Text>
        </Flex>
      </Heading>
    </Center>
  )
}
