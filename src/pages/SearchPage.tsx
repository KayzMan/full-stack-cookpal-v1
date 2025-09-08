import {
  Box,
  Kbd,
  Flex,
  Dialog,
  Portal,
  Tabs,
  CloseButton,
  Text,
  HStack,
  useDisclosure,
  For,
} from '@chakra-ui/react'
import { FiCoffee, FiMapPin, FiSearch, FiShoppingCart } from 'react-icons/fi'
import { MdOutlineFastfood } from 'react-icons/md'
import { useHotkeys, HotkeysProvider } from 'react-hotkeys-hook'
import { useIsMac } from '@/hooks/useIsMac'

// components...
import { HorizontalScrollMealCategories } from '@/components/HorizontalScrollContent/HorizontalScrollMealCategories'
import { HorizontalScrollLatestMeals } from '@/components/HorizontalScrollContent/HorizontalScrollLatestMeals'
import { HorizontalScrollRandomMeals } from '@/components/HorizontalScrollContent/HorizontalScrollRandomMeals'

// search...
import { SearchMeals } from '@/components/search/SearchMeals'
import { SearchIngredients } from '@/components/search/SearchIngredients'
import { SearchCategories } from '@/components/search/SearchCategories'
import { SearchAreas } from '@/components/search/SearchAreas'
import type { JSX, ReactNode } from 'react'

interface tabProps {
  value: string
  icon: ReactNode
  title: string
  contentElement: () => JSX.Element
}

const tabs: tabProps[] = [
  {
    value: 'meals',
    title: 'Meals',
    icon: <FiCoffee />,
    contentElement: SearchMeals,
  },
  {
    value: 'ingredients',
    title: 'Ingredients',
    icon: <FiShoppingCart />,
    contentElement: SearchIngredients,
  },
  {
    value: 'categories',
    title: 'Categories',
    icon: <MdOutlineFastfood />,
    contentElement: SearchCategories,
  },
  {
    value: 'areas',
    title: 'Areas',
    icon: <FiMapPin />,
    contentElement: SearchAreas,
  },
]

export const SearchPage = () => {
  return (
    <HotkeysProvider>
      <Flex justifyContent={'flex-end'} px={'4'}>
        <SearchBar />
      </Flex>

      <HorizontalScrollLatestMeals />
      <HorizontalScrollMealCategories />
      <HorizontalScrollRandomMeals />
    </HotkeysProvider>
  )
}

const SearchBar = () => {
  const { open, setOpen } = useDisclosure()
  useHotkeys('mod+k', () => setOpen(true))

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      key={'center-search-dialog'}
      placement={'center'}
      motionPreset='slide-in-bottom'
      scrollBehavior={'inside'}
    >
      <Dialog.Trigger asChild>
        <Box>
          <SearchDialogTrigger />
        </Box>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            // maxWidth={{ base: 'sm', md: 'fit-content' }}
            width='90%'
            minWidth={{ base: 'none', md: '2xl', lg: '4xl' }}
          >
            <Dialog.Header>
              <Dialog.Title>Search</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <SearchViewTabs />
            </Dialog.Body>
            <Dialog.Footer>
              {/* <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger> */}
              {/* <Button>Save</Button> */}
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton
                size='xs'
                color={'red'}
                bg={'red.50'}
                variant={'subtle'}
                borderRadius={'full'}
              />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

const SearchDialogTrigger = () => {
  const isMac = useIsMac()

  return (
    <Flex
      alignItems={'center'}
      justifyContent={'space-between'}
      border={'1px solid'}
      borderColor={'gray.300'}
      _dark={{ borderColor: 'gray.700' }}
      p={'3'}
      borderRadius={'lg'}
      mt={'4'}
      minWidth={{ base: 'sm', md: 0 }}
      mx={'auto'}
      _focusWithin={{
        boxShadow: 'lg',
        border: 'none',
      }}
      transition={'linear'}
      transitionDuration={'slower'}
      gap={'6'}
    >
      <HStack>
        <FiSearch />

        <Text color={'gray.500'}>Search for meals, areas...</Text>
      </HStack>

      <HStack gap={'0.5'}>
        <Kbd variant={'raised'} size={'lg'}>
          {isMac ? '⌘' : 'Ctrl'}
        </Kbd>
        <Kbd variant={'raised'} size={'lg'}>
          K
        </Kbd>
      </HStack>
    </Flex>
  )
}

const SearchViewTabs = () => {
  return (
    <Tabs.Root lazyMount unmountOnExit defaultValue={tabs[0].value}>
      <Tabs.List>
        <For each={tabs}>
          {(item: tabProps, index: number) => (
            <Tabs.Trigger value={item.value} outline={'none'} key={`${index}`}>
              {item.icon}
              {item.title}
            </Tabs.Trigger>
          )}
        </For>
      </Tabs.List>

      <For each={tabs}>
        {(item: tabProps, index: number) => (
          <Tabs.Content value={item.value} key={`${index}`}>
            {<item.contentElement />}
          </Tabs.Content>
        )}
      </For>
    </Tabs.Root>
  )
}
