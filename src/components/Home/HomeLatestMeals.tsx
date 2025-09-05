import {
  Box,
  Heading,
  ScrollArea,
  For,
  Flex,
  Text,
  Card,
  Image,
  Button,
  Skeleton,
  Highlight,
} from '@chakra-ui/react'
import { HiMiniArrowRight } from 'react-icons/hi2'
import type { ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import type { mealType } from '@/lib/types'

export function HomeLatestMeals() {
  const { isPending, data, error, isError } = useQuery({
    queryKey: ['latestMealsByCategory'],
    queryFn: async () => {
      const res = await fetch(`/api/latestMeals`)
      return await res.json()
    },
  })

  if (error || isError || data?.error) {
    return (
      <Box gap={'5'}>
        <Heading as={'h1'} fontSize={'xl'} color={'orangered'}>
          Failed to load latest meals...
        </Heading>
        <MealCategoriesSkeleton />
      </Box>
    )
  }

  return (
    <Box flex={'1'} mt={'8'}>
      <Heading as={'h1'} fontSize={{ base: 'xl', md: '3xl' }} mb={'4'}>
        <Highlight query={'Latest'} styles={{ color: 'appColor' }}>
          Latest Meals
        </Highlight>
      </Heading>

      {isPending ? (
        <MealCategoriesSkeleton />
      ) : (
        <Box pl={'5'}>
          <HorizontalScrollArea>
            <For each={data.meals || []}>
              {(item: mealType, index: number) => (
                <MealCategoryItem
                  item={item}
                  index={index}
                  key={`${index}-${item.idMeal}`}
                />
              )}
            </For>
          </HorizontalScrollArea>
        </Box>
      )}
    </Box>
  )
}

const MealCategoryItem = ({
  index,
  item,
}: {
  item: mealType
  index: number
}) => {
  return (
    <Link to={`/mealCategories/${item?.strCategory}/${item?.idMeal}`}>
      <Card.Root
        cursor={'pointer'}
        maxW='xs'
        minW='xs'
        flexShrink={0}
        overflow='hidden'
        key={`${index}-${item?.idMeal}`}
        _hover={{ shadow: 'lg' }}
      >
        <Image
          src={item.strMealThumb}
          alt={`${item.strMeal}-image`}
          objectFit={'fit'}
          pb={0}
        />
        <Card.Body gap='2'>
          <Card.Title>
            <Text truncate>{item.strMeal}</Text>
          </Card.Title>
          {item?.strInstructions && (
            <Card.Description>
              <Text truncate>{item?.strInstructions}</Text>
            </Card.Description>
          )}
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

const MealCategoriesSkeleton = () => {
  return (
    <Box pl={'5'}>
      <HorizontalScrollArea>
        <For each={[1, 2, 3, 4, 5, 6]}>
          {(_, index) => <MealCategoryItemSkeleton key={`${index}}`} />}
        </For>
      </HorizontalScrollArea>
    </Box>
  )
}

const MealCategoryItemSkeleton = () => {
  return (
    <Card.Root maxW='xs' overflow={'hidden'}>
      <Skeleton width={'72'} height={'60'} />
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

function HorizontalScrollArea({ children }: { children: ReactNode }) {
  return (
    <ScrollArea.Root>
      <ScrollArea.Viewport>
        <ScrollArea.Content py='4'>
          <Flex gap='4' flexWrap='nowrap'>
            {children}
          </Flex>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation='horizontal' hidden />
      <ScrollArea.Corner />
    </ScrollArea.Root>
  )
}
