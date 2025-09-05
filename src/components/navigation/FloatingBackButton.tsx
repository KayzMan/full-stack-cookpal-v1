import {
  ActionBar,
  Button,
  IconButton,
  Flex,
  Portal,
  Text,
} from '@chakra-ui/react'
import { LuArrowLeft, LuArrowUp } from 'react-icons/lu'
import { MdOutlineFastfood } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export const FloatingBackButton = ({
  open = true,
  currentPage,
  fallbackPath = '/',
}: {
  open?: boolean
  currentPage: string
  fallbackPath?: string
}) => {
  const navigate = useNavigate()

  const goBackSafely = () => {
    // Check if the history stack has enough entries to go back.
    // The history length includes the initial page, so a length > 1 means there's somewhere to go.
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      // If there's nowhere to go back to, go to the fallback path.
      // `replace: true` ensures this new route doesn't create a loop.
      navigate(fallbackPath, { replace: true })
    }
  }

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
              <Button variant='plain' size='sm' onClick={goBackSafely}>
                <LuArrowLeft />
                Back
              </Button>

              <ActionBar.Separator bg={'GrayText'} />

              <Flex alignItems={'center'} gap={'2'} color={'appColor'}>
                <MdOutlineFastfood style={{ flexShrink: 0 }} />
                <Text lineClamp={1}>{currentPage}</Text>
              </Flex>

              {scrollPosition > 500 && (
                <>
                  <ActionBar.Separator bg={'GrayText'} />

                  <IconButton
                    onClick={scrollToTop}
                    size={'xs'}
                    variant={'solid'}
                    bg={'InfoText'}
                    color={'Background'}
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
