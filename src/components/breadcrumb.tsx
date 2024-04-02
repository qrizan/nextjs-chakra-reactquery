import { useRouter } from 'next/router';
import React from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons';

const BreadcrumbComponent = () => {
  const router = useRouter();
  const paths = router.asPath;
  const pathNames = paths.split('?')[0].split('/').filter(path => path);

  return (
    <Box fontSize='xs'  px={8} pt={2}>
      <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>Home</BreadcrumbLink>
        </BreadcrumbItem>

        {
          pathNames.length > 0  && pathNames.map((link, index) => {
            let href = `/${pathNames.slice(0, index + 1).join('/')}`;
            let itemLink = link[0].toUpperCase() + link.slice(1, link.length);
            itemLink = itemLink.replace(/-/g, ' ');
            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href={href}>{itemLink}</BreadcrumbLink>
              </BreadcrumbItem>
            );
          })
        }
      </Breadcrumb>
    </Box>

  );
};

export default BreadcrumbComponent;