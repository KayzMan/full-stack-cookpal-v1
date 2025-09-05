import {
  Box,
  Heading,
  Skeleton,
  SimpleGrid,
  Button,
  Card,
  For,
  Image,
  Center,
  Flex,
  Badge,
  Text,
} from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { HiMiniArrowRight } from 'react-icons/hi2'
import { GiMeal } from 'react-icons/gi'
import { FloatingBackButton } from '@/components/navigation/FloatingBackButton'

import type { mealType } from '@/lib/types'

export const FilterMealsByCategory = () => {
  const params = useParams()

  const { isPending, data, error, isError } = useQuery({
    queryKey: ['mealsByCategory', { c: params.c }],
    queryFn: async () => {
      const fetchString = `/api/filterMealsByCategory?c=${params.c}`
      const res = await fetch(fetchString)
      return await res.json()
    },
  })

  if (error || isError || data?.error) {
    return (
      <Box gap={'5'}>
        <Heading as={'h1'} fontSize={'xl'} color={'orangered'}>
          Failed to load meals by category...
        </Heading>
        <MealCategoryGridItemsSkeleton />

        <FloatingBackButton
          title='Categories'
          currentPage={`${params.c || ''}`}
          url='/mealCategories'
        />
      </Box>
    )
  }

  return (
    <Box mt={'8'} gap={'10'}>
      {/* heading */}
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

      {isPending ? (
        <MealCategoryGridItemsSkeleton />
      ) : (
        <SimpleGrid columns={[1, 1, 2, 3, 3, 4]} gap={'4'}>
          <For each={data.meals || []}>
            {(item: mealType, index: number) => (
              <MealCategoryGridItem
                item={item}
                index={index}
                key={`${index}-${item.idMeal}`}
              />
            )}
          </For>
        </SimpleGrid>
      )}

      <FloatingBackButton
        title='Categories'
        currentPage={`${params.c || ''}`}
        url='/mealCategories'
      />
    </Box>
  )
}

const MealCategoryGridItem = ({
  index,
  item,
}: {
  item: mealType
  index: number
}) => {
  const params = useParams()

  return (
    <Link to={`/mealCategories/${params.c}/${item.idMeal}`}>
      <Card.Root
        overflow='hidden'
        key={`${index}-${item.idMeal}`}
        _hover={{ shadow: 'lg' }}
      >
        <Image src={item.strMealThumb} alt={`${item.strMeal}-image`} pb={0} />
        <Card.Body gap='2'>
          <Card.Title>{item.strMeal}</Card.Title>
        </Card.Body>
        <Card.Footer gap='2' justifyContent={'space-between'}>
          <Badge
            variant={'outline'}
            color={'appColor'}
            size={{ base: 'md', md: 'lg' }}
          >
            <GiMeal />
            {params.c}
          </Badge>

          <Button variant='outline' _hover={{ bg: 'appColorShade.100' }}>
            <HiMiniArrowRight />
          </Button>
        </Card.Footer>
      </Card.Root>
    </Link>
  )
}

const MealCategoryGridItemsSkeleton = () => {
  return (
    <SimpleGrid columns={[1, 1, 2, 3, 3, 4]} gap={'4'}>
      <For each={[1, 2, 3, 4, 5, 6]}>
        {(_, index: number) => <MealCategoryGridItemSkeleton key={index} />}
      </For>
    </SimpleGrid>
  )
}

const MealCategoryGridItemSkeleton = () => {
  return (
    <Card.Root overflow={'hidden'}>
      <Skeleton width={'full'} height={'60'} />
      <Card.Body gap='2'>
        <Card.Title>
          <Skeleton height={'5'} width={'100px'} />
        </Card.Title>
        <Card.Description>
          <Skeleton height={'5'} width={'80%'} />
        </Card.Description>
      </Card.Body>
      <Card.Footer gap='2' justifyContent={'flex-end'}>
        <Button variant='outline'>
          <Skeleton height={'2'} width={'4'} />
        </Button>
      </Card.Footer>
    </Card.Root>
  )
}
