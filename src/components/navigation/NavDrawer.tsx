import { useLocation, Link } from 'react-router-dom'
import type React from 'react'
import type { ReactNode } from 'react'
import {
  Button,
  CloseButton,
  Drawer,
  Kbd,
  Portal,
  Stack,
} from '@chakra-ui/react'
import { RiBarChartHorizontalLine } from 'react-icons/ri'
import { GrHomeRounded } from 'react-icons/gr'
import { GiKnifeFork } from 'react-icons/gi'
import { TbCategory } from 'react-icons/tb'

import { Logo } from '../Logo'

export function NavDrawer() {
  return (
    <TheDrawer>
      <Drawer.Body>
        Press the <Kbd>esc</Kbd> key to close the drawer.
        <Stack my={'4'} gap={'3'}>
          <DrawerButton title='Home' url='/' icon={<GrHomeRounded />} />

          <DrawerButton
            title='Meal Categories'
            url='/mealCategories'
            icon={<GiKnifeFork />}
          />

          <DrawerButton
            title='Categories'
            url='/categories'
            icon={<TbCategory />}
          />
        </Stack>
      </Drawer.Body>
    </TheDrawer>
  )
}

function TheDrawer({ children }: { children: ReactNode }) {
  return (
    <Drawer.Root placement={{ mdDown: 'bottom', md: 'end' }}>
      <Drawer.Trigger asChild cursor={'pointer'}>
        <RiBarChartHorizontalLine size={'1.3em'} />
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          {/* Drawer Content */}
          <Drawer.Content>
            {/* Drawer Header */}
            <Drawer.Header>
              <Drawer.Title>
                <Logo />
              </Drawer.Title>
            </Drawer.Header>

            {/* Drawer Body */}
            {children}

            {/* Drawer Footer */}
            <Drawer.Footer>
              <Drawer.ActionTrigger asChild>
                <Button variant='outline'>Close</Button>
              </Drawer.ActionTrigger>
              {/* <Button>Save</Button> */}
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size='md' variant={'subtle'} color={'appColor'} />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}

function DrawerButton({
  url,
  title,
  icon,
}: {
  url: string
  title: string
  icon: React.JSX.Element
}) {
  const location = useLocation()
  const urlEqualToCurrentPage = url == location.pathname

  return (
    <Link to={url}>
      <Button
        width={'full'}
        variant={urlEqualToCurrentPage ? 'solid' : 'outline'}
        color={urlEqualToCurrentPage ? 'white' : 'appColor'}
        bg={urlEqualToCurrentPage ? 'appColor' : 'none'}
        _hover={{ bg: urlEqualToCurrentPage ? 'appColor' : 'appColorTint.200' }}
      >
        {icon}
        {title}
      </Button>
    </Link>
  )
}
