import {
  Box,
  Center,
  Flex,
  Heading,
  Highlight,
  SimpleGrid,
  Card,
  Image,
  Button,
  Skeleton,
  Text,
  For,
} from '@chakra-ui/react'
import { GiMeal } from 'react-icons/gi'
import { HiMiniArrowRight } from 'react-icons/hi2'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import { FloatingBackButton } from '@/components/navigation/FloatingBackButton'

import type { categoryType } from '@/lib/types'

export function MealCategories() {
  const { isPending, data, error, isError } = useQuery({
    queryKey: ['allCategories'],
    queryFn: async () => {
      const res = await fetch(`/api/mealCategories`)
      return await res.json()
    },
  })

  if (error || isError || data?.error) {
    return (
      <Box gap={'5'}>
        <Heading as={'h1'} fontSize={'xl'} color={'orangered'}>
          Failed to load meal categories...
        </Heading>
        <MealCategoryGridItemsSkeleton />

        <FloatingBackButton
          title='Home'
          currentPage='Meal Categories'
          url='/'
        />
      </Box>
    )
  }

  return (
    <Box mt={'8'} gap={'10'}>
      {/* heading */}
      <Center mb={'10'}>
        <Heading as={'h1'} fontSize={{ base: '2xl', md: '5xl' }}>
          <Flex alignItems={'center'} gap={'1'} color={'appColor'}>
            <GiMeal style={{ marginRight: '0.5em' }} />
            <Highlight query={'Meal'} styles={{ color: 'ButtonText' }}>
              Meal Categories
            </Highlight>
          </Flex>
        </Heading>
      </Center>

      {isPending ? (
        <MealCategoryGridItemsSkeleton />
      ) : (
        <SimpleGrid columns={[1, 2, 2, 3, 3, 4]} gap={'4'}>
          <For each={data.categories || []}>
            {(item: categoryType, index: number) => (
              <MealCategoryGridItem
                item={item}
                index={index}
                key={`${index}-${item.idCategory}`}
              />
            )}
          </For>
        </SimpleGrid>
      )}

      <FloatingBackButton title='Home' currentPage='Meal Categories' url='/' />
    </Box>
  )
}

const MealCategoryGridItem = ({
  index,
  item,
}: {
  item: categoryType
  index: number
}) => {
  return (
    <Link to={`/mealCategories/${item.strCategory}`}>
      <Card.Root
        cursor={'pointer'}
        overflow='hidden'
        key={`${index}-${item.idCategory}`}
        _hover={{ shadow: 'lg' }}
      >
        <Image
          src={item.strCategoryThumb}
          alt={`${item.strCategory}-image`}
          pb={0}
        />
        <Card.Body gap='2'>
          <Card.Title>{item.strCategory}</Card.Title>
          <Card.Description>
            <Text truncate>{item.strCategoryDescription}</Text>
          </Card.Description>
        </Card.Body>
        <Card.Footer gap='2' justifyContent={'flex-end'}>
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
