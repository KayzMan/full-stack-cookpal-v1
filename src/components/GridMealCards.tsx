import { Box, SimpleGrid, For, Badge } from '@chakra-ui/react'
import { GiMeal } from 'react-icons/gi'

import { FloatingBackButton } from '@/components/navigation/FloatingBackButton'
import { FetchErrorView } from '@/components/FetchErrorView'
import { MealCard } from '@/components/MealCard'
import { MealCardSkeleton } from '@/_skeletons/MealCardSkeleton'

import type { mealType, categoryType } from '@/lib/types'
import { useFetchData } from '@/hooks/useFetchData'

type ItemType = 'mealCategories' | 'filterMeals'

interface GridMealCardsProps {
  fetchErrorText: string
  queryKey: string
  currentPageText: string
  categoryText?: string
  endpoint: string
  queryParams?: object
  type: ItemType
  TheHeading: () => React.JSX.Element
}

export const GridMealCards = (props: GridMealCardsProps) => {
  const { isPending, data, error, isError } = useFetchData({
    queryKey: props.queryKey,
    endpoint: props.endpoint,
    params: props.queryParams,
  })

  if (error || isError || data?.error) {
    return (
      <FetchErrorView headingText={props.fetchErrorText}>
        <MealCardSkeleton />

        <FloatingBackButton currentPage={props.currentPageText} />
      </FetchErrorView>
    )
  }

  return (
    <Box mt={'8'} gap={'10'}>
      <props.TheHeading />

      {isPending ? (
        <MealCardSkeleton />
      ) : (
        <SimpleGrid columns={[1, 1, 2, 3, 3, 4]} gap={'4'}>
          {props.type == 'mealCategories' ? (
            <For each={data.categories || []}>
              {(item: categoryType, index: number) => (
                <MealCard
                  item={{ type: 'category', ...item }}
                  index={index}
                  key={`${index}-${item.idCategory}`}
                  url={`/mealCategories/${item.strCategory}`}
                />
              )}
            </For>
          ) : props.type == 'filterMeals' ? (
            <For each={data.meals || []}>
              {(item: mealType, index: number) => (
                <MealCard
                  item={{ type: 'meal', ...item }}
                  index={index}
                  key={`${index}-${item.idMeal}`}
                  url={`/mealCategories/${props.categoryText}/${item.idMeal}`}
                  cardFooterLeftView={
                    <Badge
                      variant={'outline'}
                      color={'appColor'}
                      size={{ base: 'md', md: 'lg' }}
                    >
                      <GiMeal />
                      {props.categoryText}
                    </Badge>
                  }
                />
              )}
            </For>
          ) : (
            <Box />
          )}
        </SimpleGrid>
      )}

      <FloatingBackButton currentPage={props.currentPageText} />
    </Box>
  )
}
