import { Box, For, Card, Skeleton, Button } from '@chakra-ui/react'

import { HorizontalScrollArea } from '@/components/HorizontalScrollArea'

export const HomeMealCardSkeleton = () => {
  return (
    <Box pl={'5'}>
      <HorizontalScrollArea>
        <For each={[1, 2, 3, 4, 5, 6]}>
          {(_, index) => <HomeMealCardItemSkeleton key={`${index}}`} />}
        </For>
      </HorizontalScrollArea>
    </Box>
  )
}

const HomeMealCardItemSkeleton = () => {
  return (
    <Card.Root maxW='xs' overflow={'hidden'}>
      <Skeleton width={'72'} height={'60'} />
      <Card.Body gap='2'>
        <Card.Title>
          <Skeleton height={'5'} width={'100px'} />
        </Card.Title>
        <Card.Description>
          <Skeleton height={'5'} width={'80%'} />
        </Card.Description>
      </Card.Body>
      <Card.Footer gap='2' justifyContent={'flex-end'}>
        <Button variant={'outline'}>
          <Skeleton height={'2'} width={'4'} />
        </Button>
      </Card.Footer>
    </Card.Root>
  )
}
