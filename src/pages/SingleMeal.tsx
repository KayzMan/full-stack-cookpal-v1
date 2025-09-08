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
  Button,
  Text,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { GiMeal } from 'react-icons/gi'
import { FaTag, FaLocationArrow, FaYoutube } from 'react-icons/fa'
import { CgNotes } from 'react-icons/cg'
import { LuShoppingCart } from 'react-icons/lu'
import { VscReferences } from 'react-icons/vsc'
import type { ReactNode } from 'react'
import { useState } from 'react'

import { useFetchData } from '@/hooks/useFetchData'

import { FloatingBackButton } from '@/components/navigation/FloatingBackButton'
import { FetchErrorView } from '@/components/FetchErrorView'
import { TransparentHeading } from '@/components/TransparentHeading'
import { ReadMoreText } from '@/components/ReadMore'

export function SingleMeal() {
  const params = useParams()

  const { isError, error, data, isPending } = useFetchData({
    queryKey: 'singleMeal',
    endpoint: `/api/singleMeal?i=${params.i}`,
    params: { i: params.i },
  })

  if (error || isError || data?.error) {
    return (
      <FetchErrorView
        headingText='Failed to load single meal...'
        headingMarginTop='8'
        center={true}
      >
        <Box
          mt={'8'}
          gap={'10'}
          mx={'auto'}
          maxW={{ base: 'none', md: '7xl' }}
          width={'100%'}
        >
          <HeadingSkeleton />

          <Flex
            flexDirection={['column', 'column', 'column', 'column', 'row']}
            alignItems={['center', 'center', 'center', 'center', 'flex-start']}
            gap={['6', '6', '6', '6', '3']}
            my={'10'}
            mx={'auto'}
            maxW={{ base: 'none', md: '7xl' }}
            width={'100%'}
          >
            <MealImageSkeleton />
            <Flex
              flexDirection={'column'}
              gap={'2'}
              alignItems={'flex-start'}
              width={'100%'}
            >
              <MealContentSkeleton />
            </Flex>
          </Flex>
        </Box>

        <FloatingBackButton
          currentPage={`${data?.meals?.[0]?.strMeal || 'Current Page'}`}
        />
      </FetchErrorView>
    )
  }

  return (
    <Box width={'100%'}>
      {isPending ? (
        <HeadingSkeleton />
      ) : (
        <TransparentHeading>{data?.meals?.[0]?.strMeal}</TransparentHeading>
      )}

      <Box
        mt={'8'}
        gap={'10'}
        mx={'auto'}
        maxW={{ base: 'none', md: '7xl' }}
        width={'100%'}
      >
        {/* meal content */}
        <Flex
          flexDirection={['column', 'column', 'column', 'column', 'row']}
          alignItems={['center', 'center', 'center', 'center', 'flex-start']}
          gap={['6', '6', '6', '6', '3']}
          my={'10'}
          px={'4'}
          mx={'auto'}
          maxW={{ base: 'none', md: '7xl' }}
          width={'100%'}
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

          {/* meal data */}
          <Stack gap={'2'} width={'100%'}>
            {isPending ? (
              <MealContentSkeleton />
            ) : (
              <>
                {/* badges */}
                <Badges data={data} />

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
          </Stack>
        </Flex>

        <FloatingBackButton
          currentPage={`${data?.meals?.[0]?.strMeal || 'Current Page'}`}
        />
      </Box>
    </Box>
  )
}

const HeadingSkeleton = () => {
  return (
    <Stack flexDirection={'column'} alignItems={'center'} gap={'4'}>
      <Skeleton height={'10'} width={{ base: '100%', md: '50%' }} />
    </Stack>
  )
}

const MealImageSkeleton = () => {
  return (
    <Skeleton
      borderRadius={'lg'}
      width={{ base: '100%', md: 'lg' }}
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
      objectFit={'cover'}
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
      minW={{ base: 'xs', md: 'sm' }}
      width={'100%'}
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
      <Flex gap='4' flexWrap='nowrap' width={'100%'} alignItems={'flex-start'}>
        <Skeleton height={'10'} width={'32'} />
        <Skeleton height={'10'} width={'32'} />
      </Flex>
      <For each={[1, 2, 3]}>
        {(_, index: number) => (
          <Card.Root
            size={{ base: 'sm', md: 'lg' }}
            minW={{ base: 'xs', md: 'sm' }}
            width={'100%'}
            key={`${index}`}
          >
            <Card.Header>
              <Flex alignItems={'center'} gap={'2'}>
                <Skeleton height={'8'} width={'8'} />
                <Skeleton height={'10'} width={'calc(100% - 2.5rem)'} />
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
          maxHeight={{ base: '200px', md: '300px' }}
        >
          <Table.Root showColumnBorder stickyHeader>
            <Table.Header>
              <Table.Row bg={'bg.subtle'} zIndex={0}>
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
  const [isExpanded, setIsExpanded] = useState(false)
  const instructions = data?.meals?.[0]?.strInstructions
  const steps = instructions.split(/(?=\d+\.\s)/)

  const previewSteps = steps.slice(0, 2)

  return (
    data?.meals?.[0]?.strInstructions && (
      <CardItem title='Instructions' icon={<CgNotes size={26} />}>
        {steps.length > 1 ? (
          <>
            {(isExpanded ? steps : previewSteps).map((step, index) => (
              <Text key={index}>{step}</Text>
            ))}

            <Button
              size='xs'
              onClick={() => setIsExpanded(!isExpanded)}
              mt={'4'}
              alignSelf={'flex-start'}
            >
              {isExpanded ? 'Read less' : 'Read more'}
            </Button>
          </>
        ) : (
          <ReadMoreText noOfLines={3}>{steps.join()}</ReadMoreText>
        )}
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
          wordBreak={'break-all'}
        >
          {data?.meals?.[0]?.strSource}
        </Link>
      </CardItem>
    )
  )
}

const Badges = ({
  data,
}: {
  data: { meals: { strArea: string; strCategory: string; strTags: string }[] }
}) => {
  return (
    <ScrollArea.Root mb={{ base: '2', md: 0 }} maxW={{ base: 'sm', md: '6xl' }}>
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
      <ScrollArea.Scrollbar orientation='horizontal' visibility={'hidden'} />
      <ScrollArea.Corner />
    </ScrollArea.Root>
  )
}
