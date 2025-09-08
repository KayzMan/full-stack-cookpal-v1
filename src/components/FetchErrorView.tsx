import { Box, Button, Heading } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { IoReload } from 'react-icons/io5'

export const FetchErrorView = ({
  children,
  headingText,
  headingMarginTop,
  center = false,
  showRetryButton = true,
}: {
  headingText: string
  children: ReactNode
  headingMarginTop?: string
  center?: boolean
  showRetryButton?: boolean
}) => {
  return (
    <Box gap={'5'} px={'8'} textAlign={center ? 'center' : 'start'}>
      <Heading
        as={'h1'}
        fontSize={'xl'}
        color={'orangered'}
        mt={headingMarginTop}
      >
        {headingText}
        {showRetryButton && (
          <Button
            size={'xs'}
            ml={'2'}
            variant={'outline'}
            onClick={() => {
              window.location.reload()
            }}
          >
            <IoReload />
            Try Again
          </Button>
        )}
      </Heading>
      {children}
    </Box>
  )
}
