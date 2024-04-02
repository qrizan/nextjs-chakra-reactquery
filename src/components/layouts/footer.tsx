import { Box,Text } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Box w="full" backgroundColor={'gray.900'}
    >
    <Box
      maxWidth="1250px"
      m="auto"
      h="3vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      my={5}
    >
      <Text fontSize="sm">Copyright © 2024 by Games Catalog</Text>
    </Box>
  </Box>
  );
};

export default Footer;
