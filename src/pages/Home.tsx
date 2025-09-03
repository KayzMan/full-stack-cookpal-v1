import { Box } from '@chakra-ui/react';

// components...
import { HomeMealCategories } from '@/components/Home/HomeMealCategories';

export const Home = () => {
  return (
    <Box my={'4'}>
      <HomeMealCategories />
    </Box>
  );
};
