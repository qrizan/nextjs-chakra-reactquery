import React, { useState } from 'react';
import router from 'next/router';

import { 
  InputGroup, 
  Input, 
  InputLeftElement, 
  Box, 
  InputRightElement, 
  Button 
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBarComponent = () => {
  const [keyword, setKeyword] = useState('')

  const handleClick = () => {
    if(keyword.length > 0) {
      router.push(`/search?q=${encodeURIComponent(keyword)}`);
    }
  };

  const handleKeyPress = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <Box w='400px'>
    <InputGroup>
      <InputLeftElement pointerEvents='none'>
        <SearchIcon />
      </InputLeftElement>
      <Input 
        type="search"
        variant='flushed'
        placeholder="game title..."
        defaultValue={keyword}
        onChange={(e) => setKeyword(e.target.value)} 
        onKeyDown={handleKeyPress}
        _focus={{ borderColor: "none" }} 
        _hover={{ borderColor: "none" }} 
        _active={{ borderColor: "none" }}
        sx={{ textDecoration: "none" }} 
        />
      <InputRightElement width='4.5rem'>
        <Button 
          colorScheme='gray.300' 
          variant='ghost' 
          h='1.75rem' 
          size='sm' 
          onClick={handleClick}>
          Search
        </Button>
      </InputRightElement>
    </InputGroup>
    </Box>
  );
};

export default SearchBarComponent;