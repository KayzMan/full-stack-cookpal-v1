import { Flex } from '@chakra-ui/react'

// components...
import { ColorModeButton } from '../ui/color-mode'
import { Logo } from '../Logo'
import { NavDrawer } from './NavDrawer'

export function NavBar() {
  return (
    <Flex justify={'space-between'} mb={'4'}>
      <Flex
        flexDirection={'column'}
        justify={'space-between'}
        alignItems={'flex-start'}
        gap={'4'}
      >
        <Logo />

        {/* TODO: should deal with it or remove! */}
        {/* <NavBreadCrumb /> */}
      </Flex>

      <Flex alignItems={'center'} gap={'6'}>
        <NavDrawer />
        <ColorModeButton variant={'subtle'} color={'appColor'} />
      </Flex>
    </Flex>
  )
}
