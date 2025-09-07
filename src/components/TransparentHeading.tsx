import { Center, Heading } from '@chakra-ui/react'
import type { ReactNode } from 'react'

export const TransparentHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Center
      transition='3s ease'
      position={{ base: 'relative', md: 'sticky' }}
      top={0}
      zIndex={{ base: 0, md: '10001' }}
      bg={'bg-canvas/78'}
      backdropFilter='blur(50px)'
      py={6}
      pb={8}
    >
      <Heading as={'h1'} fontSize={{ base: '2xl', md: '4xl' }}>
        {children}
      </Heading>
    </Center>
  )
}
