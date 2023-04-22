import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const extendedTheme = extendTheme(
  {
    colors: {
      primary: {
        500: "#20b887",
      },
      white: "#FFFFFF",
      background: "#f7f7f7",
      lightGreen: "#e0eeee",
      black: "#1e293a",
    },
    config: {
      initialColorMode: "light",
      useSystemColorMode: false,
    },
  },
  withDefaultColorScheme({
    colorScheme: "primary",
  }),
);

export default extendedTheme;
