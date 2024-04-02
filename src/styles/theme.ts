import { extendTheme, Input } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    darkBg: "#1A202C",
    darkText: "#CBD5E0",
    darkAccent: "#4B4DED",
  },
  styles: {
    global: {
      body: {
        bg: "darkBg",
        color: "darkText",
      },
      "*, *::before, *::after": {
        textDecoration: "none !important",
      },
    },
  },
  components: {
    Modal: {
      baseStyle: {
        borderRadius: "0",
      },
    },
    Button: {
      baseStyle: {
        rounded: "none",
      },
    },
    Card: {
      baseStyle: {
        rounded: "none",
      },
    },  
    Box: {
      baseStyle: {
        rounded: "none",
      },
    },       
    Input: {
      sizes: {
        md: {
          field: {
            borderRadius: 'none',
          },
        },
      },
    },         
  },
  fonts: {
    heading: `'Heading Font Name', sans-serif`,
    body: `'Body Font Name', sans-serif`,
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700
  }
});

export default theme;