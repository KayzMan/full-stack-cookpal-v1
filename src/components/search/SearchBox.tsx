import { HStack, Input } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'

export const SearchBox = ({
  placeholder,
  value,
  setValue,
}: {
  placeholder: string
  value: string
  setValue: (val: string) => void
}) => {
  return (
    <HStack
      bg={'bg-canvas'}
      alignItems={'center'}
      px={'3'}
      borderRadius={'lg'}
      border={'1px solid'}
      borderColor={'gray.300'}
      _dark={{ borderColor: 'gray.700' }}
      _focusWithin={{
        borderColor: 'gray.900',
        _dark: { borderColor: 'gray.300' },
      }}
      transition={'linear'}
      transitionDuration={'slow'}
      gap={0}
    >
      <FiSearch />

      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        border={'none'}
        outline={'none'}
        maxLength={1}
      />
    </HStack>
  )
}
