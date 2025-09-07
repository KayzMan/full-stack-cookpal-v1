'use client'

import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  Drawer,
  useDisclosure,
  Portal,
} from '@chakra-ui/react'
import {
  FiHome,
  FiMenu,
  FiSearch,
  FiGrid,
  FiZap,
  FiShuffle,
} from 'react-icons/fi'
import type { BoxProps, FlexProps } from '@chakra-ui/react'
import type { IconType } from 'react-icons'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ColorModeButton } from '../ui/color-mode'

import { Logo } from '../Logo'

import { routes } from '@/lib/routes'

interface LinkItemProps {
  name: string
  url: string
  icon: IconType
}

interface NavItemProps extends FlexProps {
  icon: IconType
  url: string
  children: React.ReactNode
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', url: routes.home, icon: FiHome },
  { name: 'Search', url: routes.search, icon: FiSearch },
  { name: 'Latest Meals', url: routes.latestMeals, icon: FiZap },
  { name: 'Meal Categories', url: routes.mealCategories, icon: FiGrid },
  { name: 'Random Meals', url: routes.randomMeals, icon: FiShuffle },
]

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition='3s ease'
      left={0}
      top={0}
      bg={'bg-canvas'}
      _dark={{
        borderRightColor: 'gray.700',
      }}
      borderRight='1px solid'
      borderRightColor={'gray.200'}
      w={{ base: 'full', lg: '64' }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
        <Logo />

        <ColorModeButton
          variant={'ghost'}
          ml={'8'}
          display={{ base: 'none', lg: 'flex' }}
        />

        <CloseButton display={{ base: 'flex', lg: 'none' }} onClick={onClose} />
      </Flex>

      {LinkItems.map((link) => (
        <NavItem key={link.name} url={link.url} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

const NavItem = ({ icon, url, children, ...rest }: NavItemProps) => {
  return (
    <Link to={url}>
      <Box style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          align='center'
          p='4'
          mx='4'
          borderRadius='lg'
          role='group'
          cursor='pointer'
          _hover={{
            bg: 'appColorShade.200',
            color: 'white',
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr='4'
              fontSize='16'
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    </Link>
  )
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      zIndex={'1000'}
      px={'6'}
      height={{ base: '20', lg: 0 }}
      alignItems='center'
      bg={'bg-canvas'}
      justifyContent={{ base: 'space-between', lg: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', lg: 'none' }}
        onClick={onOpen}
        variant='outline'
        aria-label='open menu'
      >
        <FiMenu />
      </IconButton>

      <Box display={{ base: 'flex', lg: 'none' }}>
        <Logo />
      </Box>

      <ColorModeButton
        variant={'subtle'}
        color={'appColor'}
        display={{ base: 'flex', lg: 'none' }}
      />
    </Flex>
  )
}

export const SidebarWithHeader = ({ children }: { children: ReactNode }) => {
  const { open, setOpen, onClose } = useDisclosure()

  return (
    <Box minH='100vh' zIndex={'1000'}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', lg: 'block' }}
      />

      <Drawer.Root
        placement='start'
        size='full'
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Body>
                <SidebarContent onClose={onClose} />
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>

      {/* mobile-nav */}
      <MobileNav onOpen={() => setOpen(!open)} />
      <Box ml={{ base: 0, lg: '64' }}>
        {/* Content */}
        {children}
      </Box>
    </Box>
  )
}
