import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import NextLink from "next/link";

import signinUser from '@/services/signinUser';

import { 
  Button, 
  Flex, 
  FormControl, 
  FormLabel, 
  Heading, 
  Link, 
  Stack 
} from '@chakra-ui/react';
import Layout from '@/components/layouts';
import InputFieldNoSpaceComponent from '@/components/input-field-no-space';

const LoginPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: signinUser,
    onSuccess: () => {
      router.push('/profile');
    },
    onError: (error) => {
      console.log(error)
    },
  });

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <Layout >
      <Flex justify="center" alignItems='center'>
        <Stack
            maxWidth="400px"
            p={8}
            spacing={4}
            w="100%"
          bg={'gray.700'}
          boxShadow="md" 
          borderWidth="1px" 
          borderColor="gray.900"
          >
            <form onSubmit={handleSubmit} autoComplete="off">
              <Flex direction="column" maxW="400px">
                <Flex justify="center">
                  <Heading>Login</Heading>
                </Flex>
                <FormControl id="email" mb={4}>
                  <FormLabel>Email Address</FormLabel>
                  <InputFieldNoSpaceComponent 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                  />
                </FormControl>
                <FormControl id="password" mb={4}>
                  <FormLabel>Password</FormLabel>
                  <InputFieldNoSpaceComponent 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                  />
                </FormControl>
                <Button colorScheme='messenger' type='submit'>Login</Button>
              </Flex>
            </form>
            <Link fontSize='xs' as={NextLink} href="/signup">Do not have an account? Sign up here</Link>
          </Stack>
      </Flex>
    </Layout>
  );
};

export default LoginPage;