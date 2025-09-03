import {
  Box,
  Heading,
  ScrollArea,
  For,
  Flex,
  Text,
  Card,
  Image,
  Button,
  Skeleton,
  IconButton,
} from '@chakra-ui/react';
import { HiMiniArrowRight } from 'react-icons/hi2';
import type { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MdNavigateNext } from 'react-icons/md';
import { Link } from 'react-router-dom';

import type { categoryType } from '@/lib/types';

export function HomeMealCategories() {
  const { isPending, data, error, isError } = useQuery({
    queryKey: ['allCategories'],
    queryFn: async () => {
      const res = await fetch(`/api/mealCategories`);
      return await res.json();
    },
  });

  if (error || isError || data?.error) {
    return (
      <Box gap={'5'}>
        <Heading as={'h1'} fontSize={'xl'} color={'orangered'}>
          Failed to load meal categories...
        </Heading>
        <MealCategoriesSkeleton />
      </Box>
    );
  }

  return (
    <Box flex={'1'} mt={'8'}>
      <Heading as={'h1'} fontSize={'3xl'} mb={'4'}>
        <Flex alignItems={'center'} gap={'4'}>
          <Text>Meal Categories</Text>

          <Link to={'/mealCategories'}>
            <IconButton
              variant={'surface'}
              color={'appColor'}
              size={'md'}
              rounded={'full'}
            >
              <MdNavigateNext />
            </IconButton>
          </Link>
        </Flex>
      </Heading>

      {isPending ? (
        <MealCategoriesSkeleton />
      ) : (
        <Box pl={'5'}>
          <HorizontalScrollArea>
            <For each={data.categories || []}>
              {(item: categoryType, index: number) => (
                <MealCategoryItem
                  item={item}
                  index={index}
                  key={`${index}-${item.idCategory}`}
                />
              )}
            </For>
          </HorizontalScrollArea>
        </Box>
      )}
    </Box>
  );
}

const MealCategoryItem = ({
  index,
  item,
}: {
  item: categoryType;
  index: number;
}) => {
  return (
    <Card.Root
      cursor={'pointer'}
      maxW='xs'
      overflow='hidden'
      key={`${index}-${item.idCategory}`}
      _hover={{ shadow: 'lg' }}
    >
      <Image
        src={item.strCategoryThumb}
        alt={`${item.strCategory}-image`}
        // p={'4'}
        pb={0}
      />
      <Card.Body gap='2'>
        <Card.Title>{item.strCategory}</Card.Title>
        <Card.Description>
          <Text truncate>{item.strCategoryDescription}</Text>
        </Card.Description>
      </Card.Body>
      <Card.Footer gap='2' justifyContent={'flex-end'}>
        <Button variant='outline' _hover={{ bg: 'appColorShade.100' }}>
          <HiMiniArrowRight />
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

const MealCategoriesSkeleton = () => {
  return (
    <Box pl={'5'}>
      <HorizontalScrollArea>
        <For each={[1, 2, 3, 4, 5, 6]}>
          {(_, index) => <MealCategoryItemSkeleton key={`${index}}`} />}
        </For>
      </HorizontalScrollArea>
    </Box>
  );
};

const MealCategoryItemSkeleton = () => {
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
        <Button variant='outline'>
          <Skeleton height={'2'} width={'4'} />
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

function HorizontalScrollArea({ children }: { children: ReactNode }) {
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
  );
}
