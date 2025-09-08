import {
  Box,
  For,
  VStack,
  Text,
  HStack,
  Skeleton,
  Image,
  Badge,
  Flex,
} from '@chakra-ui/react'
import { useState } from 'react'

import { FetchErrorView } from '../FetchErrorView'

import { SearchBox } from './SearchBox'
import { useFetchData } from '@/hooks/useFetchData'
import type { mealType } from '@/lib/types'
import { Link } from 'react-router-dom'

export const SearchMeals = () => {
  const [searchText, setSearchText] = useState('')

  const { isError, error, data, isPending } = useFetchData({
    queryKey: 'filterMealsByFirstLetter',
    endpoint: `/api/filterMealsByFirstLetter?f=${searchText}`,
    params: { f: searchText },
  })

  return (
    <Box>
      <SearchBox
        placeholder='Search for meals by first letter...'
        value={searchText}
        setValue={setSearchText}
      />

      {searchText.trim().length !== 0 && (isError || error || data?.error) ? (
        <Box mt={'4'}>
          <FetchErrorView
            headingText='Failed to search meals...'
            showRetryButton={false}
          >
            <SearchItemsSkeleton />
          </FetchErrorView>
        </Box>
      ) : isPending ? (
        <SearchItemsSkeleton />
      ) : (
        <Flex my={'8'} direction={'column'}>
          <For each={data.meals}>
            {(item: mealType, index) => {
              return (
                <>
                  <MealItem
                    key={`${index}-${item.idMeal}`}
                    item={item}
                    index={index}
                  />
                </>
              )
            }}
          </For>
        </Flex>
      )}
    </Box>
  )
}

const MealItem = ({ item, index }: { item: mealType; index: number }) => {
  return (
    <Link
      to={`/mealCategories/${item.strCategory}/${item.idMeal}`}
      key={`${index}-${item.idMeal}`}
    >
      <HStack my={'1'} alignItems={'flex-start'} gap={'4'} width={'100%'}>
        <Image
          alt={`meal-${item.strMeal}-image`}
          src={item.strMealThumb}
          objectFit={'cover'}
          width={'16'}
          borderRadius={'lg'}
        />

        <VStack
          width={'100%'}
          alignItems={'flex-start'}
          pb={'4'}
          borderBottomColor={'blue'}
          _dark={{ borderBottomColor: 'gray.500' }}
          borderBottom={'1px solid'}
          _hover={{
            bg: 'appColor/20',
          }}
        >
          <Text fontWeight={'semibold'}>{item.strMeal}</Text>
          <Badge size={'xs'} colorPalette={'green'} variant={'solid'}>
            <Text>{item.strCategory}</Text>
          </Badge>
        </VStack>
      </HStack>
    </Link>
  )
}

const SearchItemsSkeleton = () => {
  return (
    <VStack gap={'4'} mt={'4'}>
      <SearchItemSkeleton />
      <SearchItemSkeleton />
      <SearchItemSkeleton />
    </VStack>
  )
}

const SearchItemSkeleton = () => {
  return (
    <HStack>
      <Skeleton height={'10'} width={'10'} />

      <Skeleton height={'10'} minW={{ base: '56', md: 'sm' }} />
    </HStack>
  )
}
