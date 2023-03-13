import { extendTheme } from "@chakra-ui/react";

const extendedTheme = extendTheme({
  colors: {
    white: "#FFFFFF",
    primary: {
      500: "#E4447C",
      700: "#933D65",
      800: "#3D3049",
    },
    gray: {
      500: "#363A4F",
      600: "#2B2E42",
      800: "#191C2D",
    },
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

export default extendedTheme;
