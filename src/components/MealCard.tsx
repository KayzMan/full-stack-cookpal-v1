import { Link } from 'react-router-dom'
import { Card, Image, Button, Text, Spacer } from '@chakra-ui/react'
import { HiMiniArrowRight } from 'react-icons/hi2'
import type { ReactNode } from 'react'

import type { categoryType, mealType } from '@/lib/types'

type ItemType =
  | ({ type: 'category' } & categoryType)
  | ({ type: 'meal' } & mealType)

// Prop type for the reusable component
interface MealCardProps {
  item: ItemType
  index: number
  url?: string
  cardFooterLeftView?: ReactNode
  onHome?: boolean
}

const cardBodyProps = {
  gap: '2',
}

const cardFooterProps = {
  gap: 2,
  justifyContent: 'flex-end',
}

const cardFooterButtonProps = {
  _hover: { bg: 'appColorShade.100', color: 'white' },
}

export const MealCard = ({
  item,
  index,
  url,
  cardFooterLeftView,
  onHome = false,
}: MealCardProps) => {
  // Common props for the Card.Root component
  const cardProps = onHome
    ? {
        maxW: 'xs',
        minW: 'xs',
        flexShrink: 0,
        overflow: 'hidden',
        _hover: { shadow: 'sm' },
      }
    : {
        overflow: 'hidden',
        _hover: { shadow: 'sm' },
      }

  if (item.type == 'category') {
    return (
      <Link to={url ?? `/mealCategories/${item.strCategory}`}>
        <Card.Root {...cardProps} key={`${index}-${item.idCategory}`}>
          <Image
            loading='lazy'
            src={item.strCategoryThumb}
            alt={`${item.strCategory}-image`}
            objectFit={'cover'}
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
      <Link to={url ?? `/mealCategories/${item?.strCategory}/${item?.idMeal}`}>
        <Card.Root {...cardProps} key={`${index}-${item.idMeal}`}>
          <Image
            loading='lazy'
            src={item.strMealThumb}
            objectFit={'cover'}
            alt={`${item.strMeal}-image`}
            pb={0}
          />
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
          <Card.Footer {...cardFooterProps}>
            {cardFooterLeftView}
            <Spacer />
            <Button {...cardFooterButtonProps} variant={'outline'}>
              <HiMiniArrowRight />
            </Button>
          </Card.Footer>
        </Card.Root>
      </Link>
    )
  }
}
