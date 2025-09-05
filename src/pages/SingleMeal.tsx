import {
  Badge,
  Box,
  Heading,
  Skeleton,
  Stack,
  ScrollArea,
  Flex,
  For,
  Image,
  Card,
  Link,
  Table,
  Center,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { GiMeal } from 'react-icons/gi'
import { FaTag, FaLocationArrow, FaYoutube } from 'react-icons/fa'
import { CgNotes } from 'react-icons/cg'
import { LuShoppingCart } from 'react-icons/lu'
import { VscReferences } from 'react-icons/vsc'
import type { ReactNode } from 'react'

import { FloatingBackButton } from '@/components/navigation/FloatingBackButton'
import { ReadMoreText } from '@/components/ReadMore'

export function SingleMeal() {
  const params = useParams()

  const { isError, error, data, isPending } = useQuery({
    queryKey: [`singleMeal`, { i: params.i }],
    queryFn: async () => {
      const fetchString = `/api/singleMeal?i=${params.i}`
      const res = await fetch(fetchString)
      return await res.json()
    },
  })

  if (error || isError || data?.error) {
    return (
      <Box gap={'5'}>
        <Center>
          <Heading as={'h1'} fontSize={'xl'} color={'orangered'}>
            Failed to load meals by category...
          </Heading>
        </Center>

        <Box mt={'8'} gap={'10'} mx={'auto'} maxW={'4xl'}>
          <HeadingSkeleton />

          <Flex
            flexDirection={['column', 'column', 'column', 'column', 'row']}
            alignItems={['center', 'center', 'center', 'center', 'flex-start']}
            gap={['6', '6', '6', '6', '3']}
            my={'10'}
            mx={'auto'}
            maxW={'4xl'}
          >
            <MealImageSkeleton />
            <Flex flexDirection={'column'} gap={'2'}>
              <MealContentSkeleton />
            </Flex>
          </Flex>
        </Box>

        <FloatingBackButton
          currentPage={`${data?.meals?.[0]?.strMeal || 'Current Page'}`}
        />
      </Box>
    )
  }

  return (
    <Box mt={'8'} gap={'10'} mx={'auto'} maxW={'4xl'}>
      {isPending ? <HeadingSkeleton /> : <MealHeading data={data} />}

      {/* meal content */}
      <Flex
        flexDirection={['column', 'column', 'column', 'column', 'row']}
        alignItems={['center', 'center', 'center', 'center', 'flex-start']}
        gap={['6', '6', '6', '6', '3']}
        my={'10'}
        mx={'auto'}
        maxW={'4xl'}
      >
        {/* meal image */}
        {isPending ? (
          <MealImageSkeleton />
        ) : (
          <MealImage
            imageTitle={params.i || 'food'}
            imageUrl={data?.meals?.[0]?.strMealThumb}
          />
        )}

        <Flex flexDirection={'column'} gap={'2'}>
          {isPending ? (
            <MealContentSkeleton />
          ) : (
            <>
              {/* badges */}
              <ScrollArea.Root mx={'auto'}>
                <ScrollArea.Viewport>
                  <ScrollArea.Content pb='1'>
                    <Flex gap='4' flexWrap='nowrap'>
                      {/* area */}
                      <Badge
                        colorPalette={'blue'}
                        variant={'solid'}
                        size={{ base: 'md', md: 'lg' }}
                      >
                        <FaLocationArrow />
                        {data?.meals?.[0]?.strArea}
                      </Badge>

                      {/* category */}
                      <Badge
                        colorPalette={'green'}
                        variant={'solid'}
                        size={{ base: 'md', md: 'lg' }}
                      >
                        <GiMeal />
                        {data?.meals?.[0]?.strCategory}
                      </Badge>

                      {/* tags */}
                      <For each={data?.meals?.[0]?.strTags?.split(',') || []}>
                        {(item: string, index: number) => (
                          <Badge
                            key={`${index}-${item}`}
                            bg={'appColor'}
                            color={'white'}
                            variant={'outline'}
                            size={{ base: 'md', md: 'lg' }}
                          >
                            <FaTag />
                            {item}
                          </Badge>
                        )}
                      </For>
                    </Flex>
                  </ScrollArea.Content>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                  orientation='horizontal'
                  visibility={'hidden'}
                />
                <ScrollArea.Corner />
              </ScrollArea.Root>

              {/* Youtube */}
              <YouTubeCard data={data} />

              {/* sources */}
              <SourceCard data={data} />

              {/* ingredients */}
              <IngredientsCard data={data} />

              {/* instructions */}
              <InstructionsCard data={data} />
            </>
          )}
        </Flex>
      </Flex>

      <FloatingBackButton
        currentPage={`${data?.meals?.[0]?.strMeal || 'Current Page'}`}
      />
    </Box>
  )
}

const HeadingSkeleton = () => {
  return (
    <Stack flexDirection={'column'} alignItems={'center'} gap={'4'}>
      <Skeleton height={'10'} width={'40%'} />
    </Stack>
  )
}

const MealHeading = ({
  data,
}: {
  data: {
    meals: {
      strMeal: string
      strCategory: string
      strTags: string
      strArea: string
    }[]
  }
}) => {
  return (
    <Stack flexDirection={'column'} alignItems={'center'} gap={'0'} mb={'12'}>
      <Heading
        as={'h1'}
        fontSize={{ base: '2xl', md: '4xl' }}
        textAlign={'center'}
        color={'appColor'}
        position={{ base: 'relative', lg: 'sticky' }}
        top={{ base: 0, lg: '6' }}
        zIndex={{ base: 0, lg: 'sticky' }}
      >
        {data?.meals?.[0]?.strMeal}
      </Heading>
    </Stack>
  )
}

const MealImageSkeleton = () => {
  return (
    <Skeleton
      borderRadius={'lg'}
      width={{ base: 'sm', md: 'lg' }}
      height={{ base: 'sm', md: 'lg' }}
    />
  )
}

const MealImage = ({
  imageUrl,
  imageTitle,
}: {
  imageUrl: string
  imageTitle: string
}) => {
  return (
    <Image
      alt={`meal-${imageTitle}-image`}
      src={`${imageUrl}`}
      borderRadius={'lg'}
      minWidth={{ base: 'sm', md: 'lg' }}
    />
  )
}

const CardItem = ({
  title,
  icon,
  children,
}: {
  title: string
  icon?: ReactNode
  children: ReactNode
}) => {
  // TODO: implement a popover for each card item that needs a popover.

  return (
    <Card.Root
      size={{ base: 'sm', md: 'lg' }}
      //   maxW={{ base: 'xl', md: '4xl' }}
      maxW={['xl', 'xl', 'xl', '4xl']}
      //   minW={{ base: 'sm', md: 'md' }}
      //   minWidth={['xs', 'sm', 'sm', 'lg']}
    >
      <Card.Header>
        <Flex alignItems={'center'} gap={'2'}>
          {icon && icon}
          <Heading>{title}</Heading>
        </Flex>
      </Card.Header>
      <Card.Body color='fg.muted'>{children}</Card.Body>
    </Card.Root>
  )
}

const MealContentSkeleton = () => {
  return (
    <>
      <Flex gap='4' flexWrap='nowrap'>
        <Skeleton height={'10'} width={'32'} />
        <Skeleton height={'10'} width={'32'} />
      </Flex>
      <For each={[1, 2, 3]}>
        {(_, index: number) => (
          <Card.Root
            size={{ base: 'sm', md: 'lg' }}
            maxW={{ base: 'xl', md: '4xl' }}
            key={`${index}`}
          >
            <Card.Header>
              <Flex alignItems={'center'} gap={'2'}>
                <Skeleton height={'8'} width={'8'} />
                <Skeleton height={'10'} width={'72'} />
              </Flex>
            </Card.Header>
            <Card.Body color='fg.muted'>
              <Skeleton height={'20'} width={'full'} />
            </Card.Body>
          </Card.Root>
        )}
      </For>
    </>
  )
}

const YouTubeCard = ({
  data,
}: {
  data: { meals: { strYoutube: string }[] }
}) => {
  return (
    data?.meals?.[0]?.strYoutube && (
      <CardItem title='YouTube Link' icon={<FaYoutube size={30} color='red' />}>
        <Link
          target='_blank'
          href={`${`${data?.meals?.[0]?.strYoutube}`}`}
          _hover={{ textDecor: 'underline' }}
        >
          {data?.meals?.[0]?.strYoutube}
        </Link>
      </CardItem>
    )
  )
}

const IngredientsCard = ({
  data,
}: {
  data: {
    meals: {
      strInstructions: string
      [key: string]: string | null
    }[]
  }
}) => {
  return (
    data?.meals?.[0]?.strInstructions && (
      <CardItem title='Ingredients' icon={<LuShoppingCart size={25} />}>
        <Table.ScrollArea
          borderWidth='1px'
          rounded='md'
          maxHeight={{ base: '300px', md: '200px' }}
        >
          <Table.Root showColumnBorder stickyHeader>
            <Table.Header>
              <Table.Row bg={'bg.subtle'}>
                <Table.ColumnHeader>Ingredient</Table.ColumnHeader>
                <Table.ColumnHeader>Measure</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <For each={Array.from({ length: 20 }, (_, index) => index + 1)}>
                {(item: number, index: number) => {
                  const ingredient = data?.meals?.[0]?.[`strIngredient${item}`]
                  const measure = data?.meals?.[0]?.[`strMeasure${item}`]

                  return (
                    <Table.Row key={`${item}-${index}`}>
                      {ingredient &&
                        ingredient.trim() &&
                        ingredient?.length > 0 && (
                          <Table.Cell>{ingredient}</Table.Cell>
                        )}

                      {measure && measure.trim() && measure?.length > 0 && (
                        <Table.Cell>{measure}</Table.Cell>
                      )}
                    </Table.Row>
                  )
                }}
              </For>
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </CardItem>
    )
  )
}

const InstructionsCard = ({
  data,
}: {
  data: { meals: { strInstructions: string }[] }
}) => {
  return (
    data?.meals?.[0]?.strInstructions && (
      <CardItem title='Instructions' icon={<CgNotes size={26} />}>
        <ReadMoreText noOfLines={3}>
          {data?.meals?.[0]?.strInstructions}
        </ReadMoreText>
      </CardItem>
    )
  )
}

const SourceCard = ({ data }: { data: { meals: { strSource: string }[] } }) => {
  return (
    data?.meals?.[0]?.strSource && (
      <CardItem title='Source' icon={<VscReferences size={26} />}>
        <Link
          target='_blank'
          href={`${`${data?.meals?.[0]?.strSource}`}`}
          _hover={{ textDecor: 'underline' }}
        >
          {data?.meals?.[0]?.strSource}
        </Link>
      </CardItem>
    )
  )
}
