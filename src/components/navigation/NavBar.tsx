import { Box, Flex } from '@chakra-ui/react'

// components...
import { ColorModeButton } from '../ui/color-mode'
import { Logo } from '../Logo'
import { NavDrawer } from './NavDrawer'

export function NavBar() {
  return (
    <Box
      px={'8'}
      pt={'4'}
      pb={'2'}
      position={'sticky'}
      top={'0'}
      zIndex={'1000'}
      bg={'whiteAlpha.600'}
      _dark={{ bg: 'gray.900/78' }}
      backdropFilter='blur(50px)'
    >
      <Flex justify={'space-between'} mb={'4'}>
        <Logo />

        <Flex alignItems={'center'} gap={'6'} zIndex={'1001'}>
          <NavDrawer />
          <ColorModeButton variant={'subtle'} color={'appColor'} />
        </Flex>
      </Flex>
    </Box>
  )
}
