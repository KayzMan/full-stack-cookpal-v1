import { ActionBar, Button, Portal } from '@chakra-ui/react'
import { LuArrowLeft } from 'react-icons/lu'
import { Link } from 'react-router-dom'

export const FloatingBackButton = ({
  open = true,
  title,
  url,
}: {
  open?: boolean
  title: string
  url: string
}) => {
  return (
    <>
      <ActionBar.Root open={open}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <Link to={url}>
                <Button variant='surface' size='sm' color={'appColor'}>
                  <LuArrowLeft />
                  {title}
                </Button>
              </Link>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
    </>
  )
}
