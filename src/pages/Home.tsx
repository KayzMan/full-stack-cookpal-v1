import { Box, Flex, Heading, Text } from '@chakra-ui/react'

export const Home = () => {
  return (
    <Box>
      <Flex>
        <Text fontWeight={'medium'} color={'appColor'}>
          CookPal
        </Text>

        <Heading>Your Pal to cook delicious meals.</Heading>
      </Flex>
    </Box>
  )
}
