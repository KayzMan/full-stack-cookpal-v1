import { Box, For } from '@chakra-ui/react'

// utilities...
import type { mealType, categoryType } from '@/lib/types'
import { useFetchData } from '@/hooks/useFetchData'

// components...
import { FetchErrorView } from '../FetchErrorView'
import { MealCard } from '../MealCard'
import { HorizontalScrollArea } from '../HorizontalScrollArea'
import { HomeMealCardSkeleton } from '@/_skeletons/HomeMealCardSkeleton'
import type React from 'react'

type ItemType = 'categories' | 'latestMeals' | 'randomMeals'

interface HomeMealCardProps {
  fetchErrorText: string
  queryKey: string
  endpoint: string
  type: ItemType
  TheHeading: () => React.JSX.Element
}

export function HomeMealCard(props: HomeMealCardProps) {
  const { isPending, data, error, isError } = useFetchData({
    queryKey: props.queryKey,
    endpoint: props.endpoint,
  })

  if (error || isError || data?.error) {
    return (
      <FetchErrorView headingText={props.fetchErrorText}>
        <HomeMealCardSkeleton />
      </FetchErrorView>
    )
  }

  return (
    <Box flex={'1'} mt={'8'}>
      {<props.TheHeading />}

      {isPending ? (
        <HomeMealCardSkeleton />
      ) : (
        <Box pl={'5'}>
          <HorizontalScrollArea>
            {props.type == 'categories' ? (
              <For each={data.categories || []}>
                {(item: categoryType, index: number) => {
                  return (
                    <MealCard
                      index={index}
                      item={{ type: 'category', ...item }}
                      onHome={true}
                      key={`${index}-${item.idCategory}`}
                    />
                  )
                }}
              </For>
            ) : props.type === 'randomMeals' || props.type === 'latestMeals' ? (
              <For each={data.meals || []}>
                {(item: mealType, index: number) => {
                  return (
                    <MealCard
                      index={index}
                      item={{ type: 'meal', ...item }}
                      onHome={true}
                      key={`${index}-${item.idMeal}`}
                    />
                  )
                }}
              </For>
            ) : (
              <Box />
            )}
          </HorizontalScrollArea>
        </Box>
      )}
    </Box>
  )
}
