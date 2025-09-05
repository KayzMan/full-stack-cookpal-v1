import {
  ActionBar,
  Button,
  IconButton,
  Flex,
  Portal,
  Text,
} from '@chakra-ui/react'
import { LuArrowLeft, LuArrowUp } from 'react-icons/lu'
import { GiMeal } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export const FloatingBackButton = ({
  open = true,
  title,
  currentPage,
  url,
}: {
  open?: boolean
  title: string
  currentPage: string
  url: string
}) => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const handleScroll = () => {
    const position = window.pageYOffset
    setScrollPosition(position)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    scrollToTop()

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <ActionBar.Root open={open}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content
              maxW={{ base: 'sm', md: 'none' }}
              bg={'whiteAlpha.600'}
              _dark={{ bg: 'gray.900/78' }}
              backdropFilter='blur(50px)'
              border={'1px solid'}
              borderColor={'appColor/48'}
              boxShadow={'lg'}
            >
              <Link to={url}>
                <Button variant='plain' size='sm'>
                  <LuArrowLeft />
                  {title}
                </Button>
              </Link>

              <ActionBar.Separator />

              <Flex alignItems={'center'} gap={'2'} color={'appColor'}>
                <GiMeal style={{ flexShrink: 0 }} />
                <Text lineClamp={1}>{currentPage}</Text>
              </Flex>

              {scrollPosition > 500 && (
                <>
                  <ActionBar.Separator />

                  <IconButton
                    onClick={scrollToTop}
                    size={'xs'}
                    variant={'solid'}
                    color={'appColor'}
                    borderRadius={'full'}
                  >
                    <LuArrowUp />
                  </IconButton>
                </>
              )}
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
    </>
  )
}
