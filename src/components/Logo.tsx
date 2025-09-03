import { Heading, Highlight } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export function Logo() {
  return (
    <Link to={'/'}>
      <Heading size={{ base: '2xl', md: '4xl' }} letterSpacing='tight'>
        <Highlight query='Cook' styles={{ color: 'appColor' }}>
          CookPal
        </Highlight>
      </Heading>
    </Link>
  )
}
