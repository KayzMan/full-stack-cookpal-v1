import { ScrollArea, Flex } from '@chakra-ui/react'
import type { ReactNode } from 'react'

export const HorizontalScrollArea = ({ children }: { children: ReactNode }) => {
  return (
    <ScrollArea.Root>
      <ScrollArea.Viewport>
        <ScrollArea.Content py='4'>
          <Flex gap='4' flexWrap='nowrap'>
            {children}
          </Flex>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation='horizontal' hidden />
      <ScrollArea.Corner />
    </ScrollArea.Root>
  )
}
