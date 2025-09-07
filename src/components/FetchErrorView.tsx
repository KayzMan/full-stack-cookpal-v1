import { Box, Heading } from '@chakra-ui/react'
import type { ReactNode } from 'react'

export const FetchErrorView = ({
  children,
  headingText,
}: {
  headingText: string
  children: ReactNode
}) => {
  return (
    <Box gap={'5'} px={'8'}>
      <Heading as={'h1'} fontSize={'xl'} color={'orangered'}>
        {headingText}
      </Heading>
      {children}
    </Box>
  )
}
