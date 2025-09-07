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
} from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import { LuFolder, LuSquareCheck, LuUser } from 'react-icons/lu'

// components...
import { HorizontalScrollMealCategories } from '@/components/Home/HorizontalScrollMealCategories'
import { HorizontalScrollLatestMeals } from '@/components/Home/HorizontalScrollLatestMeals'
import { HorizontalScrollRandomMeals } from '@/components/Home/HorizontalScrollRandomMeals'

export const SearchPage = () => {
  return (
    <>
      <Flex
        justifyContent={'flex-end'}
        px={'4'}
        onKeyDown={(e) => {
          console.log('e.key', e.key)
        }}
      >
        <SearchBar />
      </Flex>

      <HorizontalScrollLatestMeals />
      <HorizontalScrollMealCategories />
      <HorizontalScrollRandomMeals />
    </>
  )
}

const SearchBar = () => {
  return (
    <Dialog.Root
      key={'center-search-dialog'}
      placement={'center'}
      motionPreset='slide-in-bottom'
    >
      <Dialog.Trigger asChild>
        <Box>
          <SearchDialogTrigger />
        </Box>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
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
              <CloseButton size='sm' />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

const SearchDialogTrigger = () => {
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

        <Text>Search for meals, areas...</Text>
      </HStack>

      <HStack gap={'0.5'}>
        <Kbd size={'lg'} variant={'raised'}>
          ⌘
        </Kbd>
        <Kbd size={'lg'} variant={'raised'}>
          K
        </Kbd>
      </HStack>
    </Flex>
  )
}

const SearchViewTabs = () => {
  return (
    <Tabs.Root lazyMount unmountOnExit defaultValue='members'>
      <Tabs.List>
        {/* first tab */}
        <Tabs.Trigger value='members'>
          <LuUser />
          Members
        </Tabs.Trigger>

        {/* second tab */}
        <Tabs.Trigger value='projects'>
          <LuFolder />
          Projects
        </Tabs.Trigger>

        {/* third tab */}
        <Tabs.Trigger value='tasks'>
          <LuSquareCheck />
          Settings
        </Tabs.Trigger>
      </Tabs.List>

      {/* first tab content */}
      <Tabs.Content value='members'>Manage your team members</Tabs.Content>

      {/* second tab content */}
      <Tabs.Content value='projects'>Manage your projects</Tabs.Content>

      {/* third tab content */}
      <Tabs.Content value='tasks'>
        Manage your tasks for freelancers
      </Tabs.Content>
    </Tabs.Root>
  )
}
