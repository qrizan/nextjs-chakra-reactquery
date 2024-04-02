import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import theme from "@/styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme} toastOptions={{ defaultOptions: { position: 'top-right' } }}>
        <Component {...pageProps} />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </ChakraProvider>
    </QueryClientProvider>
  )
}
