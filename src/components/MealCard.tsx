import { Link } from 'react-router-dom'
import { Card, Image, Button, Text } from '@chakra-ui/react'
import { HiMiniArrowRight } from 'react-icons/hi2'

import type { categoryType, mealType } from '@/lib/types'

type ItemType =
  | ({ type: 'category' } & categoryType)
  | ({ type: 'meal' } & mealType)

// Prop type for the reusable component
interface MealCardProps {
  item: ItemType
  index: number
}

const cardBodyProps = {
  gap: '2',
}

const cardFooterProps = {
  gap: 2,
  justifyContent: 'flex-end',
}

const cardFooterButtonProps = {
  _hover: { bg: 'appColorShade.100' },
}

export const MealCard = ({ item, index }: MealCardProps) => {
  // Common props for the Card.Root component
  const cardProps = {
    maxW: 'xs',
    minW: 'xs',
    flexShrink: 0,
    overflow: 'hidden',
    _hover: { shadow: 'sm' },
    key: `${index}-${item.type == 'category' ? item.idCategory : item.idMeal}`,
  }

  if (item.type == 'category') {
    return (
      <Link to={`/mealCategories/${item.strCategory}`}>
        <Card.Root {...cardProps}>
          <Image
            src={item.strCategoryThumb}
            alt={`${item.strCategory}-image`}
            pb={0}
          />
          <Card.Body {...cardBodyProps}>
            <Card.Title>{item.strCategory}</Card.Title>
            <Card.Description>
              <Text truncate>{item.strCategoryDescription}</Text>
            </Card.Description>
          </Card.Body>
          <Card.Footer {...cardFooterProps}>
            <Button {...cardFooterButtonProps} variant={'outline'}>
              <HiMiniArrowRight />
            </Button>
          </Card.Footer>
        </Card.Root>
      </Link>
    )
  }

  if (item.type == 'meal') {
    return (
      <Link to={`/mealCategories/${item?.strCategory}/${item?.idMeal}`}>
        <Card.Root {...cardProps}>
          <Image src={item.strMealThumb} alt={`${item.strMeal}-image`} pb={0} />
          <Card.Body {...cardBodyProps}>
            <Card.Title>
              <Text truncate>{item.strMeal}</Text>
            </Card.Title>
            {item?.strInstructions && (
              <Card.Description>
                <Text truncate>{item?.strInstructions}</Text>
              </Card.Description>
            )}
          </Card.Body>
          <Card.Footer>
            <Button {...cardFooterButtonProps} variant={'outline'}>
              <HiMiniArrowRight />
            </Button>
          </Card.Footer>
        </Card.Root>
      </Link>
    )
  }
}
