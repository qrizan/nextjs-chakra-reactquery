import { Box, Flex, VStack, Link, Container } from '@chakra-ui/react';
import Header from './header';
import Footer from './footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex direction="column" minHeight="100vh">
      <Header />
      <Flex flex="1">
        <Container maxW="6xl" mt={10}>
          {children}
        </Container>  
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;