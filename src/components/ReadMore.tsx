import { Text, Button, Box } from '@chakra-ui/react'
import { useState } from 'react'
import type { ReactNode } from 'react'

export const ReadMoreText = ({
  children,
  noOfLines,
}: {
  children: ReactNode
  noOfLines: number
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  // This state determines which version of the text to display.
  // We use `undefined` to show the full text when expanded.
  const numLines = isExpanded ? undefined : noOfLines

  return (
    <Box>
      <Text lineClamp={numLines}>{children}</Text>
      <Button size='xs' onClick={() => setIsExpanded(!isExpanded)} mt={2}>
        {isExpanded ? 'Read less' : 'Read more'}
      </Button>
    </Box>
  )
}
