import { SimpleGrid, For, Card, Skeleton, Button } from '@chakra-ui/react'

export const MealCardSkeleton = () => {
  return (
    <SimpleGrid columns={[1, 1, 2, 3, 3, 4]} gap={'4'}>
      <For each={[1, 2, 3, 4, 5, 6]}>
        {(_, index: number) => <MealCardItemSkeleton key={index} />}
      </For>
    </SimpleGrid>
  )
}

const MealCardItemSkeleton = () => {
  return (
    <Card.Root overflow={'hidden'}>
      <Skeleton width={'full'} height={'60'} />
      <Card.Body gap='2'>
        <Card.Title>
          <Skeleton height={'5'} width={'100px'} />
        </Card.Title>
        <Card.Description>
          <Skeleton height={'5'} width={'80%'} />
        </Card.Description>
      </Card.Body>
      <Card.Footer gap='2' justifyContent={'flex-end'}>
        <Button variant='outline'>
          <Skeleton height={'2'} width={'4'} />
        </Button>
      </Card.Footer>
    </Card.Root>
  )
}
